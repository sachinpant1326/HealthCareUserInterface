import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { MakeAppointment } from '../models/make-appointment-request.model';
import { DiagnosticTest } from '../models/diagnostic-test.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  title = 'makeappointment'
  appointment: MakeAppointment = new MakeAppointment();
  diagnosticTest: DiagnosticTest = new DiagnosticTest();

  diagtestid: number;
  diagcenterid: number;
  mapp: number = 0;
  vmyapp: number = 0;
  vallapp: number = 0;

  tests: DiagnosticTest[] = [];

  constructor(private appointmentService: AppointmentService, private toastrService: ToastrService) { }

  makeapp() {
    this.mapp = 1;
  }
  viewmyapp() {
    this.vmyapp = 1;
  }
  viewallapp() {
    this.vallapp = 1;
  }
  ngOnInit(): void {
  }
  makeAppointment(): void {
    this.appointmentService.makeAppointment(this.appointment).subscribe(data => {
      // alert("Appointment Booked Successfully");
      this.toastrService.success('Successfull', "Add Appointment");
    },
      error => {
        console.log("error occured", error);
        this.toastrService.error('Invalid Data', 'Add Appointment Exception');
      }
    );
  }
  viewByTestName() {
    this.appointmentService.viewAllTest(this.appointment.diagnosticCenterId).subscribe(data => this.tests = data);

  }

}


