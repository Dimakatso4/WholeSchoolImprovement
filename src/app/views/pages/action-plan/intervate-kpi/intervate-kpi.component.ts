import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-intervate-kpi',
  templateUrl: './intervate-kpi.component.html',
  styleUrls: ['./intervate-kpi.component.scss']
})
export class IntervateKpiComponent implements OnInit {

  public data: any;
  public data1: any;
  public selectedKPI: number[];
  public userRole = this.appservice.getLoggedInUserRole();
  public data2 = JSON.parse(localStorage.getItem('KPIInfo'));
  public num: [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private http: HttpClient, private appservice: AppService) { }

  ngOnInit(): void {



  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  KpiLink(question){
    console.log(question)
  }
}


