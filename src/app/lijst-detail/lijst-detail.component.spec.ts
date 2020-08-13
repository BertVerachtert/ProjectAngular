import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LijstDetailComponent } from './lijst-detail.component';

describe('LijstDetailComponent', () => {
  let component: LijstDetailComponent;
  let fixture: ComponentFixture<LijstDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LijstDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LijstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
