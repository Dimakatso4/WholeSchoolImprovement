import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoterDetailsService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  // URL
  base_url = environment.base_url;


  getParentInfo(IdNo, emisCode) {
    return this.http.get(this.base_url + "api/Parent/GetParentInfo?IDNumber=" + IdNo + "&EmisCode=" + emisCode, { headers: this.Header })
  }

  getAllVotersRoll(school) {
    return this.http.get(this.base_url + "api/  " + school);
  }

  updateVotersRoll(data) {
    return this.http.post(this.base_url + "api/  ", data);
  }

  getVotersRollByID(id) {
    return this.http.get(this.base_url + "api/  " + id);
  }

  removeVotersRoll(id) {
    return this.http.delete(this.base_url + "api/  " + id);
  }

}