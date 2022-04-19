
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisputesService {

  constructor(private http: HttpClient) { }


  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);
  }

  getRoleById(id) {
    return this.http.get(this.base_url + "api/User/UserRole?UserId=" + id);
  }

  getElectionResultsBySchool(school) {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultBySchool?EmisCode=" + school);
  }

  createDispute(data) {
    return this.http.post(this.base_url + "api/Dispute/CreateOrUpdate", data, { headers: this.Header })
  }

  getDisputesByDistrict(district) {
    return this.http.get(this.base_url + "api/Dispute/DisputesPerDistrictList?DistrictCode=" + district)
  }

  getDisputesById(id) {
    return this.http.get(this.base_url + "api/Dispute/GetById?Id=" + id)
  }

  getDisputesBySchool(school) {
    return this.http.get(this.base_url + "api/Dispute/DisputesPerSchoolList?EmisCode=" + school)
  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }

  getFeedbackByDispute(id) {
    return this.http.get(this.base_url + "api/Dispute/FeedbackList?DisputeId=" + id)
  }

  createFeedback(id, feedback, userId, status, assignto) {
    console.log(this.base_url + "api/Dispute/CreateFeedback?DisputeId=" + id + "&Feedback=" + feedback + "&CreatedBy=" + userId + "&AssignedTo=" + assignto + "&Status=" + status);
    return this.http.post(this.base_url + "api/Dispute/CreateFeedback?DisputeId=" + id + "&Feedback=" + feedback + "&CreatedBy=" + userId + "&AssignedTo=" + assignto + "&Status=" + status, { headers: this.Header })
  }

  getSchoolsByDistrict(code) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?DistrictCode=" + code)
  }

  getDisputesByHO(){
    return this.http.get(this.base_url + "api/Dispute/DisputeList")
  }  
  
  updateFeedback(id, userid, assign, status) {
    return this.http.post(this.base_url + "api/Dispute/UdateFeedback?DisputeId=" + id + "&CreatedBy=" + userid + "&AssignedTo=" + assign + "&Status=" + status, { headers: this.Header });
  }

  getAllDistricts() {
    return this.http.get(this.base_url + "api/ReferenceData/Districts");
  }
    
  getSchoolByParentId(id) {
    return this.http.get(this.base_url + "api/Parent/GetChildrenSchoolByParentId?ParentId=" + id, { headers: this.Header })
  }

}
