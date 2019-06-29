import { Action } from '@ngrx/store';
import { Quizz } from '../models';

export enum QuizzesActionTypes {
    AllQuizzesRequested = '[Quizzes] All Quizzess Requested',
    AllQuizzesReceived = '[Quizzes] All Quizzess Received',
    AllQuizzesRequestFalled = '[Quizzes] All Quizzess Request Falled',

    QuizzPageRequested = '[Quizzes] Quizz Page Requested',
    QuizzPageReceived = '[Quizzes] Quizz Page Received',
    QuizzPageRequestFalled = '[Quizzes] Quizz Page Request Falled',

    QuizzAddRequested = '[Quizz] Quizz Requested To Add',
    QuizzAdded = '[Quizz] Quizz Added',
    QuizzAddRequestFalled = '[Quizz] Quizz Request To Add Falled',

    QuizzDeleteRequested = '[Quizz] Quizz Requested To Delete',
    QuizzDeleted = '[Quizz] Quizz Deleted',
    QuizzDeleteRequestFalled = '[Quizz] Quizz Request To Delete Falled',

    QuizzModifyRequested = '[Quizz] Quizz Requested To Modify',
    QuizzModified = '[Quizz] Quizz Modify',
    QuizzModifeRequestFalled = '[Quizz] Quizz Request To Modify Falled',
}

export class AllQuizzesRequested implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesRequested;
}

export class AllQuizzesReceived implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesReceived;

    constructor(public payload: {quizzes: Quizz[]}) {}
}

export class AllQuizzesRequestFalled implements Action {
    readonly type = QuizzesActionTypes.AllQuizzesRequestFalled;

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

export class QuizzPageRequestFalled implements Action {
    readonly type = QuizzesActionTypes.QuizzPageRequestFalled;

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

export class QuizzAddRequestFalled implements Action {
    readonly type = QuizzesActionTypes.QuizzAddRequestFalled;

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

export class QuizzDeleteRequestFalled implements Action {
    readonly type = QuizzesActionTypes.QuizzDeleteRequestFalled;

    constructor(public payload: {error: any}) {}
}


export type QuizzesActions =
    AllQuizzesRequested |
    AllQuizzesReceived |
    AllQuizzesRequestFalled |
    QuizzPageRequested |
    QuizzPageReceived |
    QuizzPageRequestFalled |
    QuizzAddRequested |
    QuizzAdded |
    QuizzAddRequestFalled |
    QuizzDeleteRequested |
    QuizzDeleted |
    QuizzDeleteRequestFalled;
