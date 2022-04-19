import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
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
  selector: 'app-pip-report',
  templateUrl: './pip-report.component.html',
  styleUrls: ['./pip-report.component.scss']
})
export class PIPReportComponent implements AfterViewInit, OnDestroy, OnInit {

 


  public lessons = [];

  ///
  public resources:any
  public statusData:any
  public disable: boolean;
  public disableTick: boolean;
  public data: any
  DipForm: FormGroup;
  isFormSubmitted: Boolean;
 
  
  public startDate: any
  public endDate: any
  public responsibility: any
  public comment: any
 // public subCriteria:any
 // public Intervention:any
  public impactedParty:any
  public  statusID:any
  public subCriteria="";
  public businessUnit="";
  public descriptionOfActivities="";
  public Intervention="";
  public schoolList= [];
  public listSchools=[];
  public listDistricts=[];
   public districts=[];
  public status:any
  public kp ;
  public 

  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;

  //
  public roleId :any
  public lis :any []
  public pipList= []
  public ActionList=[]
  public userinfo:any
  public districtCode: any;
 
  public districtName:any
  public  id:any
  public kpi:any
  public targetGroup:any
  public dipbuComment:any
  public dipCircuitComent:any
  public dipDirectComment:any
  public path:any
  public sipActionPlanCommentsID:any
  selec=[]
  array=[]
  li: any;
  lii:any
  //check array

  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
 // dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  ///
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
       subCriteria:[''],
      startDate: [''],
      Intervention:[''],
      impactedParty:[''],
      resources:[''],
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

    

})
this.managementwsiservice.getPipList().subscribe((res:any)=>{
  this.pipList=res;
  console.log("dummy data FOR PIP",res);
});

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
 ///modal Edit Actiction Plan
 openEditAction(content) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });


}
 ///modal Comment Actiction Plan
 openComments(content) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });


}



openModal(content, i) {
  this.isFormSubmitted = false;
 this.kp = this.pipList[i];
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
  this.id=this.kpi.sipActionId


  console.log(  this.kpi)
  console.log(  this.kpi.descriptionOfActivities)
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).
    catch((res) => {
    });

}
 ///modal Create Actiction Plan
 interventios(content,i)
  {
   this.kpi = this.pipList[i];
    console.log(this.kpi);
    
    //this.ActionList
this.managementwsiservice.GetActionPipPlan(this.kpi.schoolKPIID).subscribe((res:any)=>{
  this.ActionList=res;
  console.log( "Action plan" ,this.ActionList);
})
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

  console.log(this.subCriteria)

}



 ///modal Create Actiction Plan
 openDistrictList(content,i) {
  //this.schoolList=this.DipList[i].dipSchools;

   this.listDistricts=[];
   this.listSchools=[];
   this.districts=[];
   this.id=i;
   console.log(this.pipList[i])
   for (let idx = 0; idx < this.pipList[i].districts.length; idx++)
   {
     this.listDistricts.push(this.pipList[i].districts[idx]);
     console.log(this.listDistricts);
  
    
  
  }

  //this.schoolList.push(...this.DipList[i].dipSchools);
  //console.log(this.schoolList)

  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

}
openSchools(content) {
  //this.schoolList=this.DipList[i].dipSchools;

   this.listDistricts=[];
   this.listSchools=[];
   this.districts=[];
   this.id=this.id;
   for (let idx = 0; idx < this.pipList[this.id].districts.length; idx++)
   {
     this.listDistricts.push(this.pipList[this.id].districts[idx]);
     console.log(this.listDistricts);
  
     for (let x = 0; x < this.listDistricts[idx].schools.length; x++)
     {
       this.listSchools.push(this.listDistricts[idx].schools[x]);
       console.log("Schoollist",this.listSchools);
     }
  
  }

  //this.schoolList.push(...this.DipList[i].dipSchools);
  //console.log(this.schoolList)

  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

}


openCreatePlanModal(content, i) {
  this.isFormSubmitted = false;
  this.kpi = this.pipList[i];
  console.log(  this.kpi)
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).
    catch((res) => {
    });

    $('#activityDesc').keyup(function () {
      var maxLength = 50;
      var textlen = $(this).val().toString().length;
      $('#rchars').text(textlen);
      console.log("Limit is ", textlen);
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
          "comment": this.comment,
          "kpiId": this.kpi.schoolKPIID,
       
         "status":"PIP Logged",
         "HeadOffice":"HO",
         "pipBuComment": "pip",
         "pipLineDirectorComment": " pip string",
         "pipChiefComment": "pip string",
         "pipDepComment": "pip string"
        };
        console.log(actionPlan);
        this.managementwsiservice.createPIPPlan(actionPlan).subscribe(res => {
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

ActionPlan(){
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
          
            "sipActionId":this.kpi.sipActionId,
            "areaOfDevelopment":this.kpi.focusArea,
            "descriptionOfActivities": this.descriptionOfActivities,
            "targetGroup":this.targetGroup,
            "responsibility":this.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.resources,
            "comment": this.comment,
       
         "status":"PIP Logged",
         "HeadOffice":"HO",
         "pipBuComment": "pip",
         "pipLineDirectorComment": " pip string",
         "pipChiefComment": "pip string",
         "pipDepComment": "pip string"
           
            
        };
        console.log(actionPlan);
        this.managementwsiservice.UpdatePIP(actionPlan).subscribe(res => {
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
SubmitInterventions() {
  Swal.fire({
    title: 'Review PIP Action Plan?',
    text: 'Are you sure you want to Submit this PIP Intervention for Review?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {

    if (result.value) {

    

      Swal.fire({
        title: "Successful",
        text: 'The PIP Intervention has been submitted for review',
        icon: 'success'
      }).then(result => {
        if (result.value || result.isDismissed) {
          window.location.reload()
        }
      });

    }

  });


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
          "path": this.kpi.path,
          "status": this.status,
          
          "sipActionPlanID": this.kpi.sipActionId,
          "dipbuComment":this.comment,
          "dipCircuitComent":"no comment",

          "dipDirectComment":this.dipDirectComment,
          "pipBuComment": "pip",
          "pipLineDirectorComment": " pip string",
          "pipChiefComment": "pip string",
          "pipDepComment": "pip string"

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

progressCheck(content, i) {
  this.isFormSubmitted = false;
  this.kp = this.pipList[i];
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


  }
