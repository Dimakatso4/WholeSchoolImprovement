import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstLoginService } from '../../first-login/first-login.service';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-confirmreset',
  templateUrl: './confirmreset.component.html',
  styleUrls: ['./confirmreset.component.scss']
})
export class ConfirmresetComponent implements OnInit {

  public temporarypassword;
  public confirmpassword;
  public password;
  validationForm1: FormGroup;
  //usernumber;
  userId;
  isForm1Submitted: Boolean;
  isPasswordValid

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private loginservice: FirstLoginService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.validationForm1 = this.formBuilder.group({
      temporarypassword: ['', Validators.required],
      password: ["", Validators.required],
      confirmpassword: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {

      if (params.userid != undefined) {
        this.userId = params.userid;
        localStorage.setItem("UserId", this.userId);
      }

    });

    if (!localStorage.getItem('userId')) {
      this.router.navigate[('/auth/forgot')]
    } else {

      this.userId = localStorage.getItem('userId');
    }

    this.isForm1Submitted = false;

  }

  fieldChange() {
    this.isPasswordValid = true;

  }

  public uppercaseCharacters: boolean = false;
  public lowercaseCharacters: boolean = false;
  public numbercaseCharacters: boolean = false;
  public noncaseCharacters: boolean = false;
  public hasEightChar: Boolean = false;
  //public uppercaseCharacters: boolean = false ;

  CheckPatternUppercase(password) {

    let regexUpperCase = new RegExp('(?=.*[A-Z])');

    if (regexUpperCase.test(password) == true) {
      this.uppercaseCharacters = true;
    }else if(regexUpperCase.test(password) == false) {
        this.uppercaseCharacters = false;

    }
    
    let regexlowerCase = new RegExp('(?=.*[a-z])');
    if (regexlowerCase.test(password) == true) {
      this.lowercaseCharacters = true;
    }else if(regexlowerCase.test(password) == false) {
      this.lowercaseCharacters = false;
    }

    let regexNumber =/[0-9]/g;
    if (regexNumber.test(password) == true) {
      this.numbercaseCharacters = true;
    }else if(regexNumber.test(password) == false) {
      this.numbercaseCharacters = false;
    }

    let regexNonWordCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (regexNonWordCharacter.test(password) == true) {
      this.noncaseCharacters = true;
    }else if (regexNonWordCharacter.test(password) == false) {
      this.noncaseCharacters = false;
    }

    if(password.length >= 8){
      this.hasEightChar = true
    }else if(password.length < 8){
      this.hasEightChar = false
    }

  }





  form1Submit() {
    console.log(localStorage.getItem('userId'))
    if (this.validationForm1.valid) {



      //Check if password is correct

      this.loginservice.validatePassword(this.userId, this.temporarypassword).subscribe(isValid => {
        console.log(isValid)
        this.isPasswordValid = isValid

        if (isValid) {
          //Reset User Password 
          this.loginservice.updateUserPassword(this.userId, this.confirmpassword).subscribe(res => {

            swal.fire({ showConfirmButton: true, title: 'Password changed successfully', text: "You can now login", icon: 'success' });
            localStorage.clear()
            this.router.navigate(['../auth/login']);

          }, err => {
            console.log(err);
            swal.fire({ showConfirmButton: false, title: 'Unsuccessfully', text: "There was a problem with activating resetting your password, Please try again", icon: 'error' });

          })

        } else {
          
        }

      });

     

    }

    this.isForm1Submitted = true;
  }

  get form1() {
    return this.validationForm1.controls;
  }


}
