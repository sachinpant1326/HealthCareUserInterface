import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagCenterComponent } from './diag-center.component';

describe('DiagCenterComponent', () => {
  let component: DiagCenterComponent;
  let fixture: ComponentFixture<DiagCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
