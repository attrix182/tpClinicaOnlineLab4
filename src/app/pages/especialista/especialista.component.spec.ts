import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaComponent } from './especialista.component';

describe('EspecialistaComponent', () => {
  let component: EspecialistaComponent;
  let fixture: ComponentFixture<EspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
