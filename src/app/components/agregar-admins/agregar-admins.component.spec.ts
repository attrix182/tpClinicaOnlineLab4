import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAdminsComponent } from './agregar-admins.component';

describe('AgregarAdminsComponent', () => {
  let component: AgregarAdminsComponent;
  let fixture: ComponentFixture<AgregarAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
