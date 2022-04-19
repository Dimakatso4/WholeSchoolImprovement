import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../disputes.service';
import { AppService } from 'src/app/app.service';
import * as jquery from 'jquery';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public disputes;
  public schoolName;
  public user;
  public schoolTitle;
  // public userRole: any;

  public noDisputes = false;

  userRole;
  userId;
  emisCode;

  // districtCode: "ES"
  // emisCode: "700400139"
  // institutionName

  //   assignedTo: "string"
  // capturedBy: 0
  // disputeDetails: "string"X
  // districtCode: "string"
  // dueDate: "2021-03-08T00:01:15.533" X
  // emisCode: "700400139"
  // feedback: "string"X
  // id: 2
  // modifiedBy: null
  // nameOfFacilitator: "string"X
  // officialTitle: "string"
  // parentEmail: "string"
  // parentMobileNumber: "string"
  // parentName: "string"
  // parentSurname: "string"
  // schoolName: "string"
  // status: x
  constructor(private disputeservice: DisputesService, private router: Router, private appservice: AppService) { }


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.userId = this.appservice.getLoggedInUserId();
    this.userRole = this.appservice.getLoggedInUserRole();

    if (this.appservice.getLoggedInUserRole() == "PARENT" || this.appservice.getLoggedInUserRole() == "SGB" || this.appservice.getLoggedInUserRole() == "SEO" || this.appservice.getLoggedInUserRole() == "PRINCIPAL") {
      this.emisCode = this.appservice.getLoggedInEmisCode();

      this.disputeservice.getDisputesBySchool(this.appservice.getLoggedInEmisCode()).subscribe(res => {

        this.disputes = res;
        this.dtTrigger.next();
        if (this.disputes.length == 0) {
          this.noDisputes = true;
        } else {
          this.noDisputes = false
        }

      }, err => {
        console.log(err);
        this.noDisputes = true;
      })

    } else if (this.appservice.getLoggedInUserRole() == "DEO" || this.appservice.getLoggedInUserRole() == "PEO" || this.appservice.getLoggedInUserRole() == "HO" || this.appservice.getLoggedInUserRole() == "ADMIN") {
      this.emisCode = sessionStorage.getItem('emis')

      this.disputeservice.getDisputesBySchool(this.emisCode).subscribe(res => {
        console.log(res)
        this.disputes = res;
        this.dtTrigger.next();
        if (this.disputes.length == 0) {
          this.noDisputes = true;
        } else {
          this.noDisputes = false
        }

      }, err => {
        console.log(err)
        this.noDisputes = true;
      })

    } else if (false) {

      this.disputeservice.getDisputesByHO().subscribe(res => {
        console.log(res)
        this.disputes = res;

        if (this.disputes.length == 0) {
          this.noDisputes = true;
        } else {
          this.noDisputes = false
        }

      }, err => {
        console.log(err)
        this.noDisputes = true;
      })
    }

    this.disputeservice.getUserById(this.userId).subscribe(user => {
      this.user = user;

      this.disputeservice.getSchoolByEmisNumber(this.emisCode).subscribe(school => {

        this.schoolName = school;
        this.schoolTitle = this.schoolName[0].institutionName;

      }, err => {
        console.log(err)
        this.noDisputes = true;
      })




    }, err => {
      console.log(err)
    })


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // processing: true,
      // responsive: true,
      paging: true,
      search: true

    };


  }

  view(i) {
    sessionStorage.setItem("disputeId", this.disputes[i].id);
    this.router.navigate(['/disputes/view']);
  }

}
