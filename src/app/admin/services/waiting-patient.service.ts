import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllocateBedRequest } from '../models/allocate-bed-request.model';
import { WaitingPatient } from '../models/waiting-patient.model';

@Injectable()
export class WaitingPatientService {

  baseurl : string = 'http://localhost:8090/api/admin/';
  constructor(private http: HttpClient) { }

  getWaitingPatients(){
    return this.http.get<WaitingPatient[]>(`${this.baseurl}getWaitingPatients`);
  }

  allocateBeds(allocationRequest : AllocateBedRequest){
    return this.http.post(`${this.baseurl}allocateBeds`, allocationRequest);
  }

}
