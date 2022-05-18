import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisarFaixasComponent } from './analisar-faixas.component';

describe('AnalisarFaixasComponent', () => {
  let component: AnalisarFaixasComponent;
  let fixture: ComponentFixture<AnalisarFaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisarFaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisarFaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
