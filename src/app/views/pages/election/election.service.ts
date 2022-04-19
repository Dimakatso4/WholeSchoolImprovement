import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
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
    console.log(candidate);
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


  getElectionResultsByDistrict(districtCode) {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultsByDistrict?districtCode=" + districtCode);

  }

  getElectionResultsByHO() {
    return this.http.get(this.base_url + "api/ElectionResult/getElectionResultsByHO");

  }

  createDeoWeeklyDashboard(newDashboard) {
    console.log(newDashboard);
    return this.http.post(this.base_url + "api/DEOWeeklyDashboard/Create", newDashboard).subscribe(data => {
      console.log('posted record');
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }

  updateDeoWeeklyDashboard(updateDashboard) {
    console.log(updateDashboard);
    return this.http.post(this.base_url + "api/DEOWeeklyDashboard/Update", updateDashboard).subscribe(data => {
      console.log('posted record');
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }

 /* updateDeoWeeklyDashboard(updateDashboard) {
    return this.http.post(this.base_url + "api/DEOWeeklyDashboard/Update", updateDashboard)

  }*/

  getDeoWeeklyDashboard(logeInUserid) {
    (logeInUserid)
    return this.http.get(this.base_url + "api/DEOWeeklyDashboard/GetDEOWeeklyDashboardByDEOId?DEOId=" + logeInUserid);

  }

  getDeoWeeklyReportByDistrict(code) {
    return this.http.get(this.base_url + "api/DEOWeeklyDashboard/GetDeoWeeklyReportByDistrict?DistrictCode=" + code);

  }


  getDEOByDitrict(code) {
    return this.http.get(this.base_url + "api/User/GetDEOUsersByDistrict?DistrictCode=" + code);

  }

  getSEOBySchool(school) {
    return this.http.get(this.base_url + "api/User/GetSEOUsersBySchool?emisCode=" + school);
  }

  createMonitoringTool(data) {
    return this.http.post(this.base_url + "api/ElectionMonitoringTool/Create", data);
  }

  getMonitoringToolPerUser(id) {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetElectionMonitoringToolByPEMId?PEMId=" + id);
  }


  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }

  getMonitoringToolById(id) {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetElectionMonitoringToolById?Id=" + id);
  }

  getMonitoringToolBySchool(school) {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetElectionMonitoringToolBySchool?emisNumber=" + school);
  }
  
  getAllMonitoringToolBySchool(school) {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetAllElectionMonitoringToolBySchool?emisNumber=" + school);
  }

  updateMonitoringTool(data) {
    return this.http.post(this.base_url + "api/ElectionMonitoringTool/Update", data);
  }

  getDailyReportByCode(code, startDate, endDate) {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetDEODailyReportingElectionMonitoringTool?DistrictCode=" + code + "&StartDate=" + startDate + "&EndDate=" + endDate)
  }

  getCountByCode(code, startDate, endDate) {
    console.log(this.base_url + "api/ElectionMonitoringTool/GetDEOReportingElectionMonitoringToolDailyStats?DistrictCode=" + code + "&StartDate=" + startDate + "&EndDate=" + endDate)
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetDEOReportingElectionMonitoringToolDailyStats?DistrictCode=" + code + "&StartDate=" + startDate + "&EndDate=" + endDate)
  }

  getAllDirectorate() {
    return this.http.get(this.base_url + "api/ElectionMonitoringTool/GetDEOReportingElectionMonitoringToolDailyStats")
  }

  captureNewReport(report) {
    return this.http.post(this.base_url + "api/ElectionMonitoringTool/ManualElectionMonitoringCapture", report)
  }
  
  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + id)

  }

  getNumberOfVotesAllowed(emisCode) {
    return this.http.get(this.base_url + "api/SGB/GetSGBNumberOfParentMembers?EmisCode=" + emisCode)

  }
   

  
  getElectionsBySchool(emis) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emis);

  }

}
