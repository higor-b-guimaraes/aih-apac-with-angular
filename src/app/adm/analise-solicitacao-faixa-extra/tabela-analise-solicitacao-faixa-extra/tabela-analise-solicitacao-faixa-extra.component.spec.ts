import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAnaliseSolicitacaoFaixaExtraComponent } from './tabela-analise-solicitacao-faixa-extra.component';

describe('TabelaAnaliseSolicitacaoFaixaExtraComponent', () => {
  let component: TabelaAnaliseSolicitacaoFaixaExtraComponent;
  let fixture: ComponentFixture<TabelaAnaliseSolicitacaoFaixaExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaAnaliseSolicitacaoFaixaExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAnaliseSolicitacaoFaixaExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
