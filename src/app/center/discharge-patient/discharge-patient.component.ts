import { Component, OnInit, OnDestroy } from '@angular/core';
import { BedService } from '../services/bed.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-discharge-patient',
  templateUrl: './discharge-patient.component.html',
  styleUrls: ['./discharge-patient.component.css']
})
export class DischargePatientComponent implements OnInit, OnDestroy {
  appointmentId:number;
  message:string;
  errorMessage:string;
  flag:boolean=true;
  constructor(private service:BedService,
    private loader : LoadingService
    ) { }

  ngOnInit(): void {
    this.loader.hide();
  }
  public dischargePatient(){
    this.service.dischargePatient(this.appointmentId).subscribe(data=>{this.message=data; this.flag=false},error=>{this.errorMessage=error.error.message})
    if(this.message!=undefined){
      alert(this.message);
      location.reload();
    }
    else{
      alert(this.errorMessage);
      location.reload();
    }
    
  }

  ngOnDestroy() {
    this.loader.show();
  }
}
