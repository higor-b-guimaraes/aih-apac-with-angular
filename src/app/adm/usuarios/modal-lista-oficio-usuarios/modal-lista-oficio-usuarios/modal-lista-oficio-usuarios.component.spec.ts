import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListaOficioUsuariosComponent } from './modal-lista-oficio-usuarios.component';

describe('ModalListaOficioUsuariosComponent', () => {
  let component: ModalListaOficioUsuariosComponent;
  let fixture: ComponentFixture<ModalListaOficioUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalListaOficioUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListaOficioUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
