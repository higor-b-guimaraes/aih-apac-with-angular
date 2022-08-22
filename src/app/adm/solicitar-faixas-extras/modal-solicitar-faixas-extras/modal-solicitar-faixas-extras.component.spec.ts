import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitarFaixasExtrasComponent } from './modal-solicitar-faixas-extras.component';

describe('ModalSolicitarFaixasExtrasComponent', () => {
  let component: ModalSolicitarFaixasExtrasComponent;
  let fixture: ComponentFixture<ModalSolicitarFaixasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitarFaixasExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitarFaixasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
