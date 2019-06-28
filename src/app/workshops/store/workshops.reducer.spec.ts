import { workshopsReducer, initialState } from './workshops.reducer';

describe('Workshops Reducer', () => {
    describe('an unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = workshopsReducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
