import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { data } from 'jquery';
import { ManagementWsiService } from '../management-wsi.service';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
import * as moment from 'moment';
import { ManagementPlan, Status } from '../../../../model/management-plan.model';
@Component({
  selector: 'app-district-management-plan',
  templateUrl: './district-management-plan.component.html',
  styleUrls: ['./district-management-plan.component.scss']
})
export class DistrictManagementPlanComponent implements OnInit {
  public lessons = [];

  ///
  public userinfo:any
  public districtPlan:any
  public statusData:any
  public disable: boolean;
  public data: any
  userForm: FormGroup;
  DistrictForm: FormGroup;
  isFormSubmitted: Boolean;
  public year: any
  public activityName: any
  public startDate: any
  public endDate: any
  public responsibility: any
  public comment: any
  public startDate1: any
  public endDate2: any
  public status: any
  public planID: any
  public SubActivityName: any
  public SubStartDate: any
  public SubEndDate: any
  public SubResponsibility: any
  public  ActivityId:any
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;
  public districtCode: any;
  public maxDate:any
  public minDate:any
  public districtName:any
  public subId:any
  public periodID:any
  public HeadList=[]
 

 public  managementPlanActivityId:any 
  public  subActivity: any

  //
  public lis = []
  public lis2= []
  public lisSub= []
  public statusID:any
  public id:any
  selec=[]
  li: any;

  ///
  managementPlans: ManagementPlan[] = [];
  createManagementPlanForm: FormGroup;
  public minDat = new Date();
  statuses: Status[] = [];
  submitted = false;
  directiveRef: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private modalService: NgbModal, 
    private appservice: AppService,
    private userservice: UsersService,
    private managementwsiservice: ManagementWsiService,
    private ngxService: NgxUiLoaderService) {

    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    // this.maxDate = moment(new Date()).format('YYYY-MM-DD');
    }

  ngOnInit(): void {
    this.buildCreateManagementPlanForm();
    this.getManagementPlans();
    this.getStatuses();
    
   

    //table
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true
      //paging: true,
      //  responsive: true,
    };



    this.userForm = this.fb.group({
      activityName: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      year: ['', Validators.required],
      comment: ['', Validators.required],
      status: ['', Validators.required],
      planID: ['', Validators.required],
      SubActivityName: [''],
      SubStartDate: [''],
    SubEndDate: [''],
   SubResponsibility:[''],
   ActivityId:['']
    });
    this.DistrictForm = this.fb.group({
      districtCode: [''],
      districtName:[''],
      managementPlanActivityId: [''],
      subActivity: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activityName: ['']
     
    })

    this.userinfo=this.appservice.getLoggedInUserId();
     console.log(this.userinfo);
     this.userservice.getUserId(this.userinfo).subscribe((data:any)=>{
      this.districtCode =data.districtCode;
      this.districtName=data.districtName;
      console.log("Current user info",data)
      console.log( "Current user info",this.districtName ,  this.districtCode)
     })
     
    this.isFormSubmitted = false;
    //get api
    this.managementwsiservice.ManagementListView().subscribe((data: any) => {
      //console.warn(data)

      // this.lis=data;
      this.lis = [...data]
      this.lis2 = [...data]
     

      // this.lis=this.li;

     
     
      this.managementwsiservice.statusList().subscribe(data=>{
        this.statusData=data
        console.log(data);
       })
     
this.managementwsiservice.districtManagement().subscribe(res=>{
 this.districtPlan=res;
  console.log(res);
 })
 this.managementwsiservice.ManagementListView().subscribe((data: any)=>{
  // console.log(data);
   this.li = data;
   console.log( this.li)
  })
  //management  list
   

      this.status = this.lis[0].status;
      //  console.log(this.status);
      this.dtTrigger.next();
      if (this.lis.length > 0) {
        this.noDisputes = false;
      } else {
        this.noDisputes = true;
      }

    }, err => {
      console.log(err);
      this.noDisputes = true;
    })
  }

  getManagementPlans(){
    this.managementwsiservice.getManagementPlans()
    .subscribe(res => {
      this.managementPlans = res;


      console.log('management plans', this.managementPlans);
    }, error => {
      console.log('management plans resulted in error', error);
    })
  }

  openCreateManagementPlanModel(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('Create Plan Modal closed' + result);

    }).catch((res) => { });
  }

  buildCreateManagementPlanForm() {
    this.createManagementPlanForm = this.fb.group({
      activityName: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      statusID: ['', Validators.required],
      comment: ['', Validators.required]
    })
  }


 get createManagementPlanFormControl() {
    return this.createManagementPlanForm.controls;
  }

