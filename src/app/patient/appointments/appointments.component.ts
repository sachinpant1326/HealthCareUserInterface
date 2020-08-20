import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  title = 'Appointment';
  vallapp: number = 0;
  vmyapp: number = 0;
  mapp: number = 0;

  constructor(private route: Router) {
    this.route.navigateByUrl("makeappointment");
    this.route.navigateByUrl("viewallappointments");
    this.route.navigateByUrl("viewmyappointment");
  }
  makeapp() {
    this.mapp = 1;
  }
  viewallapp() {
    this.vallapp = 1;
  }
  viewmyapp() {
    this.vmyapp = 1;
  }

  ngOnInit(): void {
  }

}

