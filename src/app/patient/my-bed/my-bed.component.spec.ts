import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBedComponent } from './my-bed.component';

describe('MyBedComponent', () => {
  let component: MyBedComponent;
  let fixture: ComponentFixture<MyBedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
