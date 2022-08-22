import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMotivoReprovacaoComponent } from './tabela-motivo-reprovacao.component';

describe('TabelaMotivoReprovacaoComponent', () => {
  let component: TabelaMotivoReprovacaoComponent;
  let fixture: ComponentFixture<TabelaMotivoReprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaMotivoReprovacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMotivoReprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
