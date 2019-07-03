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
        QuizzAddRequestFalled,
        QuizzDeleteRequested,
        QuizzDeleted,
        QuizzDeleteRequestFalled,
        QuizzModifyRequested,
        QuizzModified,
        QuizzModifeRequestFalled
    } from './quizzes.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Quizz, QuizzData } from '../models';
import { of } from 'rxjs';

@Injectable()
export class QuizzesEffects {

    constructor(
        private actions$: Actions,
        private quizzesService: QuizzesService
    ) { }

    @Effect()
    $allQuizzesRequested = this.actions$
    .pipe(
        ofType<AllQuizzesRequested>(QuizzesActionTypes.AllQuizzesRequested),
        exhaustMap(() => {
            return this.quizzesService.getAllQuizzes()
            .pipe(
                map((quizzes: Quizz[]) => {
                    return new AllQuizzesReceived({quizzes});
                }),
                catchError((error: any) => {
                    return of(new AllQuizzesRequestFalled({error}));
                })
            );
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
        exhaustMap((quizzData: QuizzData) => {
            return this.quizzesService.createQuizz(quizzData)
            .pipe(
                map((quizz: Quizz) => {
                    return new QuizzAdded({quizz});
                }),
                catchError(error => {
                    return of(new QuizzAddRequestFalled({error}));
                })
            );
        })
    );

    @Effect()
    $quizzDeleteRequested = this.actions$
    .pipe(
        ofType<QuizzDeleteRequested>(QuizzesActionTypes.QuizzDeleteRequested),
        map((action: QuizzDeleteRequested) => action.payload.quizzId),
        exhaustMap((id: string) => {
            return this.quizzesService.deleteQuizz(id)
            .pipe(
                map((quizz: Quizz) => {
                    return new QuizzDeleted({quizzId: quizz.id});
                }),
                catchError((error: any) => {
                    return of(new QuizzDeleteRequestFalled({error}));
                })
            );
        })
    );

    @Effect()
    $quizzModifyRequested = this.actions$
    .pipe(
        ofType<QuizzModifyRequested>(QuizzesActionTypes.QuizzModifyRequested),
        map((action: QuizzModifyRequested) => action.payload),
        exhaustMap(({id, newQuizz}: {id: string, newQuizz: QuizzData}) => {
            return this.quizzesService.updeteQuizz(id, newQuizz)
            .pipe(
                map((quizz: Quizz) => {
                    return new QuizzModified({quizz: {id: quizz.id, changes: quizz}});
                }),
                catchError((error : any) => {
                    return of(new QuizzModifeRequestFalled({error}));
                })
            );
        })
    );
}
