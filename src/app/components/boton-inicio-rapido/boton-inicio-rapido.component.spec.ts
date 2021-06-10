import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonInicioRapidoComponent } from './boton-inicio-rapido.component';

describe('BotonInicioRapidoComponent', () => {
  let component: BotonInicioRapidoComponent;
  let fixture: ComponentFixture<BotonInicioRapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonInicioRapidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonInicioRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
