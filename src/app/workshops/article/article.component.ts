import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../models';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;
    constructor() { }

    ngOnInit() {
    }

    private changeLikeHandler(to: boolean): void {
        console.log('article handler', to);
        // send changes to server
    }
}
