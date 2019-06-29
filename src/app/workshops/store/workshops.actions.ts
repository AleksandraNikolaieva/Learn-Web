import { Action } from '@ngrx/store';
import { Article, WorkshopsParams } from '../models';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Workshops Requested',
    WorkshopsReceived = '[Workshops] Workshops Successfully Loaded',
    WorkshopsRequestFalled = '[Workshops] Workshops Loading Falled',

    CategoryActivated = '[Workshops] Category Activated',

    WorkshopPageRequested = '[Workshops] Workshop Page Requested',
    WorkshopPageReceived = '[Workshops] Workshop Page Received',
    WorkshopPageRequestFalled = '[Workshops] Workshop Page Request Falled'
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

export class CategoryActivated implements Action {
    readonly type = WorkshopsActionTypes.CategoryActivated;

    constructor(public payload: {category: string}) {}
}

export class WorkshopPageRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopPageRequested;

    constructor(public payload: {pageId: string}) {}
}

export class WorkshopPageReceived implements Action {
    readonly type = WorkshopsActionTypes.WorkshopPageReceived;

    constructor(public payload: {workshop: Article}) {}
}

export class WorkshopPageRequestFalled implements Action {
    readonly type = WorkshopsActionTypes.WorkshopPageRequestFalled;

    constructor(public payload: {error: any}) {}
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsReceived |
    WorkshopsRequestFalled |
    CategoryActivated |
    WorkshopPageRequested |
    WorkshopPageReceived |
    WorkshopPageRequestFalled;
