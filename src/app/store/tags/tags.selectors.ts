import { createFeatureSelector, createSelector} from '@ngrx/store';
import { TagsState } from './tags.reducer';
import * as fromTags from './tags.reducer';

export const selectTagsSate = createFeatureSelector<fromTags.TagsState>('tags');

export const selectAllTags = createSelector(
    selectTagsSate,
    fromTags.selectAll
);

export const selectTagsEntities = createSelector(
    selectTagsSate,
    fromTags.selectEntities
);

export const selectActiveTags = createSelector(
    selectTagsSate,
    (state: TagsState) => state.activeTags
);

