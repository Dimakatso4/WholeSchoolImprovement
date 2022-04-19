import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { DipService } from '../dip.service';
import { UsersService } from '../../users/users.service';
import { DataTableDirective } from 'angular-datatables';
import { DataTable } from "simple-datatables";


declare var $: any;

@Component({
  selector: 'app-list-dip-tool',
  templateUrl: './list-dip.component.html',
  styleUrls: ['./list-dip.component.scss'],

})


export class ListDIPComponent implements AfterViewInit, OnDestroy, OnInit {

  public userId;
  public emisNumber;
  public kpiInfo;
  public loggedInUserDitrictCode;

  public instrumentTool:any
  public dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private userService:UsersService,
    private dipService: DipService,
    config: NgbModalConfig,
    private appservice:AppService
    ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;

     }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }

    this.userId = this.appservice.getLoggedInUserId()
    this.emisNumber = this.appservice.getLoggedInEmisCode()
     
    //Get user by id
    this.dipService.GetUserById(this.userId).subscribe((res: any) => {
      this.loggedInUserDitrictCode = res.districtCode;
      console.log("district code",this.loggedInUserDitrictCode)
       //Get district id
    console.log("this.loggedInUserDitrictCode",this.loggedInUserDitrictCode)
    this.dipService.GetDistrictNameByDistrictCode(this.loggedInUserDitrictCode).subscribe((res: any) => {
   
      console.log("district",res.districtId)
      //get list of kpis
    this.dipService.GetDipByDistrictID(res.districtId).subscribe((res: any) => {
      this.kpiInfo = res;
      console.log("kpi",this.kpiInfo)
    });
    });
    });

   

    

    



  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


}