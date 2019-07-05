import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TagsService } from 'src/app/services/tags.service';
import { TagsActionTypes, TagsRequested, TagsReceived, TagsRequestFailed, TagAddRequested, TagAdded, TagAddFailed } from './tags.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Tag } from 'src/app/shared/models';
import { of } from 'rxjs';

@Injectable()
export class TagsEffects {

    constructor(
        private actions$: Actions,
        private tagsService: TagsService
    ) { }

    @Effect()
    $tagsRequested = this.actions$
    .pipe(
        ofType<TagsRequested>(TagsActionTypes.TagsRequested),
        exhaustMap(() => {
            return this.tagsService.getAllTags()
            .pipe(
                map((tags: Tag[]) => {
                    return new TagsReceived({tags});
                }),
                catchError(error => {
                    return of(new TagsRequestFailed({error}));
                })
            );
        })
    );

    @Effect()
    $tagAddRequested = this.actions$
    .pipe(
        ofType<TagAddRequested>(TagsActionTypes.TagAddRequested),
        map((action: TagAddRequested) => action.payload.tagName),
        exhaustMap((tagName: string) => {
            return this.tagsService.createTag(tagName)
            .pipe(
                map((tag: Tag) => {
                    return new TagAdded({tag});
                }),
                catchError((error: any) => {
                    return of(new TagAddFailed({error}));
                })
            );
        })
    );
}
