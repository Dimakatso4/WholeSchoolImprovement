import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilingService {

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
    this.localStorage   = window.localStorage;
  }

  base_url = environment.base_url;

  GetSchoolProfileByEmisNumber(EmisNumber)
  {
    return this.http.get(this.base_url + "api/SchoolKPIs/GetSchoolProfileByEmisNumber?EmisNumber=" + EmisNumber);
  }

}
