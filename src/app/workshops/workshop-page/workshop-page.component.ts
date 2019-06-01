import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.setAuxiliaryStatus();
        this.subscription = this.activateRoute.data.subscribe(data => {
            if (data.workshop) {
                this.article = data.workshop;
            } else {
                this.router.navigate(['/not_found']);
            }
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
        console.log('workshop page like', to);
        // send changes to server
    }

    changeButton() {
        this.isButtonPlus = !this.isButtonPlus;
    }
}
