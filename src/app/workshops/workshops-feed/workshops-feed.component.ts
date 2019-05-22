import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { articles } from '../workshops';
import { Tag } from '../models';

@Component({
    selector: 'app-workshops-feed',
    templateUrl: './workshops-feed.component.pug',
    styleUrls: ['./workshops-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopsFeedComponent implements OnInit {
    articles = articles;
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
            title: 'Java Script',
            isActive: false
        }];
    constructor() { }

    ngOnInit() {
    }

}
