import { Action } from '@ngrx/store';
import { Article, WorkshopsFeedParams, WorkshopData } from '../models';
import { Update } from '@ngrx/entity';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Workshops Requested',
    WorkshopsReceived = '[Workshops] Workshops Successfully Loaded',
    WorkshopsRequestFailed = '[Workshops] Workshops Loading Failed',

    CategoryActivated = '[Workshops] Category Activated',

    TagsActivated = '[Workshops] Tags Activated',

    PageActivated = '[Workshops] Page Activated',

    WorkshopPageRequested = '[Workshops] Workshop Page Requested',
    WorkshopPageReceived = '[Workshops] Workshop Page Received',
    WorkshopPageRequestFailed = '[Workshops] Workshop Page Request Failed',

    WorkshopAddRequested = '[Workshops] Workshop Add Requested',
    WorkhsopAdded = '[Workshops] Workshop Added ',
    WorkshopAddFailed = '[Workshops] Workshop Add Requested Failed',

    WorkshopDeleteRequested = '[Workshops] Workshop Delete Requested',
    WorkshopDeleted = '[Workshops] Workshop Deleted',
    WorkshopDeleteFailed = '[Workshops] Workshop Deleted Failed',

    WorkshopEditRequested = '[Workshops] Workshop Edit Requested',
    WorkshopEdited = '[Workshops] Workshop Edited',
    WorkshopEditFailed = '[Workshops] Workshop Edit Request Failed'
}

export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;

    constructor(public payload: {params: WorkshopsFeedParams}) {}
}

export class WorkshopsReceived implements Action {
    readonly type  = WorkshopsActionTypes.WorkshopsReceived;

    constructor(public payload: {workshops: Article[]}) {}
}

export class WorkshopsRequestFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequestFailed;

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

export class WorkshopPageRequestFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopPageRequestFailed;

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

export class WorkshopAddFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopAddFailed;

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

export class WorkshopEditFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopEditFailed;

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

export class WorkshopDeleteFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleteFailed;

    constructor(public payload: {error: any}) {}
}

export class PageActivated implements Action {
    readonly type = WorkshopsActionTypes.PageActivated;

    constructor(public payload: {pageNumber: number}) {}
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsReceived |
    WorkshopsRequestFailed |
    CategoryActivated |
    TagsActivated |
    WorkshopPageRequested |
    WorkshopPageReceived |
    WorkshopPageRequestFailed |
    WorkshopAddRequested |
    WorkhsopAdded |
    WorkshopAddFailed |
    WorkshopEditRequested |
    WorkshopEdited |
    WorkshopEditFailed |
    WorkshopDeleteRequested |
    WorkshopDeleted |
    WorkshopDeleteFailed |
    PageActivated;
