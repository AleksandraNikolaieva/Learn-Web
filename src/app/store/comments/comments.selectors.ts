import { createFeatureSelector, createSelector} from '@ngrx/store';
import { CommentsState } from './comments.reducer';
import * as fromComments from './comments.reducer';

export const selectCommentsSate = createFeatureSelector<fromComments.CommentsState>('comments');

export const selectCurrentComments = createSelector(
    selectCommentsSate,
    fromComments.selectAll
);

