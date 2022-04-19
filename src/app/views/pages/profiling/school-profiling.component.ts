import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../users/users.service';
import { DataTableDirective } from 'angular-datatables';
import { ProfilingService } from './school-profiling.service';
import { ColorPickerModule } from 'ngx-color-picker';

declare var $: any;
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'


@Component({
  selector: 'app-school-profiling',
  templateUrl: './school-profiling.component.html',
  styleUrls: ['./school-profiling.component.scss'],

})


export class SchoolProfilingComponent implements AfterViewInit, OnDestroy, OnInit {

  public userId = this.appService.getLoggedInUserId()
  public userinfo: any;
  public componentData:any;
  public profilingList:any;
  public emisNumber = this.appService.getLoggedInEmisCode();

  public districtCode: any;
  public districtName: any;

  public redcolor: string = 'red';
  public yellowcolor: string = 'yellow';
  public greencolor: string = 'green';

  public showOverlay: boolean = true
  public isPageLoading:Boolean;

  public dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private modalService: NgbModal, 
    private router: Router, 
    private appservice: AppService,
    private userservice: UsersService,
    private profilingService: ProfilingService,
    config: NgbModalConfig,
    private appService:AppService
    ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
        router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })

     }


  ngOnInit(): void {
    this.isPageLoading = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }

    this.userinfo = this.appservice.getLoggedInUserId();
    console.log(this.userinfo);
    this.userservice.getUserId(this.userinfo).subscribe((data: any) => {
      this.districtCode = data.districtCode;
      this.districtName = data.districtName;
      console.log("Current user info", data);
      console.log("Current user info", this.districtName, this.districtCode);
    })
   
    this.profilingService.GetSchoolProfileByEmisNumber('700400856').subscribe((res: any) => { 
        this.profilingList = res;
        this.isPageLoading =false;
      });
  
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    /* this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    }); */
  }

    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        this.showOverlay = true;
      }
      if (event instanceof NavigationEnd) {
        this.showOverlay = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.showOverlay = false;
      }
      if (event instanceof NavigationError) {
        this.showOverlay = false;
      }
    }

}
