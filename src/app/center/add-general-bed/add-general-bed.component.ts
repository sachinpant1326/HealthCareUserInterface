import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { CenterService } from '../services/center.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-general-bed',
  templateUrl: './add-general-bed.component.html',
  styleUrls: ['./add-general-bed.component.css']
})
export class AddGeneralBedComponent implements OnInit, OnDestroy {

  generalBedForm : FormGroup;
  submitted : boolean = false;
  constructor(
    private router: Router,
    private loader : LoadingService,
    private toastr : ToastrService,
    private formBuilder : FormBuilder,
    private centerService : CenterService
  ) { 
      
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader.hide();
    }, 2000);
    this.generalBedForm = this.formBuilder.group({
      pricePerDay: ['', Validators.compose([Validators.required, Validators.min(500), Validators.pattern("[0-9]+")])],
      noOfBeds: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("[0-9]+")])],
      isMovable: true,
      frameMaterial: ['', Validators.compose([Validators.required, Validators.pattern("Steel|Wood")])]
    });
  }
  ngOnDestroy() {
    this.loader.show();
  }
  addGeneralBed(){
    this.submitted = true;
    if(this.generalBedForm.invalid){
      this.toastr.error('Form Not Submitted as invalid data is entered or no data entered', 'Form Submission');
      return;
    }
    this.loader.show();
    this.centerService.addGeneralBed(this.generalBedForm.value).subscribe(data => {
        this.toastr.success(data['message'], data['header']);
        this.router.navigate(['center', 'all-beds']);
    }, (err : HttpErrorResponse) => {
        this.toastr.error(err.message, 'Error');
    });
  }

}
