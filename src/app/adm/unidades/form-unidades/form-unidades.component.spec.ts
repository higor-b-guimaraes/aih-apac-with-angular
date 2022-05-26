import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnidadesComponent } from './form-unidades.component';

describe('FormUnidadesComponent', () => {
  let component: FormUnidadesComponent;
  let fixture: ComponentFixture<FormUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
