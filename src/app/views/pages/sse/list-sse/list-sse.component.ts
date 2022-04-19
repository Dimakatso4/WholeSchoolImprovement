import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SseService } from '../sse.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UsersService } from '../../users/users.service';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common'
import { DataTableDirective } from 'angular-datatables';


declare var $: any;
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'



@Component({
  selector: 'app-list-sse-tool',
  templateUrl: './list-sse.component.html',
  styleUrls: ['./list-sse.component.scss'],

})


export class ListSSEComponent implements AfterViewInit, OnDestroy, OnInit {
  validationForm: FormGroup;  
  editvalidationForm: FormGroup; 
  isCreateFormSubmitted: Boolean;
  editisCreateFormSubmitted: Boolean;

  public sseInstrumentName:any
  public editsseInstrumentName:any
  public year:any
  public edityear:any
  public kpiArrayId:any
  public editkpiArrayId:any
  public kpiJson:any
  public sseAuditTrail:any
  public selectedKpi:any
  public editselectedKpi:any
  public sseToolCreator:any
  public userId = this.appservice.getLoggedInUserId()
  public areaOfevaluationdata:any;
  public componentData:any;
  public emisNumber;

  public showOverlay: boolean = true
  public kpiInfo:any
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
    private sseService: SseService,
    config: NgbModalConfig,
    private appservice:AppService
    ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
        router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })
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

    this.emisNumber = sessionStorage.getItem("school");

    this.sseService.GetAllSchoolKPIBySchool(this.emisNumber).subscribe((res: any) => { 
      this.instrumentTool = res;
      });

      this.userService.getUserId(this.userId).subscribe((res: any) => {
        this.sseToolCreator = res.firstName+" "+res.surname+" "+res.officeLevel;
        }); 
  
  }


  //open modal
  openModal(content) {
    //this.isFormSubmitted = false;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
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
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
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
