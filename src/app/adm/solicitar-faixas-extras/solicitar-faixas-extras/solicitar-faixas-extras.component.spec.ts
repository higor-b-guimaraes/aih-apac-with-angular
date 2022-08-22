import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarFaixasExtrasComponent } from './solicitar-faixas-extras.component';

describe('SolicitarFaixasExtrasComponent', () => {
  let component: SolicitarFaixasExtrasComponent;
  let fixture: ComponentFixture<SolicitarFaixasExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarFaixasExtrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarFaixasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
