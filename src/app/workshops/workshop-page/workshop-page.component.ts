import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workshop-page',
    templateUrl: './workshop-page.component.pug',
    styleUrls: ['./workshop-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopPageComponent implements OnInit, OnDestroy {
    article: Article;
    isButtonPlus: boolean;
    subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.setAuxiliaryStatus();
        this.subscription = this.activateRoute.data.subscribe(data => {
            this.article = data.workshop;
        });
    }

    setAuxiliaryStatus() {
        if (this.activateRoute.children.length) {
            this.isButtonPlus = false;
        } else {
            this.isButtonPlus = true;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }

    changeButton() {
        this.isButtonPlus = !this.isButtonPlus;
    }
}
