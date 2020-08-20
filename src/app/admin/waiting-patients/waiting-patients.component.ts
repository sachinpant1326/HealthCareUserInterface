import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaitingPatientService } from '../services/waiting-patient.service';
import { WaitingPatient } from '../models/waiting-patient.model';
import { CenterWiseList } from '../models/center-wise-list.model';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-waiting-patients',
  templateUrl: './waiting-patients.component.html',
  styleUrls: ['./waiting-patients.component.css']
})
export class WaitingPatientsComponent implements OnInit, OnDestroy {

  routeSubscription : Subscription;
  constructor(private service: WaitingPatientService, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
   }
  waitingPatients: WaitingPatient[] = [];

  center_wise_list = new Map<number, CenterWiseList>();
  patient_ids = [];

  ngOnInit(): void {
    console.log(this.center_wise_list);
    this.service.getWaitingPatients()
      .subscribe(data => {
        this.waitingPatients = data;
        this.preProcessList();
        console.log(this.center_wise_list.size);
      });
  }

  private preProcessList() {
    
    this.waitingPatients.forEach(patient => {
      
      let patient_id = patient.appointment.patient.id;
      
      let index = this.patient_ids.findIndex(value => {
      
        return value === patient_id;
      
      });
      
      if (this.center_wise_list.get(patient.appointment.diagnosticCenter['id']) === undefined) {        
        
        if (index < 0) {
        
          this.patient_ids.push(patient_id);
        
          this.center_wise_list.set(patient.appointment.diagnosticCenter['id'], {

            name: patient.appointment.diagnosticCenter.name,

            patients: [{ id : patient.id ,patient: patient.appointment.patient, requestedOn: patient.requestedOn, type: patient.type }]

          });
        
        }
      }
      else {

        if (index < 0) {

          this.patient_ids.push(patient_id);

          this.center_wise_list.get(patient.appointment.diagnosticCenter['id']).patients.push({ id : patient.id, patient: patient.appointment.patient, requestedOn: patient.requestedOn, type : patient.type });         

        }
      }
    });
  }

ngOnDestroy(){
  this.routeSubscription.unsubscribe();
}
}
