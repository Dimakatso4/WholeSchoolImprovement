import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementPlanService {

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  DcHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + "api/Upload/Document";

  constructor(private http: HttpClient) { }

  saveDocumentPath(docInfo) {
    return this.http.post(this.base_url + "api/Document/Create", docInfo, { headers: this.Header })
  }

  updateDocumentPath(docInfo) {
    return this.http.post(this.base_url + "api/Document/Update", docInfo, { headers: this.Header })
  }


  getDocumentById(id) {
    return this.http.get(this.base_url + "api/Document/DocumentList?Id=" + id)
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
    return this.http.post(this.base_url + "api/Document/Delete?Id=" + id, { headers: this.Header });
  }

  getDocumentCount() {
    return this.http.get(this.base_url + "api/Document/Count");
  }

  getDocumentTypes() {
    return this.http.get(this.base_url + "api/ReferenceData/DocumentTypes");
  }

    
  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + id)

  }
  
  getAllDistricts() {
    return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }
  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }

  uploadDocument(doc) {
    return this.http.post(this.uploadLink, doc)
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

}
