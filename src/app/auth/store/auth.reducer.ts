import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthData } from '../models';

export interface AuthState {
    isLogged: boolean;
    authData: Partial<AuthData> | null;
}

export const initialState: AuthState = {
    isLogged: false,
    authData: null
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {

        case AuthActionTypes.SignedIn:
            return {
                ...state,
                isLogged: true,
                authData: action.payload.authData
            };

        case AuthActionTypes.SignedOut:
            return {
                ...state,
                isLogged: false,
                authData: null
            };
        case AuthActionTypes.UserInfoUpdated:
            return {
                ...state,
                authData: {...state.authData, ...action.payload.updatedInfo}
            };
        default:
            return state;
    }
}
