import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleLijstenComponent } from './alle-lijsten.component';

describe('AlleLijstenComponent', () => {
  let component: AlleLijstenComponent;
  let fixture: ComponentFixture<AlleLijstenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlleLijstenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlleLijstenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
