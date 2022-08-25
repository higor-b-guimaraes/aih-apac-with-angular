import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent } from './modal-negar-analise-solicitacao-alteracao-senha.component';

describe('ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent', () => {
  let component: ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent;
  let fixture: ComponentFixture<ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNegarAnaliseSolicitacaoAlteracaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
