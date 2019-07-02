import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { WorkshopPageRequested } from '../store/workshops.actions';
import { selectWorkshopPage } from '../store/workshops.selectors';
import { UsersService } from 'src/app/services/users.service';
import { tap, map, skip } from 'rxjs/operators';

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

    constructor(
        private activateRoute: ActivatedRoute,
        private store: Store<AppState>,
        private userService: UsersService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.store.dispatch(new WorkshopPageRequested({pageId: this.activateRoute.snapshot.params.id}));

        this.subscription = this.store.select(selectWorkshopPage)
        .pipe(
            skip(1),
            map((article: Article) => {
                if (article) {
                    article.author$ = this.userService.getUserById(article.author)
                    .pipe(
                        map(user => `${user.firstName} ${user.lastName}`)
                    );
                    return article;
                }
            })
        )
        .subscribe((article: Article) => {
            this.article = article;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }
}
