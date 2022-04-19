import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ManagementPlan, Responsibility, Status,Activity } from '../../../model/management-plan.model';
import { FormGroup } from '@angular/forms';

export interface data {
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManagementWsiService {

  constructor(private http: HttpClient) { }


  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + "api/Upload/Document";
  
  createManagementPlan(data) {
    
    return this.http.post(this.base_url + "api/ManagementPlan/CreateManagementPlan" , data, { headers: this.Header })
  }
  
  getManagementPlan(){
    //return this.http.post("https://localhost:5001/api/ManagementPlan/GetManagementPlanList" , data, { headers: this.Header })
    let url =this.base_url + "api/ManagementPlan/GetManagementPlanListForCES";return this.http.get(url);
    //return this.http.get("https://localhost:5001/api/ManagementPlan/GetManagementPlanList=" + id)
  }
  //updateActivity
  Activity( planID,
    activityName,
    responsibility,
    startDate,
    endDate,
    //year,
    status,
    comment){
   // console.log(data);

    return this.http.post(this.base_url + "api/ManagementPlan/UpdateActivityPlan?PlanID="+planID+"&ActivityName="+ activityName+"&Responsibility="+ responsibility+"&StartDate="+  startDate+"&EndDate="+endDate+"&Status="+  status+"&Comment="+comment,{ headers: this.Header });
  }
  //review Activity
  updateActivity(formValue){
    console.log(formValue.comment);
    return this.http.patch(this.base_url + "api/ManagementPlan/UpdateReviewActivityPlanByID?PlandID=" +formValue.planID,formValue);
  }
  //getActivitybyId
  getActivityById(id)
  {
    //console.log(id);
   return this.http.get(this.base_url + "api/ManagementPlan/ReviewActivityPlanByID?ID="+ id );
  }
  ///createschoolterms
  createTerm(data)
  {
    return this.http.post(this.base_url + "api/SchoolTerms/CreateSchoolTerm" , data, { headers: this.Header })
  //return this.http.post(this.base_url + "api/Login/AuthenticateOfficial", jsonData, { headers: this.Header })
  }
  //getSchoolTerms
  getSchoolTerm()
  {
    return this.http.get(this.base_url + "api/SchoolTerms/ListTermCalendar")
  //return this.http.post(this.base_url + "api/Login/AuthenticateOfficial", jsonData, { headers: this.Header })
  }
  ActivityList(): Observable<Activity[]>{

    return this.http.get<Activity[]>('https://wsiserviceapi.azurewebsites.net/api/ActivityName/GetActivityNameList')

  }

 
  statusList()
  {
    return this.http.get(this.base_url + "api/ManagementPlanStatus/GetResponsiblePersonList")
  }

  schooltermById(id)
  {
return this.http.get(this.base_url + "api/SchoolTerms/GetSchoolTermByID?ID="+ id );
  
  }
  
  updateSchoolTermbyId(formValue){
    console.log(formValue);
    return this.http.patch(this.base_url + "api/SchoolTerms/UpdateSchoolTermByID?ID=" +formValue.termID,formValue);
  }

  districtManagement()
  {
    return this.http.get(this.base_url + "api/DistrictManagementPlan/GetDistrictManagementPlanList")
  }
  getAllManagementDocument()
  {
    return this.http.get(this.base_url + "api/ManagementPlan/GetAllManagementDocuments")
  }
  getManagementDocumentById(id)
  {
   return this.http.get(this.base_url + "api/ManagementPlan/ViewManagementDocumentByID?ID="+ id)
  }
  updateDocumentManagement(formValue)
  {
     return this.http.patch(this.base_url + "api/ManagementPlan/UpdateManagementDocumentByID"+formValue.planID,formValue)
  }
  
  createManagementDocument( data)
  {
    return this.http.post(this.base_url + "api/ManagementPlan/CreateManagementDocument" , data, { headers: this.Header })

  }

  addNewActivity(data)
  {
    return this.http.post(this.base_url + "api/ActivityName/CreateActivityName", data, { headers: this.Header })
  }
   AddSubActivity(data)
   {
    return this.http.post(this.base_url + "api/DistrictManagementPlan/CreateDistrictManagementPlanActivity", data, { headers: this.Header })

   }
   HeadSubActivity(data)
   {
    return this.http.post(this.base_url + "api/HeadOfficeSubActivityPlan/CreateHeadOfficeSubActivityPlanActivity", data, { headers: this.Header })

   }
   GetHeadOfficeSubListByMainId(ActiviityId)
   {
     return this.http.get(this.base_url+"api/HeadOfficeSubActivityPlan/GetHeadOfficeSubActivityPlanByMainActivity?MainActivityID="+ActiviityId)
   }
   GetHeadOfficeSubList(){
    return this.http.get(this.base_url+"api/HeadOfficeSubActivityPlan/GetHeadOfficeSubActivityPlanList")
  }
   getAllSubActivities(managementPlanActivityId,districtCode)
   {
    return this.http.get(this.base_url + "api/DistrictManagementPlan/GetDistrictManagementPlanByMainActivity?MainActivityID="+managementPlanActivityId+"&DistrictCode="+districtCode)
   }
   getSubActivityById(id)
   {
    return this.http.get(this.base_url + "api/DistrictManagementPlan/GetDistrictManagementPlanByID?ID="+id)
   }
   UpdateSubActivityById( id,
    districtCode,
    managementPlanActivityId,
    subActivity,
    responsibility,
    startDate,
    endDate,
    periodID,
    statusID
   )
   {

      return this.http.post(this.base_url + "api/DistrictManagementPlan/UpdateDistrictManagementPlan1?Id="+id+"&SubActivity="+subActivity+"&Responsibility="+responsibility+"&StartDate="+startDate+"&EndDate="+endDate+"&ManagementPlanActivityId="+managementPlanActivityId+"&DistrictCode="+districtCode+"&PeriodID="+periodID+"&StatusID="+statusID, { headers: this.Header })
   }
   UpdateHeadSub(id,SubActivity,Responsibility,StartDate,EndDate,ManagementPlanActivityId,PeriodID,StatusID

   )
   {
     return this.http.post(this.base_url+"api/HeadOfficeSubActivityPlan/UpdateHeadOfficeSubActivityPlan?Id="+id+"&SubActivity="+SubActivity+"&Responsibility="+Responsibility+"&StartDate="+StartDate+"&EndDate="+EndDate+"&ManagementPlanActivityId="+ManagementPlanActivityId+"&PeriodID="+PeriodID+"&StatusID="+StatusID, { headers: this.Header })

   }
  getManagementPlans(): Observable<ManagementPlan[]>{
    return this.http.get<ManagementPlan[]>('https://wsiserviceapi.azurewebsites.net/api/ManagementPlan/GetManagementPlanList');
  }
  

  createManagementPlans(ManagementPlans: ManagementPlan[]){
    return this.http.post( this.base_url+"api/ManagementPlan/CreateManagementPlan",
          ManagementPlans, { headers: this.Header })
  }

  getStatuses(): Observable<Status[]>{
    return this.http.get<Status[]>('https://wsiserviceapi.azurewebsites.net/api/ManagementPlanStatus/GetStatusList');
  }
  getResponsibleList(): Observable<Responsibility[]>{

    return this.http.get<Responsibility[]>('https://wsiserviceapi.azurewebsites.net/api/ResponsiblePerson/GetResponsiblePersonList')

  }
  getAllPeriod(){
    return this.http.get(this.base_url+"api/Period/GetPeriodAll")
  }
  
  checkActivity(Activity,periodID)
  {
    return this.http.get(this.base_url+"api/ManagementPlan/ManagementPlanGetByActivityName?ActivityName="+Activity+"&periodID="+periodID)
  }

 UpdateStatuById(planId,StatusID)
 {
  return this.http.post(this.base_url+"/api/ManagementPlan/UpdateStatusByPlanID?PlanID="+planId+"&StatusID="+StatusID, { headers: this.Header })
  }
  ManagementListCapture(){
    return this.http.get(this.base_url+"api/ManagementPlan/GetManagementPlanListForCES")
  }
  ManagementListReview(){
    return this.http.get(this.base_url+"api/ManagementPlan/GetManagementPlanListForDirector")
  }
  ManagementListView(){
    return this.http.get(this.base_url+"api/ManagementPlan/GetManagementPlanListPublished")
  }

  updateSubById( id,StatusID)
  {
    console.log(id,StatusID)
    return this.http.post(this.base_url+"api/DistrictManagementPlan/UpdateStatusById?Id="+ id+"&StatusID="+StatusID, { headers: this.Header })
  }
  
  updateHeadById( id,StatusID)
  { console.log( id,StatusID)
    return this.http.post(this.base_url+"api/HeadOfficeSubActivityPlan/UpdateStatusById?Id="+ id+"&StatusID="+StatusID, { headers: this.Header })
  }
  getAllDistricts() {
    return this.http.get(this.base_url + "api/district/getdistrictlist");
  }
  getStatusReview()
  {
    return this.http.get(this.base_url+"/api/ManagementPlanStatus/GetStatusByApprovedandUpdate")  
  }
  getDipList(){
    return this.http.get(this.base_url+"api/School/GetKPIDIP")
  }
  getKPIsByDistrict(districtCode)
  { return this.http.get(this.base_url+"api/School/GetKPIDIP?DistrictCode="+districtCode)

  }
  getSchoolsKPIsByDistrict(districtCode,schoolKPIID) {
    return this.http.get(this.base_url + "api/School/GetSchoolsKPIDIP?DistrictCode=" + districtCode + "&schoolkpiid=" + schoolKPIID)

  }
  getSchoolsPip()
  {  return this.http.get(this.base_url+"api/School/GetKPIPIP")

  }
  
  getAll(){
    return this.http.get(this.base_url+"api/HeadOfficeSubActivityPlan/GetHeadOfficeSubActivityPlanList")
  }
  getPipList(){
    return this.http.get(this.base_url+"api/School/GetKPIPIP")
  }
  createActionPlan(actionPlan){
    return this.http.post(this.base_url + "api/SIPActionPlan/CreateDIPActionPlan", actionPlan)
  }
  createPIPPlan(actionPlan){
    return this.http.post(this.base_url + "/api/SIPActionPlan/CreatePIPActionPlan", actionPlan)
  }
  GetActionPlansByDistrictCode(districtCode,kpiId)
  {
    return this.http.get(this.base_url + "api/SIPActionPlan/GetSIPActionPlanByDistrictCode?districtCode="+districtCode+"&kpiId="+kpiId);
  }
  
  submitSIPtoDistrict(updatedSIP)
  {
    return this.http.post(this.base_url + "api/SIPActionPlan/UpdateSIPActionPlan", updatedSIP);
  }

  UpdateDIP(actionPlan)
  {
    return this.http.post(this.base_url+"api/SIPActionPlan/UpdateSIPActionPlanPerKPI",actionPlan)

  }
  UpdatePIP(actionPlan)
  {
    return this.http.post(this.base_url+"api/SIPActionPlan/UpdateSIPActionPlanPerKPI",actionPlan)

  }
  GetActionPipPlan(kpiId)
  {
    return this.http.get(this.base_url + "api/SIPActionPlan/GetSIPActionPlanForHO?KpiID="+kpiId+"&HO=HO");
  }
  getOfficeLevel() {
    return this.http.get(this.base_url + "api/Users/GetOfficeLevel")

  }
  getSchoolPosition() {
    return this.http.get(this.base_url + "api/Users/GetSchoolPosition")
  }
  

  GetPositionList(officelevel)
 {
   return this.http.get(this.base_url+"api/ResponsiblePerson/GetOfficeLevel?Officelevel="+officelevel)
 }
 getPlanById(planID)
 {
   return this.http.get(this.base_url+"api/ManagementPlan/ViewManagementPlanByID?ID="+planID)
 }
  getAddDipPlan(districtCode)
  {
    return this.http.get(this.base_url+"api/SIPActionPlan/GetSIPActionPlanByDistrictCode?DistrictCode="+districtCode)
  }
  VerfyDipPlan(districtCode,kpiId)
  {
    return this.http.get(this.base_url+"api/SIPActionPlan/GetDIPActionPlanForVerification?DistrictCode="+districtCode+"&kPIID="+kpiId)
  }
  reviewDipPlan(districtCode,kpiId)
  {
    return this.http.get(this.base_url+"api/SIPActionPlan/GetDIPActionPlanForReview?DistrictCode="+districtCode+"&kPIID="+kpiId)
  }

  saveProgressData(evidenceModel){
    return this.http.post(this.base_url + "api/SIPActionPlanComments/CreateSIPActionPlanComments", evidenceModel, { headers: this.Header })

  }

  getDipActionPlanById(sipActionPlanId){
    return this.http.get(this.base_url+ "api/SIPActionPlanComments/GetDIPActionPlanCommentsBySipActionPlanID?SipActionPlanID="+ sipActionPlanId)

  }
  UpdateProgress(evidenceModel)
  {
    return this.http.post(this.base_url + "api/SIPActionPlanComments/UpdateSIPActionPlanComments", evidenceModel, { headers: this.Header })
  }

}