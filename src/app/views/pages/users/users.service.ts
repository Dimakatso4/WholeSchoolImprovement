import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { analyzeAndValidateNgModules, CompileShallowModuleMetadata } from '@angular/compiler';
import { compileDirectiveFromMetadata } from '@angular/compiler';
import { catchError, map } from 'rxjs/operators';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { AbstractControl } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserModel[] = [];
  constructor(private http: HttpClient) {
    this.getAllUsers().subscribe(users => {

      // console.log('users list', users);

      this.users = users;

    });
  }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;




  createUser(newUser) {
    console.log(newUser);
    return this.http.post(this.base_url + "api/User/Create", newUser).subscribe(data => {
      console.log(data);
      console.log("new user created")
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }

  ///////////////get user by id///////////////////////
  getUserById(id) {
    this.http.get(this.base_url + "api/User/GetById?id=" + id);

    // return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }
  //////////////////////User role
  getUserRoleById(id) {
    return this.http.get(this.base_url + "api/User/UserRole?userId=" + id);

  }


  getRolesByUserRole(role) {
    return this.http.get(this.base_url + "api/ReferenceData/RolesByUserRole?Role=" + role)
  }


  //////////////Get all users//////////////api/User/UserRole
  getAllUsers(): Observable<UserModel[]> {

    return this.http.get<UserModel[]>(this.base_url + 'api/Users/GetUserList');

  }

  getAllSchools(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.base_url + "api/School/GetSchool")
        .subscribe((role: any[]) => {
          console.log("Schoolslist", role);
        }, err => {
          console.log(err);
          return [];
        });
    });
  }

  getUsersByRole(role) {
    return this.http.get(this.base_url + "api/Roles/GetRole?Roles=" + role)

  }
  //srikanth add getusers//
  //////////////Update User Profile//////////////


  //srikanth updated users//
  updateUserProfileEmployee(id, Firstname, Surname, CellNumber, EmailAddress,
    House, Complex, Street, Section, City, experience, qualification, gender,
    designation, UserType, Persal,) {

    console.log(this.base_url + "api/Users/UpdateUser?id=" + id + "&firstName=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&ProvinceId=" + 0 + "&Experience=" + experience + "&Qualification=" + qualification + "&Gender=" + gender + "&Designation=" + designation + "&UserType={" + UserType + "}&Persal=" + Persal);

    return this.http.post(this.base_url + "api/Users/UpdateUser?id=" + id + "&firstName=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&ProvinceId=" + 0 + "&Experience=" + experience + "&Qualification=" + qualification + "&Gender=" + gender + "&Designation=" + designation + "&UserType={" + UserType + "}&Persal=" + Persal, { headers: this.Header });

  }




  //////////////////Roles////////////////////////
  getAllRoles() {
    return this.http.get(this.base_url + "api/ReferenceData/Roles")

  }
  //////////////////Designations////////////////////////
  getAllDesignations() {
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
  ////////////////Create Profile//////////////////////
  saveUser(newUser) {
    return this.http.post(this.base_url + "api/User/UserProfile", newUser)
  }

  createNewSGB(roleId, emisNumber, DistrictCode,
    ProvinceId, Firstname, Surname,
    CellNumber, EmailAddress, IDNumber,
    Nationality, Gender, Informalsettlement,
    House, Complex, Street, Section, City,
    UserType, AboutMe, experience, qualification) {
    return this.http.post(this.base_url + "api/User/UserProfileSGBViaUserMan?Designation=" + roleId + "&EmisNumber=" + emisNumber + "&DistrictCode=" + DistrictCode + "&ProvinceId=" + ProvinceId + "&Firstname=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&IDNumber=" + IDNumber + "&Nationality=" + Nationality + "&Gender=" + Gender + "&Informalsettlement=" + Informalsettlement + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&UserType=" + UserType + "&AboutMe=" + AboutMe + "&Experience=" + experience + "&Qualification=" + qualification, { headers: this.Header })

  }

  updateUserProfileEmployeett(UserId, UserActive) {

    return this.http.put(this.base_url + "api/Users/UpdateInActiveUser?UserId=" + UserId + "&UserActive=" + UserActive, { headers: this.Header });

    //console.log(userIds);
    //console.log(this.base_url +"/api/Users/UpdateUser/upateInActiveUser=" + id+"&editStatus="+ userActive  );
    // console.log(this.base_url + "api/Users/UpdateInActiveUser?UserId=" + UserId + "&UserActive=" + UserActive, { headers: this.Header });
    //return this.http.post(this.base_url+"/api/Users/UpdateInActiveUser?UserId="+ UserId + "&editStatus="+ editStatus,{ headers: this.Header });

    // return this.http.post//https://localhost:44324/api/Users/UpdateInActiveUser?UserId=450&UserActive=Active

  }

  updateDocumentStatustest(doc) {
    return this.http.patch("https://localhost:44324/api/Users/UpdateInActiveUser", doc)
  }





  createNewEmployee(roleSelected, Citizenship, Persal, IDNumber, Firstname, Surname, Gender, House, complex, street, Suburb, Section, City, Informalsettlement, CellNumber, EmailAddress, Password, Status, officelevel, selectedSchoolName, region, passport,

    informalSettlement,

    userType,
    userTypre,

    districtName,
    circuit,
    cluster,
    Directorate,
    SubDirectorate,

    Branch,
    ChiefDirectorate
  ) {
    //var UserType1 = "{\"ADMIN\":\"ADMIN\",\"SGB\":\"SGB\"}";
    // console.log("varRole", UserType);
    let loginUserer = {
      citizenship: Citizenship,
      persal: Persal,
      idNumber: IDNumber,
      firstName: Firstname,
      surname: Surname,
      gender: Gender,
      houseNumber: House,
      complexName: complex,
      streetName: street,
      suburb: Suburb,
      section: Section,
      city: City,
      cell: CellNumber,
      email: EmailAddress,
      password: Password,
      userActive: "Active",
      position: roleSelected,
      officeLevel: officelevel,
      schoolName: selectedSchoolName,
      businessUnit: region,
      Passport: passport,


      "informalSettlement": informalSettlement,

      "userType": userType,

      "districtName": districtName,
      "circuit": circuit,
      "cluster": cluster,
      "directorate": Directorate,
      "subDirectorate": SubDirectorate,

      "branch": Branch,
      "chiefDirectorate": ChiefDirectorate,
      "Region": region















    };
    // console.log(this.base_url + "api/User/UserProfileEmployeeViaUserMan?Designation=" + RoleId + "&Persal=" + Persal + "&DistrictCode=" + DistrictCode + "&ProvinceId=" + ProvinceId + "&Firstname=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&IDNumber=" + IDNumber + "&Nationality=" + Nationality + "&Gender=" + Gender + "&Informalsettlement=" + Informalsettlement + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&UserType={" + UserType + "}&EmisNumber=" + emisNumber);
    // console.log(loginUserer);
    //console.log("https://localhost:44324/api/Users/CreateUser", loginUser, { headers: this.Header }));
    return this.http.post(this.base_url + "api/Users/CreateUser", loginUserer, { headers: this.Header });

    //return this.http.post("https://localhost:44324/api/User/CreateUser?citizenship=" + Citizenship + "&persal=" + Persal + "&idNumber=" + IDNumber + "&firstName=" + Firstname + "&surname=" + Surname + "&gender=" + Gender + "&houseNumber=" + House + "&complexName=" + Complex + "&streetName=" + Street + "&suburb=" + Suburb + "&section=" + Section + "&city=" + City + "&cell=" + CellNumber + "&email=" + EmailAddress + "&password=" + Street + "&Section=" + Password + "&userType={" + UserType + "}", { headers: this.Header });
  }


  AddUser(loginUser) {
    return this.http.post(this.base_url + "api/Users/CreateUser", loginUser, { headers: this.Header });
  }

  generatePasswordById(Id) {
    return this.http.post(this.base_url + "api/Users/ResetUserPassword?Id=" + Id, { headers: this.Header }, { responseType: 'text' });
  }

  //////////////////Password Reset////////////////////////
  //Changed user to users
  getEmployeeByPersalOrIDNumber(Id) {
    //return this.http.get(this.base_url + "api/User/GetEmployeeByPersalOrIDNumber?Id=" + Id);
    return this.http.get(this.base_url + "api/Users/GetEmployeeByPersalOrIDNumber?Id=" + Id);
  }

  GetUserByIDNumberOrPassport(Id) {
    //return this.http.get(this.base_url + "api/User/getSGBByIDNumber?Id=" + Id);
    return this.http.get(this.base_url + "api/Users/GetUserByIDNumberOrPassport?Id=" + Id);
  }

  getGenerateTempPassword(Id) {
    return this.http.get(this.base_url + "api/User/GenerateTempPasswordByUserId?Id=" + Id);
  }

  //////////////////Send email/SMS on success////////////////////////
  sendEmail(fullName, id) {
    return this.http.post(this.base_url + "api/Mail/SendWelcomeMail?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  sendWelcomeSMS(fullName, id) {
    return this.http.post(this.base_url + "api/SMS/SendWelcomeSMS?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  sendResetEmail(fullName, id) {
    return this.http.post(this.base_url + "api/Mail/SendResetMail?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }


  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNumber=" + school)
  }
  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?DistrictCode=" + code)
  }

  isCellnumberUnique(cellnumber) {
    console.log("https://localhost:44324/api/Users/IsCellphoneAvailable?Cellphonenumber=" + cellnumber);
    return this.http.get("https://localhost:44324/api/Users/IsCellphoneAvailable?Cellphonenumber=" + cellnumber);

    // https://localhost:44324/api/Users/IsCellphoneAvailable?Cellphonenumber=0715609720

  }

  isDuplicatePersonal(Persal) {
    // console.log(this.base_url + "api/Users/IsCellphoneAvailable?Cellphonenumber=" + Persal);
    return this.http.get(this.base_url + "api/Users/IsPersalAvailable?PersalNumber=" + Persal);

    // https://localhost:44324/api/Users/IsCellphoneAvailable?Cellphonenumber=0715609720

  }



  createNewParent(EmisCode, District, Firstname,
    Lastname, Telephone, Email,
    IdNumber, Institution, TypeOfInstitution, Gender,
    Occupation, PostalAddress1, PostalAddress2,
    PostalAddress3, PostalCode, Relationship, StreetAddress1, StreetAddress2,
    StreetAddress3, StreetCode, ParentID) {
    // return this.http.post(this.base_url + "api/Parent/AddParent?&EmisCode=" + emisNumber + "&District=" + DistrictCode + "&Firstname=" + Firstname + "&Lastname=" + Surname + "&Telephone=" + CellNumber + "&Email=" + EmailAddress + "&IdNumber=" + IDNumber + "&Nationality=" + NationalityX + "&Gender=" + Gender + "&Informalsettlement=" + Informalsettlement + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&UserType=" + UserType + "&AboutMe=" + AboutMe + "&Experience=" + experience + "&Qualification=" + qualification, { headers: this.Header })
    return this.http.post(this.base_url + "api/Parent/AddParent?&EmisCode=" + EmisCode + "&District=" + District + "&Firstname=" + Firstname + "&Lastname=" + Lastname + "&Telephone=" + Telephone + "&Email=" + Email + "&IdNumber=" + IdNumber + "&Institution=" + Institution + "&TypeOfInstitution=" + TypeOfInstitution + "&Gender=" + Gender + "&Occupation=" + Occupation + "&PostalAddress1=" + PostalAddress1 + "&PostalAddress2 =" + PostalAddress2 + "&PostalAddress3=" + PostalAddress3 + "&PostalCode=" + PostalCode + "&Relationship=" + Relationship + "&StreetAddress1=" + StreetAddress1 + "&StreetAddress2=" + StreetAddress2 + "&StreetAddress3=" + StreetAddress3 + "&StreetCode=" + StreetCode + "&ParentID=" + ParentID, { headers: this.Header })


  }

  getAllParent() {
    // return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }


  getuserbypersID(Id) {
    return this.http.get(this.base_url + "api/Users/GetUserByPersalOrId?Id=" + Id);

  }


  getuserbyperspass(Id) {
    return this.http.get(this.base_url + "api/Users/GetUserByPersalOrPassport?Id=" + Id);

  }


  getHighestParentID(code) {
    return this.http.get(this.base_url + "api/Parent/GetMaxParentId?EmisCode=" + code);

  }

  WelcomEmail(id, password) {
    return this.http.post(this.base_url + "api/Mail/SendEmail?hostname=" + window.location.origin + "&Id=" + id + "&Password=" + password, { headers: this.Header })
  }

  welcomeSms(id, password) {
    return this.http.post(this.base_url + "api/SMS/SendWelcomeSMS?Id=" + id + "&Password=" + password, { headers: this.Header })
  }

  updatePassword(UserId, temporarypassword, Password) {
    return this.http.post(this.base_url + "api/PasswordReset/TemporalPassword?usernumber=" + UserId + "&temp=" + temporarypassword + "&newPassword=" + Password, { headers: this.Header })
    // return this.http.post("https://localhost:5001/api/PasswordReset/ResetPassword?UserId="+UserId+"&Password="+Password,{ headers: this.Header })
  }
  UpdateStatus(UserName, UserActive) {
    // console.log(UserActive);
    // console.log(UserName);
    //return this.http.post("https://localhost:5001/api/Users/UpdateInActiveUser?UserId=610&UserActive=ative",{ headers: this.Header })
    return this.http.post(this.base_url + "api/Users/UpdateInActiveUser?UserId=" + UserName + "&UserActive=" + UserActive, { headers: this.Header })
  }
  getUserByPassPort(id) {
    return this.http.get(this.base_url + "api/Users/GetUserByPersalOrPassport?Id=" + id)
  }
  getUserId(id) {
    // https://localhost:5001/api/Users/GetUserById?Id=2
    return this.http.get(this.base_url + "api/Users/GetUserById?Id=" + id)

  }
  updateUser(data) {
    return this.http.post(this.base_url + "api/Users/UpdateUser", data, { headers: this.Header })

  }
  ///
  getOfficeLevel() {
    return this.http.get(this.base_url + "api/Users/GetOfficeLevel")

  }
  getGender() {
    return this.http.get(this.base_url + "api/Users/GetGender")

  }

  getCitizen() {
    return this.http.get(this.base_url + "api/Users/GetCitizenship")
  }

  getSchoolPosition() {
    return this.http.get(this.base_url + "api/Users/GetSchoolPosition")
  }

  getUserByPersal(persal) {
    return this.http.get(this.base_url + "api/Users/GetuserByPersaNumber?Persal=" + persal)
  }


  ///email
  sendWelcomeEmail(toMail, firstname, persal) {

    return this.http.post("https://localhost:5001/api/Mail/SendEmail?toMail=" + toMail + "&firstname=" + firstname + "&persal=" + persal
      , { headers: this.Header })
  }
  sendWelcomeSMSNotification(usernumber, firstName, password, cell) {
    return this.http.post(this.base_url + "api/SMS/SendWelcomeSMS?usernumber=" + usernumber + "&firstName=" + firstName + "&password=" + password + "&Cell=" + cell, { headers: this.Header })
  }


  //Thulani code
  cellValidator(cellExist: AbstractControl) {

    return new Promise(resolve => {

      setTimeout(() => {

        if (this.validateCell(cellExist.value)) {

          resolve({ cellExist: true });

        } else {

          resolve(null);

        }

      }, 1000);

    });

  }



  validateCell(cell: string) {

    return this.users.some(u => u.cell === cell);

  }
  //// // custom form validations

  parselValidator(persalControl: AbstractControl) {

    return new Promise(resolve => {

      setTimeout(() => {

        if (this.validateParsel(persalControl.value)) {

          resolve({ persalExist: true });

        } else {

          resolve(null);

        }

      }, 1000);

    });

  }



  validateParsel(persal: string) {

    return this.users.some(u => u.persal === persal);

  };
  ////

  idNumberValidator(idNumberControl: AbstractControl) {

    return new Promise(resolve => {

      setTimeout(() => {

        if (this.validateIdNumber(idNumberControl.value)) {

          resolve({ idNumberExist: true });

        } else {

          resolve(null);

        }

      }, 1000);

    });

  }



  validateIdNumber(idNumber: string) {

    if (idNumber) {

      if (idNumber.length > 0) {

        return this.users.some(u => u.idNumber === idNumber);

      }
    }

    return false;

  };
  ///
  ////
  passportValidator(passportControl: AbstractControl) {

    return new Promise(resolve => {

      setTimeout(() => {

        if (this.validatePassport(passportControl.value)) {

          resolve({ passportExist: true });

        } else {

          resolve(null);

        }

      }, 1000);

    });

  }



  validatePassport(passport: string) {

    if (passport) {
      if (passport.length > 0) {

        return this.users.some(u => u.passport === passport);

      }
    }

    return false;

  };

  emailValidator(emailControl: AbstractControl) {

    return new Promise(resolve => {

      setTimeout(() => {

        if (this.validateEmail(emailControl.value)) {

          resolve({ emailExist: true });

        } else {

          resolve(null);

        }

      }, 1000);

    });

  }



  validateEmail(email: string) {

    return this.users.some(u => u.email === email);

  };

  
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

}
