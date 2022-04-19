import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../disputes.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.scss']
})
export class AppealComponent implements OnInit {

  public parentname;
  public parentsurname;
  public parentcellnumber;
  public parentemail;
  public schoolname;
  public district;
  public officialname;
  public details;
  public officialtitle;
  public datelogged;
  public assignedto;
  public status;
  public createdBy;
  public closedDate = new Date();

  public feedbackdate;
  public feedback;
  public modifiedby;

  feedbacks;
  districtcode;
  userRole;
  public userId;
  public loggedInUserId;

  public dispute;
  public isDisputeFormSubmitted: Boolean;
  public canEscalate: Boolean;

  constructor(private router: Router, private disputeservice: DisputesService, private appservice: AppService) { }

  ngOnInit(): void {

    this.userRole = this.appservice.getLoggedInUserRole();
    this.userId = this.appservice.getLoggedInUserId();

    if(this.userRole == "HO" || this.userRole == "PEO"){
      this.canEscalate = false;
    } else {
      this.canEscalate = true;
    }


    this.disputeservice.getDisputesById(sessionStorage.getItem("disputeId")).subscribe(res => {
      console.log(res);
      this.dispute = res;
      if (res == null) {

        this.router.navigate(['/disputes/list']);
      } else {


        this.parentname = this.dispute.parentName;
        this.parentsurname = this.dispute.parentSurname;
        this.parentcellnumber = this.dispute.parentMobileNumber;
        this.parentemail = this.dispute.parentEmail;
        this.schoolname = this.dispute.schoolName
        this.assignedto = this.dispute.assignedTo;
        this.datelogged = this.dispute.dueDate
        this.officialname = this.dispute.nameOfFacilitator
        this.details = this.dispute.disputeDetails
        this.officialtitle = this.dispute.officialTitle;
        this.status = this.dispute.status;
        this.createdBy = this.dispute.capturedBy;
        this.loggedInUserId = parseInt(this.appservice.getLoggedInUserId());

        if (this.appservice.getLoggedInUserRole() == "PARENT" || this.appservice.getLoggedInUserRole() == "SEO" || this.appservice.getLoggedInUserRole() == "DEO" || this.appservice.getLoggedInUserRole() == "SGB" || this.appservice.getLoggedInUserRole() == "PRINCIPAL") {
          this.districtcode = this.appservice.getLoggedInDistrictCode()
        } else {
          this.districtcode = sessionStorage.getItem("district")
        }

        this.disputeservice.getDistrictByCode(this.districtcode).subscribe((district: any) => {
          console.log(district);
          this.district = district.districtName;

        }, err => {
          console.log(err);
          this.router.navigate(['/disputes/list']);
        })

        this.disputeservice.getFeedbackByDispute(sessionStorage.getItem("disputeId")).subscribe((res: any) => {
          console.log(res);
          this.feedbacks = res;
          this.feedbacks = res.filter(function (data) {
            return !["closed."].includes(data.feedback);
          });

          if (this.status == "closed") {

            const colsedFispute = res.filter(function (data) {
              return ["closed."].includes(data.feedback);
            });
            this.closedDate = colsedFispute[0].createdDate;
          }

        }, err => {
          console.log(err);
          this.router.navigate(['/disputes/list']);
        })

      }
    }, err => {
      console.log(err);
      this.router.navigate(['/disputes/list']);
    })

    this.isDisputeFormSubmitted = false;

  }

