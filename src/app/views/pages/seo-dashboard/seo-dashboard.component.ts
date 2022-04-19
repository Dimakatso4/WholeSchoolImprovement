import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { SeoDashboardService } from './seo-dashboard.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-seo-dashboard',
  templateUrl: './seo-dashboard.component.html',
  styleUrls: ['./seo-dashboard.component.scss']
})
export class SEODashboardComponent implements OnInit {

  public elections;
  public noElections;
  public districtCode;
  public userId;
  public emisNumber;
  public userRole;
  public selectedElection: any;

  public queries;
  public voterCast;
  public totalVoters;
  public nominees;

  public proposedDate;
  public deoSuggestedDate1;
  public deoSuggestedDate2;
  public deoComment;
  public dateSelectedBySchool;
  public status;
  public alternativeDate;
  public newProposedDate;
  public newAlternativeDate;
  public todaysDate: any = this.toISOLocal(new Date())
  public proposeDate;


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
  public selectedDate: any;
  public deoSelectedDate: any;

  public isFormSubmitted;
  public Invalid = false;
  public noSuggestedDate = false;

  public readSuggestedDate1;
  public readSuggestedDate2;
  public currentDate;
  public deoEmail;
  public deoFullname = "";
  public sgbTotal: any;

  constructor(
    private router: Router,
    private appService: AppService,
    private modalService: NgbModal,
    public datepipe: DatePipe,
    private seodashboardservice: SeoDashboardService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });
    this.districtCode = this.appService.getLoggedInDistrictCode();
    this.userId = this.appService.getLoggedInUserId();
    this.emisNumber = this.appService.getLoggedInEmisCode();
    this.userRole = this.appService.getLoggedInUserRole();
    this.queries = 0;
    this.nominees = 0;
    this.voterCast = 0;
    this.totalVoters = 0;
    this.isFormSubmitted = false;
    this.currentDate = new Date().toISOString();


    // if (this.memoId) {memoId
    //   this.scheduleService.getElectionMemoById(this.memoId).subscribe((memo: any) => {
    //     // console.log(memo);
    //     if (memo) {
    //       this.scheduleService.getUserById(memo.submittedBy).subscribe((user: any) => {
    //         console.log(user);
    //         this.deoEmail = user.emailAddress;
    //         this.deoFullname = user.firstname + " " + user.surname;
    //       }, err => {
    //         console.log(err);
    //       })
    //     }
    //   }, err => {
    //     console.log(err);
    //   })
    // }



    this.seodashboardservice.getElectionsBySchool(this.appService.getLoggedInEmisCode()).subscribe(res => {
      console.log(res);
      this.elections = res;

      if (this.elections.length == 0) {
        this.noElections = true;

      }

      this.dtTrigger.next();

    }, err => {
      console.log(err);
      this.noElections = true;

    });


    this.seodashboardservice.getSGBNumberOfVoters(this.appService.getLoggedInEmisCode()).subscribe((sgbcount: any) => {
      console.log(sgbcount);
      this.sgbTotal = sgbcount;
    }, err => {
      console.log(err);
      this.sgbTotal = 0;
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      order: [[0, 'desc']],// sort table in descending order
      pageLength: 10
    };

  }

  openLgModal(content, i) {

    // console.log(this.emailBody)
    // console.log($("code").val())
    if (this.isFormSubmitted) {
      this.isFormSubmitted = false;
    }

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.isFormSubmitted = false;

    }).
      catch((res) => {
      });

    console.log(this.elections[i]);


    this.selectedElection = this.elections[i];
    if (this.elections[i].memoId) {

      this.seodashboardservice.getElectionMemoById(this.elections[i].memoId).subscribe((memo: any) => {
        console.log(memo);
        if (memo) {
          this.seodashboardservice.getUserById(memo.submittedBy).subscribe((user: any) => {
            console.log(user);
            this.deoEmail = user.emailAddress;
            this.deoFullname = user.firstname + " " + user.surname;


          }, err => {
            console.log(err);
          })
        }
      }, err => {
        console.log(err);
      })
    }
    this.proposedDate = moment(this.elections[i].schoolProposedDate).format('YYYY-MM-DD  hh:mm A');
    this.deoSuggestedDate1 = this.elections[i].deoSuggestedDate1;
    this.deoSuggestedDate2 = this.elections[i].deoSuggestedDate2;
    this.dateSelectedBySchool = this.elections[i].dateSelectedBySchool;
    this.deoComment = this.elections[i].deoComment;
    this.selectedDate = moment(this.elections[i].dateSelectedBySchool).format('YYYY-MM-DD  hh:mm A');
    this.status = this.elections[i].status;
    this.alternativeDate = this.elections[i].alternativeDate;

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

    this.selectedElection = this.elections[i];
    this.readStatus = this.elections[i].status;
    this.readAlternativeDate = this.elections[i].alternativeDate;
    this.readdateSelectedBySchool = this.elections[i].dateSelectedBySchool;
    this.readScheduleDate = this.elections[i].scheduleDate;
    this.readDeoSuggestedDate1 = this.elections[i].deoSuggestedDate1;
    this.readDeoSuggestedDate2 = this.elections[i].deoSuggestedDate2;
    this.readAssignMonitors = this.elections[i].assignedMonitors;
    this.readAssignObservers = this.elections[i].assignedObservers;

    this.deoSelectedDate = this.selectedElection.schoolProposedDate;


    if (this.elections[i].isProposedScheduleAccepted) {
      this.readAcceptPropsedDate = "Yes";
    } else {
      this.readAcceptPropsedDate = "No";
    }

    // this.readNominationDate = this.elections[i].nominationDate;
    // this.readCampaigningDate = this.elections[i].campaigningDate;
    // this.readDateProposed = moment(this.elections[i].schoolProposedDate).format('YYYY-MM-DD  hh:mm A');
    // this.readHandoverDate = this.elections[i].handoverDate;
    // this.readOfficeBearerSubmissionDate = this.elections[i].officeBearersSubmissionDate;
    // this.readElectionDate = this.elections[i].electionDate;
    // this.readDeoComment = this.elections[i].deoComment;

  }

  fieldChange() {
    console.log("")
  }

  viewElection(i) {
    console.log(i);

  }

  saveElection() {
    let status = null;
    let dateProposed = null;
    let alternativeDate = null;
    let suggestedDate1 = null;
    let suggestedDate2 = null;

    if (this.dateSelectedBySchool) {
      status = "Pending DEO Confirmation";
      dateProposed = this.selectedElection.schoolProposedDate;
      alternativeDate = !this.selectedElection.alternativeDate || this.selectedElection.alternativeDate == "undefined" ? null : this.selectedElection.alternativeDate;
      suggestedDate1 = !this.selectedElection.deoSuggestedDate1 || this.selectedElection.deoSuggestedDate1 == "undefined" ? null : this.selectedElection.deoSuggestedDate1;
      suggestedDate2 = !this.selectedElection.deoSuggestedDate2 || this.selectedElection.deoSuggestedDate2 == "undefined" ? null : this.selectedElection.deoSuggestedDate2;

    } else if (this.proposeDate && this.newProposedDate) {
      status = "Pending DEO Review";
      dateProposed = !this.newProposedDate || this.newProposedDate == "undefined" ? null : this.newProposedDate;
      alternativeDate = !this.newAlternativeDate || this.newAlternativeDate == "undefined" ? null : this.newAlternativeDate;
      suggestedDate1 = null;
      suggestedDate2 = null;

    }


    if (status) {

      Swal.fire({
        title: 'Are you sure?',
        text: 'Your election information will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          let dateSelected;

          if (this.dateSelectedBySchool == this.deoSuggestedDate1) {
            dateSelected = this.selectedElection.deoSuggestedDate1;
          } else if (this.dateSelectedBySchool == this.deoSuggestedDate2) {
            dateSelected = this.selectedElection.deoSuggestedDate2;
          } else {
            dateSelected = null;
          }

          let electionDetails = {
            "id": parseInt(this.selectedElection.id),
            "principalFullname": this.selectedElection.principalFullname,
            "districtCode": this.selectedElection.districtCode,
            "emisCode": this.selectedElection.emisCode,
            "schoolName": this.selectedElection.schoolName,
            "district": this.selectedElection.district,
            "alternativeDate": alternativeDate,
            "schoolProposedDate": dateProposed,
            "scheduledBy": parseInt(this.selectedElection.scheduledBy),
            "status": status,
            "deoComment": this.selectedElection.deoComment,
            "isProposedScheduleAccepted": false,
            "dateSelectedBySchool": dateSelected,
            "deoSuggestedDate1": suggestedDate1,
            "deoSuggestedDate2": suggestedDate2
          }


          console.log(electionDetails)
          // console.log(JSON.stringify(electionDetails))

          this.seodashboardservice.updateScheduleElection(electionDetails).subscribe(res => {
            console.log(res);
            let sendmail = new FormData();
            let emailSubject;
            let emailBody;

            if (this.proposeDate && status == "Pending DEO Review") {
              emailSubject = this.selectedElection.schoolName + " proposed an election date";
              emailBody = "<p>Good day " + this.deoFullname + "</p></br>" +
                "<p>" + this.selectedElection.schoolName + " has proposed a date of election, <a target='_blank' href='" + environment.homelink + "'>click here</a> to login to the system to finish scheduling election.</p></br>" +
                "<p>Regards</p> <p>" + this.selectedElection.principalFullname + "</p>";

            } else {
              emailSubject = this.selectedElection.schoolName + " selected the suggested election date";
              emailBody = "<p>Good day " + this.deoFullname + "</p></br>" +
                "<p>" + this.selectedElection.schoolName + " has selected the election date you suggested, <a target='_blank' href='" + environment.homelink + "'>click here</a> to to login to the system to continue scheduling election.</p></br>" +
                "<p>Regards</p> <p>" + this.selectedElection.principalFullname + "</p>";

            }


            sendmail.append("ToEmail", this.deoEmail);
            sendmail.append("Subject", emailSubject);
            sendmail.append("Body", emailBody);

            this.seodashboardservice.sendMail(sendmail).subscribe(() => { }, err => {
              console.log(err);
            });
            Swal.fire(
              'Confirmation!',
              'Election saved.',
              'success'
            ).then((result) => {
              if (result.value || result.isDismissed) {
                window.location.reload()
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

  seoIndicator(status) {
    //Election Scheduled.
    if (status == "Election Scheduled" && this.userRole == "SEO") {
      return "glow";
    } else {
      return "";
    }
  }

  sendNotice() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Send election notice to all the parents',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        let electionDetails = {
          "id": parseInt(this.selectedElection.id),
          "principalFullname": this.selectedElection.principalFullname,
          "seoFullname": this.selectedElection.seoFullname,
          "districtCode": this.selectedElection.districtCode,
          "emisCode": this.selectedElection.emisCode,
          "alternativeDate": this.selectedElection.alternativeDate,
          "schoolName": this.selectedElection.schoolName,
          "district": this.selectedElection.district,
          "schoolProposedDate": this.selectedElection.schoolProposedDate,
          "scheduledBy": parseInt(this.selectedElection.scheduledBy),
          "status": "Election Scheduled.",
          "deoComment": this.selectedElection.deoComment,
          "isProposedScheduleAccepted": this.selectedElection.isProposedScheduleAccepted,
          "scheduleDate": this.selectedElection.scheduleDate,
          "dateSelectedBySchool": this.selectedElection.dateSelectedBySchool,
          "nominationDate": this.selectedElection.nominationDate,
          "campaigningDate": this.selectedElection.campaigningDate,
          "handoverDate": this.selectedElection.handoverDate,
          "officeBearersSubmissionDate": this.selectedElection.officeBearersSubmissionDate,
          "electionDate": this.selectedElection.electionDate,
          "assignedMonitors": this.selectedElection.assignedMonitors,
          'schoolPairing': this.selectedElection.schoolPairing,
          "pairedSchoolname": this.selectedElection.pairedSchoolname,
          "memoId": parseInt(this.selectedElection.memoId),
          "deoSuggestedDate1": this.selectedElection.deoSuggestedDate1,
          "deoSuggestedDate2": this.selectedElection.deoSuggestedDate2,
          "assignedObservers": this.selectedElection.assignedObservers
        }
        console.log(electionDetails)

        // console.log(this.selectedElection.emisCode, moment(this.selectedElection.nominationDate).format('DD MMMM yyyy'), moment(this.selectedElection.scheduleDate).format('DD MMMM yyyy'), moment(this.selectedElection.scheduleDate).format('HH:mm'), 0, this.selectedElection.seoFullname, this.selectedElection.principalFullname, moment(new Date()).format('DD MMMM yyyy'))
        this.seodashboardservice.sendElectionNoticeToParents(this.selectedElection.emisCode, moment(this.selectedElection.nominationDate).format('DD MMMM yyyy'),
          moment(this.selectedElection.scheduleDate).format('DD MMMM yyyy'), moment(this.selectedElection.scheduleDate).format('HH:mm'),
          this.sgbTotal, this.selectedElection.seoFullname, this.selectedElection.principalFullname, moment(new Date()).format('DD MMMM yyyy')).subscribe(() => {
            console.log("sent");
            this.seodashboardservice.updateScheduleElection(electionDetails).subscribe(() => {
            }, err => {
              console.log(err);
            });

            Swal.fire(
              'Confirmation!',
              'Election Notice Sent',
              'success'
            ).then((result) => {
              if (result.value || result.isDismissed) {
                window.location.reload()
                this.modalService.dismissAll();
              }
            })
          }, err => {
            console.log(err);
            Swal.fire(
              'Error',
              'Election notice could not be sent, please try again later',
              'error'
            )
          })

      }
    })
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

  declineDate() {
    this.newAlternativeDate = "";
    this.newProposedDate = "";
    this.dateSelectedBySchool = "";

  }

}
