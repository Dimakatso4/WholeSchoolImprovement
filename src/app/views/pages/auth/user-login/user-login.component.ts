import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service'
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  error;
  public userNumber: any;
  response;
  public accountType: any;
  public isError: Boolean;
  public isFormSubmitted: Boolean;
  public isLoginFormSubmitted: Boolean;
  public showRegistrationForm: Boolean;
  public isLoading: Boolean;
  public isRegistered: Boolean;
  public showForm: any;


  public userType: any;
  public persal: any;
  public nationality: any = "";
  public passport: any;
  public gender: any = "";
  public idnumber: any;
  public userName: any;
  public firstname: any;
  public surname: any;
  public officelevel: any = "";
  public roletype: any;
  public region: any = "";
  public districtName: any = "";
  public Branch: any = "";
  public ChiefDirectorate: any = "";
  public Directorate: any;
  public SubDirectorate: any = "";
  public position: any = "";
  public selectedSchool: any;
  public cellNumber: any;
  public emailAddress: any;
  public invalidIdNumber: Boolean;


  public Nationalities: any = [];
  public Genders: any = [];
  public OfficeLevels: any = [];
  public AllSchoolList: any = [];
  public Regions: any = [];
  public Districts: any = [];
  // public AllSchoolList: any = [];

  constructor(private router: Router,
    private authservice: AuthService,
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.accountType = "persal";
    this.showRegistrationForm = false;


    // DROP DOWN DATA
    this.authservice.getNationality().subscribe(res => {
      this.Nationalities = res;
    }, err => {
      console.log(err);
      this.Nationalities = [{
        "citizenship": "South African",
        "citizenshipId": 1
      },
      {
        "citizenship": "Non South African",
        "citizenshipId": 2
      },

      ];
    })

    this.authservice.getGender().subscribe(res => {
      this.Genders = res;
    }, err => {
      console.log(err);
      this.Genders = [{
        "gender": "Male",
        "genderId": 1
      },
      {
        "gender": "Female",
        "genderId": 2
      },
      {
        "gender": "Other",
        "genderId": 3
      }

      ];
    })

    this.authservice.getOfficeLevel().subscribe(res => {
      console.log(res);
      this.OfficeLevels = res;
    }, err => {
      console.log(err);
      this.OfficeLevels = [{
        "officeLevel": "Head Office",
        "officelevelId": 1
      },
      {
        "officeLevel": "District",
        "officelevelId": 2
      },
      {
        "officeLevel": "School",
        "officelevelId": 3
      }

      ];
    })
    
    this.authservice.getFullSchoolList().subscribe(res => {
      console.log(res);
      this.OfficeLevels = res;
    }, err => {
      console.log(err);
      // this.OfficeLevels = [{
      //   "officeLevel": "Head Office",
      //   "officelevelId": 1
      // },
      // {
      //   "officeLevel": "District",
      //   "officelevelId": 2
      // },
      // {
      //   "officeLevel": "School",
      //   "officelevelId": 3
      // }

      // ];
    })


    this.isError = false;
    this.isFormSubmitted = false;
    this.isLoginFormSubmitted = false;

  }

  submitForm() {
    Swal.fire({
      title: 'Are you sure you want to save new user',
      text: 'A user will be Created',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then(result => {
      if (result.value || result.isDismissed) {
        console.log(result.value)

        window.location.reload()

      }
    });
  }

  fieldChange() {
    this.isLoginFormSubmitted = false;
  }

  Cancel() {
    this.router.navigate(['/auth/login']);
  }

  resumeRegistration() {

    if (this.userNumber) {

      this.isError = false;
      this.isLoading = true;
      this.authservice.GetRegistrationByIdentification(this.userNumber).subscribe((res: any) => {
        console.log(res);

        this.isLoading = false;

        if (res) {
          // console.log("show form");
          this.showForm = "edit";
          // this.showRegistrationForm = true;


          //           activatedBy: 0
          // approvedBy: 0
          // branch: "branch"
          // cell: "cell"
          // chiefDirectorate: "C dir"
          // comment: "comment   "
          // dateActivated: "2022-03-06T17:34:11.217"
          // dateApproved: "2022-02-06T17:34:11.217"
          // dateCaptured: "2022-01-06T17:34:11.217"
          // directorate: "dir"
          // districtCode: "d code"
          // districtName: "d name"
          // email: "mail"
          // emisNumber: "number"
          // firstname: "name"
          // gender: "gender"
          // id: 1
          // idNumber: "id number"
          // nationality: "nationality"
          // officeLevel: "level"
          // passport: "passoprt"
          // persal: "persal"
          // position: "position"
          // region: "region"
          // reportingManager: "string"
          // roleType: "role type"
          // schoolName: "school"
          // status: "status"
          // subDirectorate: "sub dir"
          // surname: "surname"
          // userId: 800
          // userType: "user type"
        } else {
          this.isError = true;
        }

      }, err => {
        console.log(err);
        this.isError = true;
        this.isLoading = true;
      })

    }

    this.isLoginFormSubmitted = true;

  }


  newRegistration(): void {
    this.showForm = "create";
  }

  setUsername(): void {
    if (this.userType == "GDE") {
      this.userName = this.persal

    } else {
      if (this.nationality == "South African") {
        this.userName = this.idnumber

      } else {
        this.userName = this.passport

      }
    }
  }

  checkPersalDuplcate(persal): void {
    console.log(persal);
  }

  UserName(flag): void {
    console.log(flag);

  }

  changeUserType(type): void {
    if (type != "GDE") {
      this.persal = "";
      this.userName = "";
    }
  }

  changeNationality(nationality): void {

    if (nationality == "Non South African") {
      this.idnumber = "";
    } else if (nationality == "South African") {
      this.passport = "";
    }

  }

  getPositionByOfficeLevel(office): void {
    console.log(office)
  }

  changeRoleType(flag): void {
    console.log(flag)
  }

  changeOfficeType(officelevel) {
    console.log(officelevel)
  }

}
