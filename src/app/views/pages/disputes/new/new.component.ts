import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../disputes.service';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  validationForm: FormGroup;
  isDisputeFormSubmitted: Boolean;

  public parentname;
  public parentsurname;
  public parentcellnumber;
  public parentemail;
  public schoolname;
  public districtcode;
  public district;
  public officialname;
  public details;
  public officialtitle;
  distr

  public user;
  public election;
  public assignedTo;

  userId;
  userRole;
  isSGB: boolean;
  isParent: Boolean;


  constructor(private router: Router, public formBuilder: FormBuilder, private disputeservice: DisputesService, private appservice: AppService) { }

  ngOnInit(): void {


    if (this.appservice.getLoggedInUserRole() == "SEO") {
      this.assignedTo = "DEO"
    } else {
      this.assignedTo = "SEO"
    }

    this.validationForm = this.formBuilder.group({
      parentname: ['', Validators.required],
      parentsurname: ['', Validators.required],
      parentcellnumber: ['', Validators.required],
      parentemail: [''],
      officialname: ['', Validators.required],
      details: ['', Validators.required],
      officialtitle: [{ value: 'SEO', disabled: true }],
      district: [''],
      schoolname: [''],
    });



    this.isDisputeFormSubmitted = false;
    this.officialtitle = "SEO"
    this.userId = this.appservice.getLoggedInUserId();
    this.userRole = this.appservice.getLoggedInUserRole();

    if (this.userRole == "SGB") {
      this.isSGB = true;
    } else {
      this.isSGB = false
    }

    this.disputeservice.getUserById(this.userId).subscribe((user: any) => {
      console.log(user)
      this.user = user;

      this.districtcode = this.user.districtCode;

      if (this.userRole == "PARENT") {
        this.isParent = true;
        this.validationForm.controls["parentname"].setValue(user.firstname);
        this.validationForm.controls["parentname"].disable();
        this.validationForm.controls["parentsurname"].setValue(user.surname);
        this.validationForm.controls["parentsurname"].disable();
        this.validationForm.controls["parentcellnumber"].setValue(user.cellNumber);
        this.validationForm.controls["parentcellnumber"].disable();
        this.validationForm.controls["parentemail"].setValue(user.emailAddress);
        this.validationForm.controls["parentemail"].disable();
      } else if (this.isSGB) {
        this.parentname = this.user.firstname;
        this.parentsurname = this.user.surname;
        this.parentemail = this.user.emailAddress;
        this.parentcellnumber = this.user.cellNumber;
        this.officialtitle = "SEO";
      } else if (this.userRole == "SEO") {

        // this.validationForm.controls["officialtitle"].setValue(user.emailAddress);
        this.validationForm.controls["officialname"].setValue(user.firstname + ' ' + user.surname);
        this.validationForm.controls["officialname"].disable();
      }

      this.disputeservice.getSchoolByEmisNumber(this.appservice.getLoggedInEmisCode()).subscribe((school: any) => {

        this.schoolname = school[0].institutionName;
      }, err => {
        console.log(err);
        this.router.navigate(['/dashboard'])
      })

      // this.disputeservice.getDistrictByCode(this.districtcode).subscribe((district: any) => {
      //   this.district = district.districtName

      // }, err => {
      //   console.log(err)
      // })
      this.disputeservice.getElectionResultsBySchool(this.schoolname).subscribe(res => {

        this.election = res;

      }, err => {
        console.log(err)
      })

    }, err => {
      console.log(err);
      this.router.navigate(['/dashboard']);
    })
  }

  get Form() {
    return this.validationForm.controls;
  }

  logDispute() {

    if (this.validationForm.valid) {
      

      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to save and submit your dispute',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).then((result) => {
        if (result.value) {

          let date = new Date();


          let dispute = {
            emisCode: this.appservice.getLoggedInEmisCode(),
            districtCode: this.appservice.getLoggedInDistrictCode(),
            nameOfFacilitator: this.officialname,
            capturedBy: parseInt(this.user.id),
            modifiedBy: 0,
            assignedTo: this.assignedTo,
            feedback: "",
            officialTitle: this.officialtitle,
            status: "open",
            disputeDetails: this.details,
            schoolName: this.schoolname,
            parentName: this.parentname,
            parentSurname: this.parentsurname,
            parentMobileNumber: this.parentcellnumber,
            parentEmail: this.parentemail,
            dueDate: date.toISOString()
          }

          console.log(dispute)
          this.disputeservice.createDispute(dispute).subscribe(res => {
            console.log(res);

            Swal.fire({
              title: "Successful",
              timer: 5000,
              text: 'Your dispute has been successfully submitted',
              icon: 'success'
            }).then(result => {
              if (result.value || result.isDismissed) {

                this.router.navigate(['/disputes/list'])
              }
            });
          }, err => {
            console.log(err)

            Swal.fire({
              showConfirmButton: false,
              timer: 5000,
              title: "Unsuccessful",
              text: 'Your entry was unsuccessful, please try again',
              icon: 'error'
            });
          })



        }
      })
    }
    this.isDisputeFormSubmitted = true;

  }

}
