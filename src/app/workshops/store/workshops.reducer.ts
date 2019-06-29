import { WorkshopsActions, WorkshopsActionTypes } from './workshops.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from '../models';

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export interface WorkshopsState extends EntityState<Article> {
    activeCategory: string;
    page: Article | null;
}

export const initialState: WorkshopsState = adapter.getInitialState({
    activeCategory: 'all',
    page: null
});

export function workshopsReducer(state = initialState, action: WorkshopsActions): WorkshopsState {
    switch (action.type) {

        case WorkshopsActionTypes.WorkshopsReceived:
            return adapter.addAll(action.payload.workshops, state);
        case WorkshopsActionTypes.CategoryActivated:
            return {...state, activeCategory: action.payload.category};
        case WorkshopsActionTypes.WorkshopPageReceived:
            return {...state, page: action.payload.workshop};
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
