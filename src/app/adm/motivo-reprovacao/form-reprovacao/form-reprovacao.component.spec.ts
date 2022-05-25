import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReprovacaoComponent } from './form-reprovacao.component';

describe('FormReprovacaoComponent', () => {
  let component: FormReprovacaoComponent;
  let fixture: ComponentFixture<FormReprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReprovacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
