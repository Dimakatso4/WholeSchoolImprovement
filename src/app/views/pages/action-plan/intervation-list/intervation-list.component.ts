import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-intervation-list',
  templateUrl: './intervation-list.component.html',
  styleUrls: ['./intervation-list.component.scss']
})
export class IntervationListComponent implements OnInit {

  public data: any;
  public userRole = this.appservice.getLoggedInUserRole();

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private http: HttpClient, private appservice:AppService) { }

  ngOnInit(): void {

    
   
    
  }

}
