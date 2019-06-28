import { createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTags from './tags.reducer';

export const selectTagsSate = createFeatureSelector<fromTags.TagsState>('tags');

export const selectAllTags = createSelector(
    selectTagsSate,
    fromTags.selectAll
);

export const selectEntitiesTags = createSelector(
    selectTagsSate,
    fromTags.selectEntities
); 
