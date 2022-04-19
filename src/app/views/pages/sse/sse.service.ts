import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SSEComponents } from '../../../model/sse-components.model';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  localStorage: Storage;

  changes$ = new Subject();

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });




  constructor(private http: HttpClient) {
    this.localStorage = window.localStorage;
  }

  base_url = environment.base_url;

  uploadLink = this.base_url + "api/Upload/Document";

  getSSEInstrumentAll() {
    return this.http.get(this.base_url + "api/SSEInstrument/GetSSEInstrumentAll");
  }

  getAllDistricts() {
    return this.http.get(this.base_url + "api/district/getdistrictlist");
  }

  createComponent(Data) {
    return this.http.post(this.base_url + "api/SSEComponent/CreateComponent", Data).subscribe(data => {
      console.log('New Component successfully created');

    }, error => {
      alert("Component creation unsuccesful")
      console.log(JSON.stringify(error.json()));
    });
  }

  GetSSEComponentAll() {
    return this.http.get(this.base_url + "api/SSEComponent/GetAllSSEComponent");
  }

  GetSSEComponentByID(CompID) {
    return this.http.get(this.base_url + "api/SSEComponent/GetSSEComponentByID?ID=" + CompID);
  }

  GetSSEComponentByAreaOfEvaluationID(CompID) {
    return this.http.get(this.base_url + "api/ManageComponent/GetSSEComponentByAreaID?ID=" + CompID);
  }

  getSchoolsByDistrict(districtCode) {
    return this.http.get(this.base_url + "api/School/GetSchoolByDistricts?districtcode=" + districtCode);
  }

  getSchoolsByDistrictCode(districtCode) {
    return this.http.get(this.base_url + "api/School/GetSchoolsByDistrict?DistrictCode=" + districtCode);
  }

  getDistrictByCode(districtCode) {
    return this.http.get(this.base_url + "api/District/GetDistrictNameByDistrictCode?DistrictCode=" + districtCode);
  }

  getSchoolByEmisCode(eimscode) {
    return this.http.get(this.base_url + "api/School/GetSchoolByEmisCode?EmisCode=" + eimscode);
  }

  getAllBusinessUnit() {
    return this.http.get(this.base_url + "api/BusinessUnit/GetBusinessUnit");
  }
  getAllAreaOfEvaluation(): Observable<SSEComponents[]> {
    return this.http.get<SSEComponents[]>(this.base_url + "api/AreaOfEvaluation/GetAreaOfEvaluationList");
  }

  GetAreaOfEvaluationById(id) {
    return this.http.get(this.base_url + "api/AreaOfEvaluation/GetAreaOfEvaluationById?Id=" + id);
  }

  getLastSSEInstrument() {
    return this.http.get(this.base_url + "api/SSEInstrument/GetSSEInstrumentLastID");
  }

  getSSEInstrument() {
    return this.http.get(this.base_url + "api/SSEInstrument/GetSSEInstrument");
  }
  getSSEInstrumentByID(id) {
    return this.http.get(this.base_url + "api/SSEInstrument/GetSSEInstrumentById?Id=" + id);
  }

  createInstrument(instrumentInfo) {
    //console.log(JSON.stringify(createProfile));
    return this.http.post(this.base_url + "api/SSEInstrument/CreateSSEInstrument", instrumentInfo).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("SSE creation unsuccesful")
      console.log(JSON.stringify(error.json()));
    });
  }

  createSelectedKPI(KPIInfo) {
    //console.log(JSON.stringify(createProfile));
    return this.http.post(this.base_url + "api/SSEInstrument/CreateSSESelectedKPI", KPIInfo).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Selected KPI creation unsuccesful")
      console.log(JSON.stringify(error.json()));
    });
  }

  updateReviewSE(updateReviewSSE) {
    return this.http.patch(this.base_url + "api/SSEInstrument/UpdateReviewSSE", updateReviewSSE).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Review SSE not successful")
    });
  }

  GetAllSSEQuestion() {
    return this.http.get(this.base_url + "api/ManageKPI/GetAllKPIQuestion");
  }

  GetAllSSEQuestionBYID(instrimentID) {
    return this.http.get(this.base_url + "api/SSEQuestions/GetKPIQuestionByID?instrumentId=" + instrimentID);
  }

  createSSEQuestions(QuestionInfo) {
    return this.http.post(this.base_url + "api/SSEQuestions/CreateSSEQuestions", QuestionInfo).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("SSE creation unsuccesful")
      console.log(JSON.stringify(error.json()));
    });
  }



  GetAllKPIQuestion() {
    return this.http.get(this.base_url + "api/KPIQuestion/GetAllKPIQuestion");
  }

  GetAllKPIQuestionBYID(id) {
    return this.http.get(this.base_url + "api/KPIQuestion/GetKPIQuestionByID?areaOfEvaluationID=" + id);
  }

  GetKPIQuestionBYAreaOfEvaluationID(areaofevaluationid) {
    return this.http.get(this.base_url + "api/KPIQuestion/GetKPIQuestionByAreaOfEvaluationID?areaOfEvaluationID=" + areaofevaluationid);
  }

  createKPIQuestion(KPIInfo) {
    return this.http.post(this.base_url + "api/KPIQuestion/CreateKPI", KPIInfo).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("KPI creation unsuccesful")
      console.log(JSON.stringify(error.json()));
    });
  }
  GetCompletedSSE() {
    return this.http.get(this.base_url + "api/CompleteSSE/GetCompleteSSE");
  }

  updateCompletedSSE(updateCompleteSSE) {
    return this.http.patch(this.base_url + "api/CompleteSSE/UpdateCompleteSSE", updateCompleteSSE).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Complete SSE update not successful")
      //console.log(JSON.stringify(error.json()));
    });
  }

  updateBUCompletedSSE(updateBUCompleteSSE) {
    return this.http.patch(this.base_url + "api/CompleteSSE/UpdateBUCompleteSSE", updateBUCompleteSSE).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Complete SSE update not successful")
      //console.log(JSON.stringify(error.json()));
    });
  }

  updateReviewCompleteSSE(updateReview) {
    return this.http.patch(this.base_url + "api/CompleteSSE/UpdateReviewCompleteSSE", updateReview).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Review not successful")
      // console.log(JSON.stringify(error.json()));
    });
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  getInstrumentName() {
    return localStorage.getItem("instrumentName");
  }

  GetAllLegislations() {
    return this.http.get(this.base_url + "api/ManageLegislation/GetLegislationAll");
  }

  GetAllKpis(userId, emisNumber) {
    return this.http.get(this.base_url + "api/SSEInstrumentTool/GetInstrumentToolKPIs?userId=" + userId + "&emisnumber=" + emisNumber);
  }


  GetAllKpi(userId, emisNumber) {
    return this.http.get(this.base_url + "api/SSEInstrumentTool/GetInstrumentToolKPIs");
  }

  GetKPISchoolResponseAll(emisNumber) {
    return this.http.get(this.base_url + "api/SchoolKPIs/GetKPISchoolResponseAll?emisNumber=" + emisNumber);
  }


  CheckIfSSEExists(emisNumber) {
    return this.http.get(this.base_url + "api/SchoolKPIs/CheckIfSSEExists?emisNumber=" + emisNumber);
  }


  GetAllSchoolKPIBySchool(emisNumber) {
    return this.http.get(this.base_url + "api/SchoolKPI/GetAllKpiBySchool?emisnumber=" + emisNumber);
  }

  addKpi(addkpi: any) {
    return this.http.post(this.base_url + "api/KPI/AddKPI", addkpi).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Add kpi not successful")
      // console.log(JSON.stringify(error.json()));
    });
  }

  updateKPI(updateKPI) {
    return this.http.patch(this.base_url + "api/KPI/UpdateKPI", updateKPI).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("KPI update not successful")
      // console.log(JSON.stringify(error.json()));
    });
  }

  getAllKPIInstrumentTools() {
    return this.http.get(this.base_url + "api/SSEInstrumentTool/GetInstrumentToolList");
  }

  createSSE(createSSE) {
    return this.http.post(this.base_url + "api/SchoolKPIs/CreateResponse", createSSE);
  }

  saveSSE(sse) {
    return this.http.post(this.base_url + "api/SchoolKPIs/saveSSE", sse);
  }


  SIPLogged(createSSE) {
    return this.http.post(this.base_url + "api/SchoolKPIs/SIPLogged", createSSE);
  }

  PublishSSE(createSSE) {
    return this.http.post(this.base_url + "api/SchoolKPIs/PublishSSE", createSSE);
  }

  CreateKPIInstrumentTools(addkpi: any) {
    return this.http.post(this.base_url + "api/SSEInstrumentTool/CreateInstrumentTool", addkpi).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("Add kpi not successful")
      // console.log(JSON.stringify(error.json()));
    });
  }

  UpdateKPIInstrumentTools(updateKPI) {
    return this.http.patch(this.base_url + "api/SSEInstrumentTool/UpdateInstrumentTool", updateKPI).subscribe(data => {
      console.log('posted record');

    }, error => {
      alert("KPI update not successful")
      // console.log(JSON.stringify(error.json()));
    });
  }

  GetKPISchoolResponseTotals(id, emiscode) {
    return this.http.get(this.base_url + "/api/SchoolKPIs/GetKPISchoolResponseTotals?AreaOfEvaluationID=" + id + "&EmisNumber=" + emiscode);
  }

}
