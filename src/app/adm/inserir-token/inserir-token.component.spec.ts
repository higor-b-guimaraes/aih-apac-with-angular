import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirTokenComponent } from './inserir-token.component';

describe('InserirTokenComponent', () => {
  let component: InserirTokenComponent;
  let fixture: ComponentFixture<InserirTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