submitManagementPlan() {
  this.submitted = true;
  const managementPlanPayload: ManagementPlan[] = [];
 if(this.createManagementPlanForm.valid){

    managementPlanPayload.push(this.createManagementPlanForm.value);
    this.managementwsiservice.createManagementPlans(managementPlanPayload)
    .subscribe(res => {
      console.log('management plan created', res);
      // TODO: take Swal to utils folder
      Swal.fire({
        timer: 5000,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        title: 'Successful',
        text: 'management plan has been successfully created',

        icon: 'success'
      }).then(result => {
        console.log('result', result);
          window.location.reload();
      });
    }, err => {
      console.log('management plan creation resulted in an error', err);
    })
 }
}

getStatuses(){
  this.managementwsiservice.getStatuses()
  .subscribe(res => {
    this.statuses = res;
    console.log('status found', this.statuses);
  }, err => {
    console.log('getting status resulted in an error', err);
  })
}

  get Form() {
    return this.DistrictForm.controls;
  }
  isActivityNameSelected: boolean;
  //Show and hide 
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Other") {
      this.isActivityNameSelected = true;
    } else {
      this.isActivityNameSelected = false;
    }

  }

  ///m
  //Show and hide 
  statusResults: boolean;
  selectStatus(event) {
    let selected = event.target.value;
    if (selected == "Update Required") {
      this.statusResults = true;

    } else {
      this.statusResults = false;
    }

  }
  //
  //reviewModal
  openEditModel3(content, id,name,startDate,endDate) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });
  
    this.managementPlanActivityId = id;
    this.districtCode=this.districtCode;
    this.districtName=this.districtName;
    this.activityName=name;
    //this.minDate=moment(startDate).format('YYYY-MM-DD');
   // this.maxDate=moment(endDate).format('YYYY-MM-DD');
    this.maxDate=this.toISOLocalDate(endDate);
    this.minDate=this.toISOLocalDate(startDate);
   // console.log(maxDate,minDate)
  
    
    console.log( this.managementPlanActivityId ,  this.districtCode);
    this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
     
      this.lisSub=list;
      console.log("this is main and sub",   this.lisSub);
    }) 
     
 
  }
 
  
  getToday(): string {
     
   // this.minDate="2022-04-04"
   return new Date().toISOString().split('T')[0] 

 }
  
 getday(): string {
     
  this.maxDate=this.maxDate
 // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.maxDate
}

  //ViweDistrictList
  openEditModel6(content, id,name,startDate,endDate,periodID) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });
    this.managementPlanActivityId = id;
    this.districtCode=this.districtCode;
     this.activityName=name;
     this.periodID=periodID;
     this.minDate=moment(startDate).format('YYYY-MM-DD');
     this.maxDate=moment(endDate).format('YYYY-MM-DD');
    console.log( this.managementPlanActivityId ,  this.districtCode);
    this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
      
      this.lisSub=list;
      console.log("this is main and sub-Activity-list", this.lisSub);
    })
      
 
  }

    //Edit Sub-Activity wModal
    openEditModel4(content, id,subActivity,responsibility,startDate,endDate,managementPlanActivityId,periodID,statusID ) {
      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        console.log("Modal closed" + result);
  
      }).catch((res) => { });
    
   
     this.subId=id;
   
      this.subActivity = subActivity,
      this.periodID=periodID,
      this.statusID=statusID
      console.log(periodID)
      console.log(statusID)
     this.managementPlanActivityId = managementPlanActivityId;
      this.responsibility=responsibility;
     this.startDate= moment(startDate).format('YYYY-MM-DD');
      this.endDate =moment(endDate).format('YYYY-MM-DD');
       /* this.managementwsiservice.getSubActivityById(id).subscribe((data: any) => {
        console.log(data);
        this.subActivity = data[0].subActivity,
        this.managementPlanActivityId = data[0].managementPlanActivityId;
        this.responsibility=data[0].responsibility;
       this.startDate= moment(data[0].startDate).format('YYYY-MM-DD');
        this.endDate =moment(data[0].endDate).format('YYYY-MM-DD');
      })

    this.managementwsiservice.getActivityById(this.managementPlanActivityId).subscribe(data => {
      
       this.activityName = data[0].activityName;
       this.responsibility = data[0].responsibility;
       this.minDate = data[0].startDate;
       this.maxDate = data[0].endDate;
       this.status = data[0].status;
       this.comment = data[0].comment;
       console.log(this.minDate,this.maxDate)
      }) */

   
    }
  logDispute() {
    
    if (this.DistrictForm.valid) {
      let  DistricSub = {
       
       
        districtCode: this.districtCode,
        managementPlanActivityId:this.managementPlanActivityId,
        subActivity:this.subActivity,
        responsibility:this.responsibility,
        startDate:this.startDate,
        endDate:this.endDate,
        statusID:7,
        periodID:1

      };
        console.log(DistricSub );
      Swal.fire({
        title: 'Are you sure you want to Add Sub-Activity',
        text: 'A Sub-Activity will be added',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.managementwsiservice.AddSubActivity( DistricSub).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Ok',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'A  sub-Activity  Added',

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
    } else if (this.DistrictForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }
  update() {
    if( this.statusID==4){
      this.statusID=4;
    }
    if (this.DistrictForm.valid) {
      let  DistricSub = {
        id:this.subId,
        districtCode: this.districtCode,
        managementPlanActivityId:this.managementPlanActivityId,
        subActivity:this.subActivity,
        responsibility:this.responsibility,
        startDate:this.startDate,
        endDate:this.endDate,
        periodID:this.periodID,
        statusID:this.statusID

      };
        console.log(DistricSub );
      Swal.fire({
        title: 'Are you sure you want to Add Sub-Activity',
        text: 'A Sub-Activity will be Updated',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.managementwsiservice.UpdateSubActivityById( DistricSub.id,
              DistricSub.districtCode,
              DistricSub.managementPlanActivityId,
              DistricSub.subActivity,
              DistricSub.responsibility,
              DistricSub.startDate,
              DistricSub.endDate,
              DistricSub.periodID,
              DistricSub.statusID).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Ok',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'A  sub-Activity  Updated',

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
    } else if (this.DistrictForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }

  Cancel()
{
  this.DistrictForm.reset();
  this.isFormSubmitted = false;

  this.modalService.dismissAll();
  this.DistrictForm.controls["subActivity"].setValue("");
    this.DistrictForm.controls["responsibility"].setValue("");
    this.DistrictForm.controls["startDate"].setValue("");
    this.DistrictForm.controls["endDate"].setValue("");
   // this.DistrictForm.controls["districtName"].setValue("");
   // this.DistrictForm.controls["districtCode"].setValue("");
    this.DistrictForm.controls["activityName"].setValue("");


}

toISOLocalDate(d) {

  var z = n => ('0' + n).slice(-2);

  var zz = n => ('00' + n).slice(-3);

  var off = d.getTimezoneOffset();

  var sign = off < 0 ? '+' : '-';

  off = Math.abs(off);



  return d.getFullYear() + '-'

    + z(d.getMonth() + 1) + '-' +

    z(d.getDate())



}

//Submit For Review All Activities
SubmitReviewAll() {
 
  
console.log("this display id ata publish",this.managementPlanActivityId,"and code",this.districtCode)
  Swal.fire({
    title: 'Are you sure you want to Publish The Sub-Activities For Management Plan  '+'  '+this.lis[0].managementPeriod,
    text: 'A Management Plan will be Plublished',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
        this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
      
          this.lisSub=list;
          console.log("data to publish sub-Activity-list", this.lisSub);
        })
  for (let index = 0; index < this.lisSub.length; index++) {


    if( this.lisSub[index].statusID=="6")
    {
      this.lisSub[index].statusID ="4"
      
    }
    if( this.lisSub[index].statusID =="7")
    {
      this.lisSub[index].statusID ="4"
      
  
    }
  

    
    
    this.id=this.lisSub[index].id;
    this.statusID=this.lisSub[index].statusID;
    console.log("new Id",this.id,"New Status",this.statusID)
    this.managementwsiservice.updateSubById( this.id,this.statusID).subscribe(result=>{
      console.log("Successful")
      })
    


  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'A Management Plan will be Plublished',

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
//Submit For Review Only The Selected
Submitchecked() {

  Swal.fire({
    title: 'Are you sure you want to Publish The Sub-Activities For Management Plan  '+'  '+this.lis[0].managementPeriod,
    text: 'The Sub-Activities will be Plublished',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 
        
          this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
        
            this.lisSub=list;
            console.log("data to publish sub-Activity-list", this.lisSub);
          })
    for (let index = 0; index < this.lisSub.length; index++) {
  
  
      if( this.lisSub[index].statusID=="6")
      {
        this.lisSub[index].statusID ="4"
        
      }
      if( this.lisSub[index].statusID =="7")
      {
        this.lisSub[index].statusID ="10"
        
    
      }
    
  
      
      
      this.id=this.lisSub[index].id;
      this.statusID=this.lisSub[index].statusID;
      console.log("new Id",this.id,"New Status",this.statusID)
      this.managementwsiservice.updateSubById( this.id,this.statusID).subscribe(result=>{
        console.log("Successful")
        })
      
  

  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'A Management Plan will be Plublished',

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
UpdateSubmitCheck(id,statusID) {
 
  this.id = id;
  if(statusID=="7")
  {
   this.statusID ="6"
  }
  
  this.managementwsiservice.updateSubById(this.id,this.statusID).subscribe(result=>{
  console.log("Successful")
  })



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity Selected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}
UpdateSubmitUnCheck(id,statusID) {
 
  this.id = id;
  if(statusID=="6")
  {
   this.statusID ="7"
  }
 
  this.managementwsiservice.updateSubById( this.id,this.statusID).subscribe(result=>{
  console.log("Successful")
  })



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity UnSelected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}
checkedAll() {
  this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
      
    this.lisSub=list;
    console.log("data to publish sub-Activity-list", this.lisSub);
  })
for (let index = 0; index < this.lisSub.length; index++) {


if( this.lisSub[index].statusID=="7")
{
this.lisSub[index].statusID ="6"

}

   
    

this.id=this.lisSub[index].id;
this.statusID=this.lisSub[index].statusID;
console.log("new Id",this.id,"New Status",this.statusID)
this.managementwsiservice.updateSubById( this.id,this.statusID).subscribe(result=>{
  console.log("Successful")
  })


  }



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: ' All Activities Selected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}


UncheckedAll() {
 
  this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
      
    this.lisSub=list;
    console.log("data to publish sub-Activity-list", this.lisSub);
  })
for (let index = 0; index < this.lisSub.length; index++) {


if( this.lisSub[index].statusID=="6")
{
this.lisSub[index].statusID ="7"

}

   
    

this.id=this.lisSub[index].id;
this.statusID=this.lisSub[index].statusID;
console.log("new Id",this.id,"New Status",this.statusID)
this.managementwsiservice.updateSubById( this.id,this.statusID).subscribe(result=>{
  console.log("Successful")
  })


  }



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: ' All Activities Selected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}
 //ViweHeadOffList
 ModelHeadSub(content, id,name,startDate,endDate,periodID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  //this.districtCode=this.districtCode;
   this.activityName=name;
  // this.periodID=periodID;
   this.minDate=moment(startDate).format('YYYY-MM-DD');
   this.maxDate=moment(endDate).format('YYYY-MM-DD');
   this.managementwsiservice.GetHeadOfficeSubListByMainId(this.managementPlanActivityId).subscribe((data:any)=>{
    console.log("data for sub in head off per Activi",data)
    this.HeadList=data;
  })
    

}

resetDropzoneUploads(): void {
  if (this.directiveRef) {
    this.directiveRef.reset();
  }
  
  this.modalService.dismissAll();
}
   
  }
  
  

