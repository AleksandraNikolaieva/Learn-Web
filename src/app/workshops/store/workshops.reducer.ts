import { Action } from '@ngrx/store';
import { WorkshopsActions, WorkshopsActionTypes } from './workshops.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from '../models';

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export interface WorkshopsState extends EntityState<Article> {}

export const initialState: WorkshopsState = adapter.getInitialState({});

export function workshopsReducer(state = initialState, action: WorkshopsActions): WorkshopsState {
    switch (action.type) {

        case WorkshopsActionTypes.WorkshopsReceived:
            return adapter.addAll(action.payload.workshops, state);

        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
