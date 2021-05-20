import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosAdminComponent } from './registros-admin.component';

describe('RegistrosAdminComponent', () => {
  let component: RegistrosAdminComponent;
  let fixture: ComponentFixture<RegistrosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
