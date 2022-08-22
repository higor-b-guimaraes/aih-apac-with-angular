import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaObterFaixasComponent } from './tabela-obter-faixas.component';

describe('TabelaObterFaixasComponent', () => {
  let component: TabelaObterFaixasComponent;
  let fixture: ComponentFixture<TabelaObterFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaObterFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaObterFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
