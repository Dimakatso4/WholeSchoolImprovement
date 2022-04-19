import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service'

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {

  returnUrl: any;
  cellnumber;
  OTP;
  OTPvalid;
  usernumber;
  credentials;
  error = false;
  jsonData;
  jsonUserData;
  response;
  official;
  accountType;
  mode;

  OTPform: FormGroup;
  isFormSubmitted: Boolean;

  public parentSchools = [];


  constructor(
    private router: Router,
    private appservice: AppService,
    private authservice: AuthService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.OTPform = this.formBuilder.group({
      OTP: ['', Validators.required]
    });

    this.isFormSubmitted = false;

    this.usernumber = localStorage.getItem('userNumber');
    this.cellnumber = localStorage.getItem('cellnumber');
    this.accountType = this.appservice.getLoggedInUserRole();
    this.mode = localStorage.getItem('mode');


  }

  fieldChange() {
    this.error = false;
  }

  get getForm() {
    return this.OTPform.controls;
  }

  verifyOTP() {

    this.OTP = this.OTPform.controls['OTP'].value;
    this.error = false;
    // console.log(this.OTPform)

    if (this.OTPform.valid) {

      this.authservice.AuthenticateOTP(this.usernumber, this.cellnumber, this.OTP).subscribe(res => {
        this.response = res;
        console.log(res);

        if (this.response == null || this.response == "" || !this.response.token || !this.response) {
          this.error = true
        } else {

          localStorage.setItem("emailAddress", this.response.user.emailAddress);
          localStorage.setItem("roleId", this.response.user.userType);
          this.appservice.setLoggedInEmisCode(this.response.user.emisNumber);

          if (this.mode) {
            //reset password
            this.router.navigate(['/auth/reset']);
          } else if (localStorage.getItem('parentLogin') == "true") {
            //parent login

            this.authservice.getSchoolByParentId(this.response.user.parentId).subscribe((School: any) => {
              console.log(School);
              this.parentSchools = School;
              if (this.parentSchools.length > 1) {
                let schools = [];
                let emis = [];

                for (let x = 0; x < this.parentSchools.length; x++) {
                  schools.push(this.parentSchools[x].institutionName);
                  emis.push(this.parentSchools[x].emisCode);

                }

                localStorage.setItem("parentSchools", schools.toString());
                localStorage.setItem("parentEmiscode", emis.toString())
                this.router.navigate(['/auth/parent-school']);

              } else {
                this.router.navigate(['/dashboard']);
              }
            }, err => {
              console.log(err)
              this.router.navigate(['/dashboard']);
            })
            this.appservice.setLoggedInUserId(this.response.user.id);
            this.appservice.setLoggedInDistrictCode(this.response.user.districtCode);
            this.appservice.setLoggedInParentId(this.response.user.parentId);
            this.appservice.setIsLoggedInUsername(this.response.user.firstname + " " + this.response.user.surname);
            this.appservice.setIsLoggedInUser('true');
          } else if (this.accountType == "sgb") {
            // SGB AUTHENTICATE
            this.router.navigate(['../../disclaimer']);
          } else if (this.accountType == "monitor") {
            // PEM AUTHENTICATE
            this.router.navigate(['/election/monitoring-tool']);
          } else {
            this.router.navigate(['../../createprofile']);
          }

        }



      }, err => {
        console.log(err)
        this.error = true;
      })

    }

    this.isFormSubmitted = true;

  }

  cancel() {
    if (localStorage.getItem('parentLogin') == "true") {
      this.router.navigate(['/auth/parent-login']);
    } else {
      this.router.navigate(['/auth/userlogin']);
    }

  }


}
