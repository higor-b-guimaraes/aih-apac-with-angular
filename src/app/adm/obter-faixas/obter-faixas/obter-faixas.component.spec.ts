import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObterFaixasComponent } from './obter-faixas.component';

describe('ObterFaixasComponent', () => {
  let component: ObterFaixasComponent;
  let fixture: ComponentFixture<ObterFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObterFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObterFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
