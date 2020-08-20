import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BedService {

  [x:string]:any
  constructor(private http:HttpClient) { }

  public admitGeneralPatient(appointmentId : number):Observable<any>{
    return this.http.post("http://localhost:8090/api/center/bed/admitGeneralBedPatient/" + appointmentId,appointmentId);
  }
  public admitIntensiveCarePatient(appointmentId:number):Observable<any>{
    return this.http.post("http://localhost:8090/api/center/bed/admitIntensiveCareBedPatient/" + appointmentId, appointmentId);

  }
  public admitIntensiveCriticalCarePatient(appointmentId:number):Observable<any>{
    return this.http.post("http://localhost:8090/api/center/bed/admitIntensiveCriticalCareBedPatient/"+appointmentId , appointmentId);

  }
  public admitVentilatorPatient(appointmentId:number):Observable<any>{
    return this.http.post("http://localhost:8090/api/center/bed/admitVentilatorBedPatient/"+appointmentId , appointmentId);

  }
  public dischargePatient(appointmentId:number):Observable<any>{
    return this.http.post("http://localhost:8090/api/center/bed/dischargePatient/"+appointmentId , appointmentId);

  }
}
