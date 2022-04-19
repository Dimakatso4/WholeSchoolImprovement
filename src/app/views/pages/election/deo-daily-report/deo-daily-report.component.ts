import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ElectionService } from '../election.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-deo-daily-report',
  templateUrl: './deo-daily-report.component.html',
  styleUrls: ['./deo-daily-report.component.scss']
})
export class DEODailyReportComponent implements OnInit {
  deodashboard: any;
  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  constructor(
    private appService: AppService,
    private electionService: ElectionService,
    private router: Router,
    private modalService: NgbModal,
    public formBuilder: FormBuilder) { }

  public districtCode: any;
  public districtName: any;
  public totalSchools = 0;
  public totalSchoolsElected = 0;
  public totalSchoolsPending = 0;
  public totalSchoolsConductedElection = 0;
  public totalDulyElected = 0;
  public totalElectedThroughBallot = 0;
  public userRole: any;
  public reports: any;

  public DETLetters: any;
  public SETNo: any;
  public SETLetters: any;
  public schoolPairing: any;
  public outstanding: any;
  public submitted: any;
  public handOverNarrative: any;
  public DETDate: any;
  public DTEAttendance: any;
  public SETDate: any;
  public STEAttendance: any;
  public phase2: any;
  public deoId: any;
  public id: any;

  public schoolName;
  public emisCode;
  public mode;
  public timeOfElection;
  public provisionMade;
  public dulyElected;
  public quorumReached;
  public dateOfNextElection;
  public disputes;
  public resolved;
  public schools: any;

  public createReport: any;
  public endDate;
  public startDate;
  noReport = false;

