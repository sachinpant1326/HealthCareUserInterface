import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Appointment } from '../models/appointment-model';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { DiagnosticTest } from '../models/DiagnosticTest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-process-appointment',
  templateUrl: './process-appointment.component.html',
  styleUrls: ['./process-appointment.component.css']
})
export class ProcessAppointmentComponent implements OnInit {
  
  appointmentDetail:FormGroup;
  testDetail:FormGroup;
  appointments:Appointment[];
  errorMessage="Some error occured. Try again later";
  tests:DiagnosticTest[];

  constructor(private formBuilder:FormBuilder,private router:Router
    ,private adminService:AdminService,private toastService : ToastrService) { 
      this.appointments=[];
      this.getTestCentre();
    }

  ngOnInit(): void {
    
    this.appointmentDetail=this.formBuilder.group({
      centre:['',Validators.required],
      test:['',Validators.required],
      status:['',Validators.required]
    });

    this.testDetail=this.formBuilder.group({
      seats:['',Validators.required],
      time:['',Validators.required]
    });

  }

  processAppointment(){
    if(this.appointmentDetail.controls.centre.errors ||
       this.appointmentDetail.controls.test.errors)
    {
      this.toastService.error('Please fill centre and test name carefully.');
      return;
    }  
    if(this.testDetail.invalid){
      this.toastService.error('Please fill seats and time carefully.');
      return;
    }
      
    let obj={
      "id":this.appointmentDetail.controls.centre.value,
      "test":this.appointmentDetail.controls.test.value,
      "testtime":this.testDetail.controls.time.value,
      "seats":this.testDetail.controls.seats.value
    }
    this.adminService.processAppointments(obj).subscribe(
      data=>{this.toastService.success('Processed all appointment');},
      err=>{this.toastService.error(this.errorMessage);}
    );

  }

  getAppointments(){
    if(this.appointmentDetail.invalid)
    {
      this.toastService.error('Please fill centre,test and status carefully.');
      return;
    }

    let centre=this.appointmentDetail.controls.centre.value;
    let test=this.appointmentDetail.controls.test.value;
    let status=this.appointmentDetail.controls.status.value;

    this.adminService.getAppointments(centre,test,status).subscribe(
      data=>{this.appointments=data;},
      err=>{this.toastService.error(this.errorMessage);}
      );
  }

  getTestCentre(){
    this.adminService.getAllTests().subscribe(
      data=>{
        this.tests=data;
      },
      err=>{}
    );

  }
}