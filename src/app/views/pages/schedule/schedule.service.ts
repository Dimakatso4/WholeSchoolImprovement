import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  mailheader: HttpHeaders = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    'responseType': 'json',
    "Accept": "*/*",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  saveElection(newElection) {
    console.log(newElection);
    return this.http.post(this.base_url + "api/ElectionResult/Create", newElection).subscribe(data => {
      console.log('posted record');
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }


  //////////////////Send email on success////////////////////////
  sendEmail(fullName, id) {
    return this.http.post(this.base_url + "api/Mail/SendWelcomeMail?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  sendSMS(phonenumber, message) {
    return this.http.post(this.base_url + "api/SMS/sendMessage?MobileNumber=" + phonenumber + "&Message=" + message, { headers: this.Header })
  }

  ////////////////Create Document//////////////////////////
  saveElectionDocs(electionDocs) {
    return this.http.post(this.base_url + "api/Document/Create", electionDocs, { headers: this.Header })
  }


  getElectionDocs(id) {
    return this.http.get(this.base_url + "api/Document/DocumentList?Id=" + id)
  }

  saveCandidate(candidate) {
    return this.http.post(this.base_url + "api/Parent/Update", candidate);
  }

  listCandidate() {
    return localStorage.getItem('candidateList');
  }

  getElectionResultsBySchool(emisCode) {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultBySchool?emisCode=" + emisCode);

  }

  getElectionResultsById(id, userId) {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultById?Id=" + id + "&UserId=" + userId);

  }

  getElectionResultsByIdForHO(id) {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultByIdForHO?Id=" + id);
  }


  getScheduleByEmisCode(emisCode) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emisCode);

  }

  getElectionResultsByHO() {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultsByHO");

  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

  scheduleElection(newElection) {
    console.log(JSON.stringify(newElection))
    return this.http.post(this.base_url + "api/Schedule/Create", newElection)

  }

  updateScheduleElection(newElection) {
    return this.http.post(this.base_url + "api/Schedule/Update", newElection)

  }

  getElectionsBySchool(emis) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emis);

  }

  getElectionsByDistrict(code) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByDistrictCode?DistrictCode=" + code);

  }

  getUsersByDistrict(district) {
    // console.log(this.base_url + "api/User/GetListOfDistrictUsers?districtCode=" + district)
    return this.http.get(this.base_url + "api/User/GetListOfDistrictUsers?districtCode=" + district)

  }

  getSchoolsByDistrict(code) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?DistrictCode=" + code)
  }

  getPrincipalBySchool(emisCode) {
    // console.log(this.base_url + "api/User/GetPrincipalUserBySchool?EmisCode=" + emisCode)
    return this.http.get(this.base_url + "api/User/GetPrincipalUserBySchool?EmisCode=" + emisCode);
  }


  sendMail(mail) {
    return this.http.post(this.base_url + "api/Mail/Send", mail, { headers: this.mailheader });

  }

  getElectionMemoById(id) {
    return this.http.get(this.base_url + "api/Memo/GetById?Id=" + id)

  }


  pairSchool(code) {
    return this.http.post(this.base_url + "api/Schedule/UpdateSchoolPairing?EmisCode=" + code, { headers: this.Header })

  }


}
