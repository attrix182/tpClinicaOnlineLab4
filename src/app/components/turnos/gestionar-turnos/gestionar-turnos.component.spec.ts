import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTurnosComponent } from './gestionar-turnos.component';

describe('GestionarTurnosComponent', () => {
  let component: GestionarTurnosComponent;
  let fixture: ComponentFixture<GestionarTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
