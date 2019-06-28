import { createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWorkshops from './workshops.reducer';

export const selectWorkshopsSate = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsSate,
    fromWorkshops.selectAll
);


