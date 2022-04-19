import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { using } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoService {


  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  mailheader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    "Accept": "*/*",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }); 

  base_url = environment.base_url;
  documentUrl = this.base_url + "api/Upload/Document";

  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get(this.base_url + "api/User/UserList")

  }

  getUsersByDistrict(district) {
    return this.http.get(this.base_url + "api/User/GetListOfDistrictUsers?districtCode=" + district)

  }

  getUsersBySchool(emisCode) {
    return this.http.get(this.base_url + "api/User/GetListOfSchoolUsers?emisCode=" + emisCode)
  }

  getSchoolsByDistrict(code) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + code)

  }

  getElectionMemoByDistrict() {
    return this.http.get(this.base_url + "api/Memo/MemoList");

  }


  getElectionMemo() {
    return this.http.get(this.base_url + "api/Memo/MemoList");

  }

  getElectionMemoById(id) {
    return this.http.get(this.base_url + "api/Memo/GetById?Id=" + id)

  }

  createMemo(memo) {
    return this.http.post(this.base_url + "api/Memo/Create", memo, { headers: this.Header })

  }

  UpdateMemoNoDocument(memo) {
    return this.http.post(this.base_url + "api/Memo/UpdateNoDocs", memo, { headers: this.Header })

  }

  updateMemoWithDocument(memo) {
    return this.http.post(this.base_url + "api/Memo/UpdateWithDocs", memo, { headers: this.Header })

  }

  addAttendees(id, users) {
    return this.http.post(this.base_url + "api/Memo/AddMemoAttendees?MemoId=" + id, users, { headers: this.Header })

  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }


  getDistrictUsers(code, role) {
    return this.http.get(this.base_url + "api/User/GetDistrictUsers?DistrictCode=" + code + "&RoleName=" + role)
  }

  getElectionsBySchool(emis) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emis);

  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  deleteDocument(id) {
    return this.http.post(this.base_url + "api/Memo/DeleteMemoDocument?Id=" + id, { headers: this.mailheader });
  }

  sendMemoNotification(memoid, duedate, electionyear, Fullname, subject, datesent, telnumber, email, districtname) {
    console.log(this.base_url + "api/Mail/SendMemoMail?MemoId=" + memoid + "&ProposedElectionDate=" + duedate + "&ElectionYear=" + electionyear + "&DeoNameSurname=" + Fullname + "&Subject=" + subject + "&DateSend=" + datesent + "&DeoTelephone=" + telnumber + "&DeoEmail=" + email + "&DistrictName=" + districtname)
    return this.http.post(this.base_url + "api/Mail/SendMemoMail?MemoId=" + memoid + "&ProposedElectionDate=" + duedate + "&ElectionYear=" + electionyear + "&DeoNameSurname=" + Fullname + "&Subject=" + subject + "&DateSend=" + datesent + "&DeoTelephone=" + telnumber + "&DeoEmail=" + email + "&DistrictName=" + districtname, { headers: this.Header });

    
  }

  sendMail(body) {
    // console.log(this.base_url + "api/Mail/Send?ToEmail=" + email + "&Subject=" + subject + "&Body=" + body)
    console.log(JSON.stringify(body))
    // return this.http.post(this.base_url + "api/Mail/Send?ToEmail=" + email + "&Subject=" + subject + "&Body=" + body, { headers: this.mailheader });
    return this.http.post(this.base_url + "api/Mail/Send",body, { headers: this.mailheader });

  } 

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

}
