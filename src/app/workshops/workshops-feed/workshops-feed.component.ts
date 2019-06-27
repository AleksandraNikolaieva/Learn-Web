import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Article, Category } from '../models';
import { Tag } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { Subscription, Observable, zip } from 'rxjs';
import { enterLeaveHeight } from 'src/app/common/animations';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, first } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveHeight]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    articles: Array<Article>;
    activeTags: Array<string> = [];
    activeCategory: string;
    subscriptions: Array<Subscription> = [];
    tags: Array<Tag>;
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
        private wsService: WorkshopsService,
        private authService: AuthService,
        private userService: UsersService,
        private categoriesService: CategoriesService,
        private tagsService: TagsService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.subscriptions.push(
            this.route.data.subscribe(data => {
                this.tags = data.tags;
            })
        );
        this.getFeedState()
        .pipe(
            first()
        ).subscribe(res => {
            if (res.every(item => item !== null)) {
                const category = res[0];
                const tags = res[1];
                this.navigate(category, tags);
            }
        });
        this.route.queryParamMap.pipe(
            switchMap(queryParam => {
                const category = queryParam.get('category');
                this.activeCategory = category ? category : 'all';
                this.categoriesService.setActiveCategory(this.activeCategory);
                const tags = queryParam.get('tags');
                if (tags) {
                    this.activeTags = tags.split(',');
                    this.tagsService.setActiveTags(this.activeTags);
                    return this.wsService.getAllPosts(
                        undefined,
                        this.activeTags.map(tagItem => this.tags.find(tag => tag.name === tagItem).seq).join('|')
                    )
                    .pipe(
                        map(articles => articles.map(article => {
                            article.author$ = this.userService.getUserById(article._author)
                            .pipe(
                                map(user => `${user.firstName} ${user.lastName}`)
                            );
                            return article;
                        }))
                    );
                } else {
                    this.activeTags = [];
                    this.tagsService.setActiveTags(this.activeTags);
                    return this.route.data;
                }
            })
        )
        .subscribe(res => {
            this.articles = res.workshops ? res.workshops : res;
            this.articles = this.categoriesService.filterByCategory(this.activeCategory, this.articles);
            this.wsService.setStoredWS(this.articles);
            this.cdr.detectChanges();
        });
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
            this.categoriesService.setActiveCategory('all');
            this.router.navigate([], {
                queryParams: { tags: this.route.snapshot.queryParamMap.get('tags') }
            });
        }
    }

    activateTag(tagName: string): void {
        if (this.activeTags.some(tagItem => tagItem === tagName)) {
            this.activeTags = this.activeTags.filter(tagItem => tagItem !== tagName);
        } else {
            this.activeTags.push(tagName);
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

    getFeedState(): Observable<Array<any>> {
        const category$ = this.categoriesService.getActiveCategory();
        const tags$ = this.tagsService.getActiveTagsObs();
        const workshops$ = this.wsService.getStoredWs();
        return zip(category$, tags$, workshops$);
    }

    navigate(category: string, tags: Array<string>) {
        this.router.navigate([], {
            queryParams: {
                category: category === 'all' ? undefined : category,
                tags: tags.length ? tags.join(',') : undefined
            }
        });
    }
}
