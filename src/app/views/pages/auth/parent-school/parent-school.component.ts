import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service'
import Swal from 'sweetalert2';
import * as moment from 'moment'


@Component({
  selector: 'app-parent-school',
  templateUrl: './parent-school.component.html',
  styleUrls: ['./parent-school.component.scss'],
  providers: [DatePipe]
})
export class ParentSchoolComponent implements OnInit {

  schools = [];
  noSchools = false;
  nominations;
  error = false;

  form: FormGroup;
  isFormSubmitted: Boolean;

  constructor(
    private router: Router,
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private appservice: AppService) { }



  ngOnInit(): void {

    this.form = this.formBuilder.group({
      schoolname: ['', Validators.required]
    });

    if (localStorage.getItem("parentLogin") != "true") {
      this.router.navigate(['/auth/parent-login']);

    }
    this.isFormSubmitted = false;
    this.schools = [];


    // for(let x=0; x<this.parentSchools.length; x++) {
    //   //{{school.emisCode}}">{{school.institutionName}}
    // localStorage.setItem("parentSchools", "school1,schol2,school3,school4");
    // localStorage.setItem("parentEmiscode", "emis1,emis2,emis3,emis4")
    // }

    let schools = localStorage.getItem("parentSchools").split(',');
    let emis = localStorage.getItem("parentEmiscode").split(',');

    // console.log(schools);
    // console.log(emis);

    if (schools && emis) {

      for (let x = 0; x < emis.length; x++) {

        let data = {
          "emisCode": emis[x],
          "institutionName": schools[x]
        }

        this.schools.push(data);

      }
      console.log(this.schools.values);


      if (this.schools.length == 0) {
        this.noSchools = true;
      }

    } else {
      this.authservice.getSchoolByParentId(this.appservice.getLoggedInParentId()).subscribe((res: any) => {
        this.schools = res;
        schools = [];
        emis = [];
        console.log(res);

        if (res) {
          if (this.schools.length == 0) {
            this.noSchools = true;
          }

          for (let x = 0; x < this.schools.length; x++) {
            schools.push(this.schools[x].institutionName);
            emis.push(this.schools[x].emisCode);

          }

          localStorage.setItem("parentSchools", schools.toString());
          localStorage.setItem("parentEmiscode", emis.toString())
        }

        if (this.schools.length == 0) {
          this.noSchools = true;
        }

      }, err => {
        console.log(err);
        this.noSchools = true;
      })
    }



  }


  get getForm() {
    return this.form.controls;
  }

  schoolNotEmpty() {
    this.error = false;
  }

  selectSchool() {
    // let date = this.datepipes.transform(currentDate, 'yyyy-MM-dd');  
    let date = moment(new Date()).format('YYYY-MM-DD')
    this.error = false;

    if (this.form.valid) {
      sessionStorage.setItem('emisCode', this.form.controls['schoolname'].value);
      this.authservice.getScheduledNominationByEmisCode(this.form.controls['schoolname'].value, date).subscribe((res: any) => {
        console.log(res);
        this.appservice.setLoggedInEmisCode(this.form.controls['schoolname'].value);
        this.appservice.setLoggedInDistrictCode(res.districtCode);
        this.appservice.setIsLoggedInUser('true');
        this.router.navigate(['/dashboard'])
        // if (res.nominationFlag == null || res.nominationFlag == "") {
        //   // swal.fire({ title: 'No upcoming events', text: 'Sorry the selected school does not have a scheduled upcoming nomination', icon: 'warning' });
        //   this.router.navigate(['/dashboard'])

        // } else {
        //   if (res.nominationFlag == "HasStarted") {
        //     this.router.navigate(['/nominations/nominate']);

        //   } else if (res.electionFlag == "IsCompleted") {
        //     // swal.fire({
        //     //   title: 'Election were completed',
        //     //   text: 'Election for ' + res.schoolName + ' were completed on the '+ moment(res.electionDate).format('DD MMMM YYYY'),
        //     //   icon: 'warning'
        //     // });
        //     this.router.navigate(['/dashboard'])

        //   } else if (res.electionFlag == "HasStarted") {
        //     // swal.fire({
        //     //   title: 'Election commencing',
        //     //   text: 'Elections for ' + res.schoolName + ' are commencing today.',
        //     //   icon: 'warning'
        //     // });
        //     this.router.navigate(['/dashboard'])

        //   } else if (res.nominationFlag == "IsNotStarted" || res.nominationFlag == "IsCompleted" || res.electionFlag == "IsNotStarted") {
        //     this.appservice.setLoggedInEmisCode(this.form.controls['schoolname'].value)
        //     this.router.navigate(['/nominations/countdown']);
        //   }
        // }
      }, err => {
        console.log(err);
        Swal.fire(
          'Error',
          'Apologize we are facing a problem in the server, please try again later',
          'error'
        )
      })
    }



    this.isFormSubmitted = true;

  }

  cancel() {
    this.router.navigate(['/auth/parent-login']);
  }

}
