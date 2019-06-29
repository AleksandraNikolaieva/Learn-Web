import { createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersSate = createFeatureSelector<fromUsers.UsersState>('users');

export const selectAllUsers = createSelector(
    selectUsersSate,
    fromUsers.selectAll
);

export const selectUsersEntities = createSelector(
    selectUsersSate,
    fromUsers.selectEntities
);

