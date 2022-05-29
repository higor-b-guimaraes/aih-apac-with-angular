import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaUnidadesComponent } from './tabela-unidades.component';

describe('TabelaUnidadesComponent', () => {
  let component: TabelaUnidadesComponent;
  let fixture: ComponentFixture<TabelaUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
