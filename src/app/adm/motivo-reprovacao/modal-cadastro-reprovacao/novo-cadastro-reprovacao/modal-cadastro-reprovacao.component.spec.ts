import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroReprovacaoComponent } from './modal-cadastro-reprovacao.component';

describe('ModalCadastroReprovacaoComponent', () => {
  let component: ModalCadastroReprovacaoComponent;
  let fixture: ComponentFixture<ModalCadastroReprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastroReprovacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastroReprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
