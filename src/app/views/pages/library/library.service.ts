import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json;odata=verbose',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    'Allow': 'POST'
    
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + "api/Upload/Document";
 

  constructor(private http: HttpClient) { }

  saveDocumentPath(electionDocs) {
    return this.http.post(this.base_url +"api/Document/Create", electionDocs, { headers: this.Header })
  }

  getDocumentById(id) {
    return this.http.get(this.base_url + "api/Document/DocumentList?Id=" + id)
  }

  getDocumentHistoryByAreaOfEvaluationId(id) {
    return this.http.get(this.base_url + "api/Document/GetDocumentHistoryList?Id=" + id)
  }


  getDocumentByUser(id) {
    return this.http.get(this.base_url + "api/Document/GetDocumentByUser?UserId=" + id)
  }

  getDocumentBySchool(emiscode, usertype) {
    return this.http.get(this.base_url + "api/User/GetListOfUsers?EmisCode=" + emiscode + "&UserType=" + usertype)
  }

  getDocumentByType(id) {
    return this.http.get(this.base_url + "api/Document/GetDocumentByType?DocumentTypeId=" + id)
  } 

  deleteDocument(id) {
    console.log(JSON.stringify(this.base_url + "api/Document/Delete?Id=" + id))
    return this.http.post(this.base_url + "api/Document/Delete?Id=" + id, { headers: this.Header });
  }

  getDocumentCount() {
    return this.http.get(this.base_url + "api/Document/Count");
  }

  getDocumentTypes() {
    return this.http.get(this.base_url + "api/ReferenceData/DocumentTypes");
  }

  uploadDocument(doc) {    
    return this.http.post(this.uploadLink, doc)
  }

  //Get documents list
  getDocumentList(){
    return this.http.get(this.base_url +"api/Document/GetDocumentList");
  }
  //Get documents list
  getDocumentHistoryList(id) {
    return this.http.get(this.base_url + "api/Document/GetDocumentHistoryList?AreaOfEvalutionID="+id);
  }

  //Get all area of Evaluation
  getAllAreaofEvaluation(){
    return this.http.get(this.base_url + "api/AreaOfEvaluation/GetAreaOfEvaluationList")
  }

  //Get all the document statuses
  GetDococumentStatusList(){
    return this.http.get(this.base_url + "api/PolicyDocumentStatus/GetDococumentStatusList")
  }

  getAllDocumentNames(){
    return this.http.get(this.base_url +"api/Document/GetDocumentName")
  }
  //get users list 
  getUsers(){
    return this.http.get(this.base_url +"api/Users/GetUserList")
  }

  //Update status if delete icon is pressed
  updateDocumentStatus(doc){
    return this.http.patch(this.base_url +"api/Document/UpdateDocument",doc)
  }

  //Update status if delete icon is pressed
  deleteDocumentLibrary(doc) {
    return this.http.post(this.base_url + "api/Document/DeleteDocument", doc)
  }

  //Send sms 
  sendSMS(cellNo,message){
    return this.http.post(this.base_url +"api/SMS/SendMessage?MobileNumber=" + cellNo + "&Message=" + message ,{ headers: this.Header })
  }

  //Send email
  DocumentEmail(userId){
    return this.http.post(this.base_url +"api/Mail/DocumentEmail?UserName=" + userId, {headers: this.Header})

  }

  //Get Role Name by UserId
  GetRoleNamebyUserId(userId){
    return this.http.get(this.base_url +"api/Users/GetUserById?Id=" + userId, {headers: this.Header})

  }

  getUserById(id) {
   return  this.http.get(this.base_url + "api/User/GetById?id=" + id, {headers: this.Header});

  }

  getUserInfoById(id){
    return this.http.get(this.base_url + "api/Users/GetUserById?Id="+id)
  }

  SendBulkEmail(sendMailObj){
    return this.http.post(this.base_url + "api/Mail/SendBulkEmail",sendMailObj, { headers: this.Header })  
  }



}
