import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestToCenterComponent } from './add-test-to-center.component';

describe('AddTestToCenterComponent', () => {
  let component: AddTestToCenterComponent;
  let fixture: ComponentFixture<AddTestToCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestToCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestToCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
