import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../models';
import { Tag } from 'src/app/shared/models';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;
    @Input() tags: Array<Tag>;
    constructor() { }

    ngOnInit() {
    }

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }
}
