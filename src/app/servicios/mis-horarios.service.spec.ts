import { TestBed } from '@angular/core/testing';

import { MisHorariosService } from './mis-horarios.service';

describe('MisHorariosService', () => {
  let service: MisHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
