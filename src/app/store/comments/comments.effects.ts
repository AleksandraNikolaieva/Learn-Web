import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommentsService } from 'src/app/services/comments.service';
import {
        CommentsRequested,
        CommentsActionTypes,
        CommentsReceived,
        CommentsRequestFailed,
        CommentAddRequestFailed,
        CommentAddRequested,
        CommentAdded,
        CommentDeleteRequested,
        CommentDeleted,
        CommentDeleteRequestFailed,
        CommetModifyRequested,
        CommentModified,
        CommentModifyRequestFailed
} from './comments.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Comment } from 'src/app/workshops/models';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Update } from '@ngrx/entity';

@Injectable()
export class CommentsEffects {

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService
    ) { }

    @Effect()
    $commentsRequested = this.actions$
    .pipe(
        ofType<CommentsRequested>(CommentsActionTypes.CommentsRequested),
        map((action: CommentsRequested) => action.payload),
        exhaustMap(({workshopId}: {workshopId: string}) => {
            return this.commentsService.getCommentsByPostId(workshopId)
            .pipe(
                map((comments: Comment[]) => {
                    return new CommentsReceived({comments});
                }),
                catchError((error: any) => {
                    return of(new CommentsRequestFailed({error}));
                })
            );
        })
    );

    @Effect()
    $commentAddRequested = this.actions$
    .pipe(
        ofType<CommentAddRequested>(CommentsActionTypes.CommentAddRequested),
        map((action: CommentAddRequested) => action.payload),
        exhaustMap(({text, postId}: {text: string, postId: string}) => {
            return this.commentsService.createComment(postId, text)
            .pipe(
                map((comment: Comment) => {
                    return new CommentAdded({comment});
                }),
                catchError((error: any) => {
                    return of(new CommentAddRequestFailed({error}));
                })
            );
        })
    );

    @Effect()
    $commentDeleteRequested = this.actions$
    .pipe(
        ofType<CommentDeleteRequested>(CommentsActionTypes.CommentDeleteRequested),
        map((action: CommentDeleteRequested) => action.payload),
        exhaustMap(({postId, commentId}: {postId: string, commentId: string}) => {
            return this.commentsService.deleteComment(postId, commentId)
            .pipe(
                map((id: string) => {
                    return new CommentDeleted({id});
                }),
                catchError((error: any) => {
                    return of(new CommentDeleteRequestFailed({error}));
                })
            );
        })
    );

    @Effect()
    $commetModifyRequested = this.actions$
    .pipe(
        ofType<CommetModifyRequested>(CommentsActionTypes.CommetModifyRequested),
        map((action: CommetModifyRequested) => action.payload),
        exhaustMap(({postId, commentId, text}: {postId: string, commentId: string, text: string}) => {
            return this.commentsService.updateComment(postId, commentId, text)
            .pipe(
                map((comment: Comment) => {
                    return new CommentModified({comment: {id: comment._id, changes: comment}});
                }),
                catchError((error: any) => {
                    return of(new CommentModifyRequestFailed({error}));
                })
            );
        })
    )
}
