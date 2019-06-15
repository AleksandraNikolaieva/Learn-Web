import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Article, Category } from '../models';
import { Tag } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/core/models';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    user: User;
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
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.subscriptions.push(
            this.authService.getLoggedUserObs().subscribe(res => {
                this.user = res;
            })
        );
        this.subscriptions.push(
            this.route.data.subscribe(data => {
                this.tags = data.tags;
            })
        );
        this.subscriptions.push(this.route.queryParamMap.subscribe(queryParam  => {
            const tags = queryParam.get('tags');
            const category = queryParam.get('category');
            this.activeCategory = category ? category : 'all';
            if (tags) {
                this.activeTags = tags.split(',');
                this.wsService.getAllPosts(
                    undefined,
                    this.activeTags.map(tagItem => this.tags.find(tag => tag.name === tagItem).seq).join('|'))
                    .pipe(
                        map(articles => articles.map(article => {
                            article.author$ = this.userService.getUserById(article._author)
                            .pipe(
                                map(user => `${user.firstName} ${user.lastName}`)
                            );
                            return article;
                        }))
                    )
                    .subscribe(res => {
                        this.articles = res;
                        this.filterByCategory();
                        this.cdr.detectChanges();
                    });
            } else {
                this.subscriptions.push(
                    this.route.data.subscribe(data => {
                        this.articles = data.workshops;
                        this.filterByCategory();
                        this.cdr.detectChanges();
                    })
                );
            }
        }));
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
        this.activeTags = [];
        this.router.navigate([], {
            queryParams: {
                category: this.route.snapshot.queryParamMap.get('category')
            }
        });
    }

    filterByCategory() {
        if (this.activeCategory) {
            if (this.activeCategory === 'my') {
                this.articles = this.articles.filter(article => article._author === this.user._id);
            } else if (this.activeCategory === 'favorite') {
                this.articles = this.articles.filter(article => article.likes.some(userId => userId === this.user._id));
            }
        }
    }
}
