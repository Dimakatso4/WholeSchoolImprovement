import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {

  currLat;
  currLng;

  noElections = false;

  public dtOptions: DataTables.Settings = {};
  public data: any;
  public userRole = this.appservice.getLoggedInUserRole();

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private http: HttpClient, private appservice:AppService) { }


  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }

  }

}

