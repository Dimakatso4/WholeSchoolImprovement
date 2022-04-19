import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { DipService } from '../dip.service';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { UsersService } from '../../users/users.service';
import { DataTableDirective } from 'angular-datatables';


declare var $: any;



@Component({
  selector: 'app-add-dip-tool',
  templateUrl: './add-dip.component.html',
  styleUrls: ['./add-dip.component.scss'],

})


export class CaptureDIPComponent implements OnInit {

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  public isFormSubmitted;
  public kpiList:any;
  public actionPlanList:any;
  public kpi:any;
  public userId = this.appservice.getLoggedInUserId()
  public areaOfevaluationdata:any;
  public componentData:any;
  public emisNumber = this.appservice.getLoggedInEmisCode();

  public areaOfDevelopment;
  public descriptionOfActivities;
  public targetGroup;
  public responsibility;
  public startDate;
  public endDate;
  public resources;
  public comment;
  public kpiId;

  public showOverlay: boolean = true

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

    // this.dipService.GetSchoolKPIByEmisNumber(this.emisNumber).subscribe((res: any) => {
    //   this.kpiList = res;
    //   console.log(this.kpiList);
    // });


  }

  openViewPlanModal(content,i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    
    console.log(this.kpiList[i].kpiid);
    this.dipService.GetActionPlansByEmisNumber(this.emisNumber, this.kpiList[i].kpiid).subscribe((res: any) => {
      this.actionPlanList = res;
      
    });
    
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  openCreatePlanModal(content,i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
    //this.docPath = "";
    this.modalService.dismissAll();
  }

  CreateActionPlan()
  {
    Swal.fire({
      title: 'Are you sure you want to Add Action Plan',
      text: 'An Action plan will be created',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {
         
          var actionPlan = {
            "areaOfDevelopment": this.kpi.focusArea,
            "descriptionOfActivities": this.kpi.kpiName,
            "targetGroup": this.targetGroup,
            "responsibility": this.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.resources,
            "comment": this.comment,
            "kpiId": this.kpi.kpiid,
            "emisNumber": this.emisNumber};
          console.log(actionPlan);
          this.dipService.createActionPlan(actionPlan).subscribe(res => {
            console.log(res);
            console.log("sucess");
          });
        


          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'An Action Plan was created',
            icon: 'success'
          }).then(result => {
            this.modalService.dismissAll();
           
            if (result.value || result.isDismissed) {
              //window.location.reload()
            }
          });

        }
      });
  }


}