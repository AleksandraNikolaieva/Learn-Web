import { Action } from '@ngrx/store';
import { Credentials, AuthData } from '../models';
import { User } from 'src/app/core/models';

export enum AuthActionTypes {
    SignInRequested = '[Auth] Tried To Sign In',
    SignedIn = '[Auth] Sign In Successfully',
    SignInFalled = '[Auth] Sign In Falled',

    SignedOut = '[Auth] Signed Out',

    ChangeLoggedUserInfo = '[Auth] Changed logged user info'
}

export class SignInRequested implements Action {
    readonly type = AuthActionTypes.SignInRequested;

    constructor(public payload: {credentials: Credentials, redirectTo?: string}) {}
}

export class SignedIn implements Action {
    readonly type = AuthActionTypes.SignedIn;

    constructor(public payload: {authData: AuthData}) {}
}

export class SignInFalled implements Action {
    readonly type = AuthActionTypes.SignInFalled;

    constructor(public payload: {error: any}) {}
}

export class SignedOut implements Action {
    readonly type = AuthActionTypes.SignedOut;
}

export class ChangeAuthData implements Action {
    readonly type = AuthActionTypes.ChangeLoggedUserInfo;

    constructor(public payload: {newInfo: AuthData}) {}
}

export type AuthActions = SignInRequested | SignedIn | SignInFalled | SignedOut | ChangeAuthData;
