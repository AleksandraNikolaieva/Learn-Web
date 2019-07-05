import { Action } from '@ngrx/store';
import { Tag } from 'src/app/shared/models';

export enum TagsActionTypes {
    TagsRequested = '[Tags] Tags Requested',
    TagsReceived = '[Tags] Tags Received',
    TagsRequestFailed = '[Tags] Tags Request Failed',

    TagAddRequested = '[Tags] Tag Add Requested',
    TagAdded = '[Tags] Tag Added',
    TagAddFailed = '[Tags] Tag Add Request Failed'
}

export class TagsRequested implements Action {
    readonly type = TagsActionTypes.TagsRequested;
}

export class TagsReceived implements Action {
    readonly type = TagsActionTypes.TagsReceived;

    constructor(public payload: {tags: Tag[]}) {}
}

export class TagsRequestFailed implements Action {
    readonly type = TagsActionTypes.TagsRequestFailed;

    constructor(public payload: {error: any}) {}
}

export class TagAddRequested implements Action {
    readonly type = TagsActionTypes.TagAddRequested;

    constructor(public payload: {tagName: string}) {}
}

export class TagAdded implements Action {
    readonly type = TagsActionTypes.TagAdded;

    constructor(public payload: {tag: Tag}) {}
}
export class TagAddFailed implements Action {
    readonly type = TagsActionTypes.TagAddFailed;

    constructor(public payload: {error: any}) {}
}

export type TagsActions =
    TagsRequested |
    TagsReceived |
    TagsRequestFailed |
    TagAddRequested |
    TagAdded |
    TagAddFailed;
