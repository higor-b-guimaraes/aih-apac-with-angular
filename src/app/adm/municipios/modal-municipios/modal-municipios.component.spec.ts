import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMunicipiosComponent } from './modal-municipios.component';

describe('ModalMunicipiosComponent', () => {
  let component: ModalMunicipiosComponent;
  let fixture: ComponentFixture<ModalMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMunicipiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
