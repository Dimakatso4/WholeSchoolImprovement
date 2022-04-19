import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ElectionService } from '../election.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-weekly-deo-report',
  templateUrl: './weekly-deo-report.component.html',
  styleUrls: ['./weekly-deo-report.component.scss']
})
export class WeeklyDeoReportComponent implements OnInit {
  deodashboard: any;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  basicModalCloseResult: string = '';
  constructor(private appService: AppService, private electionService: ElectionService, private modalService: NgbModal, private router: Router, private userService: UsersService, public formBuilder: FormBuilder, public datepipe: DatePipe, private userservice:UsersService) { }

  public districtCode: any;
  public allDistricts: any;
  public totalSchools: any;
  public appointmentOfOfficer: any;
  public appointmentOfTeam: any;
  public DETNo: any;
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
  public userDistrict: any = this.appService.getLoggedInDistrictCode();
  public userDistrictName: any;
  public userDistrictNameForm: any;
  public firstName:any;
  public lastName:any;


  public createReport: any;

  public getGeoId: any = this.appService.getLoggedInUserId();

  getWeeklyDashboard(e) {
    this.electionService.getDeoWeeklyDashboard(e).subscribe((res) => {

      //console.log(res);
      this.deodashboard = res;
      /// alert(JSON.stringify(this.deodashboard ));
    });
  }




  ngOnInit(): void {
    let deoId = this.appService.getLoggedInUserId();
    /*this.userservice.getUserById(deoId).subscribe((res: any) => {
      let user = res;
      this.firstName = user.firstname;
      this.lastName = user.surname;

    });*/


    this.electionService.getDistrictByCode(this.userDistrict).subscribe((res: any) => {
      this.userDistrictName = res.districtName;
    });

    this.electionService.getDeoWeeklyReportByDistrict(this.userDistrict).subscribe((res) => {

      this.deodashboard = res;
      //window.location.reload();
      console.log(JSON.stringify(this.deodashboard ));
    });

    this.userService.getAllDistricts().subscribe((res: any) => {
      this.allDistricts = res;
      //console.log(this.allDistricts)

    });


    this.validationForm = this.formBuilder.group({
      districtCode: ['', Validators.required],
      totalSchools: ['', [Validators.required, Validators.min(0)]],
      appointmentOfOfficer: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      DETNo: ['', [Validators.required, Validators.min(0)]],
      DETLetters: ['', [Validators.required, Validators.min(0)]],
      SETNo: ['', [Validators.required, Validators.min(0)]],
      SETLetters: ['', [Validators.required, Validators.min(0)]],
      schoolPairing: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      outstanding: ['', [Validators.required, Validators.min(0)]],
      submitted: ['', [Validators.required, Validators.min(0)]],
      handOverNarrative: ['', Validators.required],
      DETDate: ['', [Validators.required, Validators.pattern('^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$')]],
      DTEAttendance: ['', [Validators.required, Validators.min(0)]],
      SETDate: ['', [Validators.required, Validators.pattern('^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$')]],
      STEAttendance: ['', [Validators.required, Validators.min(0)]],
      phase2: ['', [Validators.required, Validators.min(0)]]


    });
    this.isCreateFormSubmitted = false

  }

  openXlModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  date(e) {
    let date = new Date('2013-08-03T02:00:00Z');
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    /* if (dt < 10) {
       dt = '0' + dt;
     }
     if (month < 10) {
       month = '0' + month;
     }*/

    return year + '-' + month + '-' + dt
  }

  view(i) {
    // alert(JSON.stringify(this.deodashboard[i]));
    this.id = this.deodashboard[i].id;
    this.districtCode = this.deodashboard[i].districtCode;
    this.deoId = this.deodashboard[i].deoId;
    this.totalSchools = this.deodashboard[i].noOfSchools;
    this.DETNo = this.deodashboard[i].appointmentOfDEONumber;
    this.DETLetters = this.deodashboard[i].appointmentOfDEOLetters;
    this.SETNo = this.deodashboard[i].appointmentOfSETNumber;
    this.SETLetters = this.deodashboard[i].appointmentOfSETLetters;
    this.schoolPairing = this.deodashboard[i].pairingOfSchools;
    this.submitted = this.deodashboard[i].electionScheduleSubmitted;
    this.outstanding = this.deodashboard[i].electionScheduleOustanding;
    this.handOverNarrative = this.deodashboard[i].handoverNarrativeReportSubmission;
    this.totalSchools = this.deodashboard[i].schoolsPerDistrict;
    this.DETDate = this.datepipe.transform(new Date(this.deodashboard[i].trainingDETDate), 'yyyy-MM-dd');
    this.DTEAttendance = this.deodashboard[i].trainingDETTotalAttedance;
    this.SETDate = this.datepipe.transform(new Date(this.deodashboard[i].trainingSETDate), 'yyyy-MM-dd');
    this.STEAttendance = this.deodashboard[i].trainingSETTotalAttedance;
    this.phase2 = this.deodashboard[i].phase2HandoverCompleted;
    this.appointmentOfOfficer = this.deodashboard[i].appointmentOfDEOPercentage;
  }

  saveReport() {
    if (this.validationForm.valid) {
      Swal.fire({
        title: 'Are you sure you want to save this district electoral officers weekly reporting?',
        text: 'District Electoral Officers Weekly Reporting',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          let deoId = this.appService.getLoggedInUserId();
          this.createReport = {
            id: this.id,
            deoId: parseInt(deoId),
            noOfSchools: parseInt(this.totalSchools),
            appointmentOfDEONumber: parseInt(this.DETNo),
            appointmentOfDEOLetters: parseInt(this.DETLetters),
            appointmentOfSETNumber: parseInt(this.SETNo),
            appointmentOfSETLetters: parseInt(this.SETLetters),
            pairingOfSchools: parseInt(this.schoolPairing),
            electionScheduleSubmitted: parseInt(this.submitted),
            electionScheduleOustanding: parseInt(this.outstanding),
            handoverNarrativeReportSubmission: parseInt(this.handOverNarrative),
            schoolsPerDistrict: parseInt(this.totalSchools),
            trainingDETDate: new Date(this.DETDate).toISOString(),
            trainingDETTotalAttedance: parseInt(this.DTEAttendance),
            trainingSETDate: new Date(this.SETDate).toISOString(),
            trainingSETTotalAttedance: parseInt(this.STEAttendance),
            phase2HandoverCompleted: this.phase2,
            appointmentOfDEOPercentage: parseInt(this.appointmentOfOfficer),
            districtCode: this.districtCode,
            firstname: this.firstName,
            surname: this.lastName
          }
          

          console.log(JSON.stringify(this.createReport));
          this.electionService.updateDeoWeeklyDashboard(this.createReport) 
          Swal.fire(
            'Confirmation!',
            'District Electoral Officers weekly reporting saved.',
            'success'
          )
          window.location.reload();

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })
    }
    this.isCreateFormSubmitted = true;

  }

  get createForm() {
    return this.validationForm.controls;
  }
}
