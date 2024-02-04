import { TestBed } from '@angular/core/testing';

import { AfspraakService } from './afspraak.service';

describe('AfspraakService', () => {
  let service: AfspraakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfspraakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
