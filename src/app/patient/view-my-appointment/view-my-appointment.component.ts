import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import {NgForm} from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-view-my-appointment',
  templateUrl: './view-my-appointment.component.html',
  styleUrls: ['./view-my-appointment.component.css']
})
export class ViewMyAppointmentComponent implements OnInit {

  title='viewmyappointment'
  appointment:Appointment[]=[];
  flag:number=0;
  
  @ViewChild("#formdata")
  form:NgForm;
  id:number;
  constructor(private appointmentService:AppointmentService) { }

  ngOnInit(): void {
  }

  viewMyAppointment():void{

    this.flag=1;
    this.appointmentService.viewMyAppointment(this.id).subscribe(data=>this.appointment.push(data)
    ,
    error=>
    {
      console.log("error occured",error);
    }
    
    
    );
  }
}
