import { TestBed } from '@angular/core/testing';

import { TagsResolver } from './tags.resolver';

describe('TagsResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagsResolver = TestBed.get(TagsResolver);
    expect(service).toBeTruthy();
  });
});
