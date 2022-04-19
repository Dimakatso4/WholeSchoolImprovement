import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HandOverService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  local_url ="https://localhost:5001";

  ///////////////get user by id///////////////////////
  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id="+id);

  }
 

  //////////////Get all users//////////////
  getAllUsers() {
    return this.http.get(this.base_url + "api/User/UserList")

  }

  //////////////////Roles////////////////////////
  getAllRoles() {
    return this.http.get(this.base_url + "api/ReferenceData/Roles")

  }
  
  //////////////////Designations////////////////////////
  getAllDesignations(){
    return this.http.get(this.base_url + "api/ReferenceData/Designations")
  }
  //////////////////District////////////////////////
  getAllDistricts() {
    return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }
  ////////////////school//////////////////////////
  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + id)

  }

  getSchoolsByEmis(emis) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + emis)

  }

  getHandoverByEmis(emis) {
    return this.http.get(this.base_url + "api/SGB/HandoverByEmisNo?EmisNumber=" + emis)

  }
  getHandoverBySchool(emis) {
    return this.http.get(this.base_url + "/api/SGB/HandoverByEmisNo?EmisNumber=" + emis)

  }

  getHandoverByDistrict(code) {
    return this.http.get(this.base_url + "/api/SGB/HandoverByDistrict?DistrictCode=" + code)

  }

    ////////////////Create Document//////////////////////////
      saveHandoverDocs(handoverDocs) {
        return this.http.post(this.base_url + "api/Document/Create", handoverDocs, { headers: this.Header })
      }

      getElectionDocs(id) {
        return this.http.get(this.base_url + "api/Document/DocumentList?Id="+id)
      }

      getElectionDocsEmis(emis) {
        return this.http.get(this.base_url + "api/Document/GetDocumentByEmisCode?EmisCode=" + emis)
      }

      saveHandover(createHandOver) {
            return this.http.post(this.base_url + "api/SGB/Handover",createHandOver).subscribe(data => {
              console.log('handover posted record');
             /// alert('handover posted record')
         }, error => {
           alert("handover creation unsuccesful")
             console.log(JSON.stringify(error.json()));
         });
       }

       setDueDateHandover(district, dueDate){
        return this.http.post(this.base_url + "api/SGB/CreateHandoverPerDistrict?DistrictCode="+district+"&DueDate="+dueDate+"", { headers: this.Header })
       }
    
}
