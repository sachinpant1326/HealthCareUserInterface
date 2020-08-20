import { Component, OnInit } from '@angular/core';
import { DiagnosticCenter } from 'src/app/patient/models/center.model';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diag-center',
  templateUrl: './diag-center.component.html' ,
  styleUrls: ['./diag-center.component.css']
})



export class DiagCenterComponent implements OnInit {

  diagnosticCenters:DiagnosticCenter ;
 
  constructor(private patientService:PatientService,private router:Router) { }

  ngOnInit(): void {
    this.patientService.getAllDiagnosticCenters().subscribe(data=>{
      this.diagnosticCenters=data;
      console.log(this.diagnosticCenters);
    },err=>{
      console.log(err.stack);
    })
  }

  fetchDiagCenterId(id:number){
    
    this.patientService.setId(id);
    console.log(id);
  }

}
