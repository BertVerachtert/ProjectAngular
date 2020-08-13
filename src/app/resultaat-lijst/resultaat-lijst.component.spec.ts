import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultaatLijstComponent } from './resultaat-lijst.component';

describe('ResultaatLijstComponent', () => {
  let component: ResultaatLijstComponent;
  let fixture: ComponentFixture<ResultaatLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultaatLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultaatLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
