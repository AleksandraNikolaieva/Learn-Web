import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { QuizzesEffects } from './quizzes.effects';

describe('QuizzesEffects', () => {
    let actions$: Observable<any>;
    let effects: QuizzesEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                QuizzesEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(QuizzesEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
