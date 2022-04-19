import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { data } from 'jquery';
import { ManagementWsiService } from '../management-wsi.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as moment from 'moment';

import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';

///

///

@Component({
 // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-add-management',
  templateUrl: './add-management.component.html',
  styleUrls: ['./add-management.component.scss']
})
export class AddManagementComponent implements OnInit {



  ///mythings
  public dayPublished: any
  public data: any
  userForm: FormGroup;
  DistrictForm: FormGroup;
  userForms: FormGroup;
  isFormSubmitted: Boolean;
  button1: Boolean;
  showbuttons: Boolean;
  public tick: any
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
  public ActivityList: any
  public iD: any
  // public id=[]
  public responsiblePersons: any;
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;
  public 
  public checkedItem: any
  public datas: any
  public value: any
  public userinfo: any
  public documentDateUploaded: any
  public uploadedBy: any
  public yearUploaded: any = "";
public newActityName:any
public disable :boolean;
public districtCode: any;

 public  managementPlanActivityId:any 
  public  subActivity: any
 
  //
  lis = []
  li: any;


  public datePublish = new Date().toISOString().replace(/T.*$/, '');
  // Activity form
  activityForm: FormGroup;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private modalService: NgbModal, 
    private managementwsiservice: ManagementWsiService, 
    private ngxService: NgxUiLoaderService, 
    private userservice: UsersService, 
    private appservice: AppService
   // private cdref: ChangeDetectorRef
    ) {

    const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today


    ///mythings
  }

  ngOnInit(): void {

    //table
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      paging: true,
      responsive: true
    };


    console.log(this.datePublish);

    this.userinfo = this.appservice.getIsLoggedInUsername();
   // console.log(this.userinfo);
     this.userinfo=this.appservice.getLoggedInUserId();
     console.log(this.userinfo);
    //////end my thing

    this.userForm = this.formBuilder.group({
      activityName: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      year: [''],
      comment: [''],
      status: [''],
      planID: [''],
      newActityName: ['']
      
      

    })
    ///check formgroup

    this.DistrictForm = this.formBuilder.group({
      districtCode: ['', Validators.required],
      managementPlanActivityId: ['', Validators.required],
      subActivity: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
     
    })

    //
   
   

    //get api
    this.managementwsiservice.getManagementPlan().subscribe((data: any) => {
     console.log(data);

      this.li = data;
    
      this.lis = data.filter(function (data) {

        return data.status != "Plan Published";

      });

   
      this.dtTrigger.next();
      if (this.lis.length > 0) {
        this.noDisputes = false;
      } else {
        this.noDisputes = true;
      }

    }, err => {
      console.log(err);
      this.noDisputes = true;
    });
    //responsile list
    this.managementwsiservice.getResponsibleList().subscribe((res: any) => {

      this.responsiblePersons = res;

      console.log(res);

    });
     //responsile list
     this.managementwsiservice.ActivityList().subscribe(data => {
      this.ActivityList = data;

      console.log(data);
    }, err => {
      console.log(err)

    });
  //responsile list
  this.managementwsiservice.statusList().subscribe(data => {
    console.log(data);
  });

  this.managementwsiservice.getAllManagementDocument().subscribe(res => {
    console.log(res);
  });
  }


  buildActivityForm() {
    this.activityForm = this.formBuilder.group({
      activityName: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
  })
}
  ///modalsCreateActivity
  openEditModel(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });


  }
  //modal publish
  openEditModel5(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }
  ///modalEditActivity
  openEditModel2(content, id) {
    //this.planID = this.id;
    // console.log("hey hi");
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

    this.managementwsiservice.getActivityById(id).subscribe(data => {
       console.log(data);
      this.year = data[0].year;
      this.activityName = data[0].activityName;
      this.responsibility = data[0].responsibility;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.status = data[0].status;
      this.comment = data[0].comment;

      this.planID = id;

      //console.log(this.list);
      localStorage.setItem("planID", data[0].planID)
      this.data={
        planID: this.planID,
        activityName: this.activityName,
        responsibility: this.responsibility,
        startDate: this.startDate,
        endDate: this.endDate,
        year: this.year,
        status: this.status,
        comment: this.status
      }


    })

  }
  //update submit button
  updateModal() {
console.log(this.userForm.value);
let relDoc = [];

for (var key in this.responsibility) {

  if (this.responsibility.hasOwnProperty(key)) {

    relDoc.push(this.responsibility[key].responsiblePerson)
    //this.assignedSchool=relDoc[0].institution;
  }

}
console.log(relDoc.toString());
this.responsibility= relDoc.toString(),

console.log(this.responsibility)
this.data = {

  planID: this.planID,
  activityName: this.activityName,
  responsibility:this.responsibility,
  startDate: this.startDate,
  endDate: this.endDate,
  year: this.year,
  status: this.status,
  comment: this.comment

}
console.log(this.data);
    this.managementwsiservice.Activity( this.planID,
     this.activityName,
   this.responsibility,
     this.startDate,
      this.endDate,
    
       this.status,
     this.comment).subscribe(result => {
      console.log(result)
      Swal.fire({
        title: 'New Activity Update?',
        text: "You wanna send this form!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your entry has been saved'
          }).then(result => {
            if (result.value || result.isDismissed) {

              window.location.reload();
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your entry was cancelled:)',
            'error'
          )
        }
      })

    }, err => {
      console.log(err)
    })


  }
  ///end of update submit button

  //comment modal
  openEditModel4(content, id) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    this.managementwsiservice.getActivityById(id).subscribe(data => {
      console.log(data)
      this.planID = id;
      this.year = data[0].year;
      this.activityName = data[0].activityName;
      this.responsibility = data[0].responsibility;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.status = data[0].status;
      this.comment = data[0].comment

      console.log(this.planID)
    
      localStorage.setItem("planID", data[0].planID)

      this.userForm.setValue({
        planID: this.planID,
        activityName: this.activityName,
        responsibility: this.responsibility,
        startDate: this.startDate,
        endDate: this.endDate,
        year: this.year,
        status: this.status,
        comment: this.comment
      })

    })
  }
 
  isActivityNameSelected: boolean;
  //Show and hide 
  selectInput(event) {
   
    let selected =  event.target.value;
    console.log(selected);
    if (selected == "Other") {
      this.isActivityNameSelected = true;
    } else {
      this.isActivityNameSelected = false;
    }
   // this.cdref.detectChanges(); 

  }
  //

  get Form() {
    return this.userForm.controls;
  }

  //

  ///create submit button
  onSubmit() {
    console.log(this.newActityName);

    this.isFormSubmitted = false;

    // this.button1=false;
    let relDoc = [];

    for (var key in this.responsibility) {

      if (this.responsibility.hasOwnProperty(key)) {

        relDoc.push(this.responsibility[key].responsiblePerson)
        //this.assignedSchool=relDoc[0].institution;
      }

    }

  
  

  //

    if (this.userForm.valid) {
        //assign new activity Name
  if(this.newActityName !=null)
  {
    this.activityName=this.newActityName;
    
    this.data= {
      "activityID": 0,
  "activityName": this.newActityName};
    console.log(this.data);
    this.managementwsiservice.addNewActivity(this.data).subscribe(res=>{
       console.log("activity LIst updated")
     });
  }else
  {
    console.log(this.activityName);
    this.activityName=this.activityName;
  
    console.log("activity Name captured")
    console.log(this.activityName);
  }

      this.data = {

        planID: 0,
        activityName: this.activityName,
        responsibility: relDoc.toString(),
        startDate: this.startDate,
        endDate: this.endDate,
        year: this.year,
        status: "Item logged",
        comment: "No Comment"

      }

      this.managementwsiservice.createManagementPlan(this.data).subscribe(res => {
        console.log(res);
        Swal.fire({
          title: 'You Want Add New Activity?',
          text: "You wanna send this form!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              timer: 500,
              position: 'center',
              icon: 'success',
              title: 'Your entry has been saved'
            }).then(result => {

              // this.router.navigate(['/Management-wsi/add-management'])
              if (result.value || result.isDismissed) {
                window.location.reload();

              }
            });

          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
              'Cancelled',
              'Your entry was cancelled:)',
              'error'
            )
          }
        })

      }, err => {
        console.log(err)
      })
      // window.location.reload();


    } else if (this.userForm.invalid) {
      console.log("Activity not created");



    }

    this.isFormSubmitted = true;
    // this.button1=true;
    // console.log(this.showbuttons);

  }
  //end of create submit  button

  ///select check button
  check() {
    Swal.fire({
      title: 'New Activity Update?',
      text: "You wanna send this form!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your entry has been saved'
        }).then(result => {
          if (result.value || result.isDismissed) {

            window.location.reload();
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your entry was cancelled:)',
          'error'
        )
      }
    })

  }
  ///end check button

  //check box by id
  checkboxTicked(iD) {


    this.managementwsiservice.getActivityById(iD).subscribe(data => {
      console.warn(data);
      this.year = data[0].year;
      this.activityName = data[0].activityName;
      this.responsibility = data[0].responsibility;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.status = data[0].status;
      this.comment = data[0].comment;
      this.planID = iD;


      this.data = {
        planID: this.planID,
        activityName: this.activityName,
        responsibility: this.responsibility,
        startDate: this.startDate,
        endDate: this.endDate,
        year: this.year,
        status: "selected",
        comment: this.comment
      }
      console.log( this.data.planID);
      //console.log(this.userForm.value);
      this.managementwsiservice.Activity(this.data.planID,
        this.data.activityName,
        this.data.responsibility,
        this.data.startDate,
        this.data.endDate,
         
        this.data.status,
        this.data.comment).subscribe(result => {

        Swal.fire({

          timer: 5000,

          title: "Confirmation",

          text: 'Item Selected',

          icon: 'success'

        }).then(result => {

          this.modalService.dismissAll();

          if (result.value || result.isDismissed) {

            window.location.reload();

          }

        });
      })
      // window.location.reload();
    })



  }
  //uncheck
  uncheckBox(iD) {


    this.managementwsiservice.getActivityById(iD).subscribe(data => {
      console.warn(data);
      this.year = data[0].year;
      this.activityName = data[0].activityName;
      this.responsibility = data[0].responsibility;
      this.startDate = data[0].startDate;
      this.endDate = data[0].endDate;
      this.status = data[0].status;
      this.comment = data[0].comment;
      this.planID = iD;


      this.data = {
        planID: this.planID,
        activityName: this.activityName,
        responsibility: this.responsibility,
        startDate: this.startDate,
        endDate: this.endDate,
        year: this.year,
        status:"Item logged",
        comment: this.comment
      }
      console.log(this.userForm.value);
      this.managementwsiservice.Activity(this.data.planID,
        this.data.activityName,
        this.data.responsibility,
        this.data.startDate,
        this.data.endDate,
         
        this.data.status,
        this.data.comment).subscribe(result => {

        Swal.fire({

          timer: 5000,

          title: "Confirmation",

          text: 'Item Selected',

          icon: 'success'

        }).then(result => {

          this.modalService.dismissAll();

          if (result.value || result.isDismissed) {

            window.location.reload();

          }

        });
      })
      // window.location.reload();
    })



  }
  
  //checkAll
  
  Submitchecked() {
    //test check//


    let allStatus = this.lis.filter(function (data) {

      return data.status == "selected";

    });

    for (let index = 0; index < allStatus.length; index++) {


      allStatus[index].status = "Pending Approval"

      this.managementwsiservice.updateActivity(allStatus[index]).subscribe(result => {

      })

      Swal.fire({
        title: 'New Activity Update?',
        text: "You wanna send this form!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.isConfirmed) {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your entry has been saved'

          }).then(result => {

            if (result.value || result.isDismissed) {

              window.location.reload();
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your entry was cancelled:)',
            'error'
          )
        }
      })

    }





  }


  //end check box by id


  checkedAll() {
    //test check//


    let allStatus = this.lis.filter(function (data) {

      return data.status =="Item logged";

    });

    for (let index = 0; index < allStatus.length; index++) {


      allStatus[index].status ="selected"

      this.managementwsiservice.updateActivity(allStatus[index]).subscribe(result => {

      })

      Swal.fire({
        title: 'New Activity Update?',
        text: "You wanna send this form!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.isConfirmed) {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your entry has been saved'

          }).then(result => {

            if (result.value || result.isDismissed) {

              window.location.reload();
            }
          });

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your entry was cancelled:)',
            'error'
          )
        }
      })

    }





  }

  
  //submit all for review
  reviewall() {


    for (let index = 0; index < this.lis.length; index++) {


      if (this.lis[index].status === "Item logged") {
        this.lis[index].status = "Pending Approval"
      }
      if (this.lis[index].status === "selected") {
        this.lis[index].status = "Pending Approval"
      }


      console.log(this.lis[index]);
      this.managementwsiservice.updateActivity(this.lis[index]).subscribe(result => {


      })


    }
  }
  SubmitReview() {

    let allStatus = this.lis.filter(function (data) {

      return data.status == "Item logged";

    });

    for (let index = 0; index < allStatus.length; index++) {


      allStatus[index].status = "Pending Approval"

      console.log(allStatus[index]);
      this.managementwsiservice.updateActivity(allStatus[index]).subscribe(result => {

      })


    }
    Swal.fire({
      title: 'New Activity Update?',
      text: "You wanna send this form!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your entry has been saved'
        }).then(result => {
          if (result.value || result.isDismissed) {

            window.location.reload();
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your entry was cancelled:)',
          'error'
        )
      }
    })




  }
  //end submit all for review
  ///disable review
  ticks() {
    let disableButton = this.lis.filter(function (data) {

      return data.status == "Pending Approval";

    });
    if (disableButton.length == this.lis.length && this.lis.length > 0) {
      return false;

    } else {
      return true;
    }




  }
  ///end disable review

  ///disable publish

  
  disableReview(buttondis: any) {
   
    console.log(buttondis[0].status);
    var disableButton = buttondis.filter(data =>

      data.status == "Approve",
     

    );

    if (disableButton.length == 0) {
      this.disable = false;

    } else {
      console.log("false button")
      this.disable = true;
    }


    

  }
  ///end disable publish
  //publish button
  publish() {


    for (let index = 0; index < this.lis.length; index++) {
      this.lis[index].status = "Plan Published"

      this.managementwsiservice.updateActivity(this.lis[index]).subscribe(result => {
        this.documentDateUploaded = this.datePublish;
        this.uploadedBy = this.userinfo;
        this.data = {

          "documentID": 0,
          "documentName": "Management Plan",
          "documentDateUploaded": this.documentDateUploaded,
          "uploadedBy": this.uploadedBy,
          "yearUploaded": "2023"
         }
        console.log(this.documentDateUploaded);
        console.log(this.uploadedBy);
this.managementwsiservice.createManagementDocument(this.data).subscribe(res=>
  {
    console.log("published")
  })

      })


    }
    Swal.fire({
      title: 'New Activity Update?',
      text: "You wanna send this form!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your entry has been saved'
        }).then(result => {
          if (result.value || result.isDismissed) {

            window.location.reload();
          }
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your entry was cancelled:)',
          'error'
        )
      }
    })

  }
 //Modal Create SubActivity
 openEditModel3(content, id) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });

  this.managementPlanActivityId = id;
  this.districtCode=this.districtCode;
    

}


}