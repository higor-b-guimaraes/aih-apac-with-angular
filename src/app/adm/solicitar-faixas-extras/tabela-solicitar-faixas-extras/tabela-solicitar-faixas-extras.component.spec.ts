import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSolicitarFaixasExtrasComponent } from './tabela-solicitar-faixas-extras.component';

describe('TabelaSolicitarFaixasExtrasComponent', () => {
  let component: TabelaSolicitarFaixasExtrasComponent;
  let fixture: ComponentFixture<TabelaSolicitarFaixasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaSolicitarFaixasExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaSolicitarFaixasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
