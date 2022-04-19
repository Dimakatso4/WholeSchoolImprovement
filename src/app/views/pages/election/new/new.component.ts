import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { ElectionService } from '../election.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public newElection:any = {};
  public electionScheduleStartDate: any;
  public electionScheduleEndDate:any;
  public electionScheduleStartTime:any;
  public electionScheduleEndTime:any;
  public description:any;
  public totalVotesNeeded:any
  public totalVotesCast:any
  public userId:any;
  public newTime: any;
  public emisNumber: any;
  public districtCode:any
  public userinfo:any
  public id: string;
  

  constructor(private router: Router, private electionService:ElectionService, private appService:AppService,  private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      let userId = params['id'];
      let description = params['description'];
      console.log(userId);
      console.log(description);
    });
    
  }

  onTimeChange(value:{hour:string,minute:string})
  {
     console.log(value)
     this.newTime=`${value.hour}:${value.minute}`;
  }


  saveElection()
  {
    Swal.fire({
      title: 'Are you sure you want to save this elections?',
      text: 'You will not be able to nominate anymore!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        
        
        //this.userinfo = JSON.parse(localStorage.getItem("userprofile"))
        //console.log(JSON.stringify(this.userinfo));

        this.newElection.userId = this.appService.getLoggedInUserId(); //this.userinfo.id;
        this.newElection.description = this.description;
        this.newElection.StartDate = new Date(this.electionScheduleStartDate.year, this.electionScheduleStartDate.month-1, this.electionScheduleStartDate.day).toISOString();
        this.newElection.EndDate =new Date(this.electionScheduleEndDate.year, this.electionScheduleEndDate.month-1, this.electionScheduleEndDate.day).toISOString();; 
        let startTime = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()+' '+ new Date().getHours() +':'+ new Date().getMinutes();
        this.newElection.StartTime = new Date(startTime).toISOString();
        let endTime =  new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear()+' '+ new Date().getHours() +':'+new Date().getMinutes();
        this.newElection.EndTime  = new Date(endTime).toISOString()
        this.newElection.totalVotesCast = this.totalVotesCast;
        this.newElection.totalVotesNeeded = this.totalVotesNeeded;
        this.newElection.emisCode = this.appService.getLoggedInEmisCode();

        console.log(this.newElection);
        this.electionService.saveElection(this.newElection);
        
        Swal.fire(
          'Confirmation!',
          'Election saved.',
          'success'
        )
        this.router.navigate(['/election/results']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }

  
}