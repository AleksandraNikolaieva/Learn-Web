import { Action } from '@ngrx/store';
import { User } from 'src/app/core/models';

export enum UsersActionTypes {
    UsersRequested = '[Users] Users Requested',
    UsersReceived = '[Users]  Users Received',
    UsersRequestFailed = '[Users] Users Request Failed'
}

export class UsersRequested implements Action {
    readonly type = UsersActionTypes.UsersRequested;
}

export class UsersReceived implements Action {
    readonly type = UsersActionTypes.UsersReceived;

    constructor(public payload: {users: User[]}) {}
}

export class UsersRequestFailed implements Action {
    readonly type = UsersActionTypes.UsersRequestFailed;

    constructor(public payload: {error: any}) {}
}

export type UsersActions = UsersRequested | UsersReceived | UsersRequestFailed;
