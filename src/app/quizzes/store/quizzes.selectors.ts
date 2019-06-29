import { createFeatureSelector, createSelector} from '@ngrx/store';
import { QuizzesState } from './quizzes.reducer';
import * as fromQuizzes from './quizzes.reducer';

export const selectQuizzesSate = createFeatureSelector<fromQuizzes.QuizzesState>('quizzes');

export const selectAllQuizzes = createSelector(
    selectQuizzesSate,
    fromQuizzes.selectAll
);

export const selectPageQuizz = createSelector (
    selectQuizzesSate,
    (state: QuizzesState) => state.currentQuizzPage
);
