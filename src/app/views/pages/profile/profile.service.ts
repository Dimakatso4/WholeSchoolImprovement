import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });


  base_url = environment.base_url;

  createSgbProfile(role, EmisNumber, IDNumber, Credentials) {
    return this.http.post(this.base_url + "api/User/UserProfileNewlyElectedSGBExistingParent?UserType=" + role + "&EmisNumber=" + EmisNumber + "&IDNumber=" + IDNumber + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }

  authenticateIDNumber(jsonData) {
    return this.http.post(this.base_url + "api/Login/AuthenticateParent", jsonData, { headers: this.Header })
  }

  updateUserProfile(Persal, Credentials) {
    return this.http.post(this.base_url + "api/User/UpdateExistingEmployeeProfile?Persal=" + Persal + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }



}
