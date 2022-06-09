import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaFaixasPendentesComponent } from './tabela-faixas-pendentes.component';

describe('TabelaFaixasPendentesComponent', () => {
  let component: TabelaFaixasPendentesComponent;
  let fixture: ComponentFixture<TabelaFaixasPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaFaixasPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaFaixasPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
