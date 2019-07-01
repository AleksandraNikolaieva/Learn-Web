import {
        Component,
        OnInit,
        ChangeDetectionStrategy,
        OnDestroy,
        ChangeDetectorRef
} from '@angular/core';
import { Article, Category, WorkshopsFeedParams } from '../models';
import { Tag } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, zip } from 'rxjs';
import { enterLeaveHeight } from 'src/app/common/animations';
import { take, skip } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectWorkshops, selectWorkshopsState } from '../store/workshops.selectors';
import {
        WorkshopsRequested,
        CategoryActivated,
        TagsActivated 
} from '../store/workshops.actions';
import { TagsRequested } from 'src/app/store/tags/tags.actions';
import { selectAllTags, selectTagsEntities } from 'src/app/store/tags/tags.selectors';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/core/models';
import { UsersRequested } from 'src/app/store/users/users.actions';
import { selectUsersEntities } from 'src/app/store/users/users.selectors';
import { WorkshopsState } from '../store/workshops.reducer';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveHeight]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    articles: Array<Article>;
    tags$: Observable<Array<Tag>>;
    tagsEntities$: Observable<Dictionary<Tag>>;
    usersEntities$: Observable<Dictionary<User>>;
    loggedUser: User;

    activeTags: Array<string> = [];
    activeCategory: string;

    subscriptions: Array<Subscription> = [];

    categories: Array<Category> = [
        {
            id: 1,
            title: 'all'
        },
        {
            id: 2,
            title: 'my'
        },
        {
            id: 3,
            title: 'favorite'
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<AppState>,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.getLoggedUser();

        this.checkStore();

        this.subscriptions.push(
            this.store.pipe(select(selectWorkshops))
            .subscribe((workshops: Array<Article>) => {
                this.articles = workshops;
                this.cdr.detectChanges();
            })
        );

        this.tags$ = this.store.pipe(select(selectAllTags));
        this.tagsEntities$ = this.store.pipe(select(selectTagsEntities));

        this.usersEntities$ = this.store.pipe(select(selectUsersEntities));
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.route.queryParamMap
            .pipe(skip(1))
            .subscribe((qp: any) => {
                this.onQPChanges(qp);
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    getLoggedUser() {
        this.subscriptions.push(
            this.store.pipe(select(selectAuthData))
            .subscribe((user: User) => {
                this.loggedUser = user;
            })
        );
    }

    checkStore() {
        this.store.select(selectWorkshopsState)
        .pipe(take(1))
        .subscribe((wsState: WorkshopsState) => {
            if (wsState.isLoaded) {
                this.activeCategory = wsState.activeCategory;
                this.activeTags = wsState.activeTags ? wsState.activeTags.split('|') : [];

                const categoryParam = this.activeCategory !== 'all' ? this.activeCategory : undefined;
                const tagsParam = this.activeTags.length ? this.activeTags.join(',') : undefined;

                this.router.navigate([], {
                    queryParams: { tags: tagsParam, category: categoryParam}
                });
            } else {
                this.store.dispatch(new TagsRequested());
                this.store.dispatch(new UsersRequested());

                const qp = this.route.snapshot.queryParams;

                let tagsToStore: string;
                if (qp.tags) {
                    tagsToStore = qp.tags.replace(/,/g, '|');
                    this.store.dispatch(new TagsActivated({tags: tagsToStore}));
                    this.activeTags = qp.tags.split(',');
                }

                if (qp.category) {
                    this.activeCategory = qp.category;
                    this.store.dispatch(new CategoryActivated({category: qp.category}));
                } else {
                    this.activeCategory = 'all';
                }
                const authorParam = this.activeCategory === 'my' ? this.loggedUser._id : undefined;

                this.store.dispatch(new WorkshopsRequested({params: new WorkshopsFeedParams('0', tagsToStore, authorParam)}));
            }
        });
    }

    onQPChanges(qp: any) {
        const category = qp.get('category');
        const newCategory = category ? category : 'all';
        if (this.activeCategory !== newCategory) {
            this.activeCategory = newCategory;
            this.store.dispatch(new CategoryActivated({category: this.activeCategory}));
        }

        const tags = qp.get('tags');
        this.activeTags = tags ? tags.split(',') : [];
        const tagsParam = tags ? tags.replace(/,/g, '|') : undefined;

        this.store.dispatch(new TagsActivated({tags: tagsParam}));

        const authorParam = this.activeCategory === 'my' ? this.loggedUser._id : undefined;

        this.store.dispatch(new WorkshopsRequested({params: new WorkshopsFeedParams('0', tagsParam, authorParam)}));
    }

    activateCategory(category: Category) {
        if (category.id !== 1) {
            this.router.navigate([], {
                queryParams: { category: category.title },
                queryParamsHandling: 'merge'
            });
        } else {
            this.router.navigate([], {
                queryParams: { tags: this.route.snapshot.queryParamMap.get('tags') }
            });
        }
    }

    activateTag(tagId: string): void {
        if (this.activeTags.some(tagItem => tagItem === tagId)) {
            this.activeTags = this.activeTags.filter(tagItem => tagItem !== tagId);
        } else {
            this.activeTags.push(tagId);
        }

        if (this.activeTags.length) {
            this.router.navigate([], {
                queryParams: { tags: this.activeTags.join(',') },
                queryParamsHandling: 'merge'
            });
        } else {
            this.router.navigate([], {
                queryParams: { category: this.route.snapshot.queryParamMap.get('category') }
            });
        }
    }

    resetTags() {
        this.router.navigate([], {
            queryParams: {
                category: this.route.snapshot.queryParamMap.get('category')
            }
        });
    }

    trackByFunction(index: number, item: Article) {
        if (!item) {
            return null;
        }
        return item.id;
    }
}
