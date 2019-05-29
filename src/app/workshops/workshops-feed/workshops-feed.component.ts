import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tag, Article, Category } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopsService } from 'src/app/services/workshops.service';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsFeedComponent implements OnInit {
    articles: Array<Article>;
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
    activeTags: Array<string> = [];
    categories: Array<Category> = [
        {
            id: 1,
            title: 'my',
            isActive: false
        },
        {
            id: 2,
            title: 'all',
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
        private workshopsService: WorkshopsService) { }

    ngOnInit() {
        this.showArticles();
    }

    showArticles(): void {
        this.route.queryParamMap.subscribe(queryParam  => {
            const tags = queryParam.get('tags');
            const category = queryParam.get('category');
            if (tags && !category) {
                this.markTags(tags);
                this.filterFeedByTag();
            } else if (category && !tags) {
                this.filterFeedByCategory(category);
            } else if (category && tags) {
                this.markTags(tags);
                this.filterByBoth(category, this.activeTags);
            } else {
                this.activeTags = [];
                this.tags.forEach(tag => {
                    tag.isActive = false;
                });
                this.route.data.subscribe(data => {
                    this.articles = data.workshops;
                });
            }
        });
    }

    filterFeedByTag(): void {
        this.articles = this.workshopsService.getArticlesByTags(this.activeTags);
    }

    filterFeedByCategory(category: string): void {
        this.articles = this.workshopsService.getArticlesByCategory(category);
    }

    filterByBoth(category: string, tags: Array<string>): void {
        this.articles = this.workshopsService.getArticlesByBoth(category, tags);
    }

    markTags(tags: string): void {
        this.activeTags = tags.split(',');
        this.activeTags.forEach(activeTitle => {
            for (const tag of this.tags) {
                if (tag.title === activeTitle) {
                    tag.isActive = true;
                    break;
                }
            }
        });
    }

    activateTag(tag: Tag): void {
        this.tags[tag.id - 1].isActive = tag.isActive; // considering tags are hardcored and their order cant be changed

        if (tag.isActive) {
            this.activeTags.push(tag.title);
        } else {
            this.activeTags = this.activeTags.filter(tagItem => tagItem !== tag.title);
        }

        if (this.activeTags.length) {
            this.router.navigate(['/workshops/feed'], {
                queryParams: {
                    tags: this.activeTags.join(',')
                },
                queryParamsHandling: 'merge'
            });
        } else {
            this.router.navigate(['/workshops/feed'], {
                queryParams: {
                    category: this.route.snapshot.queryParamMap.get('category')
                }
            });
        }
    }

    resetAll(): void {
        this.router.navigate(['/workshops/feed']);
    }
}
