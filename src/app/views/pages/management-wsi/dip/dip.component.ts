import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
import { DataTableDirective } from 'angular-datatables';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { ManagementWsiService } from '../management-wsi.service';


import * as moment from 'moment';


@Component({
  selector: 'app-dip',
  templateUrl: './dip.component.html',
  styleUrls: ['./dip.component.scss']
})
export class DipComponent implements AfterViewInit, OnDestroy, OnInit {
  public kpiInfo;
  public kpiList;
  public List;
  public role;
  public isFormSubmitted;
  public kpi;
  public actionPlanList;

  public areaOfDevelopment;
  public descriptionOfActivities;
  public targetGroup;
  public responsibility;
  public startDate;
  public endDate;
  public resources;
  public comment;
  public kpiId;
  public lessons = [];
  public position: any

  ///
  public statusData: any
  public disable: boolean;
  public disableTick: boolean;
  public data: any
  DipForm: FormGroup;
  public id: any;
  public evidence:any;
  public path:any
  public sipActionPlanCommentsID:any



  // public subCriteria:any
  // public Intervention:any
  public impactedParty: any
  public statusID: any
  public subCriteria = "";
  public businessUnit = "";
  // public descriptionOfActivities="";
  public Intervention = "";
  public schoolList = [];
  public listSchools = [];
  public ActionList = [];
  public emisNumber: any
  public kp: any
  // public kpiList;
  //public kpi;

  public status: any

  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;

  //
  public roleId: any
  public lis: any[]
  public DipList = []
  public districtName: any
  public userinfo: any
  public districtCode: any;
  public userId:any
  public dipbuComment:any
  public dipCircuitComent:any
  public dipDirectComment:any


