import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { ScheduleService } from '../schedule.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public newElection: any = {};
  public electionScheduleStartDate: any;
  public electionScheduleEndDate: any;
  public electionScheduleStartTime: any;
  public electionScheduleEndTime: any;
  public description: any;
  public totalVotesNeeded: any
  public totalVotesCast: any
  public userId: any;
  public newTime: any;
  public emisNumber: any;
  public districtCode: any
  public userinfo: any;
  public alternativeDate: any;

  // public todaysDate = new Date().toISOString();

  public todaysDate: any = this.toISOLocal(new Date())

  public principal;
  public districtName;
  public deoEmail;
  public deoFullname = "";
  public schoolName;
  public transactionDateTime;
  public ScheduledDate;
  public isFormSubmitted;
  public Invalid;
  public memoId;
  public datepipe: DatePipe;
  isMemoActive: Boolean;


  constructor(private router: Router, private scheduleService: ScheduleService, private appService: AppService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.memoId = params['id'];
    });
    // if(localStorage.getItem('isMemoSent') == "true"){
    this.isMemoActive = true;

    // } else {
    //   this.isMemoActive = false;
    // }

    if (this.memoId) {
      this.scheduleService.getElectionMemoById(this.memoId).subscribe((memo: any) => {
        // console.log(memo);
        if (memo) {
          this.scheduleService.getUserById(memo.submittedBy).subscribe((user: any) => {
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

    this.districtCode = this.appService.getLoggedInDistrictCode();
    this.emisNumber = this.appService.getLoggedInEmisCode();
    this.principal = this.appService.getIsLoggedInUsername();
    this.userId = this.appService.getLoggedInUserId();
    $("input[type='datetime-local']").keydown(function (event) { event.preventDefault(); });
    this.isFormSubmitted = false;
    this.Invalid = false;

    this.scheduleService.getDistrictByCode(this.districtCode).subscribe((district: any) => {
      this.districtName = district.districtName;

    }, err => {
      console.log(err);
      this.districtName = null;

    })

    this.scheduleService.getSchoolByEmisNumber(this.emisNumber).subscribe((school: any) => {
      this.schoolName = school[0].institutionName;

    }, err => {
      console.log(err);
      this.schoolName = "";

    })

  }

  onTimeChange(value: { hour: string, minute: string }) {
    console.log(value)
    this.newTime = `${value.hour}:${value.minute}`;
  }

  fieldChange() {
    this.Invalid = false;
  }


  saveElection() {

    this.Invalid = false;

    
    if (this.ScheduledDate) {

      Swal.fire({
        title: 'Are you sure you want to save this election?',
        text: 'Your entry will be submitted to the district officer',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.newElection = {
            "id": 0,
            "principalFullname": this.principal,
            // "seoFullname": this.surname,
            "districtCode": this.districtCode,
            "emisCode": this.emisNumber,
            "schoolName": this.schoolName,
            "district": this.districtName,
            "SchoolProposedDate": this.ScheduledDate,
            "alternativeDate": this.alternativeDate,
            "scheduledBy": parseInt(this.appService.getLoggedInUserId()),
            "memoId": parseInt(this.memoId),
            // "dateTimeCaptured": "2021-05-25T12:09:18.030Z",
            "status": "Pending DEO Review"
            ////////////////////////////////////////////////////////////            
            // "endDate": new Date().toISOString(),
            // "deoComment": "",
            // "title": "DEO",
            // "schoolProposedDate": new Date().toISOString(),
            // "schoolProposedTime": new Date().toISOString(),
            // "deoSuggestedDate1": new Date().toISOString(),
            // "deoSuggestedDate2": new Date().toISOString(),
            // "dateSelectedBySchool": new Date().toISOString(),
            // "nominationDate": new Date().toISOString(),
            // "campaigningDate": new Date().toISOString(),
            // "handoverDate": new Date().toISOString(),
            // "officeBearersSubmissionDate": new Date().toISOString(),
            // "electionDate": new Date().toISOString(),
            // "assignedMonitors": "",
            // "assignedObservers": ""


          }

          console.log(this.newElection)

          this.scheduleService.scheduleElection(this.newElection).subscribe(res => {
            console.log(res);

            let emailSubject = this.schoolName + " sent a proposed date of election";
            let emailBody = "<p>Good day " + this.deoFullname + "</p></br>" +
              "<p>" + this.schoolName + " has sent their propose date for the upcoming election, <a target='_blank' href='" + environment.homelink + "'>click here</a> to login into the system to finish scheduling the election.</p></br>" +
              "<p>Regards</p> <p>" + this.principal + "</p>";

            let sendmail = new FormData();
            sendmail.append("ToEmail", this.deoEmail);
            sendmail.append("Subject", emailSubject);
            sendmail.append("Body", emailBody);
            this.scheduleService.sendMail(sendmail).subscribe(() => { }, err => {
              console.log(err);
            })
            Swal.fire(
              'Confirmation!',
              'Election saved.',
              'success'
            ).then((result) => {
              if (result.value || result.isDismissed) {
                this.router.navigate(['/election-overview']);

              }
            })

          }, err => {
            console.log(err);
            Swal.fire(
              'Unsuccessful!',
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

    } else {
      // console.log("Invalid")
      this.Invalid = true

    }
    this.isFormSubmitted = true;


  }

  cancelElection() {
    this.router.navigate(['/memo/election-memo'])
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

}
