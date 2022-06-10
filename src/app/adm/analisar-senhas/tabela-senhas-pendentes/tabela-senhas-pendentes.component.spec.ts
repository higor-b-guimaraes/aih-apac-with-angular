import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSenhasPendentesComponent } from './tabela-senhas-pendentes.component';

describe('TabelaSenhasPendentesComponent', () => {
  let component: TabelaSenhasPendentesComponent;
  let fixture: ComponentFixture<TabelaSenhasPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaSenhasPendentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaSenhasPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
