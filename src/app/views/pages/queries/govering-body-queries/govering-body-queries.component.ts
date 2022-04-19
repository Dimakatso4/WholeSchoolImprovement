import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTable } from "simple-datatables";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-govering-body-queries',
  templateUrl: './govering-body-queries.component.html',
  styleUrls: ['./govering-body-queries.component.scss']
})
export class GoveringBodyQueriesComponent implements OnInit {


  basicModalCloseResult: string = '';
  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  public Name;
  public Surname;
  public Email;
  public Questions;
  public PhoneNumber;

  constructor(private modalService: NgbModal, private router: Router, private formBuilder: FormBuilder) { }

  queriesFormGroup: FormGroup;

  public data: any;
  public dataTable: any;


  ngOnInit(): void {


    this.validationForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required],
      Questions: ['', Validators.required],
      PhoneNumber: ['', Validators.required]
    });

    this.isFormSubmitted = false;

    this.data = [
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"

      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"
      },
      {
        "Name": "Tankiso",
        "Surname": "Sebenga",
        "Email": "sebenga@sky.com",
        "PhoneNumber": "0830289079",
        "Questions": "Lets test the questions"

      }

    ]

    let obj = {
      // Quickly get the headings
      headings: Object.keys(this.data[0]),

      // data array
      data: []
    };

    for (let i = 0; i < this.data.length; i++) {

      obj.data[i] = [];

      for (let p in this.data[i]) {
        if (this.data[i].hasOwnProperty(p)) {
          obj.data[i].push(this.data[i][p]);
        }
      }
    }

    let dataTable = new DataTable("#dataTableExample", {

      data: obj,
      searchable: true,
      fixedHeight: true
    });

    dataTable.on('datatable.refresh', function (refresh) {

    });

  }

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then(

      result => {
        //console.log("Close button clicked")
      },
      result => {
        //console.log("Close icon clicked or backdrop clicked")

      }).catch((res) => { });
  }

  sendQuery() {
    if (this.validationForm.valid) {
      console.log("Good")
    }
    this.isFormSubmitted = true;
  }

  // openBasicModal(content) {
  //   this.modalService.open(content, {}).result.then((result) => {
  //     this.basicModalCloseResult = "Modal closed" + result
  //   }).catch((res) => {});
  // }


  get Form() {
    return this.validationForm.controls;
  }


  saveQuery() {
    Swal.fire({
      title: 'Are you sure you want to save this Query?',
      text: 'Your Query will be processed',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        Swal.fire(
          'Confirmation!',
          'Election saved.',
          'success'
        )
        this.router.navigate(['/queries/governing-body']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }


}
