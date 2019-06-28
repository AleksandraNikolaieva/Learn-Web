import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { quizzes } from '../data';
import { FieldConfig } from 'src/app/dynamic-forms/models';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AuthData } from 'src/app/auth/models';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit, OnDestroy {
    quizzes: Array<Quizz> = quizzes;
    loggedUser: User;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private quizzesService: QuizzesService,
        private usersService: UsersService,
        private cdr: ChangeDetectorRef,
        private store: Store<AppState>) {}

    ngOnInit() {
        this.subscription = this.store.pipe(
            select(selectAuthData)
        )
        .subscribe((authData: AuthData) => {
            this.loggedUser = authData;
        });

        this.quizzes = this.quizzesService.getMockQuizzes();
        this.quizzes.forEach(quizz => {
            quizz.authorName = this.usersService.getUserById(quizz.author)
            .pipe(
                map(user => `${user.firstName} ${user.lastName}`)
            );
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    deleteQuizz(id: number) {
        this.quizzes.splice(id, 1);
    }
}
