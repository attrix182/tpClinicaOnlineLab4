import { TestBed } from '@angular/core/testing';

import { MisTurnosService } from './mis-turnos.service';

describe('MisTurnosService', () => {
  let service: MisTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
