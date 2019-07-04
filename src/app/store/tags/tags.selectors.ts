import { createFeatureSelector, createSelector} from '@ngrx/store';
import { TagsState } from './tags.reducer';
import * as fromTags from './tags.reducer';

export const selectTagsState = createFeatureSelector<fromTags.TagsState>('tags');

export const selectAllTags = createSelector(
    selectTagsState,
    fromTags.selectAll
);

export const selectTagsEntities = createSelector(
    selectTagsState,
    fromTags.selectEntities
);

