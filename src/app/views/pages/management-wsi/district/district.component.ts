import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
import { DataTableDirective } from 'angular-datatables';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


import { ManagementWsiService } from '../management-wsi.service';


import * as moment from 'moment';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements AfterViewInit, OnDestroy, OnInit {
  public lessons = [];
  public kpiInfo;
  public kpiList;
  public role;
  public isFormSubmitted;
  public kpi;
  public kp ;
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

  public statusData:any
  public disable: boolean;
  public disableTick: boolean;
  public data: any
  DipForm: FormGroup;
  public ActionList=[];
 
  

 // public subCriteria:any
 // public Intervention:any
  public impactedParty:any
  public  statusID:any
  public subCriteria="";
  public businessUnit="";

  public Intervention="";
  public schoolList= [];
  //public dipSchools=[]

  public status="";

  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;

  //
  public roleId :any
  public lis :any []
  public DipList= []
  public userinfo:any
  public districtCode: any;
  public listSchools=[];
 public emisNumber;
  public districtName:any
  public userId;
  public id:any;
  public sipActionPlanCommentsID:any

  public dipbuComment:any
  public dipCircuitComent:any
  public dipDirectComment:any
  selec=[]
  array=[]
  li: any;
  lii:any
  statuses= [];
  public path:any;
  public isPageLoading:Boolean;
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
    this.isPageLoading =true;
    this.getStatuses();
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
       subCriteria:[''],
      startDate: [''],
      Intervention:[''],
      impactedParty:[''],
      endDate: [''],
      comment: [''],
      status: [''],
      planID: [''],
     statusID:[''],
     focusArea:[''],
     descriptionOfActivities:['']
     
    })
    this.isFormSubmitted = false;
    this.userinfo=this.appservice.getLoggedInUserId();
    console.log(this.userinfo);

    this.userservice.getUserId(this.userinfo).subscribe((data:any)=>{
     this.districtCode =data.districtCode;
     this.districtName=data.districtName;
     console.log("Current user info",data)
     console.log( "Current user info",this.districtName ,  this.districtCode)

    this.managementwsiservice.getKPIsByDistrict(this.districtCode).subscribe((res:any)=>{
      this.kpiList=res;
      this.isPageLoading =false;
      console.log(res);
    })
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
 openAction(content) {
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
 openEditSchools(content,i) {
  this.listSchools=[];
   var kpiId = this.kpiList[i].schoolKPIID;
   this.managementwsiservice.getSchoolsKPIsByDistrict(this.districtCode, kpiId).subscribe((res: any) => {
     this.listSchools = res;
     console.log(res);
   })

  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

}

 ///modal Create Actiction Plan
 ///modal Create Actiction Plan
 interventios(content,i)
  {
   this.kpi = this.kpiList[i];
    console.log( this.kpi);
    
    //this.ActionList
this.managementwsiservice.GetActionPlansByDistrictCode(this.districtCode,this.kpi.schoolKPIID).subscribe((res:any)=>{
  this.ActionList=res;
  console.log(  this.ActionList);
})
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

  console.log(this.subCriteria)

}


openCreatePlanModal(content, i) {
  this.isFormSubmitted = false;
  this.kp = this.kpiList[i];
  this.kpi = this.ActionList[i];
  console.log( this.kpi)

  this.descriptionOfActivities=this.kpi.descriptionOfActivities,
  this.status=  this.kpi.status,
  this.responsibility=this.kpi.responsibility,
  this.resources=this.kpi.resources,
  this.targetGroup=this.kpi.targetGroup,
  this.startDate=moment(this.kpi.startDate).format('YYYY-MM-DD'),
  this.endDate=moment(this.kpi.finishDate).format('YYYY-MM-DD'),
  this.comment=this.kpi.comment,
  this.id=this.kpi.sipActionId,
  this.dipbuComment=this.kpi.dipbuComment,
  this.dipCircuitComent=this.kpi.dipCircuitComent,
  this.dipDirectComment=this.kpi.dipDirectComment


  console.log(  this.kpi)
  console.log(  this.kpi.descriptionOfActivities)
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).
    catch((res) => {
    });

}

CreateActionPlan() {
  Swal.fire({
    title: 'Are you sure you want to Review Action Plan',
    text: 'An Action plan will be  Reviewed',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {

        var actionPlan = {
          
            "sipActionId":this.kpi.sipActionId,
            "areaOfDevelopment":this.kpi.focusArea,
            "descriptionOfActivities": this.kpi.descriptionOfActivities,
            "targetGroup":this.kpi.targetGroup,
            "responsibility":this.kpi.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.kpi.resources,
            "comment": this.comment,
            "status": this.status,
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
          text: 'An Action Plan was Reviewed',
          icon: 'success'
        }).then(result => {
          this.modalService.dismissAll();

          if (result.value || result.isDismissed) {
         //  window.location.reload()
          }
        });

      }
    });
}

SubmitIntervention() {

  Swal.fire({
    title: 'Review DIP Action Plan?',
    text: 'Are you sure you want to Submit this DIP Intervention to the District?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {

    if (result.value) {

      let updateSIPIntervention = {
        "CompletedJSON": JSON.stringify(this.ActionList),
        "EmisNumber": this.emisNumber,
        "UserId": this.userId,
        "Status":this.status
      }; 


      console.log(JSON.stringify(this.ActionList[0]));
       this.managementwsiservice.submitSIPtoDistrict(updateSIPIntervention).subscribe((res: any) => {
        console.log(res);

      }); 

      Swal.fire({
        title: "Successful",
        text: 'The SIP Intervention has been submitted to the district for review',
        icon: 'success'
      }).then(result => {
        if (result.value || result.isDismissed) {
          //this.router.navigate(['/disputes/list'])
        }
      });

    }

  });

}

resetDropzoneUploads(): void {
  if (this.directiveRef) {
    this.directiveRef.reset();
  }
  //this.docPath = "";
  this.modalService.dismissAll();
}
 ////function to get status List
 getStatuses(){
  this.managementwsiservice.getStatusReview()
  .subscribe((res:any) => {
    this.statuses = res;
    console.log('status found', this.statuses);
  }, err => {
    console.log('getting status resulted in an error', err);
  })
}

SavePlan() {
  
 
  
  Swal.fire({
    title: 'Are you sure you want to Submit The  Action Plan For Review ',
    text: ' Action Plan   will be Submitted',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 


  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'Action Plan will be Submitted',

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


}

DistrictPlan() {
  
 
  
  Swal.fire({
    title: 'Are you sure you want to Submit The  Action Plan For Corrections Back at District ',
    text: ' Action Plan   will be Submitted',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 


  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'Action Plan will be Submitted',

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


}

//Dimakatso
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

saveEvidence(){
  Swal.fire({
    title: 'Are you sure you want to save Review Progress',
    text: 'Review Progress will be saved',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {

        let evidenceModel={
         "sipActionPlanCommentsID":this.sipActionPlanCommentsID,
          "comments":this.dipCircuitComent,
          "path":this.kpi.path,
          "status": this.status,
          "dipbuComment":this.kpi.dipbuComment,
          "sipActionPlanID": this.kpi.sipActionId,
        
          "dipCircuitComent":this.dipCircuitComent,
          "dipDirectComment":this.kpi.dipDirectComment,

      }
        console.log("All Values",evidenceModel);
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



   
  }
  
  

