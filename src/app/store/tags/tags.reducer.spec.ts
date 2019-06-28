import { tagsReducer, initialState } from './tags.reducer';

describe('Tags Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = tagsReducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
