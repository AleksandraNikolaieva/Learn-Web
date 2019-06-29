import { commentsReducer, initialState } from './comments.reducer';

describe('Comments Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = commentsReducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
