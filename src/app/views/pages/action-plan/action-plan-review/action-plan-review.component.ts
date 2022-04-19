import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-action-plan-review',
  templateUrl: './action-plan-review.component.html',
  styleUrls: ['./action-plan-review.component.scss']
})
export class ActionPlanReviewComponent implements OnInit {
  public data: any;
  public userRole = this.appservice.getLoggedInUserRole();

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private http: HttpClient, private appservice:AppService) { }

  ngOnInit(): void {

  }
  
}
