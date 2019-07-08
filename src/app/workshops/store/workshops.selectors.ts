import { createFeatureSelector, createSelector} from '@ngrx/store';
import { WorkshopsState } from './workshops.reducer';
import * as fromWorkshops from './workshops.reducer';

export const selectWorkshopsState = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsState,
    fromWorkshops.selectAll
);

export const selectActiveCategory = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.activeCategory
);

export const selectWorkshopPage = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.page
);

export const selectWorshopsLoadedMark = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.isLoaded
);

export const selectActiveTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.activeTags
);

export const selectTotalWorkshops = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.totalWorkshops
);


