import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommentsService } from 'src/app/services/comments.service';
import { CommentsRequested, CommentsActionTypes, CommentsReceived, CommentsRequestFalled } from './comments.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Comment } from 'src/app/workshops/models';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Injectable()
export class CommentsEffects {

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService,
        private userService: UsersService
    ) { }

    @Effect()
    $commentsRequested = this.actions$
    .pipe(
        ofType<CommentsRequested>(CommentsActionTypes.CommentsRequested),
        map((action: CommentsRequested) => action.payload),
        exhaustMap(({workshopId}: {workshopId: string}) => {
            return this.commentsService.getCommentsByPostId(workshopId)
            .pipe(
                map((commentsArray: Comment[]) => {
                    const comments = commentsArray.map(commentItem => {
                        commentItem.author$ = this.userService.getUserById(commentItem._author);
                        return commentItem;
                    });
                    return new CommentsReceived({comments});
                }),
                catchError((error: any) => {
                    return of(new CommentsRequestFalled({error}));
                })
            );
        })
    );
}
