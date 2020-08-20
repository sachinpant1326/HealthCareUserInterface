import { Component, OnInit, OnDestroy } from '@angular/core';
import { BedService } from '../services/bed.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-admit-patient',
  templateUrl: './admit-patient.component.html',
  styleUrls: ['./admit-patient.component.css']
})
export class AdmitPatientComponent implements OnInit, OnDestroy {
  appointmentId:number;
  message:string;
  errorMessage:string;
  flag:boolean=false;
  errorFlag:boolean=false;
  constructor(private service:BedService,
    private loader : LoadingService
    ) { }

  ngOnInit(): void {
    this.loader.hide();
  }
  public admitGeneralPatient(){
    console.log(this.appointmentId);
    this.service.admitGeneralPatient(this.appointmentId).subscribe(data=>{this.message=data; this.flag=true},error=>{this.errorMessage=error.error.message;});
    if(this.message!=undefined){
      alert(this.message);
      location.reload();
    }
    else{
      alert(this.errorMessage);
      location.reload();
    }
  }
  public admitIntensiveCarePatient(){
    this.service.admitIntensiveCarePatient(this.appointmentId).subscribe(data=>{this.message=data; this.flag=true},error=>{this.errorMessage=error.error.message;});
    if(this.message!=undefined){
      alert(this.message);
      // location.reload();
    }
    else{
      alert(this.errorMessage);
      // location.reload();
    }
  }
  public admitIntensiveCriticalCarePatient(){
    this.service.admitIntensiveCriticalCarePatient(this.appointmentId).subscribe(data=>{this.message=data; this.flag=true},error=>{this.errorMessage=error.error.message;});
    if(this.message!=undefined){
      alert(this.message);
      location.reload();
    }
    else{
      alert(this.errorMessage);
      location.reload();
    }
  }
  public admitVentilatorPatient(){
    this.service.admitVentilatorPatient(this.appointmentId).subscribe(data=>{this.message=data; this.flag=true},error=>{this.errorMessage=error.error.message;});
    if(this.message!=undefined){
      alert(this.message);
      location.reload();
    }
    else{
      alert(this.errorMessage);
      location.reload();
    }
  }

  ngOnDestroy(){
    this.loader.show();
  }
}
