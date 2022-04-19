import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { SipService } from '../sip.service';
import { UsersService } from '../../users/users.service';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import * as moment from 'moment';


declare var $: any;

@Component({
  selector: 'app-list-sip-tool',
  templateUrl: './list-sip.component.html',
  styleUrls: ['./list-sip.component.scss'],

})


export class ListSIPComponent implements AfterViewInit, OnDestroy, OnInit {

  public emisNumber = this.appservice.getLoggedInEmisCode();
  public userId = this.appservice.getLoggedInUserId()
  public kpiInfo;
  public kpiList: any = [];
  public role;
  public isFormSubmitted;
  public kpi;
  public actionPlanList: any = [];
  public allActions: any;

  public areaOfDevelopment;
  public descriptionOfActivities;
  public targetGroup;
  public responsibility;
  public startDate;
  public endDate;
  public resources;
  public comment;
  public kpiId;
  public viewForm: any;
  public districtName: any;
  public schoolName: any;
  public districtReponse: any = [];
  public isLoading: any;
  public isApproved: Boolean;

  public instrumentTool: any
  public dtOptions: DataTables.Settings = {};
  public isPageLoading: Boolean;
  public canAction: Boolean;
  public isLogged: Boolean;
  public progressReport: any;
  public index: any;
  public AreaList: any = [];
  public ComponentList: any = [];
  public assignedToSchool: Boolean;
  public isTableLoading: Boolean;
  public Quarter: any;
  public selectedPlan: Boolean;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private sipService: SipService,
    config: NgbModalConfig,
    private appservice: AppService
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
      ordering: true,
      order: ['0', 'desc']
    }

    let month = moment(new Date()).format("MMM");
    this.sipService.getQuarterByMonth(month).subscribe(res => {
      if (res) {
        this.Quarter = res;
      } else {
        this.Quarter = moment(new Date()).quarter();
      }
    }, err => {
      let quarter = moment(new Date()).quarter();
      this.Quarter = quarter;
    })

    this.userId = this.appservice.getLoggedInUserId();
    this.emisNumber = this.appservice.getLoggedInEmisCode();
    this.role = this.appservice.getLoggedInUserRole();
    this.isPageLoading = true;

    this.sipService.getSchoolByEmisCode(this.emisNumber).subscribe((res: any) => {
      // console.log(res);
      this.districtName = "District Not Found";
      this.schoolName = "School Not Found";
      if (res) {
        this.districtName = res.districtName;
        this.schoolName = res.institutionName;
      }

    }, err => {
      console.log(err);
      this.districtName = "";
      this.schoolName = "";
    });


    if (this.appservice.getLoggedInUserOfficeLevel() == "School" &&
      (this.appservice.getLoggedInEmisCode() || this.appservice.getLoggedInEmisCode() != "null")) {
      this.emisNumber = this.appservice.getLoggedInEmisCode();
      // this.districtCode = this.appservice.getLoggedInDistrictCode();

      this.sipService.GetSSEPublished(this.emisNumber).subscribe((res: any) => {
        console.log(res)
        this.kpiList = res;


        let areaId = [];
        let component = [];
        // this.KPICount = [];

        for (let x = 0; x < this.kpiList.length; x++) {
          // this.kpiList[x].response = this.emptyDropDown(this.kpiList[x].response);

          if (x == 0 || !areaId.includes(this.kpiList[x].currentAreaOfEvaluation)) {
            areaId.push(this.kpiList[x].currentAreaOfEvaluation);
            this.AreaList.push(this.kpiList[x]);
          }

          if (x == 0 || !component.includes(this.kpiList[x].currentComponent)) {
            component.push(this.kpiList[x].currentComponent);
            this.ComponentList.push(this.kpiList[x]);
          }

        }


        let siplogged = this.kpiList.filter(function (data) {
          return data.status === 'SIPLogged';
        });

        if (siplogged.length > 0) {
          this.isLogged = true;
        }

        let response = this.kpiList.filter(function (data) {
          return data.status === 'SendBackSIP' || data.status === 'SSEPublished';
        });

        if (response.length > 0) {
          this.assignedToSchool = true;
        }

        let itemSubmitted = this.kpiList.filter(function (data) {
          return data.status == "SIPPublished" || data.isPrioritise && data.status != 'SendBackSIP';
        });



        this.districtReponse = this.kpiList.filter(function (data) {
          return data.previousAreaOfEvaluation != data.currentAreaOfEvaluation;
        });


        if (itemSubmitted.length > 0) {
          this.viewForm = true;

          let sip = this.kpiList.filter(function (data) {
            return data.isPrioritise;
          });

          this.kpiList = sip;

        } else {
          this.viewForm = false;
        }

        let sippublished = this.kpiList.filter(function (data) {
          return data.status === 'SIPPublished';
        });


        if (sippublished.length > 0) {
          this.canAction = true;
        }
        // kpiList[i].status === 'SendBackSIP' || 



        // let sippublished = this.kpiList.filter(function (data) {
        //   return data.status === 'SIPPublished';
        // });


        // if (sippublished.length > 0) {
        //   this.canAction = true;
        // }



        this.isPageLoading = false;


      }, err => {
        this.isPageLoading = false;
      });

      /* this.sipService.GetSIPLogged(this.emisNumber).subscribe((res: any) => {
       this.kpiList = res;
     }); 

     this.sipService.GetSIPPublished(this.emisNumber).subscribe((res: any) => {
       this.kpiList = res;
     }); */

    }

  }

  getEmisCode() {
    return sessionStorage.getItem("school");
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  SubmitUpdate() {

    Swal.fire({
      title: 'Submit SIP?',
      text: 'Are you sure you want to submit this SIP to the district?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let updateSIPUpdate = {
          "CompletedJSON": JSON.stringify(this.kpiList),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
          // "IsPublishing": false,
          // "Status": "SIPLogged"
        };

        console.log(updateSIPUpdate);
        console.log(this.kpiList);

        this.sipService.SIPLogged(updateSIPUpdate).subscribe((res: any) => {
          console.log(res);
          this.isLoading = false;

          Swal.fire({
            title: "Successful",
            text: 'The SIP has been submitted to the district for review',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              //this.router.navigate(['/disputes/list'])
              window.location.reload();
            }
          });

        }, err => {
          this.isLoading = false;
        });


      }

    });

  }

  openCreatePlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    console.log(this.kpi);
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.descriptionOfActivities = null;
      this.targetGroup = null;
      this.responsibility = null;
      this.startDate = null;
      this.endDate = null;
      this.resources = null;
      this.comment = null;

    }).
      catch((res) => {
      });

  }


  openViewPlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    this.actionPlanList = [];
    this.allActions = [];
    this.isTableLoading = true;

    console.log(this.kpiList[i]);
    this.sipService.GetActionPlansByEmisNumber(this.emisNumber, this.kpiList[i].schoolKPIID).subscribe((res: any) => {
      this.actionPlanList = res;
      this.allActions = res;
      this.isTableLoading = false;
      console.log(this.actionPlanList);
    }, err => {
      this.isTableLoading = false;
    });

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  onCheckedCompletedChanged(content, event, actionPlan, i) {
    let selected = event.target.checked;

    if (selected) {

      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        console.log("Modal closed" + result);

      }).
        catch((res) => {
        });

    }
    console.log(selected);
    this.actionPlanList[i].isCompleted = selected;
  }

  isComplete() {

  }


  onStatusChangeChanged(event, i) {
    let selected = event.target.checked;
    console.log(selected);
    if (selected)
      this.actionPlanList[i].status = 'Approved';
    else
      this.actionPlanList[i].status = null;
  }


  CreateActionPlan() {
    Swal.fire({
      title: 'Add Action Plan?',
      text: 'Action plan will be added',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {
          this.isLoading = true;
          let quarter;

          let actionPlan = {
            "areaOfDevelopment": this.kpi.focusArea,
            "descriptionOfActivities": this.descriptionOfActivities,
            "targetGroup": this.targetGroup,
            "responsibility": this.responsibility,
            "startDate": this.startDate,
            "finishDate": this.endDate,
            "resources": this.resources,
            "comment": this.comment,
            "kpiId": this.kpi.schoolKPIID,
            "quarter": quarter,
            "emisNumber": this.emisNumber
          };
          console.log(actionPlan);
          this.sipService.createActionPlan(actionPlan).subscribe(res => {
            console.log(res);

            this.isLoading = false;
            Swal.fire({
              timer: 8000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'Action Plan added',
              icon: 'success'
            }).then(result => {

              if (result.value || result.isDismissed) {
                this.modalService.dismissAll();
                this.descriptionOfActivities = null;
                this.targetGroup = null;
                this.responsibility = null;
                this.startDate = null;
                this.endDate = null;
                this.resources = null;
                this.comment = null;
              }
            });

          }, err => {
            this.isLoading = false;
            Swal.fire({
              title: "Error",
              text: 'Error with creating plan, please try again',
              icon: 'error'
            })
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


  SubmitIntervention() {

    Swal.fire({
      title: 'Publish Progress Report?',
      text: 'Are you sure you want to submit the progress report to the district?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let updateSIPIntervention = {
          "CompletedJSON": JSON.stringify(this.actionPlanList),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId,
          "Status": "SIPActionPlanPublished"
        };


        console.log(this.actionPlanList);
        this.sipService.submitSIPtoDistrict(updateSIPIntervention).subscribe((res: any) => {
          console.log(res);
          this.isLoading = false;
          Swal.fire({
            title: "Successful",
            text: 'Progress report has been submitted to the district for review',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              //this.router.navigate(['/disputes/list']);
              this.modalService.dismissAll();
            }
          });

        }, err => {
          this.isLoading = false;
          Swal.fire({
            title: "Error",
            text: 'Error with creating plan, please try again',
            icon: 'error'
          })
        });


      }

    });

  }

  OnIsPrioritiseSelected(event, i) {
    let selected = event.target.checked;
    this.kpiList[i].isPrioritise = selected;
    // console.log(this.kpiList[i])
  }

  completePlan(event, actionPlan, content, i) {
    console.log(actionPlan);

    let selected = true//event.target.checked;


    if (selected) {

      this.modalService.open(content, { size: 'lg' }).result.then((result) => {
        console.log("Modal closed" + result);
      }).catch((res) => {
      });


      // this.actionPlanList[i].isCompleted = selected;
      this.index = i;


    }
    // console.log(selected);

  }

  saveReport() {

    this.actionPlanList[this.index].progressPerQuarter = this.progressReport;
    let quarter = moment(new Date()).quarter();

    if (quarter == 1) {
      this.actionPlanList[this.index].progressPerQuarter1 = this.progressReport;
    } else if (quarter == 2) {
      this.actionPlanList[this.index].progressPerQuarter2 = this.progressReport;
    } else if (quarter == 3) {
      this.actionPlanList[this.index].progressPerQuarter3 = this.progressReport;
    }

    let actionPlan = {
      "sipActionId": this.actionPlanList[this.index].sipActionId,
      "quarter": quarter,
      "progressPerQuarter": this.progressReport,
      "isCompleted": this.actionPlanList[this.index].isCompleted,
      "isApproved": this.actionPlanList[this.index].isApproved
    }

    // {
    //   "areaOfDevelopment": this.actionPlanList[this.index].areaOfDevelopment,
    //   "calculateValue": this.actionPlanList[this.index].calculateValue,
    //   "comment": this.actionPlanList[this.index].comment,
    //   "completedJSON": this.actionPlanList[this.index].completedJSON,
    //   "descriptionOfActivities": this.actionPlanList[this.index].descriptionOfActivities,
    //   "districtCode": this.actionPlanList[this.index].districtCode,
    //   "emisNumber": this.actionPlanList[this.index].emisNumber,
    //   "finishDate": this.actionPlanList[this.index].finishDate,
    //   "isApproved": this.actionPlanList[this.index].isApproved,
    //   "isCompleted": this.actionPlanList[this.index].isCompleted,
    //   "kpiid": this.actionPlanList[this.index].kpiid,
    //   "progressPerQuarter": this.progressReport,
    //   "quarter": this.actionPlanList[this.index].quarter,
    //   "resources": this.actionPlanList[this.index].resources,
    //   "responsibility": this.actionPlanList[this.index].responsibility,
    //   "schoolId": this.actionPlanList[this.index].schoolId,
    //   "score": this.actionPlanList[this.index].score,
    //   "sipActionId": this.actionPlanList[this.index].sipActionId,
    //   "sipClusterComments": this.actionPlanList[this.index].sipClusterComments,
    //   "startDate": this.actionPlanList[this.index].startDate,
    //   "status": this.actionPlanList[this.index].status,
    //   "targetGroup": this.actionPlanList[this.index].targetGroup,
    //   "userId": this.actionPlanList[this.index].userId

    // };
    console.log(actionPlan);
    // console.log(JSON.stringify(actionPlan));
    this.sipService.UpdateSIPActionPlanProgress(actionPlan).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    });

    this.progressReport = null;
  }


  submitReport(content) {


    if (this.progressReport) {
      console.log(this.progressReport);
      this.actionPlanList[this.index].progressPerQuarter = this.progressReport;


      this.actionPlanList[this.index].isCompleted = true;
      let quarter = moment(new Date()).quarter();


      if (quarter == 1) {
        this.actionPlanList[this.index].progressPerQuarter1 = this.progressReport;
      } else if (quarter == 2) {
        this.actionPlanList[this.index].progressPerQuarter2 = this.progressReport;
      } else if (quarter == 3) {
        this.actionPlanList[this.index].progressPerQuarter3 = this.progressReport;
      }

      let actionPlan = {
        "sipActionId": this.actionPlanList[this.index].sipActionId,
        "quarter": quarter,
        "progressPerQuarter": this.progressReport,
        "isCompleted": true,
        "isApproved": this.actionPlanList[this.index].isApproved
      }

      // {Quarter
      //   "areaOfDevelopment": this.actionPlanList[this.index].areaOfDevelopment,
      //   "calculateValue": this.actionPlanList[this.index].calculateValue,
      //   "comment": this.actionPlanList[this.index].comment,
      //   "completedJSON": this.actionPlanList[this.index].completedJSON,
      //   "descriptionOfActivities": this.actionPlanList[this.index].descriptionOfActivities,
      //   "districtCode": this.actionPlanList[this.index].districtCode,
      //   "emisNumber": this.actionPlanList[this.index].emisNumber,
      //   "finishDate": this.actionPlanList[this.index].finishDate,
      //   "isApproved": this.actionPlanList[this.index].isApproved,
      //   "isCompleted": this.actionPlanList[this.index].isCompleted,
      //   "kpiid": this.actionPlanList[this.index].kpiid,
      //   "progressPerQuarter": this.progressReport,
      //   "quarter": this.actionPlanList[this.index].quarter,
      //   "resources": this.actionPlanList[this.index].resources,
      //   "responsibility": this.actionPlanList[this.index].responsibility,
      //   "schoolId": this.actionPlanList[this.index].schoolId,
      //   "score": this.actionPlanList[this.index].score,
      //   "sipActionId": this.actionPlanList[this.index].sipActionId,
      //   "sipClusterComments": this.actionPlanList[this.index].sipClusterComments,
      //   "startDate": this.actionPlanList[this.index].startDate,
      //   "status": this.actionPlanList[this.index].status,
      //   "targetGroup": this.actionPlanList[this.index].targetGroup,
      //   "userId": this.actionPlanList[this.index].userId

      // };
      console.log(actionPlan);
      this.sipService.UpdateSIPActionPlanProgress(actionPlan).subscribe(res => {
        console.log(res);

      }, err => {
        console.log(err);

      });

    }

  }

  untickBox(i) {
    this.actionPlanList[i].isCompleted = false;
    this.actionPlanList[i].ticked = true;
  }

  tickBox(content, event, i) {

    let selected = event//.target.checked;
    this.index = i;
    this.selectedPlan = this.actionPlanList[i];

    if (!selected) {
      // this.actionPlanList[i].isCompleted = true;
      this.progressReport = this.actionPlanList[this.index].progressPerQuarter
        ? this.actionPlanList[this.index].progressPerQuarter
        : this.getCurrentProgressReport(this.actionPlanList[this.index], this.Quarter)


      // this.actionPlanList[this.index].progressPerQuarter = this.progressReport;

      this.modalService.open(content, { size: 'md' }).result.then((result) => {
        console.log("Modal closed" + result);
      }).catch((res) => {
      });


    } else {
      this.actionPlanList[i].isCompleted = false;

    }

    console.log(this.actionPlanList[i]);
  }

  viewProgressReport(content, i) {

    //let selected = event//.target.checked;
    this.index = i;
    this.progressReport = this.actionPlanList[i].progressPerQuarter;
    this.isApproved = this.actionPlanList[i].isApproved;

    this.modalService.open(content, { size: 'md' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
    });
    console.log(this.actionPlanList[i]);
  }


  updateComment(flag, comment, i) {

    let value = comment.target.value

    if (flag == "school") {

      this.kpiList[i].schoolComment = value;

    } else if (flag == "district") {

      this.kpiList[i].comment = value;

    } else if (flag == "evidence") {

      this.kpiList[i].evidence = value;
      this.kpiList[i].evidenceDescription = value;

    } else if (flag == "response") {

      this.kpiList[i].ratingID = value;
      this.kpiList[i].response = value;

    } else if (flag == "exception") {

      this.kpiList[i].isSip = value;

    } else if (flag == "sipcomment") {

      this.kpiList[i].sipClusterComments = value;

    }

  }


  getTotalKPI(id) {
    let result = 0;

    if (id) {

      let total = this.kpiList.filter(function (data) {
        return id == data.currentAreaOfEvaluation;
      });

      result = total.length;

    }

    return result;

  }

  getTotalComponent(id) {
    let result = 0;

    if (id) {

      let total = this.kpiList.filter(function (data) {
        return id == data.currentComponent;
      });

      result = total.length;

    }

    return result;

  }

  getCurrentQuarter(month) {
    let quarter = 0;

    if (month) {
      if (month <= 3) {
        quarter = 1;
      } else if (month >= 3 && month <= 6) {
        quarter = 2;
      } else if (month >= 7 && month <= 9) {
        quarter = 3;
      } else if (month >= 10 && month <= 12) {
        quarter = 4;
      }

    }

    return quarter;
  }

  getCurrentProgressReport(plan, Quarter) {
    let report = null;

    if (Quarter == 1) {
      report = plan.progressPerQuarter1;
    } else if (Quarter == 2) {
      report = plan.progressPerQuarter2;
    } else if (Quarter == 3) {
      report = plan.progressPerQuarter3;
    }

    return report;

  }


  getCompleted(plan) {
    let Quarter = this.Quarter;

    if (plan) {

      if (plan.isCompleted && plan.progressPerQuarter1 &&
        !plan.progressPerQuarter2 && !plan.progressPerQuarter3) {
        Quarter = 1;
      } else if (plan.isCompleted && plan.progressPerQuarter2 && !plan.progressPerQuarter3) {
        Quarter = 2;
      } else if (plan.isCompleted && plan.progressPerQuarter3) {
        Quarter = 3;
      }
    }

    return Quarter;

  }

}