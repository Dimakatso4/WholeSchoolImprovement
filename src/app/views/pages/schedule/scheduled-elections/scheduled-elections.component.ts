import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { ScheduleService } from '../schedule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-scheduled-elections',
  templateUrl: './scheduled-elections.component.html',
  styleUrls: ['./scheduled-elections.component.scss']
})
export class ScheduledElectionsComponent implements OnInit {


  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  public emisNumber: any;
  public districtCode: any;
  public userId: any;
  public comment: any;
  public name: any;
  public surname: any;
  public schoolName: any;
  public districtName: any;
  public district: any;
  public designation: any;
  public electionScheduleStartDate: any;
  public electionScheduleStartTime: any;
  public deoDates: any;
  public deoSuggestedDate2;
  public deoSuggestedDate1;
  public deoComment;
  public dateProposed;
  public status: any;
  public nominationDate: any;
  public campaigningDate: any;
  public electionDate: any;
  public handoverDate: any;
  public assignMonitors: any;
  public officeBearerSubmissionDate: any;
  public assignObservers: any
  public selectedElection: any;
  public alternativeDate: any;
  public dateSelected: any = "";
  public dateSelectedBySchool;
  public hasTwoDates: Boolean;

  public observerCount: any;
  public monitorCount: any;


  public readName: any;
  public readSurname: any;
  public readDistrictName: any;
  public readSchoolName: any;
  public readDateProposed: any;
  public readDeoSuggestedDate1: any;
  public readDeoSuggestedDate2: any;
  public readAcceptPropsedDate: any;
  public readNominationDate: any;
  public readDeoComment: any;
  public readCampaigningDate: any;
  public readElectionDate: any;
  public readHandoverDate: any;
  public readOfficeBearerSubmissionDate: any;
  public readStatus: any;
  public readScheduleDate: any;
  public readAssignMonitors: any;
  public readAssignObservers: any;
  public readdateSelectedBySchool: any;
  public readAlternativeDate: any;
  public readSelectedEmisCode;
  public readSchoolPrincipal;
  public readElectoralOfficer = "";
  public readPairedSchool = "";


  electionView: any;
  acceptPropsedDate;
  public monitors;
  public observers
  public elections;
  public noElections = false;
  public noSuggestedDate = false;
  public scheduleDate: any;
  public isAccepted;
  public viewDeoSuggestedDate1;
  public viewDeoSuggestedDate2;
  public readFormatDeoSuggestedDate1;
  public readFormatDeoSuggestedDate2;
  public districtObservers;
  public districtMonitors;

  public selectedSchoolName;
  public selectedEmisCode;
  public schoolPrincipal;
  public electoralOfficer = "";
  public pairedSchool = "";
  public isSchoolPaired: Boolean;
  public userDistrict: any;
  public deoSelectedDate: any;