  selec = []
  array = []
  li: any;
  lii: any
  public evidenceModel:any ={};
  //check array
  //public dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  // dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  ///
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private appservice: AppService,
    private userservice: UsersService,
    config: NgbModalConfig,
    private modalService: NgbModal, private managementwsiservice: ManagementWsiService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }

  ngOnInit(): void {
    //table

    //this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      paging: true,
      responsive: true,
    };



    this.DipForm = this.formBuilder.group({
      responsibility: [''],
      subCriteria: [''],
      startDate: [''],
      Intervention: [''],
      impactedParty: [''],
      endDate: [''],
      comment: [''],
      status: [''],
      planID: [''],
      statusID: [''],
      focusArea: [''],
      descriptionOfActivities: ['']

    })
    this.isFormSubmitted = false;


    this.userinfo = this.appservice.getLoggedInUserId();
    console.log(this.userinfo);
    this.userservice.getUserId(this.userinfo).subscribe((data: any) => {
      this.districtCode = data.districtCode;
      this.position = data.position;
      console.log(this.position)
      this.districtName = data.districtName;
      console.log("Current user info", data)
      console.log("Current user info", this.districtName, this.districtCode)


      this.managementwsiservice.getKPIsByDistrict(this.districtCode).subscribe((res: any) => {
        this.kpiList = res;
        console.log(res);
      })

      this.managementwsiservice.getAddDipPlan(this.districtCode).subscribe((res: any) => {
        this.List = res;
        console.log(res);
      })
    })
    this.managementwsiservice.getDipList().subscribe((res: any) => {

      console.log("dummy data", res);
    })

    this.dtTrigger.next();




    //status list




  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }



  get Form() {
    return this.DipForm.controls;
  }
  ///modal Create Actiction Plan
  openAction(content, KpiName) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    this.subCriteria = KpiName;
    console.log(this.subCriteria)

  }
  ///modal Edit Actiction Plan
  openEditAction(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });


  }
  ///modal Comment Actiction Plan
  openComments(content, comment) {
    this.comment = comment;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });


  }

   //comment modal
 openEditModel4(content, i) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });
 
  this.kp = this.kpiList[i];
  this.kpi = this.ActionList[i];
  console.log(this.kpi)

  this.descriptionOfActivities = this.kpi.descriptionOfActivities,
    this.status = this.kpi.status,
    this.responsibility = this.kpi.responsibility,
    this.resources = this.kpi.resources,
    this.dipbuComment=this.kpi.dipbuComment,
    this.dipCircuitComent=this.kpi.dipCircuitComent,
    this.dipDirectComment=this.kpi.dipDirectComment,
      
 
  console.log("comment",  this.comment)

}
  ///modal Create Actiction Plan
  ///modal Create Actiction Plan
  interventios(content, i) {
    this.kpi = this.kpiList[i];
    console.log(this.kpi);

    //this.ActionList
    this.managementwsiservice.GetActionPlansByDistrictCode(this.districtCode, this.kpi.schoolKPIID).subscribe((res: any) => {
      this.ActionList = res;
      console.log(this.ActionList);
    })
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

    console.log(this.subCriteria)

  }


  openCreatePlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    console.log(this.kpi)
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  CreateActionPlan() {
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
            "descriptionOfActivities": this.descriptionOfActivities,
            "targetGroup": this.targetGroup,
            "responsibility": this.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.resources,
            "comment": "Comments",
            "kpiId": this.kpi.schoolKPIID,
            "districtCode": this.districtCode,
            "status": "DIP Logged",
            "dipbuComment":this.dipbuComment,
             "dipCircuitComent":this.dipCircuitComent,
             "dipDirectComment":this.dipDirectComment
          };
          console.log(actionPlan);
          this.managementwsiservice.createActionPlan(actionPlan).subscribe(res => {
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
              window.location.reload()
            }
          });

        }
      });
  }

  ActionPlan() {
    Swal.fire({
      title: 'Are you sure you want to Update Action Plan',
      text: 'An Action plan will be  Updated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {

          var actionPlan = {

            "sipActionId": this.kpi.sipActionId,
            "areaOfDevelopment": this.kpi.focusArea,
            "descriptionOfActivities": this.descriptionOfActivities,
            "targetGroup": this.targetGroup,
            "responsibility": this.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.resources,
            "comment": this.comment,
            "status": "DIP Logged",
            "districtCode": this.districtCode,
            "dipbuComment":this.dipbuComment,
            "dipCircuitComent":this.dipCircuitComent,
            "dipDirectComment":this.dipDirectComment


          };
          console.log(actionPlan);
          this.managementwsiservice.UpdateDIP(actionPlan).subscribe(res => {
            console.log(res);
            console.log("sucess");
          });



          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'An Action Plan was Updated',
            icon: 'success'
          }).then(result => {
            this.modalService.dismissAll();

            if (result.value || result.isDismissed) {
              window.location.reload()
            }
          });

        }
      });
  }

  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.managementwsiservice.uploadLink,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 25,
    acceptedFiles: '.pdf'
  };

  onUploadSuccess(event: any, i): void {
    console.log('onUploadSuccess:', event);
    this.kpi.documentpath = event[1].path;
    console.log('this.kpi.documentpath', this.kpi.documentpath)
   

  }

  openModal(content, i) {
    this.isFormSubmitted = false;
    this.kp = this.kpiList[i];
    this.kpi = this.ActionList[i];
    console.log(this.kpi)

    this.descriptionOfActivities = this.kpi.descriptionOfActivities,
      this.status = this.kpi.status,
      this.responsibility = this.kpi.responsibility,
      this.resources = this.kpi.resources,
      this.targetGroup = this.kpi.targetGroup,
      this.startDate = moment(this.kpi.startDate).format('YYYY-MM-DD'),
      this.endDate = moment(this.kpi.finishDate).format('YYYY-MM-DD'),
      this.comment = this.kpi.comment,
      this.id = this.kpi.sipActionId


    console.log(this.kpi)
    console.log(this.kpi.descriptionOfActivities)
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


  ///modal Create Actiction Plan
  openEditSchools(content, i) {
    this.listSchools = [];
    var kpiId = this.kpiList[i].schoolKPIID;
    this.managementwsiservice.getSchoolsKPIsByDistrict(this.districtCode, kpiId).subscribe((res: any) => {
      this.listSchools = res;
      console.log(res);
    })

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }

  CreatePlan() {

    if (this.DipForm.valid) {
      let Action = {




      };
      console.log(Action);
      Swal.fire({
        title: 'Are you sure you want to Add Action Plan',
        text: ' Action Plan will be added',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.managementwsiservice.AddSubActivity(Action).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Ok',
              cancelButtonText: 'No',
              title: "Successful",
              text: ' Action Plan  Added',

              icon: 'success'
            }).then(result => {
              this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
                window.location.reload()
              }
            });




          }
        })
    } else if (this.DipForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }

  EditPlan() {

    if (this.DipForm.valid) {
      let Action = {




      };
      console.log(Action);
      Swal.fire({
        title: 'Are you sure you want to Update Action Plan',
        text: ' Action Plan will be Updated',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.managementwsiservice.AddSubActivity(Action).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Ok',
              cancelButtonText: 'No',
              title: "Successful",
              text: ' Action Plan  Updated',

              icon: 'success'
            }).then(result => {
              this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
                window.location.reload()
              }
            });




          }
        })
    } else if (this.DipForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }


  SavePlan() {
    Swal.fire({
      title: 'Verify DIP Action Plan?',
      text: 'Are you sure you want to Submit this DIP Intervention for Verification?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
  
      if (result.value) {
  
       
  
        Swal.fire({
          title: "Successful",
          text: 'The DIP Intervention has been submitted for verification',
          icon: 'success'
        }).then(result => {
          if (result.value || result.isDismissed) {
            window.location.reload()
          }
        });
  
      }
  
    });

  
  }


  progressCheck(content, i) {
    this.isFormSubmitted = false;
    this.kp = this.kpiList[i];
    this.kpi = this.ActionList[i];
    console.log(this.kpi.sipActionId)
  
    this.managementwsiservice.getDipActionPlanById(this.kpi.sipActionId).subscribe((res: any) => {
      console.log(res);
      this.comment = res[0].comments;
      this.status = res[0].status;
      this.path = res[0].path;
      this.dipbuComment=res[0].dipbuComment,
      this.dipCircuitComent=res[0].dipCircuitComent,
      this.dipDirectComment=res[0].dipDirectComment,
      this.sipActionPlanCommentsID=res[0].sipActionPlanCommentsID
    })
    console.log(i)
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
  
    }).
      catch((res) => {
      });

  }
  
  viewProgressEvidence(i){
    console.log(this.kpi.sipActionId)
     
  }


  saveEvidence(){
    Swal.fire({
      title: 'Are you sure you want to save data',
      text: 'Evidence data will be saved',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {

          let evidenceModel={
            //"sipActionPlanCommentsID": ,
            "comments":  this.comment,
            "path": this.kpi.documentpath,
            "status": this.status,
            
            "sipActionPlanID": this.kpi.sipActionId,
            "dipbuComment":this.comment,
            "dipCircuitComent": "No Comment",
            "dipDirectComment": "No Comment"

        }
          console.log("Values",evidenceModel);

          this.managementwsiservice.saveProgressData(evidenceModel).subscribe((res: any) => {

            console.log("evidence", res);
          

          })


          //window.location.reload;



          // Swal.fire({
          //   timer: 5000,
          //   confirmButtonText: 'Yes',
          //   cancelButtonText: 'No',
          //   title: "Successful",
          //   text: 'An Action Plan was created',
          //   icon: 'success'
          // }).then(result => {
          //   this.modalService.dismissAll();

          //   if (result.value || result.isDismissed) {
          //     window.location.reload()
          //   }
          // });

        }

         if (result.value || result.isDismissed) {
             window.location.reload()
          }
      });

   

 

}

//Show and hide fields
selectStatus($event){
 console.log($event,'$event')
 console.log(this.status,"status")

 if(this.status == "In-Progress"){
   $('#comment').hide();
   $('#evidence').hide();

 }else{
  $('#comment').show();
  $('#evidence').show();

 }

}

}




