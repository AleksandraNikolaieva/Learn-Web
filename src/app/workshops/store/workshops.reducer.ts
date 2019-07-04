import { WorkshopsActions, WorkshopsActionTypes } from './workshops.actions';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Article } from '../models';

export function sortByDate(a: Article, b: Article): number {
    return a.updatedAt < b.updatedAt ? 1 : -1;
}

export const adapter: EntityAdapter<Article> = createEntityAdapter<Article>({
    sortComparer: sortByDate
});

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
        case WorkshopsActionTypes.WorkhsopAdded:
            return adapter.addOne(action.payload.workshop, state);
        case WorkshopsActionTypes.WorkshopDeleted:
            return adapter.removeOne(action.payload.id, state);
        case WorkshopsActionTypes.WorkshopEdited:
            return adapter.updateOne(action.payload.workshop, state);
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
