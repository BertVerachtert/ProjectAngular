import { TestBed } from '@angular/core/testing';

import { LijstService } from './lijst.service';

describe('LijstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LijstService = TestBed.get(LijstService);
    expect(service).toBeTruthy();
  });
});
