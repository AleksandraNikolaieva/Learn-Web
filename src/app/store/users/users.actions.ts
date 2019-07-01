import { Action } from '@ngrx/store';
import { User } from 'src/app/core/models';

export enum UsersActionTypes {
    UsersRequested = '[Users] Users Requested',
    UsersReceived = '[Users]  Users Received',
    UsersRequestFalled = '[Users] Users Request Falled'
}

export class UsersRequested implements Action {
    readonly type = UsersActionTypes.UsersRequested;
}

export class UsersReceived implements Action {
    readonly type = UsersActionTypes.UsersReceived;

    constructor(public payload: {users: User[]}) {}
}

export class UsersRequestFalled implements Action {
    readonly type = UsersActionTypes.UsersRequestFalled;

    constructor(public payload: {error: any}) {}
}

export type UsersActions = UsersRequested | UsersReceived | UsersRequestFalled;
