import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDiagnosticCenterComponent } from './all-diagnostic-center.component';

describe('AllDiagnosticCenterComponent', () => {
  let component: AllDiagnosticCenterComponent;
  let fixture: ComponentFixture<AllDiagnosticCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDiagnosticCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDiagnosticCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
