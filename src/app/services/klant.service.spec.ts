import { TestBed } from '@angular/core/testing';

import { KlantService } from './klant.service';

describe('KlantService', () => {
  let service: KlantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
