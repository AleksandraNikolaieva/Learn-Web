import { Action } from '@ngrx/store';
import { Credentials, AuthData } from '../models';
import { User, UserParams } from 'src/app/core/models';

export enum AuthActionTypes {
    SignInRequested = '[Auth] Tried To Sign In',
    SignedIn = '[Auth] Sign In Successfully',
    SignInFalled = '[Auth] Sign In Falled',

    SignUpRequested = '[Auth] Tried To Sign Up',
    SignUpFalled = '[Auth] Sign Up Falled',

    CurrentUserRequested = '[Auth] Request Current User',
    CurrentUserRequestFalled = '[Auth] Current User Request Falled',

    SignedOut = '[Auth] Signed Out',

    ChangeUserInfoRequested = '[Auth] Tried To Change User Info',
    UserInfoUpdated = '[Auth] User Info Updated Successfully',
    ChangeUserInfoFalled = '[Auth] Info Change Falled'
}

export class SignInRequested implements Action {
    readonly type = AuthActionTypes.SignInRequested;

    constructor(public payload: {credentials: Credentials, redirectTo?: string}) {}
}

export class SignedIn implements Action {
    readonly type = AuthActionTypes.SignedIn;

    constructor(public payload: {authData: Partial<AuthData>}) {}
}

export class SignInFalled implements Action {
    readonly type = AuthActionTypes.SignInFalled;

    constructor(public payload: {error: any}) {}
}

export class SignedOut implements Action {
    readonly type = AuthActionTypes.SignedOut;
}

export class SignUpRequested implements Action {
    readonly type = AuthActionTypes.SignUpRequested;

    constructor(public payload: {credentials: Credentials}) {}
}

export class SignUpFalled implements Action {
    readonly type = AuthActionTypes.SignUpFalled;

    constructor(public payload: {error: any}) {}
}

export class CurrentUserRequested implements Action {
    readonly type = AuthActionTypes.CurrentUserRequested;
}

export class CurrentUserRequestFalled implements Action {
    readonly type = AuthActionTypes.CurrentUserRequestFalled;

    constructor(public payload: {error: any}) {}
}

export class ChangeUserInfoRequested implements Action {
    readonly type = AuthActionTypes.ChangeUserInfoRequested;

    constructor(public payload: {newInfo: UserParams, id: string}) {}
}

export class UserInfoUpdated implements Action {
    readonly type = AuthActionTypes.UserInfoUpdated;

    constructor(public payload: {updatedInfo: User}) {}
}

export class ChangeUserInfoFalled implements Action {
    readonly type = AuthActionTypes.ChangeUserInfoFalled;

    constructor(public payload: {error: any}) {}
}

export type AuthActions =
    SignInRequested |
    SignedIn |
    SignInFalled |
    SignedOut |
    SignUpRequested |
    SignUpFalled |
    ChangeUserInfoRequested |
    UserInfoUpdated |
    ChangeUserInfoFalled;
