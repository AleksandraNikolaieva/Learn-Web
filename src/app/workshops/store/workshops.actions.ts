import { Action } from '@ngrx/store';
import { Article, WorkshopsParams } from '../models';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Workshops Requested',
    WorkshopsReceived = '[Workshops] Workshops Successfully Loaded',
    WorkshopsRequestFalled = '[Workshops] Workshops Loading Falled',

/*     TagsRequested = '[Workshops] Tags Requested',
    TagsReceived = '[Workshops] Tags Received Successfully',
    TagsRequestFalled = '[Workshops] Tags Request Falled',

    UsersRequested = '[Workshops] Users Requested',
    UserReceived = '[Workshops] Users Received Successfully',
    UserRequestFalled = '[Workshops] Users Request Falled', */
}

export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;

    constructor(public payload: {params: WorkshopsParams}) {}
}

export class WorkshopsReceived implements Action {
    readonly type  = WorkshopsActionTypes.WorkshopsReceived;

    constructor(public payload: {workshops: Article[]}) {}
}

export class WorkshopsRequestFalled implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequestFalled;

    constructor(public payload: {error: any}) {}
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsReceived |
    WorkshopsRequestFalled;
