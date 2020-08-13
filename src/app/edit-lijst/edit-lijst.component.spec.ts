import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLijstComponent } from './edit-lijst.component';

describe('EditLijstComponent', () => {
  let component: EditLijstComponent;
  let fixture: ComponentFixture<EditLijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
