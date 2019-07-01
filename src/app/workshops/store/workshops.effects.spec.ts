import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WorkshopsEffects } from './workshops.effects';

describe('WorkshopsEffects', () => {
    let actions$: Observable<any>;
    let effects: WorkshopsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                WorkshopsEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get(WorkshopsEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
