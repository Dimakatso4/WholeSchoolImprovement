import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ScheduleService } from '../schedule.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { parseJsonText } from 'typescript';
import { ThisReceiver, TypeScriptEmitter } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {


  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  public emisNumber: any;
  public districtCode: any;
  public userId: any;
  public comment: any;
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
  public SEOID: any;
  public SEOemail: any;
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
  public todaysDate: any = this.toISOLocal(new Date())
  public todaysDateOnly: any = this.toISOLocalDate(new Date())

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
  public allSchoolElection: any;
  public PairedSchoolName: any;
  public PairedSchoolEmiscode: any;
  public isSchoolPaired: Boolean;
  public bannerTitle: any;
  public schoolPrincipalInfo = [];
  public districtUsers = [];
  public deoFullname: any;
  public acceptMsg = "<p>School election has been succesfully scheduled, <a target='_blank' href='" + environment.homelink + "'>click here</a> to login into the system to send notice to all the parents</p></br>";
  public declineMsg = "<p>Please be aware that you proposed election date has been declined, <a target='_blank' href='" + environment.homelink + "'>click here</a> to login into the system to continue the election scheduling process</p></br>";
  public bodyMsg: any;
  // public emailBody: any;

  public schools: any;
  public allSchools: any;
  public pairedSEO: any;

  constructor(
    private router: Router,
    private scheduleService: ScheduleService,
    private appService: AppService,
    private modalService: NgbModal,
    public datepipe: DatePipe,
    public formBuilder: FormBuilder) { }

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });
    this.isSchoolPaired = false;
    this.deoFullname = this.appService.getIsLoggedInUsername();
    this.userId = this.appService.getLoggedInUserId();
    this.emisNumber = this.appService.getLoggedInEmisCode();
    this.districtCode = this.appService.getLoggedInDistrictCode();
    this.isFormSubmitted = false;

    if (this.appService.getLoggedInDistrictCode()) {

      this.scheduleService.getDistrictByCode(this.appService.getLoggedInDistrictCode()).subscribe((res: any) => {
        // console.log(res);
        this.bannerTitle = res.districtName;
      }, err => {
        console.log(err);
      })

    }

    this.scheduleService.getUsersByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((res: any) => {

      console.log(res)

      this.districtUsers = res;

      const Observers = res.filter(function (user) {
        return ["DISTRICT_OBSERVER"].includes(user.userType)
      });
      const Monitors = res.filter(function (user) {
        return ["DISTRICT_MONITOR"].includes(user.userType)
      });

      this.districtMonitors = Monitors.map((i) => {
        i.fullName = i.firstname + ' ' + i.surname;
        return i;
      });
      this.districtObservers = Observers.map((i) => {
        i.fullName = i.firstname + ' ' + i.surname;
        return i;
      });
      this.monitorCount = this.districtMonitors.length
      this.observerCount = this.districtObservers.length

      // console.log(this.districtObservers);
      // console.log(this.districtMonitors);
    }, err => {
      console.log(err);
      this.districtObservers = [];
      this.districtMonitors = [];
    })

    this.scheduleService.getSchoolsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((school: any) => {
      console.log(school);
      this.allSchools = school;

    }, err => {
      console.log(err)
    })


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
      console.log(res);
      this.allSchoolElection = res;
      this.elections = res.filter(function (election) {
        return !["Election Scheduled"].includes(election.status) && !["Election Scheduled."].includes(election.status)
      });

      if (this.elections.length == 0) {
        this.noElections = true;

      }
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

  toISOLocal(d) {
    var z = n => ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? '+' : '-';
    off = Math.abs(off);

    return d.getFullYear() + '-'
      + z(d.getMonth() + 1) + '-' +
      z(d.getDate()) + 'T' +
      z(d.getHours()) + ':' +
      z(d.getMinutes())
  }

  toISOLocalDate(d) {
    var z = n => ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? '+' : '-';
    off = Math.abs(off);

    return d.getFullYear() + '-'
      + z(d.getMonth() + 1) + '-' +
      z(d.getDate())

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
      this.bodyMsg = this.acceptMsg;
      this.deoSuggestedDate1 = "";
      this.deoSuggestedDate2 = "";
      this.validationForm.controls["deoSuggestedDate2"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].updateValueAndValidity();
      this.validationForm.controls["deoSuggestedDate2"].updateValueAndValidity();


      if (this.alternativeDate && this.alternativeDate != 'undefined' && this.alternativeDate != 'null' && this.acceptPropsedDate == "Yes") {
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
      this.validationForm.controls["assignMonitors"].setValidators([Validators.required]);
      this.validationForm.controls["assignMonitors"].updateValueAndValidity();
      this.validationForm.controls["assignObservers"].setValidators([Validators.required]);
      this.validationForm.controls["assignObservers"].updateValueAndValidity();

      if (!this.isSchoolPaired) {
        // this.validationForm.controls["assignMonitors"].setValidators([Validators.required]);
        // this.validationForm.controls["assignMonitors"].updateValueAndValidity();
        // this.validationForm.controls["assignObservers"].setValidators([Validators.required]);
        // this.validationForm.controls["assignObservers"].updateValueAndValidity();
        this.validationForm.controls["pairedSchool"].setValidators([Validators.required]);
        this.validationForm.controls["pairedSchool"].updateValueAndValidity();
      }

    } else if (flag == "No") {
      this.bodyMsg = this.declineMsg;
      this.nominationDate = "";
      this.officeBearerSubmissionDate = "";
      this.assignObservers = "";
      this.assignMonitors = "";
      this.assignObservers = "";
      this.handoverDate = "";
      this.electionDate = "";
      this.electoralOfficer = "";
      this.pairedSchool = "";
      if (this.alternativeDate && this.alternativeDate != 'undefined' && this.alternativeDate != 'null') {
        this.dateSelected = "";
      }

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
      this.bodyMsg = "";
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

  openLgModal(content, i) {
    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });

    if (this.isFormSubmitted) {
      this.isFormSubmitted = false;
    }

    this.deoComment = "";
    this.acceptPropsedDate = "";
    this.dateSelected = "";
    this.assignMonitors = "";
    this.assignObservers = "";
    this.bodyMsg = this.acceptMsg;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed: " + result);
      this.deoComment = "";
      this.acceptPropsedDate = "";
      this.isFormSubmitted = false;

    }).
      catch((res) => {
      });

    console.log(this.elections[i])

    let principalId = this.elections[i].scheduledBy;
    let emiscode = this.elections[i].emisCode;

    this.schools = this.allSchools.filter(function (s) {
      return ![emiscode].includes(s.emisCode) && [false].includes(s.isSchoolPaired)
    });

    let selectedSchool = this.allSchools.filter(function (s) {
      return [emiscode].includes(s.emisCode)
    });

    console.log(selectedSchool[0])
    this.isSchoolPaired = selectedSchool[0].isSchoolPaired;


    this.schoolPrincipalInfo = this.districtUsers.filter(function (e) {
      return [principalId].includes(e.id)
    });
    this.validationForm.controls["suggestDate"].disable();
    console.log(this.schoolPrincipalInfo[0])


    this.acceptPropsedDate = "";
    this.SEOID = "";
    this.SEOemail = "";
    this.electoralOfficer = "";
    this.pairedSchool = "";
    this.PairedSchoolEmiscode = "";
    this.nominationDate = "";
    this.campaigningDate = "";
    this.handoverDate = "";
    this.officeBearerSubmissionDate = "";
    this.electionDate = "";

    this.selectedSchoolName = this.elections[i].schoolName;
    let schoolSelected = this.elections[i].emisCode;
    let pairedSchoolInfo = this.allSchoolElection.filter(function (e) {
      return [schoolSelected].includes(e.emisCode)
    });
    // console.log(pairedSchoolInfo);
    // console.log(this.elections[i]);

    this.scheduleService.getUserById(pairedSchoolInfo[pairedSchoolInfo.length - 1].scheduledBy).subscribe((user: any) => {
      // console.log(user);      
      this.pairedSEO = user;
    }, err => {
      console.log(err);
      // this.SEOemail = "";
    })

    this.selectedEmisCode = this.elections[i].emisCode;
    this.validationForm.controls["selectedSchoolName"].setValue(this.elections[i].schoolName);

    this.selectedElection = this.elections[i];
    this.schoolPrincipal = this.elections[i].principalFullname;
    this.districtName = this.elections[i].district;
    this.schoolName = this.elections[i].schoolName;
    this.status = this.elections[i].status;
    this.dateProposed = moment(this.elections[i].schoolProposedDate).format('YYYY-MM-DD  hh:mm A');//this.elections[i].schoolProposedDate;
    this.dateSelectedBySchool = this.elections[i].dateSelectedBySchool;
    this.deoSuggestedDate1 = this.elections[i].deoSuggestedDate1;
    this.deoSuggestedDate2 = this.elections[i].deoSuggestedDate2;
    this.viewDeoSuggestedDate1 = moment(this.elections[i].deoSuggestedDate1).format('YYYY-MM-DD  hh:mm A');
    this.viewDeoSuggestedDate2 = moment(this.elections[i].deoSuggestedDate2).format('YYYY-MM-DD  hh:mm A');
    this.deoComment = this.elections[i].deoComment;
    // this.pairedSchoolName = "";
    if (!this.elections[i].alternativeDate || this.elections[i].alternativeDate == "undefined" || this.elections[i].alternativeDate == "null") {
      this.dateSelected = this.elections[i].schoolProposedDate;
    }

    if (this.elections[i].alternativeDate && this.elections[i].alternativeDate != "undefined" && this.elections[i].alternativeDate != "null") {
      this.alternativeDate = moment(this.elections[i].alternativeDate).format('YYYY-MM-DD  hh:mm A');
    } else {
      this.alternativeDate = this.elections[i].alternativeDate;
    }




    if (this.status == "Pending DEO Confirmation") {
      this.validationForm.controls["dateSelectedBySchool"].disable();

      this.deoSuggestedDate1 = null;
      this.deoSuggestedDate2 = null;
      this.validationForm.controls["deoSuggestedDate2"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].clearValidators();
      this.validationForm.controls["deoSuggestedDate1"].updateValueAndValidity();
      this.validationForm.controls["deoSuggestedDate2"].updateValueAndValidity();


      if (this.alternativeDate && this.alternativeDate != 'undefined' && this.alternativeDate != 'null' && this.acceptPropsedDate == "Yes") {
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
        // this.validationForm.controls["assignMonitors"].setValidators([Validators.required]);
        // this.validationForm.controls["assignMonitors"].updateValueAndValidity();
        // this.validationForm.controls["assignObservers"].setValidators([Validators.required]);
        // this.validationForm.controls["assignObservers"].updateValueAndValidity();
        this.validationForm.controls["pairedSchool"].setValidators([Validators.required]);
        this.validationForm.controls["pairedSchool"].updateValueAndValidity();
      }
    }



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

    this.readName = this.elections[i].principalFullname;
    this.readSurname = this.elections[i].seoFullname;
    this.readDistrictName = this.elections[i].district;
    this.readSchoolName = this.elections[i].schoolName;
    this.readStatus = this.elections[i].status;
    this.readAlternativeDate = this.elections[i].alternativeDate;
    this.readDateProposed = moment(this.elections[i].schoolProposedDate).format('YYYY-MM-DD  hh:mm A');
    this.readdateSelectedBySchool = this.elections[i].dateSelectedBySchool;
    this.readDeoComment = this.elections[i].deoComment;
    this.readScheduleDate = moment(this.elections[i].scheduleDate).format('YYYY-MM-DD');
    this.readFormatDeoSuggestedDate1 = moment(this.elections[i].deoSuggestedDate1).format('YYYY-MM-DD  hh:mm A');
    this.readFormatDeoSuggestedDate2 = moment(this.elections[i].deoSuggestedDate2).format('YYYY-MM-DD  hh:mm A');
    this.readDeoSuggestedDate1 = this.elections[i].deoSuggestedDate1;
    this.readDeoSuggestedDate2 = this.elections[i].deoSuggestedDate2;
    this.readNominationDate = moment(this.elections[i].nominationDate).format('YYYY-MM-DD');
    this.readCampaigningDate = moment(this.elections[i].campaigningDate).format('YYYY-MM-DD');
    this.readHandoverDate = moment(this.elections[i].handoverDate).format('YYYY-MM-DD');
    this.readOfficeBearerSubmissionDate = moment(this.elections[i].officeBearersSubmissionDate).format('YYYY-MM-DD');
    this.readElectionDate = moment(this.elections[i].electionDate).format('YYYY-MM-DD');
    this.readAssignMonitors = this.elections[i].assignedMonitors;
    this.readAssignObservers = this.elections[i].assignedObservers;
    this.isAccepted = this.elections[i].isProposedScheduleAccepted;

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


  saveElection() {

    let isValid = true;
    // if (this.alternativeDate && this.alternativeDate != 'undefined' && this.alternativeDate != 'null' && this.acceptPropsedDate == 'Yes' && !this.dateSelected) {
    //   isValid = false

    // }
    // console.log(this.PairedSchoolEmiscode)


    // let selectedSchool = "EDENPARK PRIMARY SCHOOL"//this.selectedSchoolName;
    // let pairedSchoolInfo = this.allSchoolElection.filter(function (e) {
    //   return [selectedSchool].includes(e.pairedSchoolname)
    // });


    if (!this.deoSuggestedDate1 && !this.deoSuggestedDate2) {
      this.noSuggestedDate = true;
    } else {
      this.noSuggestedDate = false
    }

    if (this.validationForm.valid && this.status == "Pending DEO Confirmation" || this.validationForm.valid && this.acceptPropsedDate == "Yes" && isValid || this.acceptPropsedDate == "No" && !this.noSuggestedDate) {

      Swal.fire({
        title: 'Are you sure you want to save this election?',
        text: 'Your information will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          let electionDetails;
          let pairSchool;
          //'{"UserId":' + this.SEOID + ',"EmisCode":"' + this.PairedSchoolEmiscode + '"}';

          if (this.isSchoolPaired) {
            let selectedSchool = this.selectedSchoolName;
            let pairedSchoolInfo = this.allSchoolElection.filter(function (e) {
              return [selectedSchool].includes(e.pairedSchoolname)
            });

            // console.log(pairedSchoolInfo)


            this.PairedSchoolName = pairedSchoolInfo[pairedSchoolInfo.length - 1].schoolName;
            this.electoralOfficer = pairedSchoolInfo[pairedSchoolInfo.length - 1].principalFullname;
            pairSchool = {
              "UserId": pairedSchoolInfo[pairedSchoolInfo.length - 1].scheduledBy,
              "EmisCode": pairedSchoolInfo[pairedSchoolInfo.length - 1].emisCode
            }

          } else {
            pairSchool = {
              "UserId": this.SEOID,
              "EmisCode": this.PairedSchoolEmiscode
            }
          }

          let emailSubject;
          let emailAddress;
          let sendNotice: Boolean;

          if (this.acceptPropsedDate == "Yes") {

            this.bodyMsg = this.acceptMsg;
            emailSubject = "School election scheduled";

            if (this.isSchoolPaired) {
              emailAddress = this.pairedSEO.emailAddress;
            } else {
              emailAddress = this.SEOemail;
            }

            let monitors = [];
            for (var key in this.assignMonitors) {
              if (this.assignMonitors.hasOwnProperty(key)) {
                monitors.push(this.assignMonitors[key].fullName);
              }
            }

            let observers = [];
            for (var key in this.assignObservers) {
              if (this.assignObservers.hasOwnProperty(key)) {
                observers.push(this.assignObservers[key].fullName);
              }
            }

            electionDetails = {
              "id": parseInt(this.selectedElection.id),
              "principalFullname": this.schoolPrincipal,
              "seoFullname": this.electoralOfficer,
              "districtCode": this.selectedElection.districtCode,
              "emisCode": this.selectedElection.emisCode,
              "alternativeDate": this.selectedElection.alternativeDate,
              "schoolName": this.schoolName,
              "district": this.districtName,
              "schoolProposedDate": new Date(this.dateProposed).toISOString(),
              "scheduledBy": parseInt(this.selectedElection.scheduledBy),
              "status": "Election Scheduled",
              "deoComment": this.deoComment,
              "isProposedScheduleAccepted": true,
              "scheduleDate": new Date(this.dateProposed).toISOString(),
              // "dateSelectedBySchool": this.dateSelectedBySchool,
              "nominationDate": new Date(this.nominationDate).toISOString(),
              "campaigningDate": new Date(this.campaigningDate).toISOString(),
              "handoverDate": new Date(this.handoverDate).toISOString(),
              "officeBearersSubmissionDate": new Date(this.officeBearerSubmissionDate).toISOString(),
              "electionDate": new Date(this.electionDate).toISOString(),
              "assignedMonitors": monitors.toString(),
              'schoolPairing': JSON.stringify(pairSchool),//"{" + pairSchool + "}",
              "pairedSchoolname": this.PairedSchoolName,
              "memoId": parseInt(this.selectedElection.memoId),
              "assignedObservers": observers.toString()
            }

            this.scheduleService.pairSchool(this.PairedSchoolEmiscode).subscribe(() => { })
            this.scheduleService.pairSchool(this.selectedElection.emisCode).subscribe(() => { })


          } else if (!this.selectedElection.isProposedScheduleAccepted && this.status == "Pending DEO Confirmation") {

            this.bodyMsg = this.acceptMsg;
            emailSubject = "School election scheduled";


            if (this.isSchoolPaired) {
              emailAddress = this.pairedSEO.emailAddress;
            } else {
              emailAddress = this.SEOemail;
            }

            let monitors = [];
            for (var key in this.assignMonitors) {
              if (this.assignMonitors.hasOwnProperty(key)) {
                monitors.push(this.assignMonitors[key].fullName);
              }
            }

            let observers = [];
            for (var key in this.assignObservers) {
              if (this.assignObservers.hasOwnProperty(key)) {
                observers.push(this.assignObservers[key].fullName);
              }
            }

            electionDetails = {
              "id": parseInt(this.selectedElection.id),
              "memoId": parseInt(this.selectedElection.memoId),
              "principalFullname": this.schoolPrincipal,
              "seoFullname": this.electoralOfficer,
              "districtCode": this.selectedElection.districtCode,
              "emisCode": this.selectedElection.emisCode,
              "schoolName": this.schoolName,
              "district": this.districtName,
              "schoolProposedDate": new Date(this.dateProposed).toISOString(),
              "scheduledBy": parseInt(this.selectedElection.scheduledBy),
              "status": "Election Scheduled",
              "deoComment": this.deoComment,
              "isProposedScheduleAccepted": false,
              "scheduleDate": new Date(this.dateSelectedBySchool).toISOString(),
              // "schoolProposedTime": this.dateProposed,
              "dateSelectedBySchool": new Date(this.dateSelectedBySchool).toISOString(),
              "deoSuggestedDate1": new Date(this.selectedElection.deoSuggestedDate1).toISOString(),
              "deoSuggestedDate2": new Date(this.selectedElection.deoSuggestedDate2).toISOString(),
              "nominationDate": new Date(this.nominationDate).toISOString(),
              "campaigningDate": new Date(this.campaigningDate).toISOString(),
              "handoverDate": new Date(this.handoverDate).toISOString(),
              "officeBearersSubmissionDate": new Date(this.officeBearerSubmissionDate).toISOString(),
              "electionDate": new Date(this.electionDate).toISOString(),
              "assignedMonitors": monitors.toString(),
              'schoolPairing': JSON.stringify(pairSchool),//JSON.stringify(pairSchool).toString(),//"{" + pairSchool + "}",
              "pairedSchoolname": this.PairedSchoolName,
              "assignedObservers": observers.toString()
            }

            this.scheduleService.pairSchool(this.PairedSchoolEmiscode).subscribe(() => { })
            this.scheduleService.pairSchool(this.selectedElection.emisCode).subscribe(() => { })

          } else if (this.acceptPropsedDate == "No") {
            // PROPOSED DATE REJECTED

            this.bodyMsg = this.declineMsg;
            emailSubject = "Proposed election date declined";
            emailAddress = this.schoolPrincipalInfo[0].emailAddress

            electionDetails = {
              "id": parseInt(this.selectedElection.id),
              "memoId": parseInt(this.selectedElection.memoId),
              "principalFullname": this.schoolPrincipal,
              "seoFullname": this.electoralOfficer,
              "districtCode": this.selectedElection.districtCode,
              "emisCode": this.selectedElection.emisCode,
              "schoolName": this.schoolName,
              "district": this.districtName,
              "schoolProposedDate": this.selectedElection.schoolProposedDate,
              "alternativeDate": this.selectedElection.alternativeDate,
              "scheduledBy": parseInt(this.selectedElection.scheduledBy),
              "status": "Pending SEO Review",
              "deoComment": this.deoComment,
              "isProposedScheduleAccepted": false,
              // "endDate": "",
              // "scheduleDate": schduleDate,
              // "schoolProposedTime": this.dateProposed,
              // "dateSelectedBySchool": this.dateSelectedBySchool,
              "deoSuggestedDate1": this.deoSuggestedDate1,
              "deoSuggestedDate2": this.deoSuggestedDate2,
              // "nominationDate": this.nominationDate,
              // "campaigningDate": this.campaigningDate,
              // "handoverDate": this.handoverDate,
              // "officeBearersSubmissionDate": this.officeBearerSubmissionDate,
              // "electionDate": this.electionDate,
              // "assignedMonitors": this.assignMonitors,
              // "assignedObservers": this.assignObservers
            }
          }



          // console.log(electionDetails)

          let monitors = [];
          for (var key in this.assignMonitors) {
            if (this.assignMonitors.hasOwnProperty(key)) {
              //  console.log(this.selectedPeople[key].id);
              monitors.push(this.assignMonitors[key].fullName);
            }
          }

          let observers = [];
          for (var key in this.assignObservers) {
            if (this.assignObservers.hasOwnProperty(key)) {
              //  console.log(this.selectedPeople[key].id);
              observers.push(this.assignObservers[key].fullName);
            }
          }

          // console.log(JSON.stringify(electionDetails))
          console.log(electionDetails)
          let emailBody = "<p>Good day " + this.schoolPrincipal + "</p></br>" +
            this.bodyMsg + "<p>Regards.</p> <p>" + this.deoFullname + "</p>";
          this.scheduleService.updateScheduleElection(electionDetails).subscribe(res => {
            //   console.log(res);

            let sendmail = new FormData();
            sendmail.append("ToEmail", emailAddress);
            sendmail.append("Subject", emailSubject);
            sendmail.append("Body", emailBody);
            // if (pairSchool) {
            //   //  PAIR SCHOOLS
            // }
            this.scheduleService.sendMail(sendmail).subscribe(() => { }, err => {
              console.log(err);
            });


            Swal.fire(
              'Confirmation!',
              'Election saved.',
              'success'
            ).then((result) => {
              if (result.value || result.isDismissed) {
                window.location.reload()
                this.modalService.dismissAll();
              }
            })

          }, err => {
            console.log(err);
            this.status = "Pending DEO Review";
            Swal.fire(
              'Error!',
              'We apologize there was a problem with saving you entry, please try again.',
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

  pairSchool(emiscode: String) {

    let schoolObject = emiscode.split(',');
    // console.log(schoolObject);
    this.PairedSchoolEmiscode = schoolObject[0];
    this.PairedSchoolName = schoolObject[1];

    this.scheduleService.getPrincipalBySchool(schoolObject[0]).subscribe((principal: any) => {
      console.log(principal);
      this.electoralOfficer = "";

      if (principal) {
        this.electoralOfficer = principal.firstname + " " + principal.surname;
        this.SEOID = principal.id;
        this.SEOemail = principal.emailAddress;
      }

    }, err => {
      console.log(err);
    })
  }


}



      // this.schools = school.filter(function (s) {
      //   return [false].includes(s.isSchoolPaired) selectedEmisCode == school.emisCode || school.isSchoolPaired
      // });