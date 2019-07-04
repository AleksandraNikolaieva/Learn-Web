import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { WorkshopsRequested,
        WorkshopsActionTypes,
        WorkshopsReceived,
        WorkshopsRequestFalled,
        WorkshopPageRequested,
        WorkshopPageReceived,
        WorkshopDeleteRequested,
        WorkshopDeleted,
        WorkshopDeleteFalled,
        WorkshopAddRequested,
        WorkhsopAdded,
        WorkshopAddFalled,
        WorkshopEditRequested,
        WorkshopEdited,
        WorkshopEditFalled} from './workshops.actions';
import { map, exhaustMap, catchError, distinctUntilKeyChanged } from 'rxjs/operators';
import { WorkshopsFeedParams, Article, WorkshopData } from '../models';
import { of, pipe } from 'rxjs';
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

    @Effect()
    $workshopAddRequested = this.actions$
    .pipe(
        ofType<WorkshopAddRequested>(WorkshopsActionTypes.WorkshopAddRequested),
        map((action: WorkshopAddRequested) => action.payload.workshopData),
        exhaustMap((workshopData: WorkshopData) => {
            return this.workshopsService.createPost(workshopData)
            .pipe(
                map((workshop: Article) => {
                    this.router.navigateByUrl(`workshops/${workshop.id}`);
                    return new WorkhsopAdded({workshop});
                }),
                catchError((error: any) => {
                    return of(new WorkshopAddFalled({error}));
                })
            );
        })
    );

    @Effect()
    $workshopEditRequested = this.actions$
    .pipe(
        ofType<WorkshopEditRequested>(WorkshopsActionTypes.WorkshopEditRequested),
        map((action: WorkshopEditRequested) => action.payload),
        exhaustMap(({id, workshopData}: {id: string, workshopData: WorkshopData}) => {
            return this.workshopsService.updetePost(id, workshopData)
            .pipe(
                map((workshop: Article) => {
                    this.router.navigateByUrl(`workshops/${workshop.id}`);
                    return new WorkshopEdited({workshop: {id: workshop.id, changes: workshop}});
                }),
                catchError((error: any) => {
                    return of(new WorkshopEditFalled({error}));
                })
            );
        })
    );

    @Effect()
    $workshopDeleteRequested = this.actions$
    .pipe(
        ofType<WorkshopDeleteRequested>(WorkshopsActionTypes.WorkshopDeleteRequested),
        map((action: WorkshopDeleteRequested) => action.payload.id),
        exhaustMap((id: string) => {
            return this.workshopsService.deletePost(id)
            .pipe(
                map((workshop: Article) => {
                    return new WorkshopDeleted({id});
                }),
                catchError((error: any) => {
                    return of(new WorkshopDeleteFalled({error}));
                })
            );
        })
    );
}
