import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Roles} from '../../../core/util/user-roles/user-roles';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient){ }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;


  createSSE(data)
  {
    return this.http.post("https://localhost:5001/api/ScheduleSSE/ScheduleSSE" , data, { headers: this.Header })
  //return this.http.post(this.base_url + "api/Login/AuthenticateOfficial", jsonData, { headers: this.Header })
  }
  createSSE2()
  {
    return this.http.get("https://localhost:5001/api/ScheduleSSE/GetScheduledSSE ")
  //return this.http.post(this.base_url + "api/Login/AuthenticateOfficial", jsonData, { headers: this.Header })
  }

}
