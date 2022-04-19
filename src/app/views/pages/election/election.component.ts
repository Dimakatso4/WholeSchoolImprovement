import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { ElectionService } from './election.service';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html'
})
export class ElectionComponent implements OnInit {
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
  constructor(
    private router: Router,
    private electionservice: ElectionService,
    private appservice: AppService
  ) { }



  ngOnInit(): void {
  }
}