  schools;

  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private appService: AppService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder) { }

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {


    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });
    this.isSchoolPaired = false;

    this.scheduleService.getDistrictByCode(this.appService.getLoggedInDistrictCode()).subscribe((name: any) => {
      console.log(name)
      this.userDistrict = name.districtName
    }, err => {
      console.log(err);
      this.userDistrict = null;
    })


    this.scheduleService.getSchoolsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((school: any) => {
      console.log(school)
      this.schools = school;
    }, err => {
      console.log(err)
    })

    this.userId = this.appService.getLoggedInUserId();
    this.emisNumber = this.appService.getLoggedInEmisCode();
    this.districtCode = this.appService.getLoggedInDistrictCode();
    this.isFormSubmitted = false;

    this.validationForm = this.formBuilder.group({
      acceptPropsedDate: [''],
      deoSuggestedDate1: [''],
      deoSuggestedDate2: [''],
      deoComment: [''],
      nominationDate: [''],
      campaigningDate: [''],
      electionDate: [''],
      handoverDate: [''],
      assignMonitors: [''],
      officeBearerSubmissionDate: [''],
      suggestDate: ['No'],
      dateSelectedBySchool: [''],
      selectedSchoolName: [''],
      schoolPrincipal: [''],
      dateSelected: [''],
      pairedSchool: [''],
      electoralOfficer: [''],
      assignObservers: ['']
    });

    this.scheduleService.getElectionsByDistrict(this.districtCode).subscribe((res: any) => {
      // console.log(res);
      // this.elections = res;

      this.elections = res.filter(function (election) {
        return ["Election Scheduled"].includes(election.status) || ["Election Scheduled."].includes(election.status)
      });


      if (this.elections.length == 0) {
        this.noElections = true;

      }

      console.log(res)
      this.dtTrigger.next();

    }, err => {
      console.log(err);
      this.noElections = true;
    })


    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[0, 'desc']],// sort table in descending order
      pageLength: 10
    };

  }

  viewElection(i) {
    console.log(i);
  }

  fieldChange(flag) {
    this.isFormSubmitted = false;

    if (this.noSuggestedDate) {
      this.noSuggestedDate = false;

    }

    // console.log(this.validationForm.controls["acceptPropsedDate"].value);
    if (flag == "Yes") {
      this.deoSuggestedDate1 = null;
      this.deoSuggestedDate2 = null;
      this.validationForm.controls["deoSuggestedDate2"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].updateValueAndValidity();
      this.validationForm.controls["deoSuggestedDate2"].updateValueAndValidity();


      if (this.alternativeDate && this.alternativeDate != 'undefined' && this.alternativeDate != 'null') {
        this.validationForm.controls["dateSelected"].setValidators([Validators.required]);
        this.validationForm.controls["dateSelected"].updateValueAndValidity();
      }

      this.validationForm.controls["nominationDate"].setValidators([Validators.required]);
      this.validationForm.controls["nominationDate"].updateValueAndValidity();
      this.validationForm.controls["campaigningDate"].setValidators([Validators.required]);
      this.validationForm.controls["campaigningDate"].updateValueAndValidity();
      this.validationForm.controls["electionDate"].setValidators([Validators.required]);
      this.validationForm.controls["electionDate"].updateValueAndValidity();
      this.validationForm.controls["handoverDate"].setValidators([Validators.required]);
      this.validationForm.controls["handoverDate"].updateValueAndValidity();
      this.validationForm.controls["officeBearerSubmissionDate"].setValidators([Validators.required]);
      this.validationForm.controls["officeBearerSubmissionDate"].updateValueAndValidity();

      if (!this.isSchoolPaired) {
        this.validationForm.controls["assignMonitors"].setValidators([Validators.required]);
        this.validationForm.controls["assignMonitors"].updateValueAndValidity();
        this.validationForm.controls["assignObservers"].setValidators([Validators.required]);
        this.validationForm.controls["assignObservers"].updateValueAndValidity();
        this.validationForm.controls["pairedSchool"].setValidators([Validators.required]);
        this.validationForm.controls["pairedSchool"].updateValueAndValidity();
      }

    } else if (flag == "No") {
      this.nominationDate = "";
      this.officeBearerSubmissionDate = "";
      this.assignObservers = "";
      this.assignMonitors = "";
      this.assignObservers = "";
      this.handoverDate = "";
      this.electionDate = "";
      this.dateSelected = "";
      this.electoralOfficer = "";
      this.pairedSchool = "";
      this.validationForm.controls["deoSuggestedDate1"].setValidators([Validators.required]);
      this.validationForm.controls["deoSuggestedDate2"].setValidators([Validators.required]);
      this.validationForm.controls["dateSelected"].clearValidators();
      this.validationForm.controls["dateSelected"].updateValueAndValidity();
      this.validationForm.controls["nominationDate"].clearValidators();
      this.validationForm.controls["nominationDate"].updateValueAndValidity();
      this.validationForm.controls["campaigningDate"].clearValidators();
      this.validationForm.controls["campaigningDate"].updateValueAndValidity();
      this.validationForm.controls["electionDate"].clearValidators();
      this.validationForm.controls["electionDate"].updateValueAndValidity();
      this.validationForm.controls["handoverDate"].clearValidators();
      this.validationForm.controls["handoverDate"].updateValueAndValidity();
      this.validationForm.controls["officeBearerSubmissionDate"].clearValidators();
      this.validationForm.controls["officeBearerSubmissionDate"].updateValueAndValidity();
      this.validationForm.controls["assignMonitors"].clearValidators();
      this.validationForm.controls["assignMonitors"].updateValueAndValidity();
      this.validationForm.controls["assignObservers"].clearValidators();
      this.validationForm.controls["assignObservers"].updateValueAndValidity();
      this.validationForm.controls["pairedSchool"].clearValidators();
      this.validationForm.controls["pairedSchool"].updateValueAndValidity();

      this.validationForm.controls["deoSuggestedDate1"].updateValueAndValidity()
      this.validationForm.controls["deoSuggestedDate2"].updateValueAndValidity()
    } else {
      this.deoSuggestedDate1 = "";
      this.deoSuggestedDate2 = "";
      this.nominationDate = "";
      this.officeBearerSubmissionDate = "";
      this.assignObservers = "";
      this.assignMonitors = "";
      this.assignObservers = "";
      this.handoverDate = "";
      this.electionDate = "";
    }
    console.log(this.validationForm)


  }

  openViewModal(content, i) {
    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed: " + result);

    }).
      catch((res) => {
      });

    console.log(this.elections[i]);

    this.selectedSchoolName = this.elections[i].schoolName;
    this.selectedEmisCode = this.elections[i].emisCode;

    this.validationForm.controls["selectedSchoolName"].setValue(this.elections[i].schoolName);

    this.selectedElection = this.elections[i];
    this.readStatus = this.elections[i].status;
    this.readAlternativeDate = this.elections[i].alternativeDate;
    this.readDateProposed = moment(this.elections[i].schoolProposedDate).format('YYYY-MM-DD  hh:mm A');
    this.readdateSelectedBySchool = this.elections[i].dateSelectedBySchool;
    this.readScheduleDate = moment(this.elections[i].scheduleDate).format('YYYY-MM-DD');

    this.deoSelectedDate = this.selectedElection.schoolProposedDate;

    this.readDeoSuggestedDate1 = this.elections[i].deoSuggestedDate1;
    this.readDeoSuggestedDate2 = this.elections[i].deoSuggestedDate2;
    this.readAssignMonitors = this.elections[i].assignedMonitors;
    this.readAssignObservers = this.elections[i].assignedObservers;


    this.isAccepted = this.elections[i].isProposedScheduleAccepted;

    if (this.elections[i].deoSuggestedDate1) {
      this.readFormatDeoSuggestedDate1 = moment(this.elections[i].deoSuggestedDate1).format('YYYY-MM-DD  hh:mm A');
    } else {
      this.readFormatDeoSuggestedDate1 = null;
    }

    if (this.elections[i].deoSuggestedDate2) {
      this.readFormatDeoSuggestedDate2 = moment(this.elections[i].deoSuggestedDate2).format('YYYY-MM-DD  hh:mm A');
    } else {
      this.readFormatDeoSuggestedDate2 = null;
    }


    if (this.isAccepted) {
      this.readAcceptPropsedDate = "Yes";
    } else {
      this.readAcceptPropsedDate = "No";
    }


  }


  Cancel() {

  }

  get Form() {
    return this.validationForm.controls;
  }
}