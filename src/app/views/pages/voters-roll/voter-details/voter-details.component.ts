import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss']
})
export class VoterDetailsComponent implements OnInit {

  public nationality
  public idnumber;
  public gender;
  public lastname;
  public firstname
  public informalsettlement;
  public informalsettlementname;
  public emailAddress;
  public cellNumber

  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      informalsettlement: [false],
      nationality: ['South African'],
      idnumber: ['', Validators.required],
      gender: ['', Validators.required],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      informalsettlementname: [''],
      emailAddress: ['', Validators.required],
      cellNumber: ['', Validators.required]
    });

    this.isFormSubmitted = false;
  }


  get Form() {
    return this.validationForm.controls;
  }

  saveForm() {

    if (this.validationForm.valid) {

      Swal.fire({
        title: 'Are you sure you want to submit this entry?',
        // text: 'Your user will be processed',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {
          console.log("save");

          Swal.fire({
            timer: 3500,
            title: "Successful",
            text: 'Your entry is successfully',
            icon: 'success'
          }).then(result => {

            if (result.value || result.isDismissed) {
              window.location.reload()
              
            }
          });

        }

      });

    }
    this.isFormSubmitted = true;
  }



}
