import { Component, OnInit, ViewChild } from '@angular/core';

import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import swal from 'sweetalert2'
import { ProfileService } from '../profile.service';
import { AppService } from 'src/app/app.service'
import * as moment from 'moment';

@Component({
  selector: 'app-sgb',
  templateUrl: './sgb.component.html',
  styleUrls: ['./sgb.component.scss']
})
export class SgbComponent implements OnInit {

  validationForm1: FormGroup;
  validationForm2: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;

  usernumber;
  userProfile;
  newUserProfile;
  response;

  public confirmpassword;
  public password;
  public aboutme;
  accountType;

  selectedTraining: any = null;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private profileservice: ProfileService,
    private appservice: AppService) { }

  ngOnInit(): void {

    this.accountType = localStorage.getItem('accounttype');

    this.validationForm1 = this.formBuilder.group({
      confirmpassword: ['', Validators.required],
      userName: [localStorage.getItem('userNumber'), Validators.required],
      password: ['', Validators.required]
    });


    this.isForm1Submitted = false;
    this.isForm2Submitted = false;

    if (this.accountType != "sgb" && this.accountType != "employee" && this.accountType != "monitor") {
      console.log("skipped process!")
      this.router.navigate(['../auth/login']);
    }

  }



  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
  get form2() {
    return this.validationForm2.controls;
  }

  form1Submit() {
    if (this.validationForm1.valid) {

      console.log(this.accountType);
      if (this.accountType == "sgb") {
        // complete SGB profile creation

        let emisNumber = localStorage.getItem('emisNumber');
        let roleId = this.appservice.getLoggedInUserRole(); //localStorage.getItem('roleId');
        let idNumber = localStorage.getItem('userNumber');

        console.log(emisNumber, roleId, idNumber, this.password);
        this.profileservice.createSgbProfile(roleId, emisNumber, idNumber, this.password).subscribe(userId => {
          console.log(userId);
          swal.fire({ showConfirmButton: false, timer: 2200, title: 'Profile successfully created', icon: 'success' });
          // localStorage.setItem('accounttype', null);
          this.appservice.setLoggedInUserRole(null)
          this.router.navigate(['../auth/login']);

        }, err => {
          console.log(err)
        })

      } else {
        // complete employee profile creating
        let persal = localStorage.getItem('userNumber');

        this.profileservice.updateUserProfile(persal, this.password).subscribe(userId => {
          console.log(userId);
          swal.fire({ showConfirmButton: false, timer: 2200, title: 'Profile succesfully created', icon: 'success' });
          // localStorage.setItem('accounttype', null);
          this.appservice.setLoggedInUserRole(null)
          this.router.navigate(['../auth/login']);

        }, err => {
          console.log(err);
        })


      }

    }
    this.isForm1Submitted = true;
  }

  /**
   * Go to next step while form value is valid
   */
  form2Submit() {
    if (this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }
    this.isForm2Submitted = true;
  }

  // form3Submit() {
  //   if(this.validationForm3.valid) {
  //     this.wizardForm.goToNextStep();
  //   }
  //   this.isForm3Submitted = true;
  // }
  // cellNumber: "0746318504"
  // createdBy: null
  // createdDate: "0001-01-01T00:00:00"
  // credentials: null
  // districtCode: null
  // electionScore: 0
  // emailAddress: null
  // emisNumber: "700400139"
  // firstname: "Prudence"
  // id: 0
  // idNumber: "9409165569086"
  // isNominated: false
  // isSeconded: false
  // parentId: 0
  // persal: null
  // provinceId: null
  // roleId: "SGB"
  // status: 0
  // surname: "BUTHELEZI"
  // title: null
  // updatedBy: 0
  // updatedDate: "0001-01-01T00:00:00"

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }




}
