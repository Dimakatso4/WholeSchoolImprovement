import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoDashboardService {

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


  getElectionsBySchool(emis) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emis);

  }

  updateScheduleElection(newElection) {
    return this.http.post(this.base_url + "api/Schedule/Update", newElection)

  }


  sendMail(mail) {
    return this.http.post(this.base_url + "api/Mail/Send", mail, { headers: this.mailheader });

  }

  sendElectionNoticeToParents(emiscode, nominationdate, electiondate, electiontime, totalsgb, seo, principal, currentdate) {
    // console.log(this.base_url + "api/Mail/NoticeNominationElection?EmisCode=" + emiscode + "&NominationDate=" + nominationdate + "&ElectionDate=" + electiondate + "&ElectionStartEndTime=" + electiontime + "&SGBBoardMembersNoRequired=" + totalsgb + "&SEO=" + seo + "&Principal=" + principal + "&CurrentDate=" + currentdate)
    return this.http.post(this.base_url + "api/Mail/NoticeNominationElection?EmisCode=" + emiscode + "&NominationDate=" + nominationdate + "&ElectionDate=" + electiondate + "&ElectionStartEndTime=" + electiontime + "&SGBBoardMembersNoRequired=" + totalsgb + "&SEO=" + seo + "&Principal=" + principal + "&CurrentDate=" + currentdate, { headers: this.Header });


  }


  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

  getElectionMemoById(id) {
    return this.http.get(this.base_url + "api/Memo/GetById?Id=" + id)

  }


  getScheduledNominationByEmisCode(emisCode, date) {
    return this.http.get(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
  }


  getSGBNumberOfVoters(code) {
    return this.http.get(this.base_url + "api/SGB/GetSGBNumberOfParentMembers?EmisCode=" + code)
  }

}