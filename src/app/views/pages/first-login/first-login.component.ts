import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { SubSink } from 'subsink';
import swal from 'sweetalert2'
import { FirstLoginService } from './first-login.service'
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-firstlogin',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit, OnDestroy {

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;

  usernumber;
  userProfile;
  response;

  public confirmpassword;
  public password;
  public currentpassword;
  accountType;

  invalidCurrentPassword;
  subs = new SubSink();

  constructor(public formBuilder: FormBuilder, private router: Router, private loginservice: FirstLoginService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    /**
     * form1 value validation
     */

    this.subs.add(this.loginservice.getUserById(localStorage.getItem('UserId')).subscribe(res => {
      console.log(res);

      this.response = res;

      localStorage.setItem("usercreated", "false");
      this.accountType = this.response.userType;//localStorage.getItem('accounttype');


    }, err => {
      console.log(err); // error data not loaded, refresh page until success
      window.location.reload();
    }));

    this.validationForm1 = this.formBuilder.group({
      confirmpassword: ['', Validators.required],
      currentpassword: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isForm1Submitted = false;

  }


  get form1() {
    return this.validationForm1.controls;
  }

  fieldChange() {
    this.invalidCurrentPassword = false;
  }

  formSubmit() {
    this.invalidCurrentPassword = false;

    if (this.validationForm1.valid) {

      if (this.response.credentials == this.currentpassword) {

        if (this.response.isEmployee) {
          //activate employee profile

          if (this.response.persal == null || this.response.persal == undefined) {
            // activate employee by id number
            this.subs.add(this.loginservice.updateEmployeeProfileByIdumber(this.response.idNumber, this.password).subscribe(res => {
              swal.fire({ title: 'Profile activated successfully', text: "Please use your ID number to login", icon: 'success' });
              this.router.navigate(['../auth/login']);

            }, err => {
              console.log(err);
              swal.fire({ timer: 5000, title: 'Error!', text: "There was a problem with activating your profile, Please try again", icon: 'error' });
            }));

          } else {
            // activate employee by persal number
            this.subs.add(this.loginservice.updateEmployeeProfileByPersal(this.response.persal, this.password).subscribe(res => {
              swal.fire({ title: 'Profile activated successfully', text: "Please use your persal number to login", icon: 'success' });
              this.router.navigate(['../auth/login']);

            }, err => {
              console.log(err);
              swal.fire({ timer: 5000, title: 'Error!', text: "There was a problem with activating your profile, Please try again", icon: 'error' });
            }));
          }


        } else {

          if (this.response.userType === 'PEM') {
            //activate PEM profile
            /* const salt = bcrypt.genSaltSync(10);
            var pass = bcrypt.hashSync(this.password, salt);
            console.log('Password ' + pass); */
            this.subs.add(this.loginservice.updateUserProfileByIDNumber(this.response.idNumber, this.password).subscribe((res) => {
              console.log(res);

              swal.fire({ title: 'Profile activated successfully', text: "You can now login", icon: 'success' });

              this.router.navigate(['../auth/login']);

            }));

          } else if (this.response.userType === 'SGB' || this.response.userType === 'OFFICE_BEARERS') {

            //activate sgb profile
            this.subs.add(this.loginservice.updateSgbProfile(this.response.userType, "", this.response.idNumber, this.password).subscribe(res => {

              swal.fire({ title: 'Profile activated successfully', text: "You can now login", icon: 'success' });

              this.router.navigate(['../auth/login']);

            }, err => {
              console.log(err);
              swal.fire({ timer: 5000, title: 'Error!', text: "There was a problem with activating your profile, Please try again later", icon: 'error' });
            }))

          } else {

            // activate employee by id number
            this.subs.add(this.loginservice.updateEmployeeProfileByIdumber(this.response.idNumber, this.password).subscribe(res => {
              swal.fire({ title: 'Profile activated successfully', text: "Please use your ID number to login", icon: 'success' });
              this.router.navigate(['../auth/login']);

            }, err => {
              console.log(err);
              swal.fire({ timer: 5000, title: 'Error!', text: "There was a problem with activating your profile, Please try again", icon: 'error' });
            }));

            // swal.fire({ timer: 3500, title: 'Error!', text: "Your profile details are invalid, please contact administrator to register your profile", icon: 'error' });


          }
        }

      } else {
        this.invalidCurrentPassword = true;
      }

    }
    this.isForm1Submitted = true;
  }

}