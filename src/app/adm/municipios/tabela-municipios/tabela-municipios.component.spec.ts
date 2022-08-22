import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMunicipiosComponent } from './tabela-municipios.component';

describe('TabelaMunicipiosComponent', () => {
  let component: TabelaMunicipiosComponent;
  let fixture: ComponentFixture<TabelaMunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaMunicipiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
