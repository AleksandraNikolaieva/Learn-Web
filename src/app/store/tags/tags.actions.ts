import { Action } from '@ngrx/store';
import { Tag } from 'src/app/shared/models';

export enum TagsActionTypes {
    TagsRequested = '[Tags] Tags Requested',
    TagsReceived = '[Tags] Tags Received',
    TagsRequestFalled = '[Tags] Tags Request Falled',

    TagsActivated = '[Tags] Tags Activated'
}

export class TagsRequested implements Action {
    readonly type = TagsActionTypes.TagsRequested;
}

export class TagsReceived implements Action {
    readonly type = TagsActionTypes.TagsReceived;

    constructor(public payload: {tags: Tag[]}) {}
}

export class TagsRequestFalled implements Action {
    readonly type = TagsActionTypes.TagsRequestFalled;

    constructor(public payload: {error: any}) {}
}

export class TagsActivated implements Action {
    readonly type = TagsActionTypes.TagsActivated;

    constructor(public payload: {tags: string}) {}
}

export type TagsActions =
    TagsRequested |
    TagsReceived |
    TagsRequestFalled |
    TagsActivated;
