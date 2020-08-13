import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LijstZoekComponent } from './lijst-zoek.component';

describe('LijstZoekComponent', () => {
  let component: LijstZoekComponent;
  let fixture: ComponentFixture<LijstZoekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LijstZoekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LijstZoekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
