import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { NominationsService } from '../nominations.service';
import { AppService } from 'src/app/app.service';
import * as moment from 'moment';
import { cssNumber } from 'jquery';

@Component({
  selector: 'app-parent-decision',
  templateUrl: './parent-decision.component.html',
  styleUrls: ['./parent-decision.component.scss']
})
export class ParentDecisionComponent implements OnInit {

  public schoolName;
  public electionDate;
  public reason = null;
  // public userId = this.route.snapshot.params['userid'];
  public userId: any;
  public principalId: any;

  public emisCode;
  public districtCode;
  public votingCount;
  public electionId;
  public isResponded: Boolean;
  public fisrtName: any;
  public surname: any;
  public princcipal: any;


  public isDecline: Boolean;
  public isFormSubmitted: Boolean;

  constructor(
    private router: Router,
    private appservice: AppService,
    private route: ActivatedRoute,
    private nominationservice: NominationsService
  ) { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
    this.userId = this.appservice.getLoggedInUserId();



    let currentDate = moment(new Date()).format('YYYY-MM-DD');
    this.emisCode = this.appservice.getLoggedInEmisCode();

    this.nominationservice.checkIfParentDecided(this.appservice.getLoggedInEmisCode(), this.appservice.getLoggedInParentId()).subscribe((res: any) => {
      console.log(res);


      if (res.hasDecline == true || res.hasDecline == false) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          title: 'Already submitted your decision',
          icon: 'warning'
        })
        this.router.navigate(['/dashboard']);
      }


    }, err => {
      console.log(err);
      this.router.navigate(['/dashboard']);
    })


    this.nominationservice.getScheduledNominationByEmisCode(this.emisCode, currentDate).subscribe((res: any) => {
      console.log(res);
      this.electionDate = res.electionDate;
      this.electionId = res.id;
      this.districtCode = res.districtCode;
      this.schoolName = res.schoolName;

    }, err => {
      console.log(err);
      this.schoolName = null;
      this.router.navigate(['/dashboard']);
    })


    this.nominationservice.getUserById(this.userId).subscribe((res: any) => {
      console.log(res);
      this.fisrtName = res.firstname;
      this.surname = res.surname;

    }, err => {
      console.log(err);
    })

    this.nominationservice.getPrincipalBySchool(this.emisCode).subscribe(res => {
      console.log(res)
      this.princcipal = res;
    }, err => {
      console.log(err)
    })


    // this.nominationservice.getSchoolByEmisNumber(this.emisCode).subscribe((res: any) => {
    //   this.schoolName = res[0].institutionName;
    // }, err => {
    //   console.log(err);
    //   this.schoolName = "School"
    // })


    // this.nominationservice.getBallotBySchool(this.emisCode).subscribe((res: any) => {
    //   console.log(res)
    // }, err => {
    //   console.log(err)
    // })



  }

  Accept() {

    Swal.fire({
      title: 'Accept Nomination?',
      text: 'Your name will be added to the ballot',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        let userInfo = {
          "id": 0,
          "emisCode": this.emisCode,
          "districtCode": this.appservice.getLoggedInDistrictCode(),
          "parentId": parseInt(this.appservice.getLoggedInParentId()),
          "votingCount": 0,
          "electionId": parseInt(this.electionId),
          "firstname": this.fisrtName,
          "surname": this.surname
        }
        console.log(userInfo)
        this.nominationservice.addParentToBallot(userInfo).subscribe(res => {
          console.log(res);

          this.nominationservice.submitParentDecision(this.emisCode, parseInt(this.appservice.getLoggedInParentId()), false).subscribe(() => {

            Swal.fire({
              title: 'Confirmation',
              text: 'Thank you for accepting the nomination, your name will officially be added to the ballot for the election phase',
              icon: 'success',
              confirmButtonText: 'DONE'
            }).then((result) => {
              if (result.value || result.isDismissed) {
                // this.router.navigate(['/dashboard']);
                window.location.assign('/dashboard')
              }
            })
          }, err => {
            console.log(err);
            Swal.fire(
              'Error',
              'Your entry was unsuccessful, please try again',//+ err.statusText,
              'error'
            )
          })

        }, err => {
          console.log(err);
          Swal.fire(
            'Error',
            'Your entry was unsuccessful, please try again',//+ err.statusText,
            'error'
          )
        })



      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your reponse was not submitted',
          'error'
        )
      }
    })
  }

  Decline() {
    this.isDecline = true;

  }

  Submit() {
    if (this.reason) {

      Swal.fire({
        title: 'Decline Nomination?',
        text: 'Your name will not be added to the ballot',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {

          // console.log(this.emisCode, parseInt(this.appservice.getLoggedInParentId()), true)

          this.nominationservice.submitParentDecision(this.emisCode, parseInt(this.appservice.getLoggedInParentId()), true).subscribe(() => {

            let emailBody = "<p>Good day " + this.princcipal.firstname + " " + this.princcipal.surname + "</p></br>" +
              "<p>Please be aware that " + this.fisrtName + " " + this.surname + ", a parent fron your school has declined a nomination for the following reason.</p></br>" +
              "<p><b>Reason:</b> " + this.reason + "</p></br>" +
              "<p>Regards</p> <p>" + this.fisrtName + " " + this.surname + "</p>";
            let emailSubject = "Nomianted parent declined nomination";

            //   console.log(res);

            let sendmail = new FormData();
            sendmail.append("ToEmail", this.princcipal.emailAddress);
            sendmail.append("Subject", emailSubject);
            sendmail.append("Body", emailBody);


            this.nominationservice.sendMail(sendmail).subscribe(() => { console.log("Sent!") }, err => {
              console.log(err);
            });

            Swal.fire({
              title: 'Confirmation',
              text: "Your name won't be added on the ballot, thank you",
              icon: 'success',
              confirmButtonText: 'DONE'
            }).then((result) => {
              if (result.value || result.isDismissed) {
                // this.router.navigate(['/dashboard'])
                window.location.assign('/dashboard');
              }
            })
          }, err => {
            console.log(err);
            Swal.fire(
              'Error',
              'Your entry was unsuccessful, please try again',
              'error'
            )
          })



        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your reponse was not submitted',
            'error'
          )
        }
      })
    }

    this.isFormSubmitted = true;

  }

  Cancel() {
    this.isDecline = false;
    this.isFormSubmitted = false;
    this.reason = "";
  }

}

