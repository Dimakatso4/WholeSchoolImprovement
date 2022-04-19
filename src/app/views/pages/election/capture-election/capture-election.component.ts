import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ElectionService } from '../election.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-capture-election',
  templateUrl: './capture-election.component.html',
  styleUrls: ['./capture-election.component.scss']
})
export class CaptureElectionComponent implements OnInit {

  constructor(private router: Router, public formBuilder: FormBuilder, private electionService:ElectionService, private modal:NgbModal,private appService:AppService) { }

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
  public data: any;
  public emisNumber: any;
  public districtCode: any;
  public userinfo: any;
  public role: any;


  validationForm: FormGroup;
  isFormSubmitted: Boolean;


  ngOnInit(): void {

    $("input[type='date']").keydown(function (event) { event.preventDefault(); });
    
    this.validationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      idNumber: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailAddress: ['', Validators.required],
      voteCount: ['', Validators.required],
      shortlisted: [false]
    });
    this.isFormSubmitted = false;

    if(this.appService.getLoggedInUserRole()==="SEO" || this.appService.getLoggedInUserRole()==="PRINCIPAL")
    {
      this.electionService.getElectionResultsBySchool(this.appService.getLoggedInEmisCode).subscribe((res: any) => {
        this.data = res;

      });
    }else if(this.appService.getLoggedInUserRole()==="DEO"){

      this.electionService.getElectionResultsByDistrict(this.appService.getLoggedInDistrictCode).subscribe((res: any) => {
        this.data = res;

      });

    }

  /* this.role =  JSON.parse(localStorage.getItem("currentRole"));
  this.userinfo = JSON.parse(localStorage.getItem("userprofile")) 
  if( this.role == "DEO"){
    this.districtCode = this.userinfo.districtCode
    
        this.electionService.getElectionResultsByDistrict(this.districtCode).subscribe((res: any) => {
        this.data = res; 
        
    });
  }else if(this.role == "SEO"){
    
    this.emisNumber = this.userinfo.emisNumber
    console.log(this.emisNumber);
    this.electionService.getElectionResultsBySchool(this.emisNumber).subscribe((res: any) => {
      this.data = [];
      this.data.push(res); 
      console.log( JSON.stringify(this.data ));
  });

  } */
  
}

  saveElection() {
    Swal.fire({
      title: 'Are you sure you want to save this elections?',
      text: 'You will not be able to nominate anymore!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {




        this.newElection.description = this.description;
        this.newElection.StartDate = new Date(this.electionScheduleStartDate.year, this.electionScheduleStartDate.month - 1, this.electionScheduleStartDate.day).toISOString();
        this.newElection.EndDate = new Date(this.electionScheduleEndDate.year, this.electionScheduleEndDate.month - 1, this.electionScheduleEndDate.day).toISOString();;
        let startTime = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        this.newElection.StartTime = new Date(startTime).toISOString();
        let endTime = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        this.newElection.EndTime = new Date(endTime).toISOString()
        this.newElection.totalVotesCast = this.totalVotesCast;
        this.newElection.totalVotesNeeded = this.totalVotesNeeded;

        // this.newElection.userId = "1"//this.userId;

        new Date().getMinutes()
        console.log(this.newElection);
        this.electionService.saveElection(this.newElection)
        // this.electionService.saveElection(this.newElection).s


        Swal.fire(
          'Confirmation!',
          'Election saved.',
          'success'
        ).then((result) => {
          if (result.value) {
            this.router.navigate(['/election/capture-election']);
          }
        });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })
  }

  openLgModal(content) {
    this.modal.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }
  
  get Form() {
    return this.validationForm.controls;
  }

  openeditModal(content, i) {
    //alert(JSON.stringify(content))
    this.description = this.data[i].description;
    this.electionScheduleStartDate = this.data[i].startDate;
    this.electionScheduleStartTime = this.data[i].startTime;
    this.electionScheduleEndDate = this.data[i].endDate;
    this.electionScheduleEndTime = this.data[i].endTime;
    this.totalVotesNeeded = this.data[i].totalVotesNeeded;
    this.totalVotesCast = this.data[i].totalVotesCast;

    this.modal.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }

  /* updateTraining() {
     Swal.fire({
       title: 'Are you sure you want to save this training?',
       text: 'Your training will be update',
       icon: 'question',
       showCancelButton: true,
       confirmButtonText: 'Yes!',
       cancelButtonText: 'No'
     }).then((result) => {
       if (result.value) {
 
         let data = {
           description: this.description,
           startDate: this.electionScheduleStartDate,
           startTime: this.electionScheduleStartTime,
           endDate: this.electionScheduleEndDate,
           endTime: this.electionScheduleEndDate,
           totalVotesNeeded: this.totalVotesNeeded,
           totalVotesCast: this.totalVotesCast
           // scheduledBy: parseInt(localStorage.getItem("userId"))
         }
         this.electionService.update (parseInt(localStorage.getItem("userId")),data).subscribe(res => {
 
           Swal.fire({
             timer: 3000,
             title: "Successful",
             text: 'Training has been successfully scheduled',
             icon: 'success'
           }).then(result => {
             this.electionService.dismissAll();
             if (result.value || result.isDismissed) {
               window.location.reload()
             }
           });
 
         }, err => {
           console.log(err);
 
           Swal.fire({
             showConfirmButton: false,
             timer: 3000,
             title: "Unsuuccessful",
             text: 'Your entry was unsuccessful, please try again',
             icon: 'error'
           });
 
         })
 
 
 
       } else if (result.dismiss === Swal.DismissReason.cancel) {
         Swal.fire({
           showConfirmButton: false,
           timer: 3000,
           title: "Cancelled",
           text: 'Your entry was not save',
           icon: 'error'
         });
 
       }
     })
   }*/
  create() {
    this.router.navigate(['/election/new']);
  }

  results() {
    this.router.navigate(['/election/results']);
  }

  saveCandidate() {
    console.log("save candidate")
  }

  captureElection() {
    
    if (this.validationForm.valid) {

    }
    this.isFormSubmitted = true;
  }


}
