import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workshop-page',
    templateUrl: './workshop-page.component.pug',
    styleUrls: ['./workshop-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopPageComponent implements OnInit, OnDestroy {
    article: Article;
    tags: Array<string>;
    isButtonPlus: boolean;
    subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.activateRoute.data.subscribe(data => {
            this.article = data.workshop;
            const tags = data.tags;
            this.tags = this.article.tags.map(tagId => tags.find(tag => tag.seq === +tagId).name);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }
}
