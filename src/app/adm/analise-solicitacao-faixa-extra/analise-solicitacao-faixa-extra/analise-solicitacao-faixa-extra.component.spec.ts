import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseSolicitacaoFaixaExtraComponent } from './analise-solicitacao-faixa-extra.component';

describe('AnaliseSolicitacaoFaixaExtraComponent', () => {
  let component: AnaliseSolicitacaoFaixaExtraComponent;
  let fixture: ComponentFixture<AnaliseSolicitacaoFaixaExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseSolicitacaoFaixaExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaliseSolicitacaoFaixaExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
