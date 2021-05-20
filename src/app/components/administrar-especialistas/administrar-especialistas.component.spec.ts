import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEspecialistasComponent } from './administrar-especialistas.component';

describe('AdministrarEspecialistasComponent', () => {
  let component: AdministrarEspecialistasComponent;
  let fixture: ComponentFixture<AdministrarEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarEspecialistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
