import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { CenterService } from '../services/center.service';
import { BedsList } from '../models/beds-list.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-beds',
  templateUrl: './all-beds.component.html',
  styleUrls: ['./all-beds.component.css']
})
export class AllBedsComponent implements OnInit, OnDestroy {

  bedsList: BedsList = { generalBeds : [], intensiveCareBeds : [], intensiveCriticalCareBeds : [], ventilatorBeds : [ ]};
  loadSubscription : Subscription;
  generalBedsCount : number = 0;
  icuBedsCount : number = 0;
  iccuBedsCount : number = 0;
  ventilatorBedsCount : number = 0;

  constructor(
    private loader: LoadingService,
    private centerService: CenterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.centerService.getAllBeds().subscribe(beds => {
      this.bedsList = beds;
      this.generalBedsCount = this.bedsList['generalBeds'].length;
      this.iccuBedsCount = this.bedsList['intensiveCriticalCareBeds'].length;
      this.ventilatorBedsCount = this.bedsList['ventilatorBeds'].length;
      this.icuBedsCount = this.bedsList['intensiveCareBeds'].length;
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

  removeICUBed(bedId : number ) {
    this.loader.show();
    this.centerService.removeBed(bedId).subscribe(
      data=> {
        this.bedsList.intensiveCareBeds = this.bedsList.intensiveCareBeds.filter(bed => bed.id !== bedId);
        this.icuBedsCount = this.bedsList.intensiveCareBeds.length;
        this.toastr.success(data['message'], data['header']);
      },
      (err : HttpErrorResponse) => {
        this.toastr.error(err.message)
      }
    )
  }

  removeGeneralBed(bedId : number) {
    this.loader.show();
    this.centerService.removeBed(bedId).subscribe(
      data => {
        this.bedsList.generalBeds = this.bedsList.generalBeds.filter(bed => bed.id !== bedId);
        this.generalBedsCount = this.bedsList.generalBeds.length;
        this.toastr.success(data['message'], data['header']);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message)
      }
    )
  }

  removeICCUBed(bedId : number) {
    this.loader.show();
    this.centerService.removeBed(bedId).subscribe(
      data => {
        this.bedsList.intensiveCriticalCareBeds = this.bedsList.intensiveCriticalCareBeds.filter(bed => bed.id !== bedId);
        this.iccuBedsCount = this.bedsList.intensiveCriticalCareBeds.length;
        this.toastr.success(data['message'], data['header']);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message)
      }
    )
  }

  removeVentilatorBed(bedId : number ) {
    this.loader.show();
    this.centerService.removeBed(bedId).subscribe(
      data => {
        this.bedsList.ventilatorBeds = this.bedsList.ventilatorBeds.filter(bed => bed.id !== bedId );
        this.ventilatorBedsCount = this.bedsList.ventilatorBeds.length;
        this.toastr.success(data['message'], data['header']);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message)
      }
    )
  }

  ngOnDestroy() {
    this.loader.show();
  }
}
