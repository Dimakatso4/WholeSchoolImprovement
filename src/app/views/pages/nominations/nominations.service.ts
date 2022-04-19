import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NominationsService {

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

  base_url = environment.base_url;;

  constructor(private http: HttpClient) { }

  getNominationsList(emisCode, isNominated) {
    return this.http.get(this.base_url + "api/User/GetListOfParents?EmisCode=" + emisCode + "&IsNomination=" + isNominated);
  }

  saveNominations(loggedInUser, nominatedUserId, nominated, seconded, emiscode) {
    console.log(this.base_url + "api/User/SaveNominations?LoggedUserId=" + loggedInUser + "&NominatedUserId=" + nominatedUserId + "&Nominated=" + nominated + "&seconded=" + seconded + "&EmisCode=" + emiscode);
    return this.http.post(this.base_url + "api/User/SaveNominations?LoggedUserId=" + loggedInUser + "&NominatedUserId=" + nominatedUserId + "&Nominated=" + nominated + "&seconded=" + seconded + "&EmisCode=" + emiscode, { headers: this.Header });
  }

  getScheduledNominationByEmisCode(emisCode, date) {
    return this.http.get(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
  }

  getBallotBySchool(emisCode) {
    return this.http.get(this.base_url + "api/Voting/GetSchoolBallot?EmisCode=" + emisCode);
  }


  addParentToBallot(parent) {
    console.log(JSON.stringify(parent))
    return this.http.post(this.base_url + "api/Voting/AddParentBallot", parent, { headers: this.Header });
  }

  sendNominationNotification(id, emisCode) {
    // console.log(this.base_url + "api/SMS/SendNominationSMSParent?ParentId=" + id + "&EmisCode=" + emisCode)
    return this.http.post(this.base_url + "api/SMS/SendNominationSMSParent?ParentId=" + id + "&EmisCode=" + emisCode, { headers: this.Header });
  }


  getPrincipalBySchool(emisCode) {
    // console.log(this.base_url + "api/User/GetPrincipalUserBySchool?EmisCode=" + emisCode)
    return this.http.get(this.base_url + "api/User/GetPrincipalUserBySchool?EmisCode=" + emisCode);
  }

  checkIfParentNominated(id) {
    return this.http.get(this.base_url + "api/User/CheckIfParentNominatedSeconded?UserId=" + id);
  }

  // getParentById(id) {
  //   return this.http.get(this.base_url + "api/User/CheckIfParentNominatedSeconded?UserId=" + id);

  // }

  sendPrincipalNotification(id, emisCode, reason) {
    return this.http.post(this.base_url + "api/SMS/SendNominationSMSParent?ParentId=" + id + "&EmisCode=" + emisCode + "&Reason=" + reason, { headers: this.Header });
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);
  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  markAsDeclineNomination(parentId, emisCode) {
    // console.log(this.base_url + "api/SMS/SendNominationSMSParent?ParentId=" + id + "&EmisCode=" + emisCode)
    return this.http.post(this.base_url + "api/Nomination/MarkAsDeclineNomination?EmisCode=" + emisCode + "&ParentId=" + parentId, { headers: this.Header });
  }


  checkIfParentDecided(emiscode, parentid) {
    // console.log(this.base_url + "/api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
    return this.http.get(this.base_url + "api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
  }

  submitParentDecision(emiscode, parentid, decision) {
    console.log(this.base_url + "api/Nomination/MarkAsAcceptDeclineNomination?EmisCode=" + emiscode + "&ParentId=" + parentid + "&ParentResponse=" + decision)
    return this.http.post(this.base_url + "api/Nomination/MarkAsAcceptDeclineNomination?EmisCode=" + emiscode + "&ParentId=" + parentid + "&ParentResponse=" + decision, { headers: this.Header });
  }

  getNominatedParents(emiscode) {
    // console.log(this.base_url + "/api/Nomination/GetAcceptDeclineNominationsByParent?EmisCode=" + emiscode + "&ParentId=" + parentid)
    return this.http.get(this.base_url + "/api/Parent/GetNominatedParents?EmisCode=" + emiscode)
  }

  getElectionsBySchool(emis) {
    return this.http.get(this.base_url + "api/Schedule/ScheduleByEmisCode?EmisCode=" + emis);

  }


  sendMail(mail) {
    return this.http.post(this.base_url + "api/Mail/Send", mail, { headers: this.mailheader });

  }

}
