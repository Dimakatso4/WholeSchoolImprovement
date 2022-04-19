import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import * as moment from 'moment';
import { UsersService } from '../users/users.service';
import { AppService } from 'src/app/app.service';
import { AuthService } from '../auth/auth.service';
import { FirstLoginService } from '../first-login/first-login.service';
@Component({
  selector: 'app-activate-profile',
  templateUrl: './activate-profile.component.html',
  styleUrls: ['./activate-profile.component.scss']
})
export class ActivateProfileComponent implements OnInit {

  public temporarypassword: any;
  public confirmpassword: any;
  public Password: any;
  requiredForm: FormGroup;
  public UserName: any
  //usernumber;
  userId;
  isFormSubmitted: Boolean;
  isPasswordValid
  public isLoading: Boolean;
  public error: Boolean;
  public Passwordfield: any;
  public isConfirmPasswordDone: Boolean;
  public isPasswordInvalid: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private userservice: UsersService,
    private appService: AppService,
    private authservice: AuthService,
    private activeroute: ActivatedRoute,
    private loginservice: FirstLoginService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {


    this.activeroute.queryParams.subscribe(params => {

      if (params.id != undefined) {
        this.userId = params.id;
        this.appService.setLoggedInUserId(params.id)
      } else {
        this.userId = this.appService.getLoggedInUserId();
        if (!this.userId || this.userId == null || this.userId == "null") {
          this.userId = 0;
        }
      }

    });

    this.requiredForm = this.fb.group({
      // UserName: ['', Validators.required],
      temporarypassword: ['', Validators.required],
      Password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*~-])[a-zA-Z0-9!@#$%^&*~-]{8,20}$')]],
      confirmpassword: ['', Validators.required]
    });
    this.isFormSubmitted = false;

  }
  get Form() {
    return this.requiredForm.controls;
  }

  OLDformSubmit() { 
      

    if (this.requiredForm.valid && this.confirmpassword == this.Password) {

      this.isLoading = true;
      this.loginservice.validatePassword(this.userId, this.temporarypassword).subscribe(isValid => {
        console.log(isValid)
        this.isLoading = false;

           if (isValid) {
                //Reset User Password 

  

                Swal.fire({
                  title: 'Create Password?',
                  text: 'You will have a new password to use to login',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No'
          
                }).then((result) => {
                  if (result.value) {
                    //nompumeleo
          
          
                    this.isLoading = true;
                    // this.userservice.updatePassword(this.UserName, this.temporarypassword, this.Password).subscribe(res => {
          
          
                    //   if (res) {
          
                    //     let fullname = "name name";
                    //     let rolename = "ADMIN";
                    //     let userid = 1;
          
                    //     this.appService.setLoggedInUserId(userid);
                    //     this.appService.setIsLoggedInUsername(fullname);
                    //     this.appService.setIsLoggedInRoleName(rolename);
                    //     this.appService.setIsLoggedInUser('true');
                    //     this.router.navigate(['/dashboard']);
          
          
                    //     Swal.fire({
                    //       title: "Successful",
                    //       text: 'Please use your new password and username to login to the system next time.',
                    //       icon: 'success',
                    //     }).then(result => {
                    //       this.modalService.dismissAll();
                    //       if (result.value || result.isDismissed) {
                    //         ///window.location.reload()
                    //         this.router.navigate(['/auth/login']);
                    //       }
                    //     });
          
                    //   } else {
                    //     this.error = true;
                    //     this.isLoading = false;
                    //   }
          
          
                    // }, err => {
                    //   console.log(err);
                    //   this.error = true;
                    //   this.isLoading = false;
                    //   Swal.fire(
                    //     'Error!',
                    //     'We apologize there was a problem with saving you entry, please try again.',
                    //     'error'
                    //   )
                    // }); 
          
                          

                this.loginservice.updateUserPassword(this.userId, this.confirmpassword).subscribe(res => {
  console.log(res)
  
  this.isLoading = true;
  this.loginservice.CaptureNewPassword(this.userId, this.confirmpassword).subscribe((user: any) => {
    console.log(res);

                      let fullname = "name name";
                  let rolename = "ADMIN";
                  let userid = 1;
  
                  this.appService.setLoggedInUserId(userid);
                  this.appService.setIsLoggedInUsername(fullname);
                  this.appService.setIsLoggedInRoleName(rolename);
                  this.appService.setIsLoggedInUser('true');
                  this.router.navigate(['/dashboard']);
  
                  this.isLoading = false;
                  Swal.fire({
                    title: "Successful",
                    text: 'Please use your new password and username to login to the system next time.',
                    icon: 'success',
                  }).then(result => {
                    this.modalService.dismissAll();
                    if (result.value || result.isDismissed) {
                      this.router.navigate(['/dashboard']);
                    }
                  });

  }, err => {
    console.log(err)
    this.error = true;
    this.isLoading = false;
  })

  
                }, err => {
                  console.log(err);
  
                  this.isLoading = false;
                  Swal.fire(
                    'Error!',
                    'We apologize there was a problem with saving you entry, please try again.',
                    'error'
                  )
                })
                   
                  }
                })
  
  
              } else {
                this.isPasswordInvalid = true;
              }

      }, err => {
        console.log(err);
        this.isLoading = false;
        Swal.fire(
          'Error!',
          'We apologize there was a problem with saving you entry, please try again.',
          'error'
        )
      });
    }
    
    this.isFormSubmitted = true;
    this.changePasswordField("done");
  }

  
  formSubmit() { 

    
    if (this.requiredForm.valid && this.confirmpassword == this.Password) {

      this.isLoading = true;
      this.loginservice.validatePassword(this.userId, this.temporarypassword).subscribe(isValid => {
        console.log(isValid)
        this.isLoading = false;

           if (isValid) {
                //Reset User Password 

  

                Swal.fire({
                  title: 'Save New Password?',
                  text: 'You will have a new password to use to login.',
                  icon: 'question',
                  showCancelButton: true,
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No'
          
                }).then((result) => {
                  if (result.value) {
                    //nompumeleo
          
          
                    this.isLoading = true;
  
                    

                this.loginservice.CaptureNewPassword(this.userId, this.Password).subscribe((res: any) => {
                console.log(res)                
                
                  let fullname = res.firstName +" "+res.surname;
                  let rolename = res.position;
                  let userid = res.userId;
                  let districtcode = res.districtCode;
                  let emiscode = res.emisNumber;
                  let officelevel = res.officeLevel;
                  let directorate = res.directorate;
  
                  this.appService.setIsLoggedInUser('true');
                  this.appService.setLoggedInUserId(userid);
                  this.appService.setIsLoggedInUsername(fullname);
                  this.appService.setIsLoggedInRoleName(rolename);
                  this.appService.setLoggedInEmisCode(emiscode);
                  this.appService.setLoggedInDistrictCode(districtcode);
                  this.appService.setLoggedInUserOfficeLevel(officelevel);
                  this.appService.setLoggedInUserDirectorate(directorate);
                  this.isLoading = false;
  
                  Swal.fire({
                    title: "Successful",
                    text: 'Please use your new password and username to login to the system next time.',
                    icon: 'success',
                  }).then(result => {
                    this.modalService.dismissAll();
                    if (result.value || result.isDismissed) {
                      this.router.navigate(['/dashboard']);
                    }
                  });


    
                }, err => {
                  console.log(err);
  
                  this.isLoading = false;
                  Swal.fire(
                    'Error!',
                    'We apologize there was a problem with saving you entry, please try again.',
                    'error'
                  )
                })
                   
                  }
                })
  
  
              } else {
                this.isPasswordInvalid = true;
              }

      }, err => {
        console.log(err);
        this.isLoading = false;
        Swal.fire(
          'Error!',
          'We apologize there was a problem with saving you entry, please try again.',
          'error'
        )
      });
    }
    
    this.isFormSubmitted = true;
    this.changePasswordField("done");
  }

  showPassword: boolean = false;

  public togglePassword() {
    this.showPassword = !this.showPassword;
  }
  showConfirm: boolean = false;

  public toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  setShowPassword(show) {
    this.showPassword = show;
  }

  setshowConfirm(show) {
    this.showConfirm = show;
  }

  changePasswordField(status): void {
    this.Passwordfield = status;
    // console.log(this.Passwordfield)
  }

  confirmPasswordDone(status) {
    this.isConfirmPasswordDone = status
  }

  isCorrect(flag) {
    let isValid = false;

    if (flag == 'length') {
      if (this.Password) {
        if (this.Password.length >= 8) {
          isValid = true;
        }
      }
    } else if (flag == 'upper') {
      if (this.Password) {
        // const regExp = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*~-])[a-zA-Z0-9!@#$%^&*~-]{8,20}$')
        // console.log(this.Password.match(regExp))
        // if (this.Password.match(regExp)) {
          
        // }

        let regexUpperCase = new RegExp('(?=.*[A-Z])');

        if (regexUpperCase.test(this.Password) == true) {
          isValid = true;
        }
        

      }
    } else if (flag == 'lower') {
      if (this.Password) {
        // const regExp = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*~-])[a-zA-Z0-9!@#$%^&*~-]{8,20}$')
        // // console.log(g.match(regExp))
        // if (this.Password.length >= 8) {
        //   isValid = true;
        // }

        let regexUpperCase = new RegExp('(?=.*[a-z])');

        if (regexUpperCase.test(this.Password) == true) {
          isValid = true;
        }
        

      }
    } else if (flag == 'numeric') {
      if (this.Password) {
        // if (this.Password.length >= 8) {
        //   isValid = true;
        // }

        let regexUpperCase = /[0-9]/g;

        if (regexUpperCase.test(this.Password) == true) {
          isValid = true;
        }
        

      }
    } else if (flag == 'special') {
      if (this.Password) {
        // if (this.Password.length >= 8) {
        //   isValid = true;
        // }

        
        let regexUpperCase = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (regexUpperCase.test(this.Password) == true) {
          isValid = true;
        }
        

      }
    }


    return isValid;
  }

  resetFlag() {
    this.isPasswordInvalid = false;
  }

  getPassfield() {
    return this.Passwordfield
  }

}

// CheckPatternUppercase(password) {

//   let regexUpperCase = new RegExp('(?=.*[A-Z])');

//   if (regexUpperCase.test(password) == true) {
//     this.uppercaseCharacters = true;
//   }else if(regexUpperCase.test(password) == false) {
//       this.uppercaseCharacters = false;

//   }
  
//   let regexlowerCase = new RegExp('(?=.*[a-z])');
//   if (regexlowerCase.test(password) == true) {
//     this.lowercaseCharacters = true;
//   }else if(regexlowerCase.test(password) == false) {
//     this.lowercaseCharacters = false;
//   }

//   let regexNumber =/[0-9]/g;
//   if (regexNumber.test(password) == true) {
//     this.numbercaseCharacters = true;
//   }else if(regexNumber.test(password) == false) {
//     this.numbercaseCharacters = false;
//   }

//   let regexNonWordCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   if (regexNonWordCharacter.test(password) == true) {
//     this.noncaseCharacters = true;
//   }else if (regexNonWordCharacter.test(password) == false) {
//     this.noncaseCharacters = false;
//   }

//   if(password.length >= 8){
//     this.hasEightChar = true
//   }else if(password.length < 8){
//     this.hasEightChar = false
//   }

// }
