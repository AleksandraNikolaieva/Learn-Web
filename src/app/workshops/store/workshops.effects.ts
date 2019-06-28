import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { WorkshopsRequested, WorkshopsActionTypes, WorkshopsReceived, WorkshopsRequestFalled } from './workshops.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { WorkshopsParams, Article } from '../models';
import { of } from 'rxjs';


@Injectable()
export class WorkshopsEffects {

    constructor(
        private actions$: Actions,
        private workshopsService: WorkshopsService
    ) { }

    @Effect()
    $workshopsRequested = this.actions$
    .pipe(
        ofType<WorkshopsRequested>(WorkshopsActionTypes.WorkshopsRequested),
        map((action: WorkshopsRequested) => action.payload),
        exhaustMap(({params}: {params: WorkshopsParams}) => {
            return this.workshopsService.getAllPosts(params)
            .pipe(
                map((workshops: Article[]) => {
                    return new WorkshopsReceived({workshops});
                }),
                catchError(error => {
                    return of(new WorkshopsRequestFalled({error}));
                })
            );
        })
    );
}
