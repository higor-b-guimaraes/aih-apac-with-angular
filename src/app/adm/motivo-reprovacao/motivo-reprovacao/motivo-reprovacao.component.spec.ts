import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoReprovacaoComponent } from './motivo-reprovacao.component';

describe('MotivoReprovacaoComponent', () => {
  let component: MotivoReprovacaoComponent;
  let fixture: ComponentFixture<MotivoReprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivoReprovacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoReprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
