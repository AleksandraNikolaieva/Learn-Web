import { TestBed } from '@angular/core/testing';

import { WorkshopsPageService } from './workshops-page.service';

describe('WorkshopsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkshopsPageService = TestBed.get(WorkshopsPageService);
    expect(service).toBeTruthy();
  });
});
