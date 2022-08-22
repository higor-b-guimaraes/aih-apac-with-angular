import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseSolicitacaoAlteracaoSenhaComponent } from './analise-solicitacao-alteracao-senha.component';

describe('AnaliseSolicitacaoAlteracaoSenhaComponent', () => {
  let component: AnaliseSolicitacaoAlteracaoSenhaComponent;
  let fixture: ComponentFixture<AnaliseSolicitacaoAlteracaoSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseSolicitacaoAlteracaoSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseSolicitacaoAlteracaoSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
