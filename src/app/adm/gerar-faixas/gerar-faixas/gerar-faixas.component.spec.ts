import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarFaixasComponent } from './gerar-faixas.component';

describe('GerarFaixasComponent', () => {
  let component: GerarFaixasComponent;
  let fixture: ComponentFixture<GerarFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerarFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerarFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
