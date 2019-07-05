import { Action } from '@ngrx/store';
import { Quizz, QuizzData } from '../models';
import { Update } from '@ngrx/entity';

export enum QuizzesActionTypes {
    AllQuizzesRequested = '[Quizzes] All Quizzess Requested',
    AllQuizzesReceived = '[Quizzes] All Quizzess Received',
    AllQuizzesRequestFailed = '[Quizzes] All Quizzess Request Failed',

    QuizzPageRequested = '[Quizzes] Quizz Page Requested',
    QuizzPageReceived = '[Quizzes] Quizz Page Received',
    QuizzPageRequestFailed = '[Quizzes] Quizz Page Request Failed',

    QuizzAddRequested = '[Quizz] Quizz Requested To Add',
    QuizzAdded = '[Quizz] Quizz Added',
    QuizzAddRequestFailed = '[Quizz] Quizz Request To Add Failed',

    QuizzDeleteRequested = '[Quizz] Quizz Requested To Delete',
    QuizzDeleted = '[Quizz] Quizz Deleted',
    QuizzDeleteRequestFailed = '[Quizz] Quizz Request To Delete Failed',

    QuizzModifyRequested = '[Quizz] Quizz Requested To Modify',
    QuizzModified = '[Quizz] Quizz Modify',
    QuizzModifeRequestFailed = '[Quizz] Quizz Request To Modify Failed',

    QuizzCheckRequested = '[Quizz] Quizz Requested To Check',
    QuizzChecked = '[Quizz] Quizz Checked',
    QuizzCheckFailed = '[Quizz] Quizz Check Request Failed'
}

export class AllQuizzesRequested implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesRequested;
}

export class AllQuizzesReceived implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesReceived;

    constructor(public payload: {quizzes: Quizz[]}) {}
}

export class AllQuizzesRequestFailed implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesRequestFailed;

    constructor(public payload: {error: any}) {}
}

export class QuizzPageRequested implements Action {
    readonly type = QuizzesActionTypes.QuizzPageRequested;

    constructor(public payload: {quizzId: string}) {}
}

export class QuizzPageReceived implements Action {
    readonly type = QuizzesActionTypes.QuizzPageReceived;

    constructor(public payload: {quizz: Quizz}) {}
}

export class QuizzPageRequestFailed implements Action {
    readonly type = QuizzesActionTypes.QuizzPageRequestFailed;

    constructor(public payload: {error: any}) {}
}

export class QuizzAddRequested implements Action {
    readonly type = QuizzesActionTypes.QuizzAddRequested;

    constructor(public payload: {quizz: Quizz}) {}
}

export class QuizzAdded implements Action {
    readonly type = QuizzesActionTypes.QuizzAdded;

    constructor(public payload: {quizz: Quizz}) {}
}

export class QuizzAddRequestFailed implements Action {
    readonly type = QuizzesActionTypes.QuizzAddRequestFailed;

    constructor(public payload: {error: any}) {}
}

export class QuizzDeleteRequested implements Action {
    readonly type = QuizzesActionTypes.QuizzDeleteRequested;

    constructor(public payload: {quizzId: string}) {}
}

export class QuizzDeleted implements Action {
    readonly type = QuizzesActionTypes.QuizzDeleted;

    constructor(public payload: {quizzId: string}) {}
}

export class QuizzDeleteRequestFailed implements Action {
    readonly type = QuizzesActionTypes.QuizzDeleteRequestFailed;

    constructor(public payload: {error: any}) {}
}

export class QuizzModifyRequested implements Action {
    readonly type = QuizzesActionTypes.QuizzModifyRequested;

    constructor(public payload: {id: string, newQuizz: QuizzData}) {}
}

export class QuizzModified implements Action {
    readonly type = QuizzesActionTypes.QuizzModified;

    constructor(public payload: {quizz: Update<Quizz>}) {}
}

export class QuizzModifeRequestFailed implements Action {
    readonly type = QuizzesActionTypes.QuizzModifeRequestFailed;

    constructor(public payload: {error: any}) {}
}

export type QuizzesActions =
    AllQuizzesRequested |
    AllQuizzesReceived |
    AllQuizzesRequestFailed |
    QuizzPageRequested |
    QuizzPageReceived |
    QuizzPageRequestFailed |
    QuizzAddRequested |
    QuizzAdded |
    QuizzAddRequestFailed |
    QuizzModifyRequested |
    QuizzModified |
    QuizzModifeRequestFailed |
    QuizzDeleteRequested |
    QuizzDeleted |
    QuizzDeleteRequestFailed;
