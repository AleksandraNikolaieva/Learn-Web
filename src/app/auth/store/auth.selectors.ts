import { createFeatureSelector, createSelector} from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthData } from '../models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

/* export const selectAuthenticated  = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLogged
); */

export const selectAuthData = createSelector(
    selectAuthState,
    (state: AuthState) => state.authData
);

/* export const selectAuthenticationToken = createSelector(
    selectAuthData,
    (authData: AuthData | null) => authData ? authData.token : null
); */
