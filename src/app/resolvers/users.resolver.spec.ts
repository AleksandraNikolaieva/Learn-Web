import { TestBed } from '@angular/core/testing';

import { UsersResolver } from './users.resolver';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersResolver = TestBed.get(UsersResolver);
    expect(service).toBeTruthy();
  });
});
