
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Roles} from '../../../core/util/user-roles/user-roles';
import { catchError, map } from 'rxjs/operators';
import { Roles } from 'src/app/model/role';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appService: AppService) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });


  base_url = environment.base_url;
  userId;

  // authenticatePersal(jsonData) {
  //   return this.http.post(this.base_url + "api/Login/AuthenticateParent", jsonData, { headers: this.Header })
  // }

  authenticatePersal(jsonData) {
    return this.http.post(this.base_url + "api/LoginUser/AuthenticateUser", jsonData, { headers: this.Header })
  }

  authenticatePassport(jsonData) {
    return this.http.post(this.base_url + "api/LoginUser/AuthenticateUser", jsonData, { headers: this.Header })
  }

  authenticateEmployeeByIDNumber(jsonData) {
    return this.http.post(this.base_url + "api/LoginUser/AuthenticateUser", jsonData, { headers: this.Header })
  }

  authenticateIDNumber(jsonData) {

    return this.http.post(this.base_url + "api/LoginUser/AuthenticateUser", jsonData, { headers: this.Header })
  }

  AuthenticateOTP(idnumber, phonenumber, otp) {
    return this.http.post(this.base_url + "api/Login/AuthenticateParent?IDNumber=" + idnumber + "&MobileNumber=" + phonenumber + "&OTP=" + otp, { headers: this.Header })
  }

  sendOTP(IDnumber) {
    return this.http.get(this.base_url + "api/SMS/SendOTP?IDNumber=" + IDnumber)
  }

  sendUserOTP(persalNumber) {
    //return this.http.get(this.base_url + "api/SMS/SendUserOTP?Persal=" + persalNumber)
    return this.http.get(this.base_url + "api/SMS/SendOTP?UserName=" + persalNumber)
  }

  resendOTP(id) {
    return this.http.get(this.base_url + "ResendOTP?Id=" + id, { headers: this.Header })
  }

  getSchoolByParentId(id) {
    return this.http.get(this.base_url + "api/Parent/GetChildrenSchoolByParentId?ParentId=" + id, { headers: this.Header })
  }

  getScheduledNominationByEmisCode(emisCode, date) {
    // console.log(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
    return this.http.get(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
  }

  public getSession(): Promise<boolean> {
    const session = this.appService.getIsLoggedInUser();
    return new Promise((resolve, reject) => {
      if (session) {
        return resolve(true);
      } else {
        return reject(false);
      }
    });
  }



  public getSchoolsMain(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/SchoolMain/GetMainData")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((schoolName: any[]) => {
            // console.log("schoolName", schoolName); 
            resolve(schoolName);
          }, err => {
            // console.log(err);
            return [];
          });
      }

    });
  }



  public getHeadPosition(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/HeadOfficePosition/GetHeadOfficePosition")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((id: any[]) => {
            // console.log("Id", id); 
            resolve(id);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }


  public getBranchHeadPosition(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "/api/BranchPosition/GetBranchPosition")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((branch: any[]) => {
            // console.log("Id", branch); 
            resolve(branch);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }


  public getBranchCD(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "/api/BranchPosition/GetBranchChiefDirectoratePosition")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((chiefdirectorate: any[]) => {
            // console.log("Id", chiefdirectorate); 
            resolve(chiefdirectorate);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }























  //DistrictPosition API//
  public districtPosition(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/DistrictPosition/GetDistrictPosition")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((disctrictPositionId: any[]) => {
            // console.log("checkingdistrictpositions", disctrictPositionId); 
            resolve(disctrictPositionId);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }


  public getSchools(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Circuit/GetSchoolNames")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((schoolName: any[]) => {
            // console.log("schoolName", schoolName); 
            resolve(schoolName);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }

  //Srikanth district API old//
  //public getDistrictBySchool(): Promise<string[]> {
  // return new Promise((resolve, reject) => {
  //  this.userId = this.appService.getLoggedInUserId();

  //  if (this.userId === null)
  //   return [];
  //  else {

  // this.http.get(this.base_url +"api/District/GetDistrictList")
  //   .pipe(catchError((error: any, caught: any) => {
  //    reject(error);
  //   return caught;
  // }),
  //   map((res: any) => res))
  // .subscribe((district: any[]) => {
  //   console.log("districtName", district); 
  //   resolve(district);
  // }, err => {
  //   console.log(err);
  //   return [];
  /// });
  // }

  // });
  //}


  //get  clusterAPI //
  public getCluster(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Circuit/GetClusterUniqueNo")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((clusterNo: any[]) => {
            // console.log("Clusterno", clusterNo); 
            resolve(clusterNo);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }

  //circuit API  //
  public getCircuit(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Circuit/GetCircuitNo")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((circuitNo: any[]) => {
            // console.log("CircuitNos", circuitNo); 
            resolve(circuitNo);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }
  public GetUniqueCircuitNo(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Circuit/GetUniqueCircuitNo")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((circuitNo: any[]) => {
            // console.log("CircuitNos", circuitNo); 
            resolve(circuitNo);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }









  //Srikanth New district by Region API //
  public getDistrictByRegion(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Region/GetDistrictWSI")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((districtName: any[]) => {
            // console.log("districbyRegion", districtName); 
            resolve(districtName);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }












  //srikanth  region API
  public getregion(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Region/GetRegionNames")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((region: any[]) => {
            // console.log("RegionName", region); 
            resolve(region);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }

  //srikanath change to new roles mn//
  public getUserRoles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      else {

        this.http.get(this.base_url + "api/Users/GetRole")
          .pipe(catchError((error: any, caught: any) => {
            reject(error);
            return caught;
          }),
            map((res: any) => res))
          .subscribe((roleId: any[]) => {
            // console.log(roleId);
            if (roleId.length == 1) {
              this.appService.setLoggedInUserRole(roleId[0].rolename);
            }
            resolve(roleId);
          }, err => {
            console.log(err);
            return [];
          });
      }

    });
  }



  public areUserRolesAllowed(userRoles: string[], allowedUserRoles: Roles[]): boolean {
    for (const role of userRoles) {
      for (const allowedRole of allowedUserRoles) {
        if (role.toLowerCase() === allowedRole.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfParentNominated(id) {
    return this.http.get(this.base_url + "api/User/CheckIfParentNominatedSeconded?UserId=" + id);
  }

  IsParentRegistered(idnumber) {
    return this.http.get(this.base_url + "api/User/IsParentRegistered?IDNumber=" + idnumber);
  }

  AddParentToUsers(idnumber) {
    return this.http.post(this.base_url + "api/User/AddParentToUsers?IDNumber=" + idnumber, { headers: this.Header });
  }

  //this change  new  API srikanth// old
  getUserRoleById(id) {
    return this.http.get(this.base_url + "/api/Users/GetRole" + id);
  }
  //srikanth add getrole api//
  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }

  resettemppassword(Id, newtemp, pass) {
    return this.http.patch(this.base_url + "api/PasswordReset/AuthethicateTempPassword?usernumber= " + Id + "&temp=" + newtemp + "&newPassword=" + pass, { headers: this.Header });

  }


  CaptureorUpdateRegistration(data) {
    return this.http.post(this.base_url + "api/Users/CreateUpdateApplication", data, { headers: this.Header });

  }

  GetRegistrationByIdentification(number) { // get regis by persal, id number & passport
    return this.http.get(this.base_url + "api/Users/GetRegistrationByIdentification?Number=" + number, { headers: this.Header })

  }

  getOfficeLevel() {
    return this.http.get(this.base_url + "api/Users/GetOfficeLevel")

  }
  getGender() {
    return this.http.get(this.base_url + "api/Users/GetGender")

  }

  getNationality() {
    return this.http.get(this.base_url + "api/Users/GetCitizenship")
  }

  getSchoolPosition() {
    return this.http.get(this.base_url + "api/Users/GetSchoolPosition")
  }

  getUserByPersal(persal) {
    return this.http.get(this.base_url + "api/Users/GetuserByPersaNumber?Persal=" + persal)
  }


  getAllBranches() {
    return this.http.get(this.base_url + "api/Users/GetBranch")
  }

  getAllCheifDirectorate() {
    return this.http.get(this.base_url + "api/Users/GetChiefDirectorate")
  }

  getAllDirectorate() {
    return this.http.get(this.base_url + "api/Users/GetDirectorate")
  }

  getAllSubDirectorate() {
    return this.http.get(this.base_url + "api/Users/GetSubDirectorate")
  }

  getAllPositions() {
    return this.http.get(this.base_url + "api/Users/GetUserRole")
  }

  getAllDistricts() {
    return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }
  ////////////////school//////////////////////////
  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?districtCode=" + id)

  }

  getFullSchoolList() {
    return this.http.get(this.base_url + "api/SchoolMain/GetMainData")

  }


}
