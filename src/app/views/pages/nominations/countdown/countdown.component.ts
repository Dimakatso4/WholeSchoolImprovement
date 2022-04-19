import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { NominationsService } from '../nominations.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  public month = 0;
  public days = 0;
  public hours = 0;
  public minutes = 0;

  public schudule;
  public scheduleDate;
  public schoolname;
  public nominationFlag;
  public electionCountdown: Boolean;
  public pageLoadComplete: Boolean;

  constructor(
    private router: Router,
    private appservice: AppService,
    private nominationservice: NominationsService) { }

  ngOnInit(): void {

    let currentDate = new Date();
    this.electionCountdown = false;
    this.pageLoadComplete = false;
    this.nominationFlag = null;//IsCompleted, HasStarted, IsNotStarted


    let emisCode = this.appservice.getLoggedInEmisCode();
    this.nominationservice.getScheduledNominationByEmisCode(emisCode, moment(currentDate).format("YYYY-MM-DD")).subscribe((res: any) => {
      console.log(res);
      this.schudule = res;

      if (res) {
        this.nominationFlag = res.nominationFlag;
        if (this.nominationFlag == "HasStarted") {
          this.router.navigate(['/nominations/nominate']);
        }

      } else {
        this.router.navigate(['/dashboard'])
      }

      this.scheduleDate = new Date(this.schudule.nominationDate);
      this.electionCountdown = true;

      let duration = this.scheduleDate.getTime() - currentDate.getTime();
      let countdown = moment.duration(duration, 'milliseconds');

      this.month = countdown.months();
      this.days = countdown.days();
      this.hours = countdown.hours();
      this.minutes = countdown.minutes();
      this.pageLoadComplete = true;

    }, err => {
      console.log(err);
    })


  }

}
