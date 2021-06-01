import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarTurnoComponent } from './sacar-turno.component';

describe('SacarTurnoComponent', () => {
  let component: SacarTurnoComponent;
  let fixture: ComponentFixture<SacarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SacarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
