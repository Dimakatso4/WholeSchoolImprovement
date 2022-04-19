import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginService {

  constructor(private http: HttpClient) { }


  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;


  updateSgbProfile(RoleId, EmisNumber, IDNumber, Credentials) {
    // return this.http.post(this.base_url + "api/User/Create", jsonData, { headers: this.Header })
    return this.http.post(this.base_url + "api/User/UserProfileNewlyElectedSGBExistingParent?userType=" + RoleId + "&EmisNumber=" + EmisNumber + "&IDNumber=" + IDNumber + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }

  updateUserProfileByPersal(Persal, Credentials) {
    return this.http.post(this.base_url + "api/User/UpdateExistingEmployeeProfileByPersal?Persal=" + Persal + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }

  updateUserProfileByIDNumber(IDNumber, Credentials) {
    return this.http.post(this.base_url + "api/User/UpdateExistingEmployeeProfileByIDNumber?IDNumber=" + IDNumber + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }


  updateEmployeeProfileByIdumber(idnumber, Credentials) {
    return this.http.post(this.base_url + "api/User/UpdateExistingEmployeeProfileByIDNumber?IDNumber=" + idnumber + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }

  updateEmployeeProfileByPersal(persal, Credentials) {
    return this.http.post(this.base_url + "api/User/UpdateExistingEmployeeProfileByPersal?Persal=" + persal + "&Credentials=" + encodeURIComponent(Credentials), { headers: this.Header })
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?Id=" + id)
  }

  validatePassword(id, pass) {
    //3. return this.http.get(this.base_url + "api/User/ValidatePassword?Id=" + id + "&Pass=" + encodeURIComponent(pass));
    return this.http.get(this.base_url + "api/Users/ValidatePassword?Id=" + id + "&Pass=" + encodeURIComponent(pass));
  }

  updateUserPassword(id, pass) {
    return this.http.post(this.base_url + "api/Users/UpdateUserReset?Id=" + id + "&credentials=" + encodeURIComponent(pass), { headers: this.Header });
  }

  CaptureNewPassword(id, pass) {
    return this.http.post(this.base_url + "api/Users/CaptureNewPassword?Id=" + id + "&Password=" + encodeURIComponent(pass), { headers: this.Header });
  }

}
