import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaixasComponent } from './faixas.component';

describe('FaixasComponent', () => {
  let component: FaixasComponent;
  let fixture: ComponentFixture<FaixasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaixasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
