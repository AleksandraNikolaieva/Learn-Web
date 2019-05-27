import { TestBed } from '@angular/core/testing';

import { WorkshopsFeedResolver } from './workshops-feed.resolver';

describe('WorkshopsFeedResolver', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: WorkshopsFeedResolver = TestBed.get(WorkshopsFeedResolver);
        expect(service).toBeTruthy();
    });
});
