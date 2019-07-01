import { UsersActions, UsersActionTypes } from './users.actions';
import { User } from 'src/app/core/models';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface UsersState extends EntityState<User> {}

export const initialState: UsersState = adapter.getInitialState({});

export function usersReducer(state = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case UsersActionTypes.UsersReceived:
            return adapter.addAll(action.payload.users, state);

        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities
} = adapter.getSelectors();
