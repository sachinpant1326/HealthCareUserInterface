import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class UpdateResultService {

  private baseurl: string = 'http://localhost:8090/api/center/'
  constructor(private http:HttpClient,
    private loader  : LoadingService) { }

  public addTestResult(appointmentId : any, condition : any, testReading : any){
    return this.http.post(`${this.baseurl}updateTestResult`,{ appointmentId, condition, testReading}).pipe(finalize(() => this.loader.hide()));
  }

}
