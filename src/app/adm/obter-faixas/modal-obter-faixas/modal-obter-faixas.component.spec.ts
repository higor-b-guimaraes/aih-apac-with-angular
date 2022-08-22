import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObterFaixasComponent } from './modal-obter-faixas.component';

describe('ModalObterFaixasComponent', () => {
  let component: ModalObterFaixasComponent;
  let fixture: ComponentFixture<ModalObterFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalObterFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalObterFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
