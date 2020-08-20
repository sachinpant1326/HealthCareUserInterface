import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Bed } from '../models/bed.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-bed',
  templateUrl: './view-bed.component.html',
  styleUrls: ['./view-bed.component.css']
})
export class ViewBedComponent implements OnInit {

  bed:Bed;
  constructor(private patientService:PatientService,private toster:ToastrService) { }

  ngOnInit(): void {
    this.patientService.getBedStatus(this.patientService.getId()).subscribe(data=>{
      this.bed=data;
      console.log(this.bed);
    },err=>{
      console.log(err.error.message);
      this.toster.error("No Bed Booked");

    })
  }

}
