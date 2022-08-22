import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMotivosComponent } from './dialog-motivos.component';

describe('DialogMotivosComponent', () => {
  let component: DialogMotivosComponent;
  let fixture: ComponentFixture<DialogMotivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMotivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMotivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
