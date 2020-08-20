import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../models/patient.model';
import { WaitPatient } from '../models/wait-patient.model';
import { WaitingPatientService } from '../services/waiting-patient.service';
import { ToastrService } from 'ngx-toastr';
import { AllocateBedRequest } from '../models/allocate-bed-request.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-waiting-patients-center',
  templateUrl: './waiting-patients-center.component.html',
  styleUrls: ['./waiting-patients-center.component.css']
})
export class WaitingPatientsCenterComponent implements OnInit {

  @Input("center_name") center_name : string = '';

  @Input("center_id") center_id : number = 0;

  @Input("patients") patients: WaitPatient[] = [];

  generalPatients: WaitPatient[] = [];

  iccuPatients: WaitPatient[] = [];

  icuPatients: WaitPatient[] = [];

  selected_generalPatients : number[] = [];
  selected_ventilatorPatients : number[]  = [];
  selected_iccuPatients : number[]  = [];
  selected_icuPatients : number[] = [];


  ventilatorPatients: WaitPatient[] = [];


  constructor(
    private waitingPatientService : WaitingPatientService,
    private toastr : ToastrService,
    private router : Router
  ) {   }

  ngOnInit(): void {
      this.generalPatients = this.patients.filter(patient => patient.type ==='General');
      this.iccuPatients = this.patients.filter(patient => patient.type === 'ICCU');
      this.icuPatients = this.patients.filter(patient => patient.type === 'ICU');
      this.ventilatorPatients = this.patients.filter(patient => patient.type === 'Ventilator');
  }

  handleGeneralBedCheck(event){
    if(event.target.checked){
        this.selected_generalPatients.push(parseInt(event.target.value));
    }
    else {
      this.selected_generalPatients = this.selected_generalPatients.filter(value => value != event.target.value);
    }
  }
  handleVentilatorBedCheck(event) {
    if (event.target.checked) {
      this.selected_ventilatorPatients.push(parseInt(event.target.value));
    }
    else {
      this.selected_ventilatorPatients = this.selected_ventilatorPatients.filter(value => value != event.target.value);
    }
  }

  handleICCUBedCheck(event) {
    if (event.target.checked) {
      this.selected_iccuPatients.push(parseInt(event.target.value));
    }
    else {
      this.selected_iccuPatients = this.selected_iccuPatients.filter(value => value != event.target.value);
    }
  }

  handleICUBedCheck(event) {
    if (event.target.checked) {
      this.selected_icuPatients.push(parseInt(event.target.value));
    }
    else {
      this.selected_icuPatients = this.selected_icuPatients.filter(value => value != event.target.value);
    }
  }

  allocateGeneralBeds(){
      if(this.selected_generalPatients.length == 0){
        this.toastr.error('No General Beds Selected!', 'Bed Selection');
        return;
      }
      let allocationRequest = new AllocateBedRequest();
      allocationRequest.diagnosticId = this.center_id;
      allocationRequest.type = 'General';
      allocationRequest.waitingPatientIds = this.selected_generalPatients;
      this.waitingPatientService.allocateBeds(allocationRequest)
        .subscribe(data => {
            this.toastr.success(data['message'], data['header']);
        },(err : HttpErrorResponse)=> {
            this.toastr.error(err.error['message'], err.error['header']);
            this.router.navigate(['admin', 'waiting-patients']);
        });
  }

  allocateVentilatorBeds(){
    if (this.selected_ventilatorPatients.length == 0) {
      this.toastr.error('No Ventilator Beds Selected!', 'Bed Selection');
      return;
    }
    let allocationRequest = new AllocateBedRequest();
    allocationRequest.diagnosticId = this.center_id;
    allocationRequest.type = 'Ventilator';
    allocationRequest.waitingPatientIds = this.selected_ventilatorPatients;
    this.waitingPatientService.allocateBeds(allocationRequest)
      .subscribe(data => {
        this.toastr.success(data['message'], data['header']);
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.error['message'], err.error['header']);
      });
  }

  allocateICCUBeds(){
    if (this.selected_iccuPatients.length == 0) {
      this.toastr.error('No ICCU Beds Selected!', 'Bed Selection');
      return;
    }
    let allocationRequest = new AllocateBedRequest();
    allocationRequest.diagnosticId = this.center_id;
    allocationRequest.type = 'ICCU';
    allocationRequest.waitingPatientIds = this.selected_icuPatients;
    this.waitingPatientService.allocateBeds(allocationRequest)
      .subscribe(data => {
        this.toastr.success(data['message'], data['header']);
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.error['message'], err.error['header']);
      });
  }

  allocatedICUBeds(){
    if (this.selected_icuPatients.length == 0) {
      this.toastr.error('No ICU Beds Selected!', 'Bed Selection');
      return;
    }
    let allocationRequest = new AllocateBedRequest();
    allocationRequest.diagnosticId = this.center_id;
    allocationRequest.type = 'ICU';
    allocationRequest.waitingPatientIds = this.selected_icuPatients;
    this.waitingPatientService.allocateBeds(allocationRequest)
      .subscribe(data => {
        this.toastr.success(data['message'], data['header']);
      }, (err: HttpErrorResponse) => {
        this.toastr.error(err.error['message'], err.error['header']);
      });
  }

}
