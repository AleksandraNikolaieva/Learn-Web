import { Action } from '@ngrx/store';
import { Article, WorkshopsFeedParams } from '../models';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Workshops Requested',
    WorkshopsReceived = '[Workshops] Workshops Successfully Loaded',
    WorkshopsRequestFalled = '[Workshops] Workshops Loading Falled',

    CategoryActivated = '[Workshops] Category Activated',

    TagsActivated = '[Tags] Tags Activated',

    WorkshopPageRequested = '[Workshops] Workshop Page Requested',
    WorkshopPageReceived = '[Workshops] Workshop Page Received',
    WorkshopPageRequestFalled = '[Workshops] Workshop Page Request Falled'
}

export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;

    constructor(public payload: {params: WorkshopsFeedParams}) {}
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

export class TagsActivated implements Action {
    readonly type = WorkshopsActionTypes.TagsActivated;

    constructor(public payload: {tags: string}) {}
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsReceived |
    WorkshopsRequestFalled |
    CategoryActivated |
    TagsActivated |
    WorkshopPageRequested |
    WorkshopPageReceived |
    WorkshopPageRequestFalled;
