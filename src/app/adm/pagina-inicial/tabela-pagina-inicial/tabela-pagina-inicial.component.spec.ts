import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPaginaInicialComponent } from './tabela-pagina-inicial.component';

describe('TabelaPaginaInicialComponent', () => {
  let component: TabelaPaginaInicialComponent;
  let fixture: ComponentFixture<TabelaPaginaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaPaginaInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPaginaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
