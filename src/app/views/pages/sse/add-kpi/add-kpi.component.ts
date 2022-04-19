import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SseService } from '../sse.service';
import { UsersService } from '../../users/users.service';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { WindowScrollController } from '@fullcalendar/angular';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-add-kpi',
  templateUrl: './add-kpi.component.html',
  styleUrls: ['./add-kpi.component.scss']
})
export class AddKpiComponent implements  AfterViewInit, OnDestroy, OnInit {
  validationForm: FormGroup;  
  editvalidationForm: FormGroup; 
  isCreateFormSubmitted: Boolean;
  editisCreateFormSubmitted: Boolean;
  public isNameSelected:boolean;
  public allUsers:any;
  
  public areaOfevaluationdata:any={};
  public BUData:any;
  public companentData:any;
  public areaOfevaluationID:any;
  public componentID:any;
  public buID:any;
  public question:any;
  public kpiInfo:any;
  public listData:string[];
  public Components:any;
  public CompID: any;
  public LegislationData:any

  public showOverlay: boolean = true
  public kpiAuditTrail:any
  public userId = this.appservice.getLoggedInUserId()
  public kpiCreatorDetails:any

  public editareaOfEvaluationValue:any={}
  public editcomponentName:any
  public editcompulsory:any
  public editrating:any
  public editlegislation:any;
  public editdescription:any
  public editBUValue:any =[];
  public editresource:any;
  public editquestion:any;
  public status:any;

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
    private sseService: SseService,
    config: NgbModalConfig,
    private appservice:AppService
    ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
        
     }

  ngOnInit(): void {
    

    this.isCreateFormSubmitted = false;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

    
  }
