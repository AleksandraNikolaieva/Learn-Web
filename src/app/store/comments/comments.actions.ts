import { Action } from '@ngrx/store';
import { Comment } from 'src/app/workshops/models';
import { Update } from '@ngrx/entity';

export enum CommentsActionTypes {
    CommentsRequested = '[Comments] Comments Requested',
    CommentsReceived = '[Comments] Comments Received',
    CommentsRequestFalled = 'Comments] Comments Request Falled',

    CommentAddRequested = '[Comments] Tried To Add Comment',
    CommentAdded = '[Comments] Comment Added',
    CommentAddRequestFalled = '[Comments] Comment Add Request Falled',

    CommentDeleteRequested = '[Comments] Tried To Delete Comment',
    CommentDeleted = '[Comments] Comment Deleted',
    CommentDeleteRequestFalled = '[Comments] Comment Delete Request Falled',

    CommetModifyRequested = '[Comments] Tried To Modify Comment',
    CommentModified = '[Comments] Comment Modified',
    CommentModifyRequestFalled = '[Comments] Comment Modify Request Falled'
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

    constructor(public payload: {comment: Comment}) {}
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

    constructor(public payload: { id: string }) { }
}

export class CommentDeleteRequestFalled implements Action {
    readonly type = CommentsActionTypes.CommentDeleteRequestFalled;

    constructor(public payload: { error: any }) { }
}

export class CommetModifyRequested implements Action {
    readonly type = CommentsActionTypes.CommetModifyRequested;

    constructor(public payload: { postId: string, commentId: string, text: string }) {}
}

export class CommentModified implements Action {
    readonly type = CommentsActionTypes.CommentModified;

    constructor(public payload: { comment: Update<Comment> }) {}
}

export class CommentModifyRequestFalled implements Action {
    readonly type = CommentsActionTypes.CommentModifyRequestFalled;

    constructor(public payload: { error: any }) {}
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
    CommentDeleteRequestFalled |
    CommetModifyRequested |
    CommentModified |
    CommentModifyRequestFalled;
