import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAnaliseSolicitacaoAlteracaoSenhaComponent } from './tabela-analise-solicitacao-alteracao-senha.component';

describe('TabelaAnaliseSolicitacaoAlteracaoSenhaComponent', () => {
  let component: TabelaAnaliseSolicitacaoAlteracaoSenhaComponent;
  let fixture: ComponentFixture<TabelaAnaliseSolicitacaoAlteracaoSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaAnaliseSolicitacaoAlteracaoSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAnaliseSolicitacaoAlteracaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
