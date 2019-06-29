import { Action } from '@ngrx/store';
import { Comment } from 'src/app/workshops/models';

export enum CommentsActionTypes {
    CommentsRequested = '[Comments] Comments Requested',
    CommentsReceived = '[Comments] Comments Received',
    CommentsRequestFalled = 'Comments] Comments Request Falled',

    CommentAddRequested = '[Comments] Tried To Add Comment',
    CommentAdded = '[Comments] Comment Added',
    CommentAddRequestFalled = '[Comments] Comment Add Request Falled',

    CommentDeleteRequested = '[Comments] Tried To Delete Comment',
    CommentDeleted = '[Comments] Comment Added',
    CommentDeleteRequestFalled = '[Comments] Comment Delete Request Falled',

    CommetEditRequested = '[Comments] Tried To Edit Comment',
    CommentEdited = '[Comments] Comment Edited',
    CommentEditRequestFalled = '[Comments] Comment Edit Request Falled'
}

export class CommentsRequested implements Action {
    readonly type = CommentsActionTypes.CommentsRequested;

    constructor(public payload: { workshopId: string }) { }
}

export class CommentsReceived implements Action {
    readonly type = CommentsActionTypes.CommentsReceived;

    constructor(public payload: { comments: Comment[] }) { }
}

export class CommentsRequestFalled implements Action {
    readonly type = CommentsActionTypes.CommentsRequestFalled;

    constructor(public payload: { error: any }) { }
}

export class CommentAddRequested implements Action {
    readonly type = CommentsActionTypes.CommentAddRequested;

    constructor(public payload: { text: string, postId: string }) { }
}

export class CommentAdded implements Action {
    readonly type = CommentsActionTypes.CommentAdded;

    constructor(public payload: {com: Comment}) { }
}

export class CommentAddRequestFalled implements Action {
    readonly type = CommentsActionTypes.CommentAddRequestFalled;

    constructor(public payload: { error: any }) { }
}

export class CommentDeleteRequested implements Action {
    readonly type = CommentsActionTypes.CommentDeleteRequested;

    constructor(public payload: { postId: string, commentId: string }) { }
}

export class CommentDeleted implements Action {
    readonly type = CommentsActionTypes.CommentDeleted;

    constructor(public payload: { commentId: string }) { }
}

export class CommentDeleteRequestFalled implements Action {
    readonly type = CommentsActionTypes.CommentDeleteRequestFalled;

    constructor(public payload: { error: any }) { }
}

export type CommentsActions =
    CommentsRequested |
    CommentsReceived |
    CommentsRequestFalled |
    CommentAddRequested |
    CommentAdded |
    CommentAddRequestFalled |
    CommentDeleteRequested |
    CommentDeleted |
    CommentDeleteRequestFalled;
