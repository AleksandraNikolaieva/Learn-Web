import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../models';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;
    constructor() { }

    ngOnInit() {
    }

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }
}