  ngOnInit(): void {

    this.userRole = this.appService.getLoggedInUserRole();
    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    this.startDate = moment(new Date()).format('YYYY-MM-DD');
    this.endDate = moment(new Date()).format('YYYY-MM-DD');
    this.districtName = "District Name";

    this.validationForm = this.formBuilder.group({
      emisCode: ['', Validators.required],
      modeOfElection: ['', Validators.required],
      time: [''],
      electedThroughBallot: [''],
      dulyElected: ['', Validators.required],
      quorumReached: [''],
      disputes: ['', Validators.required],
      resolved: [''],
      dateOfNextElection: ['']
    });

    this.isFormSubmitted = false;

    if (this.userRole == "DEO") {
      this.districtCode = this.appService.getLoggedInDistrictCode()
    } else if (this.userRole == "PEO" || this.userRole == "HO") {
      this.districtCode = sessionStorage.getItem('district');
    } else {
      this.districtCode = this.appService.getLoggedInDistrictCode()
    }

    this.electionService.getSchoolsByDistrict(this.districtCode).subscribe((res: any) => {
      this.schools = res;

    }, err => {
      console.log(err);
      this.districtName = "No school found"
    })

    this.electionService.getDistrictByCode(this.districtCode).subscribe((name: any) => {
      this.districtName = name.districtName;

    }, err => {
      console.log(err);
      this.districtName = "NOT FOUND"
    })

    this.electionService.getCountByCode(this.districtCode, this.startDate, this.endDate).subscribe((count: any) => {
      console.log(count);
      this.totalSchools = count.totalNoOfSchools;
      this.totalSchoolsElected = count.succesfullyElected;
      this.totalSchoolsPending = count.pending;
      this.totalSchoolsConductedElection = count.noOfSchoolsConductedElections;
      this.totalDulyElected = count.dulyElected;
      this.totalElectedThroughBallot = count.electedThroughBallot;

    }, err => {
      console.log(err)
    })

    this.electionService.getDailyReportByCode(this.districtCode, moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD')).subscribe(res => {
      this.reports = res;
      console.log(res);

      if (this.reports.length > 0) {
        this.noReport = false;
      } else {
        this.noReport = true;
      }

    }, err => {
      console.log(err);
      this.noReport = true;
    })



  }

  get Form() {
    return this.validationForm.controls;
  }

  addNewReport(content) {
    this.isFormSubmitted = false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.validationForm.controls["dulyElected"].setValue("");
      this.validationForm.controls["quorumReached"].setValue("");

    }).
      catch((res) => {
      });

  }

  fieldChange() {

    if (this.validationForm.controls["dulyElected"].value == "No") {
      this.validationForm.controls["quorumReached"].setValidators([Validators.required]);
      this.validationForm.controls["quorumReached"].updateValueAndValidity();
    } else {
      this.validationForm.controls["quorumReached"].setValue("");
      this.validationForm.controls["quorumReached"].clearValidators()
      this.validationForm.controls["quorumReached"].updateValueAndValidity();
    }

    if (this.validationForm.controls["quorumReached"].value == "No") {
      this.validationForm.controls["dateOfNextElection"].setValidators([Validators.required]);
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();
      this.validationForm.controls["electedThroughBallot"].setValue("");
      this.validationForm.controls["electedThroughBallot"].clearValidators()
      this.validationForm.controls["electedThroughBallot"].updateValueAndValidity();
      // this.validationForm.controls["disputes"].setValue("");
      // this.validationForm.controls["disputes"].clearValidators()
      // this.validationForm.controls["disputes"].updateValueAndValidity();

    } else if (this.validationForm.controls["quorumReached"].value == "Yes" || this.validationForm.controls["quorumReached"].value == "Not applicable") {
      this.validationForm.controls["electedThroughBallot"].setValidators([Validators.required]);
      this.validationForm.controls["electedThroughBallot"].updateValueAndValidity();
      // this.validationForm.controls["disputes"].setValidators([Validators.required]);
      // this.validationForm.controls["disputes"].updateValueAndValidity();
      this.validationForm.controls["dateOfNextElection"].setValue("");
      this.validationForm.controls["dateOfNextElection"].clearValidators()
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();

    } else {
      this.validationForm.controls["electedThroughBallot"].setValue("");
      this.validationForm.controls["dateOfNextElection"].setValue("");
      // this.validationForm.controls["disputes"].setValue("");
      // this.validationForm.controls["disputes"].clearValidators();
      this.validationForm.controls["dateOfNextElection"].clearValidators();
      this.validationForm.controls["electedThroughBallot"].clearValidators();
      // this.validationForm.controls["disputes"].updateValueAndValidity();
      this.validationForm.controls["dateOfNextElection"].updateValueAndValidity();
      this.validationForm.controls["electedThroughBallot"].updateValueAndValidity();
    }

    if (this.validationForm.controls["disputes"].value == "Yes") {
      this.validationForm.controls["resolved"].setValidators([Validators.required]);
      this.validationForm.controls["resolved"].updateValueAndValidity();
    } else {
      this.validationForm.controls["resolved"].setValue("");
      this.validationForm.controls["resolved"].clearValidators()
      this.validationForm.controls["resolved"].updateValueAndValidity();
    }

  }

  resetModalForm() {
    this.isFormSubmitted = false;
    this.modalService.dismissAll();
    this.validationForm.controls["emisCode"].setValue("");
    this.validationForm.controls["dulyElected"].setValue("");
    this.validationForm.controls["resolved"].setValue("");
    this.validationForm.controls["disputes"].setValue("");
    this.validationForm.controls["modeOfElection"].setValue("");
    this.validationForm.controls["quorumReached"].setValue("");
    this.validationForm.controls["dateOfNextElection"].setValue("");
    this.validationForm.controls["electedThroughBallot"].setValue("");
  }


  searchData() {

    if (this.startDate && this.endDate) {

      this.electionService.getDailyReportByCode(this.districtCode, moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD')).subscribe(res => {
        this.reports = res;
        console.log(res);

        if (this.reports.length > 0) {
          this.noReport = false;
        } else {
          this.noReport = true;
        }

      }, err => {
        console.log(err);
        this.noReport = true;
      })


      this.electionService.getCountByCode(this.districtCode, moment(this.startDate).format('YYYY-MM-DD'), moment(this.endDate).format('YYYY-MM-DD')).subscribe((count: any) => {
        console.log(count);
        this.totalSchools = count.totalNoOfSchools;
        this.totalSchoolsElected = count.succesfullyElected;
        this.totalSchoolsPending = count.pending;
        this.totalSchoolsConductedElection = count.noOfSchoolsConductedElections;
        this.totalDulyElected = count.dulyElected;
        this.totalElectedThroughBallot = count.electedThroughBallot;

      }, err => {
        console.log(err);
      })
    }

  }

  getSchoolName() {
    let emiscode = this.validationForm.controls["emisCode"].value;
    this.electionService.getSchoolByEmisNumber(emiscode).subscribe((res: any) => {
      console.log(res)
      this.schoolName = res[0].institutionName
    }, err => {
      console.log(err)
    })


  }

  saveNewReport() {

    if (this.validationForm.valid) {


      Swal.fire({
        title: 'Are you sure you want to submit?',
        text: 'Your information will be processed',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {


          if (this.validationForm.controls["quorumReached"].value == "No") {
            this.validationForm.controls["electedThroughBallot"].setValue("No");

          }


          if (this.validationForm.controls["modeOfElection"].value == "Standard") {
            this.timeOfElection = "15h00"

          } else if (this.validationForm.controls["modeOfElection"].value == "Full Day") {
            this.timeOfElection = "08h00 - 16h00"
          }

          // if (this.validationForm.controls["electedThroughBallot"].value == "No") {
          //   this.dulyElected = "Yes";
          //   // this.validationForm.controls["electedThroughBallot"].setValue("Yes")
          // } else if (this.validationForm.controls["electedThroughBallot"].value == "Yes") {
          //   this.dulyElected = "No";
          // }
          let DONE;
          if (!this.validationForm.controls["dateOfNextElection"].value) {
            DONE = null;
          } else {
            DONE = this.validationForm.controls["dateOfNextElection"].value;
          }

          let report = {
            "id": 0,
            "emisCode": this.validationForm.controls["emisCode"].value,
            "mode": this.validationForm.controls["modeOfElection"].value,
            "quoromReached": this.validationForm.controls["quorumReached"].value,
            "provisionMade": this.validationForm.controls["electedThroughBallot"].value,
            "dateOfElection": moment(new Date()).format('YYYY-MM-DD'),
            "timeOfElection": this.timeOfElection,
            "districtName": this.districtName,
            "districtCode": this.districtCode,
            "schoolName": this.schoolName,
            "emisNumber": this.validationForm.controls["emisCode"].value,
            "dateOfNextElection": DONE,
            "disputes": this.validationForm.controls["disputes"].value,
            "resolved": this.validationForm.controls["resolved"].value,
            "dulyElected": this.validationForm.controls["dulyElected"].value
          }

          console.log(JSON.stringify(report));
          this.electionService.captureNewReport(report).subscribe(res => {
            console.log(res);
            Swal.fire(
              'Successful',
              'Your entry successsfully saved',
              'success'
            ).then((result) => {
              if (result.value || result.isDismissed) {
                // this.router.navigate(['/election/monitor-view'])
                this, this.modalService.dismissAll();
                window.location.reload();
                // this.router.navigate(['/dashboard'])
              }
            })
          }, err => {
            console.log(err);

            Swal.fire(
              'Unsuccessful',
              'Your entry was unsuccessful, please try again',
              'error'
            )
          })

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


}
