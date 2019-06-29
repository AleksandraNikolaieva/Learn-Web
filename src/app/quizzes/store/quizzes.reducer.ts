import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Quizz } from '../models';
import { QuizzesActions, QuizzesActionTypes } from './quizzes.actions';

/* export function selectQuizzId(item: Quizz): string {
    return item.id;
} */

export const adapter: EntityAdapter<Quizz> = createEntityAdapter<Quizz>();

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
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
