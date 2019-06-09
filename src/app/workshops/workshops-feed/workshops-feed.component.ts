import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Tag, Article, Category } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { Subscription } from 'rxjs';
import { enterHeight } from 'src/app/common/animations';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterHeight]
})
export class WorkshopsFeedComponent implements OnInit, OnDestroy {
    articles: Array<Article>;
    activeTags: Array<string> = [];
    subscriptions: Array<Subscription> = [];
    tags: Array<Tag> = [
        {
            id: 1,
            title: 'css',
            isActive: false
        },
        {
            id: 2,
            title: 'html',
            isActive: false
        },
        {
            id: 3,
            title: 'scss',
            isActive: false
        },
        {
            id: 4,
            title: 'pug',
            isActive: false
        },
        {
            id: 5,
            title: 'node.js',
            isActive: false
        },
        {
            id: 6,
            title: 'javascript',
            isActive: false
        },
        {
            id: 7,
            title: 'oop',
            isActive: false
        },
        {
            id: 8,
            title: 'algorithms',
            isActive: false
        },
        {
            id: 9,
            title: 'design',
            isActive: false
        }
    ];
    categories: Array<Category> = [
        {
            id: 1,
            title: 'all',
            isActive: false
        },
        {
            id: 2,
            title: 'my',
            isActive: false
        },
        {
            id: 3,
            title: 'favorite',
            isActive: false
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wsService: WorkshopsService,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        const storedActiveTags: string | null = sessionStorage.getItem('tags');
        const storedCategory: string | null = sessionStorage.getItem('category');
        if (storedActiveTags || storedCategory) {
            const tagsString = storedActiveTags ? JSON.parse(storedActiveTags).join(',') : storedActiveTags;
            this.router.navigate([], {
                queryParams: { tags: tagsString, category: storedCategory},
                queryParamsHandling: 'merge'
            });
        }
        this.getArticles();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    getArticles(): void {
        this.subscriptions.push(this.route.queryParamMap.subscribe(queryParam  => {
            const tags = queryParam.get('tags');
            const category = queryParam.get('category');
            if (category) {
                const categoryId = this.categories.find((item: Category) => item.title === category).id;
                this.markCategory(categoryId);
            } else {
                this.markCategory(1); // 'All' category always 1st in the list
            }

            if (tags) {
                this.markTags(tags);
            } else {
                this.activeTags = [];
                this.tags.forEach((tag: Tag) => {
                    tag.isActive = false;
                });
            }
            if (!category && !tags) {
                this.subscriptions.push(this.route.data.subscribe(data => {
                    this.articles = data.workshops;
                    this.cdr.detectChanges();
                }));
            } else {
                this.articles = this.wsService.getFilteredArticles(tags, category);
                this.cdr.detectChanges();
            }
        }));
    }

    markTags(tags: string): void {
        this.activeTags = tags.split(',');
        this.activeTags.forEach((activeTitle: string) => {
            for (const tag of this.tags) {
                if (tag.title === activeTitle) {
                    tag.isActive = true;
                    break;
                }
            }
        });
    }

    activateTag(tag: Tag): void {
        if (tag.isActive) {
            this.activeTags.push(tag.title);
        } else {
            this.activeTags = this.activeTags.filter((tagItem: string) => tagItem !== tag.title);
        }

        if (this.activeTags.length) {
            sessionStorage.setItem('tags', JSON.stringify(this.activeTags));
            this.router.navigate([], {
                queryParams: { tags: this.activeTags.join(',') },
                queryParamsHandling: 'merge'
            });
        } else {
            sessionStorage.removeItem('tags');
            this.router.navigate([], {
                queryParams: { category: this.route.snapshot.queryParamMap.get('category') }
            });
        }
    }

    markCategory(id: number) {
        this.categories.forEach((category) => {
            category.isActive = category.id === id ? true : false;
        });
    }

    activateCategory(category: Category) {
        if (category.id !== 1) {
            sessionStorage.setItem('category', category.title);
            this.router.navigate([], {
                queryParams: { category: category.title },
                queryParamsHandling: 'merge'
            });
        } else {
            sessionStorage.removeItem('category');
            this.router.navigate([], {
                queryParams: { tags: this.route.snapshot.queryParamMap.get('tags') }
            });
        }
    }

    resetTags() {
        sessionStorage.removeItem('tags');
        this.router.navigate([], {
            queryParams: {
                category: this.route.snapshot.queryParamMap.get('category')
            }
        });
    }
}
