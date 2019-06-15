import { TestBed } from '@angular/core/testing';

import { WorkshopCommentResolver } from './workshop-comment.resolver';

describe('WorkshopCommentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: WorkshopCommentResolver = TestBed.get(WorkshopCommentResolver);
        expect(service).toBeTruthy();
    });
});
