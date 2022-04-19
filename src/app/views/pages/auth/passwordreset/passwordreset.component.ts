import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  error;
  userNumber;
  response;
  accountType;
  exisitingUser;
  credentials;
  isLoading = false;

  constructor(
    private router: Router,
    private userservice: UsersService,
    private authservice: AuthService,
    private appservice: AppService) { }

  ngOnInit(): void {

    this.accountType = "employee";
    this.error = false;
  }

  fieldChange() {
    this.error = false;
  }


  verifyIDnumber() {

    this.error = false;
    console.log(this.userNumber)

    if (this.userNumber != "") {
      if (this.accountType == "employee") {
        //persal number
        this.isLoading = true;
        this.userservice.getEmployeeByPersalOrIDNumber(this.userNumber).subscribe((res: any) => {

          this.exisitingUser = res;
          console.log(res)

          localStorage.setItem('userNumber', this.userNumber);
          localStorage.setItem('cellnumber', this.exisitingUser.cell);
          localStorage.setItem('userId', this.exisitingUser.userId);
          localStorage.setItem('mode', 'passwordreset');

          if (res == null) {
            this.isLoading = false;
            this.error = true;
          } else {

            this.userservice.generatePasswordById(this.exisitingUser.userId).subscribe(mail => {

              console.log("this.exisitingUser.username", this.exisitingUser.username)
              console.log("userNumber", this.userNumber)

              this.userservice.sendResetEmail(this.exisitingUser.username, this.exisitingUser.userId).subscribe(mail => {
                console.log(mail);



                this.appservice.setLoggedInUserRole(this.accountType);
                this.isLoading = false;
                Swal.fire({ showConfirmButton: true, title: 'Email with temporary password has been sent', text: "Check your inbox", icon: 'success' });
                this.router.navigate(['./auth/reset']);


              }, err => {
                this.isLoading = false;
                console.log(err);
              })



            }, err => {
              console.log(err);
              this.isLoading = false;
            })
          }




        }, err => {
          console.log(err);
          this.error = true;
          this.isLoading = false;
        });

      } else {
        //id number
        console.log("I am inside else")
        console.log(this.userNumber, "this.userNumber")
        this.isLoading = true;
        this.userservice.GetUserByIDNumberOrPassport(this.userNumber).subscribe(res => {

          this.exisitingUser = res;
          console.log(res)
          if (res == null) {
            this.isLoading = false;
            this.error = true;
          }

          if (this.exisitingUser.email) {
            this.isLoading = true;
            console.log("email")
            this.userservice.generatePasswordById(this.exisitingUser.userId).subscribe(mail => {
              var fullname = this.exisitingUser.firstName + " " + this.exisitingUser.surname;
              this.userservice.sendResetEmail(fullname, this.exisitingUser.userId).subscribe(mail => {
                console.log(mail);
                Swal.fire({ showConfirmButton: true, title: 'Email with temporary password has been sent', text: "Check your inbox", icon: 'success' });
                this.router.navigate(['./auth/reset']);
                localStorage.setItem('userNumber', this.userNumber);
                // localStorage.setItem('accounttype', this.accountType);
                this.appservice.setLoggedInUserRole(this.accountType);
                localStorage.setItem('cellnumber', this.response);
                localStorage.setItem('userId', this.exisitingUser.userId);
                localStorage.setItem('mode', 'passwordreset');
                this.isLoading = false;
                this.router.navigate(['/auth/reset'])


              }, err => {
                this.isLoading = false;
                console.log(err)
              })

            }, err => {
              console.log(err);
              this.error = true;
              this.isLoading = false;
            });

          } else {

            this.authservice.sendUserOTP(this.userNumber).subscribe(res => {

              this.response = res;
              localStorage.setItem('userNumber', this.userNumber);
              // localStorage.setItem('accounttype', this.accountType);
              this.appservice.setLoggedInUserRole(this.accountType);
              localStorage.setItem('cellnumber', this.response);
              localStorage.setItem('mode', 'passwordreset');
              this.router.navigate(['/auth/reset'])

            }, err => {
              console.log(err)
              this.error = true;
              this.isLoading = false;
            })

          }



        }, err => {
          console.log(err)
          this.error = true;
          this.isLoading = false;
        })

      }
    } else {
      this.error = true;
    }



  }

  Cancel() {
    this.router.navigate(['/auth/login'])
  }

}
