import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiagnosticTest } from '../models/DiagnosticTest';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { Appointment } from '../models/appointment-model';


@Injectable()
export class AdminService {

  baseurl : string = "http://localhost:8090/api/admin/"
  constructor(private http:HttpClient) { }

  getAllTests(){
    return this.http.get<DiagnosticTest[]>(this.baseurl+"getAllTests");
  }

  updateTestDetails(diagnosticTest:DiagnosticTest){
    return this.http.put<DiagnosticTest>(this.baseurl+"editTest",diagnosticTest);
  }
  addNewTest(diagnosticTest:DiagnosticTest){
    return this.http.post<DiagnosticTest>(this.baseurl+"addNewTest",diagnosticTest);
  }
  getAllDiagnosticCenters(){
    return this.http.get<DiagnosticCenter[]>(this.baseurl+"getAllDiagnosticCenter");
  }
  getTestOfACenter(id:number){
    return this.http.get<DiagnosticTest[]>(this.baseurl+"getTestsOfADiagnosticCenter/"+id);
  }
  getDiagnosticCenterById(id:number){
    return this.http.get<DiagnosticCenter>(this.baseurl+"getDiagnosticCenterById/"+id);
  }
  getTestsOfADiagnosticCenter(id:number){
    return this.http.get<DiagnosticTest[]>(this.baseurl+"getTestsOfADiagnosticCenter/"+id);
  }
  removeTestFromCenter(test:DiagnosticTest,id:number){
    return this.http.put<DiagnosticTest[]>(this.baseurl+"removeTestFromDiagnosticCenter/"+id,test);
  }
  addTestToCenter(test:DiagnosticTest,id:number){
    return this.http.put<DiagnosticTest[]>(this.baseurl+"addTestAtTheDiagnosticCenter/"+id,test);
  }

  getAppointments(id, test, status) {
    return this.http.get<Appointment[]>(this.baseurl + "getappointment/" + id + "/" + test + "/" + status);
  }

  processAppointments(details: any) {
    return this.http.post(this.baseurl + "processappointment", details, { responseType: 'text' });
  }
}
