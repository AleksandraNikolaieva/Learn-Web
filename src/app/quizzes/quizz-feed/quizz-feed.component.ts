import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AllQuizzesRequested, QuizzDeleteRequested, QuizzModifyRequested } from '../store/quizzes.actions';
import { selectAllQuizzes } from '../store/quizzes.selectors';
import { UsersRequested } from 'src/app/store/users/users.actions';
import { selectUsersEntities } from 'src/app/store/users/users.selectors';
import { Dictionary } from '@ngrx/entity';

@Component({
    selector: 'app-feed',
    templateUrl: './quizz-feed.component.pug',
    styleUrls: ['./quizz-feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizzFeedComponent implements OnInit {
    quizzes$: Observable<Array<Quizz>>;
    loggedUser$: Observable<User>;
    usersMap$: Observable<Dictionary<User>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.loggedUser$ = this.store.select(selectAuthData);

        this.store.dispatch(new AllQuizzesRequested());
        this.store.dispatch(new UsersRequested());

        this.quizzes$ = this.store.select(selectAllQuizzes);
        this.usersMap$ = this.store.select(selectUsersEntities);
    }

    deleteQuizz(id: string) {
        this.store.dispatch(new QuizzDeleteRequested({quizzId: id}));
    }
}
