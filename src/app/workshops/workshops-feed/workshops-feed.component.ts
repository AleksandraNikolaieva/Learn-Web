import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Article, Category, WorkshopsParams } from '../models';
import { Tag } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { Subscription, Observable, zip } from 'rxjs';
import { enterLeaveHeight } from 'src/app/common/animations';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, first, exhaustMap, tap, take, skip } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TagsService } from 'src/app/services/tags.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectWorkshops, selectActiveCategory } from '../store/workshops.selectors';
import { WorkshopsRequested, CategoryActivated } from '../store/workshops.actions';
import { TagsRequested, TagsActivated } from 'src/app/store/tags/tags.actions';
import { selectAllTags, selectTagsEntities, selectActiveTags } from 'src/app/store/tags/tags.selectors';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/core/models';
import { UsersRequested } from 'src/app/store/users/users.actions';
import { selectAllUsers, selectUsersEntities } from 'src/app/store/users/users.selectors';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AuthData } from 'src/app/auth/models';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveHeight]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    articles$: Observable<Array<Article>>;
    tags$: Observable<Array<Tag>>;
    tagsEntities$: Observable<Dictionary<Tag>>;
    loggedUser: AuthData;
    usersEntities$: Observable<Dictionary<User>>;

    activeTags: Array<string> = [];
    activeCategory = 'all';

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
        private categoriesService: CategoriesService,
        private cdr: ChangeDetectorRef,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.subscriptions.push(
            this.store.pipe(select(selectAuthData))
            .subscribe((user: AuthData) => this.loggedUser = user)
        );

        this.store.dispatch(new TagsRequested());
        this.store.dispatch(new UsersRequested());

        this.tags$ = this.store.pipe(select(selectAllTags));
        this.tagsEntities$ = this.store.pipe(select(selectTagsEntities));

        this.usersEntities$ = this.store.pipe(select(selectUsersEntities));

        this.subscriptions.push(
            this.route.queryParamMap
            .subscribe((qp: any) => {
                const category: string = qp.get('category');
                this.activeCategory = category ? category : 'all';
                this.store.dispatch(new CategoryActivated({category: this.activeCategory}));

                const tags = qp.get('tags');
                let tagsParam: string;
                if (tags) {
                    this.activeTags = tags.split(',');
                    tagsParam = tags.replace(/,/g, '|');
                    this.store.dispatch(new TagsActivated({tags: tagsParam}));
                }

                const authorId = category === 'my' ? this.loggedUser._id : undefined;

                this.store.dispatch(new WorkshopsRequested({params: new WorkshopsParams('0', tagsParam, authorId)}));
                this.articles$ = this.store.pipe(select(selectWorkshops));
                this.cdr.detectChanges();
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
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
