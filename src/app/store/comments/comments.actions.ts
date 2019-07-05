import { Action } from '@ngrx/store';
import { Comment } from 'src/app/workshops/models';
import { Update } from '@ngrx/entity';

export enum CommentsActionTypes {
    CommentsRequested = '[Comments] Comments Requested',
    CommentsReceived = '[Comments] Comments Received',
    CommentsRequestFailed = 'Comments] Comments Request Failed',

    CommentAddRequested = '[Comments] Tried To Add Comment',
    CommentAdded = '[Comments] Comment Added',
    CommentAddRequestFailed = '[Comments] Comment Add Request Failed',

    CommentDeleteRequested = '[Comments] Tried To Delete Comment',
    CommentDeleted = '[Comments] Comment Deleted',
    CommentDeleteRequestFailed = '[Comments] Comment Delete Request Failed',

    CommetModifyRequested = '[Comments] Tried To Modify Comment',
    CommentModified = '[Comments] Comment Modified',
    CommentModifyRequestFailed = '[Comments] Comment Modify Request Failed'
}

export class CommentsRequested implements Action {
    readonly type = CommentsActionTypes.CommentsRequested;

    constructor(public payload: { workshopId: string }) { }
}

export class CommentsReceived implements Action {
    readonly type = CommentsActionTypes.CommentsReceived;

    constructor(public payload: { comments: Comment[] }) { }
}

export class CommentsRequestFailed implements Action {
    readonly type = CommentsActionTypes.CommentsRequestFailed;

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

export class CommentAddRequestFailed implements Action {
    readonly type = CommentsActionTypes.CommentAddRequestFailed;

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

export class CommentDeleteRequestFailed implements Action {
    readonly type = CommentsActionTypes.CommentDeleteRequestFailed;

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

export class CommentModifyRequestFailed implements Action {
    readonly type = CommentsActionTypes.CommentModifyRequestFailed;

    constructor(public payload: { error: any }) {}
}

export type CommentsActions =
    CommentsRequested |
    CommentsReceived |
    CommentsRequestFailed |
    CommentAddRequested |
    CommentAdded |
    CommentAddRequestFailed |
    CommentDeleteRequested |
    CommentDeleted |
    CommentDeleteRequestFailed |
    CommetModifyRequested |
    CommentModified |
    CommentModifyRequestFailed;
