import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarNovaSenhaComponent } from './validar-nova-senha.component';

describe('ValidarNovaSenhaComponent', () => {
  let component: ValidarNovaSenhaComponent;
  let fixture: ComponentFixture<ValidarNovaSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarNovaSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarNovaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
