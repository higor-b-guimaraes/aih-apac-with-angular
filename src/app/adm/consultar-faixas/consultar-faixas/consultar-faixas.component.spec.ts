import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarFaixasComponent } from './consultar-faixas.component';

describe('ConsultarFaixasComponent', () => {
  let component: ConsultarFaixasComponent;
  let fixture: ComponentFixture<ConsultarFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
