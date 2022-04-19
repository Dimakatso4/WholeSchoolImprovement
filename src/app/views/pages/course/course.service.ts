import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;

  getAllTraining() {
    return this.http.get(this.base_url + "api/Training/TrainingList");
  }


  getTrainingByDistrict(code) {
    return this.http.get(this.base_url + "api/Training/TrainingListByDistrict?districtCode=" + code);
  }

  scheduleNewTraining(data) {
    return this.http.post(this.base_url + "api/Training/Create", data, { headers: this.Header })
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?Id=" + id)
  }


  updateTraining(id, data) {
    return this.http.post(this.base_url + "api/Training/Update?LoggedInUser=" + id, data, { headers: this.Header })
  }

  countTraining(name) {
    return this.http.get(this.base_url + "api/Training/Count?name=" + name)
  }

  getCourse(){
    return this.http.get(this.base_url + "api/Training/TrainingList");
  }

  getTraining(){
    return this.http.get(this.base_url + "api/ReferenceData/ElectionTrainingTypes");
  }

}
