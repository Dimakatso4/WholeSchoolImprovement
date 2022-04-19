import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SelfRegistrationService {

  localStorage: Storage;

  changes$ = new Subject();

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });


  constructor(private http: HttpClient) {
    this.localStorage = window.localStorage;
  }

  base_url = environment.base_url;


  CaptureorUpdateRegistration(data) {
    return this.http.post(this.base_url + "api/Users/CreateUpdateApplication", data, { headers: this.Header });

  }


  UpdateUserId(id, userid) {
    return this.http.post(this.base_url + "api/Users/UpdateUserId?Id=" + id + "&UserId=" + userid, { headers: this.Header });

  }

  GetAllRegistration() {
    return this.http.get(this.base_url + "api/Users/GetAllRegistration" , { headers: this.Header })

  }

  GetRegistrationById(id) {
    return this.http.get(this.base_url + "api/Users/GetRegistrationById?Id=" + id, { headers: this.Header })

  }

  GetRegistrationByStatus(status) { // = submitted, approved, activated, declined, update, updated
    return this.http.get(this.base_url + "api/Users/GetRegistrationByStatus?Status=" + status, { headers: this.Header })

  }

  GetRegistrationByIdentification(number) { // get regis by persal, id number & passport
    return this.http.get(this.base_url + "api/Users/GetRegistrationByIdentification?Number=" + number, { headers: this.Header })

  }

}