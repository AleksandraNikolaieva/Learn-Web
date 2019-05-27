import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tag, Article } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsFeedComponent implements OnInit {
    articles: Array<Article>;
    tags: Array<Tag> = [
        {
            title: 'CSS',
            isActive: false
        },
        {
            title: 'HTML',
            isActive: false
        },
        {
            title: 'SCSS',
            isActive: false
        },
        {
            title: 'PUG',
            isActive: false
        },
        {
            title: 'Node.js',
            isActive: false
        },
        {
            title: 'Javascript',
            isActive: false
        }];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.articles = data.workshops;
        })
    }

}
