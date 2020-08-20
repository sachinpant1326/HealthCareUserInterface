import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-view-all-appointment',
  templateUrl: './view-all-appointment.component.html',
  styleUrls: ['./view-all-appointment.component.css']
})
export class ViewAllAppointmentComponent implements OnInit {

  title='viewallappointment'
  appointments:Appointment[]=[];

  constructor(private appointmentService:AppointmentService) { }

  ngOnInit(): void {
    this.viewAllAppointment();
  }

  viewAllAppointment():void{
    this.appointmentService.viewAllAppointments().subscribe(data=> {this.appointments = data} );
  }

}
