import { Component, OnInit } from '@angular/core';
import { DataTable } from "simple-datatables";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-district-electoralofficer-queries',
  templateUrl: './district-electoralofficer-queries.component.html',
  styleUrls: ['./district-electoralofficer-queries.component.scss']
})
export class DistrictElectoralofficerQueriesComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  public Name;
  public Surname;
  public Email;
  public Questions;
  public PhoneNumber;

  constructor(private modalService: NgbModal, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }


  queriesFormGroup: FormGroup;
  public data: any;


  ngOnInit(): void {


    this.validationForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required],
      Questions: ['', Validators.required],
      PhoneNumber: ['', Validators.required]
    });

    this.isFormSubmitted = false;

    this.http.get("https://sgbserviceapi-dev.azurewebsites.net/api/Meeting/MeetingList").subscribe((res: any) => {
      this.data = res;

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
        searchable: true

      });

    });


    this.queriesFormGroup = this.formBuilder.group({
      Name: "",
      Surname: "",
      Email: "",
      PhoneNumber: "",
      Questions: ""

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
          this.router.navigate(['/queries/district-electoral-officer']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })
    }
    this.isFormSubmitted = true;
  }

  get Form() {
    return this.validationForm.controls;
  }


}
