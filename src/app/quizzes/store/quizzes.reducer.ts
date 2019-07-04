import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Quizz } from '../models';
import { QuizzesActions, QuizzesActionTypes } from './quizzes.actions';

export function sortByDate(a: Quizz, b: Quizz): number {
    return a.createdAt < b.createdAt ? 1 : -1;
}

export const adapter: EntityAdapter<Quizz> = createEntityAdapter<Quizz>({
    sortComparer: sortByDate
});

export interface QuizzesState extends EntityState<Quizz> {
    currentQuizzPage: Quizz | null;
}

export const initialState: QuizzesState = adapter.getInitialState({
    currentQuizzPage: null
});

export function quizzesReducer(state = initialState, action: QuizzesActions): QuizzesState {
    switch (action.type) {

        case QuizzesActionTypes.AllQuizzesReceived:
            return adapter.addAll(action.payload.quizzes, state);
        case QuizzesActionTypes.QuizzPageReceived:
            return {...state, currentQuizzPage: action.payload.quizz};
        case QuizzesActionTypes.QuizzAdded:
            return adapter.addOne(action.payload.quizz, state);
        case QuizzesActionTypes.QuizzModified:
            return adapter.updateOne(action.payload.quizz, state);
        case QuizzesActionTypes.QuizzDeleted:
            return adapter.removeOne(action.payload.quizzId, state);
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
