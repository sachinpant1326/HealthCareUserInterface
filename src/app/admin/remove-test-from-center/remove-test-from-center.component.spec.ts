import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTestFromCenterComponent } from './remove-test-from-center.component';

describe('RemoveTestFromCenterComponent', () => {
  let component: RemoveTestFromCenterComponent;
  let fixture: ComponentFixture<RemoveTestFromCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveTestFromCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTestFromCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
