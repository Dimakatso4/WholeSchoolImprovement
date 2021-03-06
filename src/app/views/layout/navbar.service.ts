import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {


  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;

  ///////////////get user by id///////////////////////
  getRoleById(id) {
    
    return this.http.get(this.base_url + "api/Users/GetRoleNamebyUserId?Id=" + id);
  }

  getParentInfo(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + id)

  }

  checkIfParentDecided(emiscode, parentid) {
    // console.log(this.base_url + "api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
    return this.http.get(this.base_url + "api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
  }

  getNominatedParents(emiscode) {
    // console.log(this.base_url + "api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
    return this.http.get(this.base_url + "api/Parent/GetNominatedParents?EmisCode=" + emiscode)
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

  getScheduledNominationByEmisCode(emisCode, date) {
    // console.log(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
    return this.http.get(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
  }


  getSchoolByParentId(id) {
    return this.http.get(this.base_url + "api/Parent/GetChildrenSchoolByParentId?ParentId=" + id, { headers: this.Header })
  }

 // getRoleById(id) {
    //return this.http.get(this.base_url + "api/User/UserRole?UserId=" + id);
  //  return this.http.get(this.base_url + "api/Users/GetRoleNamebyUserId?Id=" + id);
 // }

  



}
