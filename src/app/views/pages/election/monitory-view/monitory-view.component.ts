import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ElectionService } from '../election.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-monitory-view',
  templateUrl: './monitory-view.component.html',
  styleUrls: ['./monitory-view.component.scss']
})
export class MonitoryViewComponent implements OnInit {

  public monitoringList;
  public userRole;

  public emptyList;
  public assignTo = "PEM"

  constructor(private router: Router, private appservice: AppService, private electionservice: ElectionService) { }

  ngOnInit(): void {

    this.userRole = this.appservice.getLoggedInUserRole();

    if (this.userRole == "PEM") {
      // get monitory tools logged by the user

      this.electionservice.getMonitoringToolPerUser(this.appservice.getLoggedInUserId()).subscribe(res => {
        console.log(res);
        this.monitoringList = res;

        if (this.monitoringList.length > 0) {
          this.emptyList = false;
        } else {
          this.emptyList = true;
        }

      }, err => {
        console.log(err);
        this.emptyList = true;
      })
    } else if (this.userRole == "SEO") {
      // get monitory tools per school

      this.electionservice.getAllMonitoringToolBySchool(this.appservice.getLoggedInEmisCode()).subscribe(res => {
        console.log(res);
        this.monitoringList = res;

        if (this.monitoringList.length > 0) {
          this.emptyList = false;
        } else {
          this.emptyList = true;
        }
      }, err => {
        console.log(err);
        this.emptyList = true;
      })

    } else if (this.userRole == "PEO" || this.userRole == "HO") {
      // others
      this.electionservice.getAllMonitoringToolBySchool(sessionStorage.getItem('school')).subscribe(res => {
        console.log(res);
        this.monitoringList = res;

        if (this.monitoringList.length > 0) {
          this.emptyList = false;
        } else {
          this.emptyList = true;
        }
      }, err => {
        console.log(err);
        this.emptyList = true;
      })
    }


  }

  confirm(i) {
    // this.router.navigate(['/election/confirm-monitoring-tool'], { queryParams: { id: this.monitoringList[i].id } });
    sessionStorage.setItem('monitorId', this.monitoringList[i].id)
    this.router.navigate(['/election/confirm-monitoring-tool'])
  }

  view(i) {
    // this.router.navigate(['/election/monitoring-tool'], { queryParams: { id: this.monitoringList[i].id } });
    sessionStorage.setItem('monitorId', this.monitoringList[i].id)
    this.router.navigate(['/election/monitoring-tool'])
  }


}
