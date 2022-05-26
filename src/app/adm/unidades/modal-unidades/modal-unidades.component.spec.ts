import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnidadesComponent } from './modal-unidades.component';

describe('ModalUnidadesComponent', () => {
  let component: ModalUnidadesComponent;
  let fixture: ComponentFixture<ModalUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
