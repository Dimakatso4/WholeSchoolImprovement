import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationForm: FormGroup;
  returnUrl: any;
  accountType: any;
  NonCitizen = "NonCitizen"


  public userpassport;
  public password;
  public usernumberID
  public userNumber: any;

  response;
  error = false;
  public multipleRoles: Boolean;
  employee;
  role;
  public roles;
  public userRole = "";
  public isFormSubmitted: Boolean;
  public isRoleSelected: Boolean;
  public businessunit = "";
  public accountTypes = "";
  public isLoading: Boolean;

  state: RouterStateSnapshot

  constructor(private router: Router, private route: ActivatedRoute, private authservice: AuthService, private appService: AppService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.appService.setIsLoggedInUser('false');
    sessionStorage.clear();
    this.isFormSubmitted = false;
    this.isRoleSelected = false;
    this.userRole = "";

    // if (this.appService.getUserHasMultipeRoles() == "true") {
    //   this.authservice.getUserRoleById(this.appService.getLoggedInUserId()).subscribe(role => {
    //     this.multipleRoles = true;
    //     this.roles = role;
    //   }, err => {
    //     console.log(err);
    //     Swal.fire({
    //       title: 'Error',
    //       text: 'Sorry! there is no response from server, please try again later',
    //       icon: 'error'
    //     }).then((res) => {
    //       if (res.value || res.isDismissed) {
    //         this.router.navigate(['/auth/login']);
    //       }
    //     })
    //   })
    // } else {
    //   this.multipleRoles = false;
    // }

  }

  monitorLogin() {
    // sessionStorage.setItem('accountType', "monitor");
    // this.router.navigate(['/auth/userlogin']);
    this.router.navigate(['/auth/userlogin'], { queryParams: { login: 'monitor' } });
  }

  fieldChange() {
    this.error = false;
  }

  onLoggedin() {

    this.error = false;
    if (this.userpassport && this.password) {
      if (this.accountType == "sgb") {
        let loginUser = {

          Password: this.password,
          Passport: this.userpassport,
          Persal: this.userNumber,
          IDNumber: this.userNumber

        }
        console.log('login payload', loginUser);
        this.authservice.authenticatePassport(loginUser).subscribe(res => {
          this.response = res;

          console.log("passport", res);
          var RoleId = this.response.roleId;
          this.appService.setLoggedInUserId(this.response.userId);
          this.appService.setIsLoggedInUser('true');
          // this.appService.setLoggedBusnissUnit(this.response.businessunit);

          let name = this.response.firstName;
          let surname = this.response.surname;
          let rolename = this.response.rolename;

          //let BusinessUnit = this.response.businessunit ;

          if (!name || name == null) {
            name = "";
          }

          if (!surname || surname == null) {
            surname = "";
          }

          this.appService.setIsLoggedInUsername(name + " " + surname);
          this.appService.setIsLoggedInRoleID(RoleId);
          this.appService.setIsLoggedInRoleName(rolename);

          // if (RoleId== 1 ){

          // this.router.navigate(['../../users/new-user']);


          //} else {

          this.router.navigate(['../../dashboard']);
          // }




        }, err => {
          console.log(err)
          this.error = true;
        })

      }


    }







    //Id Information

    if (this.usernumberID && this.password) {
      if (this.accountType == "nonemployeeId") {
        let loginUser = {
          Password: this.password,
          //Passport: this.usernumberID,
          //Persal: this.userNumber,
          User: this.usernumberID

        }
        console.log('login payload', loginUser);
        this.authservice.authenticatePassport(loginUser).subscribe(res => {
          this.response = res;

          console.log("passport", res);
          var RoleId = this.response.roleId;
          this.appService.setLoggedInUserId(this.response.userId);
          this.appService.setIsLoggedInUser('true');
          // this.appService.setLoggedBusnissUnit(this.response.businessunit);

          let name = this.response.firstName;
          let surname = this.response.surname;
          let rolename = this.response.rolename;

          //let BusinessUnit = this.response.businessunit ;

          if (!name || name == null) {
            name = "";
          }

          if (!surname || surname == null) {
            surname = "";
          }

          this.appService.setIsLoggedInUsername(name + " " + surname);
          this.appService.setIsLoggedInRoleID(RoleId);
          this.appService.setIsLoggedInRoleName(rolename);

          // if (RoleId== 1 ){

          // this.router.navigate(['../../users/new-user']);


          //} else {

          this.router.navigate(['../../dashboard']);
          // }




        }, err => {
          console.log(err)
          this.error = true;
        })

      }


    }
    //End  ID Information

    //persal new srikanth

    if (this.userNumber && this.password) {
      if (this.accountType == "employee") {
        let loginUser = {



          Password: this.password,
          //Passport: this.usernumberID,
          persal: this.userNumber,
          // IDNumber : this.usernumberID

        }
        console.log('login payload', loginUser);
        this.authservice.authenticatePersal(loginUser).subscribe(res => {
          this.response = res;

          console.log("persal", res);
          var RoleId = this.response.roleId;
          this.appService.setLoggedInUserId(this.response.userId);
          this.appService.setIsLoggedInUser('true');
          // this.appService.setLoggedBusnissUnit(this.response.businessunit);

          let name = this.response.firstName;
          let surname = this.response.surname;
          let rolename = this.response.rolename;

          //let BusinessUnit = this.response.businessunit ;

          if (!name || name == null) {
            name = "";
          }

          if (!surname || surname == null) {
            surname = "";
          }

          this.appService.setIsLoggedInUsername(name + " " + surname);
          this.appService.setIsLoggedInRoleID(RoleId);
          this.appService.setIsLoggedInRoleName(rolename);

          // if (RoleId== 1 ){

          // this.router.navigate(['../../users/new-user']);


          //} else {

          this.router.navigate(['../../dashboard']);
          // }




        }, err => {
          console.log(err)
          this.error = true;
        })

      }


    }
    //persal new serikanth end


































    //old code removed //
    // if (this.userNumber && this.password) {

    //   if (this.accountType == "sgbe") {
    //     console.log("sgb");
    //     // sgb login
    //     let loginUser = {
    //       idNumber: this.userNumber,
    //       credentials: this.password
    //     }

    //     this.authservice.authenticateIDNumber(loginUser).subscribe(res => {
    //       this.response = res;
    //       console.log("res123", res);
    //       this.router.navigate(['../../users/new']);

    //       this.appService.setLoggedInUserId(this.response.user.id);
    //       this.appService.setIsLoggedInUser('true');

    //       let name = this.response.user.firstname;
    //       let surname = this.response.user.surname; 

    //       if (!name || name == null) {
    //         name = "";
    //       }

    //       if (!surname || surname == null) {
    //         surname = "";
    //       }

    //       this.appService.setIsLoggedInUsername(name + " " + surname); 
    //       // this.authservice.getUserRoleById(this.response.user.id).subscribe((role: any) => {
    //       //   console.log(role);
    //       //   this.roles = role;
    //       //   if (role.length > 1) {
    //       //     this.multipleRoles = true;
    //       //     this.router.navigate(['/auth/login'], { queryParams: { id: this.userNumber } });
    //       //   } else {
    //       //     this.appService.setLoggedInUserRole(this.roles[0].roleName);

    //       //     if (this.roles[0].emisCode) {
    //       //       this.appService.setLoggedInEmisCode(this.roles[0].emisCode);
    //       //     } else {
    //       //       this.appService.setLoggedInEmisCode(this.response.user.emisNumber);
    //       //     }

    //       //     if (this.roles[0].districtCode) {
    //       //       this.appService.setLoggedInDistrictCode(this.roles[0].districtCode);
    //       //     } else {
    //       //       this.appService.setLoggedInDistrictCode(this.response.user.districtCode);
    //       //     }
    //       //     this.router.navigate(['../../users/new']);

    //       //   }


    //       // }, err => {
    //       //   console.log(err);
    //       //   this.error = true;
    //       // })


    //     }, err => {
    //       console.log(err)
    //       this.error = true;
    //     })

    //   } else {
    //     // employee login

    //     if (this.userNumber.length == 51) {

    //       let loginUser = {
    //         IDNumber: this.userNumber,
    //         Password: this.password
    //       }

    //       this.authservice.authenticateIDNumber(loginUser).subscribe(res => {
    //         this.response = res;
    //         console.log("this is testing id" +"" + res);
    //         var RoleId = this.response.roleId;
    //         this.appService.setLoggedInUserId(this.response.userId);
    //         this.appService.setIsLoggedInUser('true');
    //        // this.appService.setLoggedInUserId(this.response.user.id);
    //        // console.log(JSON.stringify(this.response.user));
    //        // this.appService.setIsLoggedInUser('true');

    //         let name = this.response.user.firstname;
    //         let surname = this.response.user.surname;

    //         if (!name || name == null) {
    //           name = "";
    //         }

    //         if (!surname || surname == null) {
    //           surname = "";
    //         }

    //         this.appService.setIsLoggedInUsername(name + " " + surname);


    //         // this.authservice.getUserRoleById(this.response.user.id).subscribe((role: any) => {
    //         //   console.log(role);
    //         //   this.roles = role;
    //         //   if (role.length > 1) {
    //         //     this.multipleRoles = true;
    //         //     this.router.navigate(['/auth/login'], { queryParams: { id: this.userNumber } });
    //         //   } else {
    //         //     this.appService.setLoggedInUserRole(this.roles[0].roleName);

    //         //     if (this.roles[0].emisCode) {
    //         //       this.appService.setLoggedInEmisCode(this.roles[0].emisCode);
    //         //     } else {
    //         //       this.appService.setLoggedInEmisCode(this.response.user.emisNumber);
    //         //     }

    //         //     if (this.roles[0].districtCode) {
    //         //       this.appService.setLoggedInDistrictCode(this.roles[0].districtCode);
    //         //     } else {
    //         //       this.appService.setLoggedInDistrictCode(this.response.user.districtCode);
    //         //     }
    //         //     this.router.navigate(['../../dashboard']);

    //         //   }


    //         // }, err => {
    //         //   console.log(err);
    //         //   this.error = true;
    //         // })

    //       }, err => {
    //         console.log(err)
    //         this.error = true;
    //       })

    //     } else {
    //    //woring  API using for Login   // srikanth code"//

    //    if (this.userNumber.length == 18) {
    //       let loginUser = {
    //         persal: this.userNumber,
    //         //Passport : null,
    //         password: this.password
    //       }


    //       this.authservice.authenticatePersal(loginUser).subscribe(res => {
    //         this.response = res;

    //         console.log("vairble",res);
    //         var RoleId = this.response.roleId;
    //         this.appService.setLoggedInUserId(this.response.userId);
    //         this.appService.setIsLoggedInUser('true');
    //        // this.appService.setLoggedBusnissUnit(this.response.businessunit);

    //         let name = this.response.firstName;
    //         let surname = this.response.surname; 
    //         let rolename = this.response.rolename; 
    //         let  UserActive = this.response.userActive
    //         console.log ("namechecking"+  "" +   this.response.userActive)

    //          //let BusinessUnit = this.response.businessunit ;

    //         if (!name || name == null) {
    //           name = "";
    //         }

    //         if (!surname || surname == null) {
    //           surname = "";
    //         }

    //         this.appService.setIsLoggedInUsername(name + " " + surname);
    //         this.appService.setIsLoggedInRoleID(RoleId);
    //         this.appService.setIsLoggedInRoleName(rolename);

    //        // if (RoleId== 1 ){

    //          // this.router.navigate(['../../users/new-user']);


    //         //} else {

    //           this.router.navigate(['../../dashboard']);
    //        // }




    //       }, err => {
    //         console.log(err)
    //         this.error = true;
    //       })
    //     }

    //     else if (this.usernumberID.length == 13) {
    //       let loginUser = {

    //         idNumber : this.usernumberID,
    //         password: this.password,
    //         persal : null,
    //         Passport : null

    //       }


    //       this.authservice.authenticateIDNumber(loginUser).subscribe(res => {
    //         this.response = res;

    //         console.log("testing",res);
    //         var RoleId = this.response.roleId;
    //         this.appService.setLoggedInUserId(this.response.userId);
    //         this.appService.setIsLoggedInUser('true');
    //        // this.appService.setLoggedBusnissUnit(this.response.businessunit);

    //         let name = this.response.firstName;
    //         let surname = this.response.surname; 
    //         let rolename = this.response.rolename; 

    //          //let BusinessUnit = this.response.businessunit ;

    //         if (!name || name == null) {
    //           name = "";
    //         }

    //         if (!surname || surname == null) {
    //           surname = "";
    //         }

    //         this.appService.setIsLoggedInUsername(name + " " + surname);
    //         this.appService.setIsLoggedInRoleID(RoleId);
    //         this.appService.setIsLoggedInRoleName(rolename);

    //        // if (RoleId== 1 ){

    //          // this.router.navigate(['../../users/new-user']);


    //         //} else {

    //           this.router.navigate(['../../dashboard']);
    //        // }




    //       }, err => {
    //         console.log(err)
    //         this.error = true;
    //       })
    //     }
    //     // else if (this.accountType == "sgb") {
    //     //   let loginUser = {

    //     //    passport : this.userNumber,
    //     //     password: this.password,
    //     //     persal : null,
    //     //     IDNumber: null,
    //     //   }


    //     //   this.authservice.authenticatePersal(loginUser).subscribe(res => {
    //     //     this.response = res;

    //     //     console.log("testingpass",res);
    //     //     var RoleId = this.response.roleId;
    //     //     this.appService.setLoggedInUserId(this.response.userId);
    //     //     this.appService.setIsLoggedInUser('true');
    //     //    // this.appService.setLoggedBusnissUnit(this.response.businessunit);

    //     //     let name = this.response.firstName;
    //     //     let surname = this.response.surname; 
    //     //     let rolename = this.response.rolename; 

    //     //      //let BusinessUnit = this.response.businessunit ;

    //     //     if (!name || name == null) {
    //     //       name = "";
    //     //     }

    //     //     if (!surname || surname == null) {
    //     //       surname = "";
    //     //     }

    //     //     this.appService.setIsLoggedInUsername(name + " " + surname);
    //     //     this.appService.setIsLoggedInRoleID(RoleId);
    //     //     this.appService.setIsLoggedInRoleName(rolename);

    //     //    // if (RoleId== 1 ){

    //     //      // this.router.navigate(['../../users/new-user']);


    //     //     //} else {

    //     //       this.router.navigate(['../../dashboard']);
    //     //    // }




    //     //   }, err => {
    //     //     console.log(err)
    //     //     this.error = true;
    //     //   })
    //     // }
    //   }



    //   }
    // }

    this.isFormSubmitted = true;
  }

  login() {

    this.error = false;
    if (this.userNumber && this.password) {

      let loginUser = {
        "Password": this.password,
        "username": this.userNumber
      }

      // console.log(loginUser);
      this.isLoading = true;
      this.authservice.authenticatePersal(loginUser).subscribe(res => {
        this.response = res;
        console.log(res);

        if (res) {
          this.appService.setIsLoggedInUser('true');

          // this.appService.setLoggedBusnissUnit(this.response.businessunit);

          // let RoleId = this.response.roleId;
          let name = this.response.firstName;
          let surname = this.response.surname;


          this.appService.setLoggedInUserId(this.response.userId);
          this.appService.setLoggedInDistrictCode(this.response.districtCode);
          this.appService.setLoggedInEmisCode(this.response.emisNumber);
          this.appService.setLoggedInUserOfficeLevel(this.response.officeLevel);
          this.appService.setIsLoggedInRoleName(this.response.position);

          // if (this.response.officeLevel == "Head Office" && this.response.position == "System Administrator") {
          //   this.appService.setLoggedInUserDirectorate("ITSS");
          // } else {
          this.appService.setLoggedInUserDirectorate(this.response.directorate);
          // }

          if (!name || name == null) {
            name = "";
          }

          if (!surname || surname == null) {
            surname = "";
          }

          this.appService.setIsLoggedInUsername(name + " " + surname);
          this.router.navigate(['/dashboard']);
          this.isLoading = false;

        } else {
          this.error = true;
          this.isLoading = false;
        }

      }, err => {
        console.log(err)
        this.error = true;
        this.isLoading = false;
      })

    }

    this.isFormSubmitted = true;
  }

  signup() {
    this.router.navigate(['/auth/userlogin']);
  }



  goBack() {
    sessionStorage.clear();
    localStorage.clear();
    this.multipleRoles = false;
    this.appService.setUserHasMultipeRoles('false');
    this.appService.setIsLoggedInUser('false');
    this.router.navigate(['/auth/login']);

  }

}
