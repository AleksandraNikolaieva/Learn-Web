import { WorkshopsActions, WorkshopsActionTypes } from './workshops.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from '../models';

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>();

export interface WorkshopsState extends EntityState<Article> {
    activeCategory: string;
    activeTags: string;
    page: Article | null;
    isLoaded: boolean;
}

export const initialState: WorkshopsState = adapter.getInitialState({
    activeCategory: 'all',
    activeTags: null,
    page: null,
    isLoaded: false
});

export function workshopsReducer(state = initialState, action: WorkshopsActions): WorkshopsState {
    switch (action.type) {

        case WorkshopsActionTypes.WorkshopsReceived:
            return adapter.addAll(action.payload.workshops, {...state, isLoaded: true});
        case WorkshopsActionTypes.CategoryActivated:
            return {...state, activeCategory: action.payload.category};
        case WorkshopsActionTypes.TagsActivated:
            return {...state, activeTags : action.payload.tags};
        case WorkshopsActionTypes.WorkshopPageReceived:
            return {...state, page: action.payload.workshop};
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
