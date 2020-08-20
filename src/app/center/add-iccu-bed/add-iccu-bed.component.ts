import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CenterService } from '../services/center.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-iccu-bed',
  templateUrl: './add-iccu-bed.component.html',
  styleUrls: ['./add-iccu-bed.component.css']
})
export class AddIccuBedComponent implements OnInit, OnDestroy {

  iccuBedForm : FormGroup;
  submitted : boolean = false;
  constructor(
    private router : Router,
    private loader : LoadingService,
    private toastr : ToastrService,
    private formBuilder : FormBuilder,
    private centerService : CenterService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader.hide();
    }, 2000);
    this.iccuBedForm = this.formBuilder.group({ 
      pricePerDay: ['', Validators.compose([Validators.required, Validators.min(2000), Validators.pattern("[0-9]+")])],
      noOfBeds: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("[0-9]+")])],
      batteryBackup: false,
      hasABS: false,
      remoteOperated: false,
      type: ['', Validators.compose([Validators.required, Validators.pattern("Manual|Fowler|Standard")])]
    });
  }

  addICCUBed() {
    this.submitted = true;
    if(this.iccuBedForm.invalid){
      this.toastr.error('Form Not Submitted as invalid data is entered or no data entered', 'Form Submission')
      return;
    }
    this.loader.show();
    this.centerService.addICCUBed(this.iccuBedForm.value).subscribe(data => {
      this.toastr.success(data['message'], data['header']);
      this.router.navigate(['center', 'all-beds']);
    }, (err: HttpErrorResponse) => {
      this.toastr.error(err.message, 'Error');
    });
  }

  ngOnDestroy() {
    this.loader.show();
  }

}
