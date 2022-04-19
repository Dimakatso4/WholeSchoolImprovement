import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { using } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {


  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;

   constructor(private http: HttpClient) { }

  getAllMeetings() {
    return this.http.get(this.base_url + "api/Meeting/MeetingList");
  }

  getTrainingTypes(){
    return this.http.get(this.base_url + "api/ReferenceData/TrainingTypes"); 
  }
  getMeetingByID(id){
    return this.http.get(this.base_url + "api/Meeting/GetById?Id="+id);
  }

  createNewMeeting(createProfile)
  {
   //console.log(JSON.stringify(createProfile));
        return this.http.post(this.base_url + "api/Meeting/Create",createProfile).subscribe(data => {
          console.log('posted record');
         
    }, error => {
      alert("Meeting/training creation unsuccesful")
        console.log(JSON.stringify(error.json()));
    });
  }

  
  updateNewMeeting(updateMeeting)
  {
        return this.http.post(this.base_url + "api/Meeting/Update",updateMeeting).subscribe(data => {
          console.log('posted record');
         
    }, error => {
      alert("meeting/training meeting update not successful")
        console.log(JSON.stringify(error.json()));
    });
  }
 

  getAllUsers() {
    return this.http.get(this.base_url + "api/User/UserList")

  }

  getAllvenues(){
    return this.http.get(this.base_url + "/api/ReferenceData/Venues")
  }
  
  
  getUsersByDistrict(district) {
    return this.http.get(this.base_url + "api/User/GetListOfDistrictUsers?districtCode="+district)

  }

  getUsersBySchool(emisCode) {
    return this.http.get(this.base_url + "/api/User/GetListOfSchoolUsers?emisCode="+emisCode)
  }

  getMeetingAtendees(meetingID) {
    return this.http.get(this.base_url + "api/Meeting/MeetingWithAttendees?MeetingId="+meetingID)

  }

  getMeetingDocuments(meetingID){
    return this.http.get(this.base_url + "/api/Meeting/MeetingDocumentDetails?MeetingId="+meetingID)
  }

  getMeetingByDistrict(districtCode){
    return this.http.get(this.base_url + "api/Meeting/DistrictMeetings?DistrictCode="+districtCode)
  }

  getMeetingBySchool(emisCode){
    return this.http.get(this.base_url + "api/Meeting/SchoolMeetings?EmisCode="+emisCode)
  }

  updateMeetingDocuments(userId,meetingid,meetingDocs){
      const headers = { 'content-type': 'application/json'}  
      const body= meetingDocs;
      return this.http.post(this.base_url + '/api/Meeting/AddMeetingDocuments?UserId='+userId+'&MeetingId='+meetingid,body,{'headers':headers}).subscribe(data => {
        console.log('posted record');  
  }, error => {
      //alert("No document uploaded")
      console.log(JSON.stringify(error.json()));
  });
}

updateMeetingAtendees(meetingid,atendees){
  const headers = { 'content-type': 'application/json'}  
      return this.http.post(this.base_url + "/api/Meeting/AddAttendees?MeetingId="+meetingid,atendees ,{'headers':headers}).subscribe(data => {
        console.log('posted record');
      
  }, error => {
    alert("Users not updated properly")
      console.log(JSON.stringify(error.json()));
  });
}

deleteAttendee(meetingid){
    return this.http.post(this.base_url + "/api/Meeting/DeleteAttendee?MeetingId="+meetingid,{ headers: this.Header }).subscribe(data => {
      console.log('posted record');
      
  }, error => {
    alert("Users not updated")
      console.log(JSON.stringify(error.json()));
  });
}


  getNewlyElectedSBG(){ return [{"name":"tsheko"}];};
  getOutGoingSBG(){};
  addOutGoingSGB(meetingId){};
  addMeeting(){ return true;}
}
