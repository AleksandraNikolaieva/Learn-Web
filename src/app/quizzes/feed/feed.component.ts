import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { UsersService } from 'src/app/services/users.service';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AllQuizzesRequested } from '../store/quizzes.actions';
import { selectAllQuizzes } from '../store/quizzes.selectors';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
    quizzes$: Observable<Array<Quizz>>;
    loggedUser$: Observable<User>;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private quizzesService: QuizzesService,
        private usersService: UsersService,
        private cdr: ChangeDetectorRef,
        private store: Store<AppState>) {}

    ngOnInit() {
        this.loggedUser$ = this.store.select(selectAuthData);

        this.store.dispatch(new AllQuizzesRequested());

        this.quizzes$ = this.store.select(selectAllQuizzes);

        //this.quizzes$ = this.store.select(select)
        /* this.subscription = this.store.pipe(
            select(selectAuthData)
        )
        .subscribe((authData: AuthData) => {
            this.loggedUser = authData;
        }); */

        /* this.quizzes = this.quizzesService.getMockQuizzes();
        this.quizzes.forEach(quizz => {
            quizz.authorName = this.usersService.getUserById(quizz.author)
            .pipe(
                map(user => `${user.firstName} ${user.lastName}`)
            );
        }); */
    }

    deleteQuizz(id: number) {
        
    }
}
