import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisarSenhasComponent } from './analisar-senhas.component';

describe('AnalisarSenhasComponent', () => {
  let component: AnalisarSenhasComponent;
  let fixture: ComponentFixture<AnalisarSenhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisarSenhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisarSenhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
