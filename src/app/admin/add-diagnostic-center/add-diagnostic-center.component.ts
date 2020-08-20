import { Component, OnInit } from '@angular/core';
import { DiagnosticCenterSignUpRequest } from 'src/app/admin/models/diagnostic-center-sign-up-request';
import { DiagnosticCenterService } from '../services/diagnostic-center.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-diagnostic-center',
  templateUrl: './add-diagnostic-center.component.html',
  styleUrls: ['./add-diagnostic-center.component.css']
})
export class AddDiagnosticCenterComponent implements OnInit {

  diagnosticCenter: DiagnosticCenterSignUpRequest = new DiagnosticCenterSignUpRequest();

  constructor(private diagnosticCenterService:DiagnosticCenterService, 
    private toastService : ToastrService
    ) { }

  ngOnInit(): void {
  }

  addDiagnosticCenter()
  {
    console.log("add center");

    this.diagnosticCenterService.insertDiagnosticCenter(this.diagnosticCenter).subscribe(data=>
      {
        this.toastService.success('Successful', "Add Diagnostic Center");
        this.diagnosticCenter = data
      },
      (err: HttpErrorResponse) => {
        this.toastService.error('Invalid data(User Name already present)', 'Add Diagnostic Center Exception');
      });
  }

}
