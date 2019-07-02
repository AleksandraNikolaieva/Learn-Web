import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { WorkshopsRequested,
        WorkshopsActionTypes,
        WorkshopsReceived,
        WorkshopsRequestFalled,
        WorkshopPageRequested,
        WorkshopPageReceived} from './workshops.actions';
import { map, exhaustMap, catchError, distinctUntilKeyChanged } from 'rxjs/operators';
import { WorkshopsFeedParams, Article } from '../models';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class WorkshopsEffects {

    constructor(
        private actions$: Actions,
        private workshopsService: WorkshopsService,
        private router: Router
    ) { }

    @Effect()
    $workshopsRequested = this.actions$
    .pipe(
        ofType<WorkshopsRequested>(WorkshopsActionTypes.WorkshopsRequested),
        map((action: WorkshopsRequested) => action.payload),
        distinctUntilKeyChanged('params', (x: WorkshopsFeedParams, y: WorkshopsFeedParams) => {
            return x.page === y.page && x.tags === y.tags && x.authorId === y.authorId;
        }),
        exhaustMap(({params}: {params: WorkshopsFeedParams}) => {
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

    @Effect()
    $workshopPageRequested = this.actions$
    .pipe(
        ofType<WorkshopPageRequested>(WorkshopsActionTypes.WorkshopPageRequested),
        map((action: WorkshopPageRequested) => action.payload),
        exhaustMap(({pageId}: {pageId: string}) => {
            return this.workshopsService.getPostById(pageId)
            .pipe(
                map((workshop: Article) => {
                    return new WorkshopPageReceived({workshop});
                }),
                catchError((error: any) => {
                    this.router.navigateByUrl('/not_found');
                    return of(new WorkshopsRequestFalled({error}));
                })
            );
        })
    );
}
