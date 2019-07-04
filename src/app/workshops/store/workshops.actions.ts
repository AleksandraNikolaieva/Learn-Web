import { Action } from '@ngrx/store';
import { Article, WorkshopsFeedParams, WorkshopData } from '../models';
import { Update } from '@ngrx/entity';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Workshops Requested',
    WorkshopsReceived = '[Workshops] Workshops Successfully Loaded',
    WorkshopsRequestFalled = '[Workshops] Workshops Loading Falled',

    CategoryActivated = '[Workshops] Category Activated',

    TagsActivated = '[Workshops] Tags Activated',

    PageActivated = '[Workshops] Page Activated',

    WorkshopPageRequested = '[Workshops] Workshop Page Requested',
    WorkshopPageReceived = '[Workshops] Workshop Page Received',
    WorkshopPageRequestFalled = '[Workshops] Workshop Page Request Falled',

    WorkshopAddRequested = '[Workshops] Workshop Add Requested',
    WorkhsopAdded = '[Workshops] Workshop Added ',
    WorkshopAddFalled = '[Workshops] Workshop Add Requested Falled',

    WorkshopDeleteRequested = '[Workshops] Workshop Delete Requested',
    WorkshopDeleted = '[Workshops] Workshop Deleted',
    WorkshopDeleteFalled = '[Workshops] Workshop Deleted Falled',

    WorkshopEditRequested = '[Workshops] Workshop Edit Requested',
    WorkshopEdited = '[Workshops] Workshop Edited',
    WorkshopEditFalled = '[Workshops] Workshop Edit Request Falled'
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

export class WorkshopAddRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopAddRequested;

    constructor(public payload: {workshopData: WorkshopData}) {}
}

export class WorkhsopAdded implements Action {
    readonly type = WorkshopsActionTypes.WorkhsopAdded;

    constructor(public payload: {workshop: Article}) {}
}

export class WorkshopAddFalled implements Action {
    readonly type = WorkshopsActionTypes.WorkshopAddFalled;

    constructor(public payload: {error: any}) {}
}

export class WorkshopEditRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopEditRequested;

    constructor(public payload: {id: string, workshopData: WorkshopData}) {}
}

export class WorkshopEdited implements Action {
    readonly type = WorkshopsActionTypes.WorkshopEdited;

    constructor(public payload: {workshop: Update<Article>}) {}
}

export class WorkshopEditFalled implements Action {
    readonly type = WorkshopsActionTypes.WorkshopEditFalled;

    constructor(public payload: {error: any}) {}
}

export class WorkshopDeleteRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleteRequested;

    constructor(public payload: {id: string}) {}
}

export class WorkshopDeleted implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleted;

    constructor(public payload: {id: string}) {}
}

export class WorkshopDeleteFalled implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleteFalled;

    constructor(public payload: {error: any}) {}
}

export class PageActivated implements Action {
    readonly type = WorkshopsActionTypes.PageActivated;

    constructor(public payload: {pageNumber: number}) {}
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsReceived |
    WorkshopsRequestFalled |
    CategoryActivated |
    TagsActivated |
    WorkshopPageRequested |
    WorkshopPageReceived |
    WorkshopPageRequestFalled |
    WorkshopAddRequested |
    WorkhsopAdded |
    WorkshopAddFalled |
    WorkshopEditRequested |
    WorkshopEdited |
    WorkshopEditFalled |
    WorkshopDeleteRequested |
    WorkshopDeleted |
    WorkshopDeleteFalled |
    PageActivated;
