import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { QuizzesService } from 'src/app/services/quizzes.service';
import {
        AllQuizzesRequested,
        QuizzesActionTypes,
        AllQuizzesReceived,
        AllQuizzesRequestFalled,
        QuizzPageRequested,
        QuizzPageReceived,
        QuizzPageRequestFalled,
        QuizzAddRequested,
        QuizzAdded,
        QuizzAddRequestFalled
    } from './quizzes.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Quizz } from '../models';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/core/models';

@Injectable()
export class QuizzesEffects {

    constructor(
        private actions$: Actions,
        private quizzesService: QuizzesService,
        private usersService: UsersService
    ) { }

    @Effect()
    $allQuizzesRequested = this.actions$
    .pipe(
        ofType<AllQuizzesRequested>(QuizzesActionTypes.AllQuizzesRequested),
        exhaustMap(() => {
            return this.quizzesService.getAllQuizzes()
            .pipe(
                map((quizzesArr: Quizz[]) => {
                    const quizzes = quizzesArr.map((quizz: Quizz) => {
                        return {...quizz, authorName: this.usersService.getUserById(quizz.author)
                        .pipe(
                            map((author: User) => {
                                return `${author.firstName} ${author.lastName}`;
                            })
                        )};
                    });
                    return new AllQuizzesReceived({quizzes});
                }),
                catchError((error: any) => {
                    return of(new AllQuizzesRequestFalled({error}));
                })
            )
        })
    );

    @Effect()
    $quizzPageRequested = this.actions$
    .pipe(
        ofType<QuizzPageRequested>(QuizzesActionTypes.QuizzPageRequested),
        map((action: QuizzPageRequested) => action.payload.quizzId),
        exhaustMap((quizzId: string) => {
            return this.quizzesService.getQuizzById(quizzId)
            .pipe(
                map((quizz: Quizz) => {
                    return new QuizzPageReceived({quizz});
                }),
                catchError((error: any) => {
                    return of(new QuizzPageRequestFalled({error}));
                })
            );
        })
    );

    @Effect()
    $quizzAddRequested = this.actions$
    .pipe(
        ofType<QuizzAddRequested>(QuizzesActionTypes.QuizzAddRequested),
        map((action: QuizzAddRequested) => action.payload.quizz),
        exhaustMap((quizzMock: Quizz) => {
            return this.quizzesService.createQuizz(quizzMock.name, ['5d164945aed59b49b6ef0578'], quizzMock.questions)
            .pipe(
                map((quizz: Quizz) => {
                    console.log('created', quizz);
                    return new QuizzAdded({quizz});
                }),
                catchError(error => {
                    return of(new QuizzAddRequestFalled({error}));
                })
            )
        })
    );
}
