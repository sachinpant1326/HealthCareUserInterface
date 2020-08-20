import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessAppointmentComponent } from './process-appointment.component';

describe('ProcessAppointmentComponent', () => {
  let component: ProcessAppointmentComponent;
  let fixture: ComponentFixture<ProcessAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
