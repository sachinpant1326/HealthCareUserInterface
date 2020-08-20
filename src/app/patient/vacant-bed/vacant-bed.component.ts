import { Component, OnInit, Input } from '@angular/core';
import { BedsList } from 'src/app/patient/models/beds-list.model';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/patient/services/loading.service';
import { PatientService } from '../services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vacant-bed',
  templateUrl: './vacant-bed.component.html',
  styleUrls: ['./vacant-bed.component.css']
})
export class VacantBedComponent implements OnInit {

  
  bedsList : BedsList = { generalBeds : [], intensiveCareBeds : [], intensiveCriticalCareBeds : [], ventilatorBeds : [ ]};
  loadSubscription : Subscription;
  generalBedsCount : number = 0;
  icuBedsCount : number = 0;
  iccuBedsCount : number = 0;
  ventilatorBedsCount : number = 0;


  constructor(
    private loader: LoadingService,
    private patientService: PatientService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    console.log(this.patientService.getId())
    this.patientService.getVacantBeds(this.patientService.getId()).subscribe(beds => {
      this.bedsList = beds;
      this.generalBedsCount = this.bedsList['generalBeds'].length;
      this.iccuBedsCount = this.bedsList['intensiveCriticalCareBeds'].length;
      this.ventilatorBedsCount = this.bedsList['ventilatorBeds'].length;
      this.icuBedsCount = this.bedsList['intensiveCareBeds'].length;
      console.log(this.bedsList);
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.toastr.error(err.error['message'], err.error['header']);
    }
    );

  }
  navigateToSection(section : string) {
    window.location.hash = '';
    window.location.hash = section;
  }

}
