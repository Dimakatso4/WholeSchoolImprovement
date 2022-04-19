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



@Component({
  selector: 'app-sse-tool',
  templateUrl: './sse-tool.component.html',
  styleUrls: ['./sse-tool.component.scss'],

})


export class SseToolComponent implements AfterViewInit, OnDestroy, OnInit {
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
  public emisNumber = this.appservice.getLoggedInEmisCode();

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

    this.sseService.getAllAreaOfEvaluation().subscribe((res: any) => {
      this.areaOfevaluationdata = res;
      console.log(this.areaOfevaluationdata);
     
      });
    this.getResults()

    this.validationForm = this.formBuilder.group({
      sseInstrumentName: ['', Validators.required],
      year: ['', Validators.required]
  
    })

    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editsseInstrumentName: ['', Validators.required],
      edityear: ['', Validators.required]

    })

    this.editisCreateFormSubmitted = false;
    this.sseService.GetAllKpi(this.userId,this.emisNumber).subscribe((res: any) => { 
         this.kpiInfo = res.map((i) => { i.KPIInformation ="Area of Evaluation: "+this.areaOfEvaulation(i.areaOfEvaulation) + '/ ' +'Component: '+ i.component +'/ '+'KPI: '+i.kpi +'/ '+'Optional/Compulsory: '+i.optionalCompulsory +'/ '+'Rating: '+i.rating; return i; })
        //console.log("All Kpis" + JSON.stringify(this.kpiInfo))
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

  get createForm() {
    return this.validationForm.controls;
  }

  get editcreateForm() {
    return this.editvalidationForm.controls;
  }

  selectComponentByID(event){
    let selectedComponent = event.target.value;
 
  }

  getResults() {
    this.sseService.getAllKPIInstrumentTools().subscribe((res: any) => {
      
      this.instrumentTool = res
    
      this.rerender();
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

    addInstrumentTool(){
      if (this.validationForm.valid) {
        Swal.fire({
          title: 'Save Instrument Tool?',
          text: 'Are you sure you want to Create this SSE Instrument Tool?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          let selectedKPID:any=[]
           for (var key in this.selectedKpi) {
          if (this.selectedKpi.hasOwnProperty(key)) {
             selectedKPID.push(this.selectedKpi[key].id);
             //console.log(this.selectedKpi[key].id);
          }
       }

          let AuditStatus = "Creator"

          this.sseAuditTrail = [
            {
              ResponsibleUserDetails: this.sseToolCreator,
              meetingAuditStatus: AuditStatus,
              meetingTimeCreated: this.toISOLocal(new Date()),
              ContentAfter: {
                "sseInstrumentName": this.sseInstrumentName,
                "year": this.year,
        
              },
              ContentBefore:''
            }
          ]
          console.log('kpi audit trail: '+JSON.stringify(this.selectedKpi))
            let sseTool = {
              "id": 0,
              "sseInstrumentName": this.sseInstrumentName,
              "year": this.year,
              "kpiArrayId": new String(selectedKPID),
              "kpiJson": JSON.stringify(this.selectedKpi),
              "sseAuditTrail": JSON.stringify(this.sseAuditTrail)
            }
            console.log("Log"+JSON.stringify(sseTool))
            this.sseService.CreateKPIInstrumentTools(sseTool);
          
;
        Swal.fire(
          'Success',
          'SSE Instrument Tool saved.',
          'success'
        ).then(result => {
          if (result.value || result.isDismissed) {
            let debounceResize:any
            debounceResize = window.setTimeout(() => {
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                searching: true,
                ordering:  true,
                order: ['0','desc']
              }
              //All KPIs
              this.getResults()
          }, 5000);
          this.modalService.dismissAll();
          }
        })

      })
    
    }
    this.isCreateFormSubmitted = true;
    }

   

    updateInstrumentTool(){
      if (this.editvalidationForm.valid) {
        Swal.fire({
          title: 'Save KPI?',
          text: 'Are you sure you want to Update this SSE Instrument Tool?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          let editselectedKPID:any=[]
           for (var key in this.selectedKpi) {
          if (this.editselectedKpi.hasOwnProperty(key)) {
            editselectedKPID.push(this.editselectedKpi[key].id);
             console.log(this.editselectedKpi[key].id);
          }
       }

          let AuditStatus = "Modifier"

          let editsseAuditTrail = 
            {
              ResponsibleUserDetails: this.sseToolCreator,
              meetingAuditStatus: AuditStatus,
              meetingTimeCreated: this.toISOLocal(new Date()),
              ContentAfter: {
                "sseInstrumentName": this.editsseInstrumentName,
                "year": this.edityear,
                "kpiArrayId": this.editselectedKpi,
                "kpiJson": this.editselectedKpi,
              },
              ContentBefore:''
            }
            this.sseAuditTrail.push(editsseAuditTrail)
           // console.log('kpi audit'+JSON.stringify(this.sseAuditTrail))
            let sseTool = {
              "id": this.sseInsrumentToolId,
              "sseInstrumentName": this.editsseInstrumentName,
              "year": this.edityear,
              "kpiArrayId": new String(editselectedKPID),
              "kpiJson": JSON.stringify(this.editselectedKpi),
              "sseAuditTrail": JSON.stringify(this.sseAuditTrail)
            }
            //console.log("Log"+JSON.stringify(sseTool))
            this.sseService.UpdateKPIInstrumentTools(sseTool);
          
;
        Swal.fire(
          'Success',
          'SSE Instrument Tool Updated.',
          'success'
        ).then(result => {
          if (result.value || result.isDismissed) {
            let debounceResize:any
            debounceResize = window.setTimeout(() => {
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                searching: true,
                ordering:  true,
                order: ['0','desc']
              }
              //All KPIs
              this.getResults()
          }, 5000);
          this.modalService.dismissAll();
          }
        })

      })
    
    }
    this.editisCreateFormSubmitted = true;
    }

       
  public sseInsrumentToolId:any
  editInstrumentValues(InstumentToolValues){
    this.sseInsrumentToolId = InstumentToolValues.id
    this.editsseInstrumentName = InstumentToolValues.sseInstrumentName
    this.edityear = InstumentToolValues.year
    let seleted = JSON.parse(InstumentToolValues.kpiJson)
    this.sseAuditTrail = JSON.parse(InstumentToolValues.sseAuditTrail)
    this.editselectedKpi = seleted.map((i) => { i.KPIInformation ="Area of Evaluation: "+this.areaOfEvaulation(i.areaOfEvaulation) + '/ ' +'Component: '+ i.component +'/ '+'KPI: '+i.kpi +'/ '+'Optional/Compulsory: '+i.optionalCompulsory +'/ '+'Rating: '+i.rating; return i; })

  }

    insertQuestionMark(question) {

      if (!question.includes('?')) {
        return question + " ?";
      } else {
        return question;
      }
  
    }

    
  toISOLocal(d) {
    var z = n => ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? '+' : '-';
    off = Math.abs(off);

    return d.getFullYear() + '-'
      + z(d.getMonth() + 1) + '-' +
      z(d.getDate()) + 'T' +
      z(d.getHours()) + ':' +
      z(d.getMinutes())
  }
  
  public kpiQuestions
  seeToolQuestion(kpiJson:any){
    this.kpiQuestions = JSON.parse(kpiJson)
    
  }

  public auditTrail:any
  auditInstrumentValues(auditTrail){
    this.auditTrail = JSON.parse(auditTrail)
    console.log("audit: "+JSON.stringify(this.auditTrail))
  }

  areaOfEvaulation(areaOfevaluationdata:any){
    let result = JSON.parse(areaOfevaluationdata)
      return result.focusArea
  }

  public netValue:any
  compare(i){
     
    if(i === 0){
      this.netValue = this.auditTrail[i].ContentAfter
      return  this.netValue
    }else if(i === this.auditTrail.length-1){
      this.netValue = this.auditTrail[i-1].ContentAfter
      return  this.netValue
    }else {
      this.netValue = this.auditTrail[i+1].ContentAfter
      return this.netValue 
    }

      
  }

  compaireBusinesUnit(k, businessUnit){
  
    if(k === 0){
      this.netValue = businessUnit[k].unitName
     return  this.netValue
    }
    else if(k === businessUnit.length - 1){
      this.netValue = businessUnit[k-1].unitName
      return  this.netValue
    }else{
      this.netValue = businessUnit[k+1].unitName
      return this.netValue
    }
  }
}
