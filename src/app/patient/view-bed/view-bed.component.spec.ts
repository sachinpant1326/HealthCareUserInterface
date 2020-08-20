import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBedComponent } from './view-bed.component';

describe('ViewBedComponent', () => {
  let component: ViewBedComponent;
  let fixture: ComponentFixture<ViewBedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
