import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNegarAnaliseSolicitacaoFaixaExtraComponent } from './modal-negar-analise-solicitacao-faixa-extra.component';

describe('ModalNegarAnaliseSolicitacaoFaixaExtraComponent', () => {
  let component: ModalNegarAnaliseSolicitacaoFaixaExtraComponent;
  let fixture: ComponentFixture<ModalNegarAnaliseSolicitacaoFaixaExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNegarAnaliseSolicitacaoFaixaExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNegarAnaliseSolicitacaoFaixaExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
