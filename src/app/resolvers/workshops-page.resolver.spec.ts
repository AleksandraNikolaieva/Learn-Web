import { TestBed } from '@angular/core/testing';

import { WorkshopsPageResolver } from './workshops-page.resolver';

describe('WorkshopsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkshopsPageResolver = TestBed.get(WorkshopsPageResolver);
    expect(service).toBeTruthy();
  });
});
