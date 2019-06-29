import { createFeatureSelector, createSelector} from '@ngrx/store';
import { WorkshopsState } from './workshops.reducer';
import * as fromWorkshops from './workshops.reducer';

export const selectWorkshopsSate = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsSate,
    fromWorkshops.selectAll
);

export const selectActiveCategory = createSelector(
    selectWorkshopsSate,
    (state: WorkshopsState) => state.activeCategory
);

export const selectWorkshopPage = createSelector(
    selectWorkshopsSate,
    (state: WorkshopsState) => state.page
);


