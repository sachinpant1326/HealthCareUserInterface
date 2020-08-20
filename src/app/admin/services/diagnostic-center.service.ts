import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { Observable } from 'rxjs';
import { DiagnosticCenterSignUpRequest } from 'src/app/admin/models/diagnostic-center-sign-up-request';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticCenterService {

  private diagnosticCenters : DiagnosticCenter[] = [];

  constructor(private http: HttpClient, private toastService : ToastrService) { }

  setDiagnosticCenters(diagnosticCenters:DiagnosticCenter[]):void{
    this.diagnosticCenters = diagnosticCenters;
  }

  getDiagnosticCenters():DiagnosticCenter[]{
    return this.diagnosticCenters;
  }

  loadDiagnosticCenters():Observable<any>{
    console.log("Service");
    return this.http.get("http://localhost:8090/api/admin/getAllDiagnosticCenter");
  }

  insertDiagnosticCenter(diagnosticCenter:DiagnosticCenterSignUpRequest):Observable<any>{
    return this.http.post("http://localhost:8090/api/admin/addDiagnosticCenter",diagnosticCenter);
  }
  
  deleteDiagnosticCenter(diagnosticCenterId : Number): DiagnosticCenter[]{
    this.diagnosticCenters = this.diagnosticCenters.filter(diagnosticCenters=>diagnosticCenters.id!=diagnosticCenterId);
    this.http.delete("http://localhost:8090/api/admin/removeDiagnosticCenter/"+diagnosticCenterId).subscribe(data=>
    {
      this.toastService.success('Successful', "Delete Diagnostic Center");
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      this.toastService.error('Diagnostic center not present', 'Delete Diagnostic Center Exception');
    });
    return this.diagnosticCenters;
  }

  updateDiagnosticCenter(diagnosticCenter:DiagnosticCenter):DiagnosticCenter[]{
    this.http.put("http://localhost:8090/api/admin/updateDiagnosticCenter/"+diagnosticCenter.id,diagnosticCenter).subscribe(data=>{
      console.log(data);
    });
    return this.diagnosticCenters;
  }
}
