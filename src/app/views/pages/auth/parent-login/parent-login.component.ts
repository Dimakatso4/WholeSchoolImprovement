import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AppService } from 'src/app/app.service';
declare var $: any;

@Component({
  selector: 'app-parent-login',
  templateUrl: './parent-login.component.html',
  styleUrls: ['./parent-login.component.scss']
})
export class ParentLoginComponent implements OnInit {


  returnUrl: any;
  idNumber: any;
  idnumber: any;
  response: any;
  error;

  form: FormGroup;
  isFormSubmitted: boolean;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private formBuilder: FormBuilder, 
    private appService: AppService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idNumber: ['', Validators.required]
    });
    this.error = false;
    this.isFormSubmitted = false;
    this.appService.setIsLoggedInUser('false');
  }

  get getForm() {
    return this.form.controls;
  }

  fieldChange() {
    this.error = false;
  }

  getOtp() {

    this.idNumber = this.form.controls['idNumber'].value;

    if (this.form.valid) {

      this.authservice.sendOTP(this.form.controls['idNumber'].value).subscribe((res: any) => {
        console.log(res);

        this.authservice.IsParentRegistered(this.form.controls['idNumber'].value).subscribe(isRegistered => {
          console.log(isRegistered);

          if (!isRegistered) {
            this.authservice.AddParentToUsers(this.form.controls['idNumber'].value).subscribe(data => {
              console.log(data);
            }, err => {
              console.log(err)
            })
          }


          if (res.length > 1) {
            localStorage.setItem('cellnumber', res);
            localStorage.setItem('userNumber', this.form.controls['idNumber'].value);
            localStorage.setItem('parentLogin', 'true');

            this.router.navigate(['/auth/verify-otp'])
          } else {
            this.error = true;
          }


        }, err => {
          console.log(err);
          this.error = true;
        })

      }, err => {
        console.log(err);
        this.error = true;

      })

    }


    this.isFormSubmitted = true;
  }

  cancel() {
    this.router.navigate(['/auth/login']);
  }

}
