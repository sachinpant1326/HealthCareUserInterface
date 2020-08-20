import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { CenterService } from '../services/center.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-icu-bed',
  templateUrl: './add-icu-bed.component.html',
  styleUrls: ['./add-icu-bed.component.css']
})
export class AddIcuBedComponent implements OnInit, OnDestroy {

  icuBedForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private loader: LoadingService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private centerService: CenterService
  ) { 
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loader.hide();
    }, 2000);
    this.icuBedForm = this.formBuilder.group({
      pricePerDay: ['', Validators.compose([Validators.required, Validators.min(1000), Validators.pattern("[0-9]+")])],
      noOfBeds: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern("[0-9]+")])],
      isKneeTiltAvailable: false,
      isHeadTiltAvailable: true,
      isElectric: false,
      noOfFunctions: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(5), Validators.pattern("[0-9]+")])],
    });
  }

  addICUBed() {
    this.submitted = true;
    if (this.icuBedForm.invalid) {
      this.toastr.error('Form Not Submitted as invalid data is entered or no data entered', 'Form Submission')
      return;
    }
    this.loader.show();
    this.centerService.addICUBed(this.icuBedForm.value).subscribe(data => {
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