  Escalate() {

    let role;
    if (this.userRole == "SEO" && this.assignedto != "PARENT" || this.userRole == "PRINCIPAL" && this.assignedto != "PARENT") {
      role = "DEO";
    } else if (this.userRole == "DEO") {
      role = "PEO";
    } else if (this.userRole == "PEO") {
      role = "HO";
    } else {
      role = "Head Office"
    }

    Swal.fire({
      title: 'Escalate dispute?',
      text: 'You are about to escalate this dispute to ' + role,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.value) {

        this.status = "escalated";
        let feedback

        if (this.userRole == "SEO" || this.userRole == "PRINCIPAL") {
          this.assignedto = "DEO";
        } else if (this.userRole == "DEO" || this.assignedto == "DEO") {
          this.assignedto = "PEO";
        } else {
          this.assignedto = "HO";
        }

        if (this.feedback) {
          feedback = 'Escalated to ' + this.assignedto + ': \n' + this.feedback
        } else {
          feedback = 'Escalated to ' + this.assignedto
        }


        this.disputeservice.createFeedback(sessionStorage.getItem("disputeId"), feedback, this.userId, this.status, this.assignedto).subscribe(res => {
          console.log(res);

          Swal.fire({
            title: "Successful",
            text: 'the dispute has been escalated to ' + role,
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              this.router.navigate(['/disputes/list'])
            }
          });

        }, err => {
          console.log(err);

          Swal.fire({
            showConfirmButton: false,
            timer: 4500,
            title: "Unsuccessful",
            text: 'Your entry was unsuccessful, please try again',
            icon: 'error'
          });
        })

        // this.disputeservice.updateFeedback(parseInt(sessionStorage.getItem("disputeId")), parseInt(this.userId), this.assignedto, this.status).subscribe(res => {
        //   console.log(res);

        //   Swal.fire({
        //     title: "Successful",
        //     text: 'the dispute has been escalated to ' + role,
        //     icon: 'success'
        //   }).then(result => {
        //     if (result.value || result.isDismissed) {

        //       this.router.navigate(['/disputes/list'])
        //     }
        //   });
        // }, err => {
        //   console.log(err);
        //   Swal.fire({
        //     showConfirmButton: false,
        //     timer: 5000,
        //     title: "Unsuccessful",
        //     text: 'Your entry was unsuccessful, please try again',
        //     icon: 'error'
        //   });
        // })

      }
    })
  }

  Resolve() {

    if (this.feedback) {
      Swal.fire({
        title: 'Send back your resolution?',
        text: 'Your feedback will be sent back to ' + this.parentname + ' ' + this.parentsurname,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).then((result) => {
        if (result.value) {
          this.modifiedby = parseInt(this.appservice.getLoggedInUserId());
          this.assignedto = "Parent";
          this.status = "feedback review"

          this.disputeservice.createFeedback(sessionStorage.getItem("disputeId"), this.feedback, this.userId, this.status, this.assignedto).subscribe(res => {
            console.log(res);

            Swal.fire({
              title: "Successful",
              text: 'Feedback successfully submitted, thank you for your time',
              icon: 'success'
            }).then(result => {
              if (result.value || result.isDismissed) {
                this.router.navigate(['/disputes/list'])
              }
            });

          }, err => {
            console.log(err);

            Swal.fire({
              showConfirmButton: false,
              timer: 5000,
              title: "Unsuccessful",
              text: 'Your entry was unsuccessful, please try again',
              icon: 'error'
            });
          })
        }
      })

    }
    this.isDisputeFormSubmitted = true;

  }

  close() {
    Swal.fire({
      title: 'Close dispute?',
      text: 'You are about to close your dispute ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.value) {

        this.status = "closed"
        this.disputeservice.createFeedback(sessionStorage.getItem("disputeId"), 'closed.', this.userId, this.status, '').subscribe(res => {
          console.log(res)

          Swal.fire({
            title: "Successful",
            text: 'the dispute is now resolved and closed, thank you for your time',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              this.status = "closed"
              this.router.navigate(['/disputes/list']);

            }
          });
        }, err => {
          console.log(err)

          Swal.fire({
            showConfirmButton: false,
            timer: 5000,
            title: "Unsuccessful",
            text: 'Your entry was unsuccessful, please try again',
            icon: 'error'
          });
        })



      }
    })
  }


  Appeal() {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log an appeal',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).then((result) => {
      if (result.value) {

        this.status = "appeal";
        let feedback = 'Logged an appeal';

        // if (this.userRole == "SEO" || this.userRole == "PRINCIPAL") {
        //   this.assignedto = "DEO";
        // } else if (this.userRole == "DEO" || this.assignedto == "DEO") {
        //   this.assignedto = "PEO";
        // } else {
        //   this.assignedto = "HO";
        // }

        // if (this.feedback) {
        //   feedback = 'Logged an appeal: \n' + this.feedback
        // } else {
        //   feedback = 'Logged an appeal'
        // }     



        this.disputeservice.createFeedback(sessionStorage.getItem("disputeId"), feedback, this.userId, this.status, "DEO").subscribe(res => {
          console.log(res);

          Swal.fire({
            title: "Successful",
            text: 'Your appeal is submitted sucessfully',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              this.router.navigate(['/disputes/list'])
            }
          });

        }, err => {
          console.log(err);

          Swal.fire({
            showConfirmButton: false,
            timer: 4500,
            title: "Unsuccessful",
            text: 'Your entry was unsuccessful, please try again',
            icon: 'error'
          });
        })


      }
    })
  }

}
