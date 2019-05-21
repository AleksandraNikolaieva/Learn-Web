import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models';
import { articles } from '../workshops';

@Component({
    selector: 'app-workshop-page',
    templateUrl: './workshop-page.component.pug',
    styleUrls: ['./workshop-page.component.scss']
})
export class WorkshopPageComponent implements OnInit {
    article: Article;
    constructor(private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.article = articles[params.id - 1];
        });
    }

    private changeLikeHandler(to: boolean) {
        console.log('workshop page like', to);
        // send changes to server
    }
}
