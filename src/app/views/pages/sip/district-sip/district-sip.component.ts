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



declare var $: any;

@Component({
  selector: 'app-district-sip',
  templateUrl: './district-sip.component.html',
  styleUrls: ['./district-sip.component.scss'],

})


export class ListDistrictSIPComponent implements AfterViewInit, OnDestroy, OnInit {

  public emisNumber = this.appservice.getLoggedInEmisCode();
  public userId = this.appservice.getLoggedInUserId()
  public kpiInfo;
  public kpiList: any = [];
  public role;
  public isFormSubmitted;
  public kpi;
  public actionPlanList: any = [];
  public selectedScore;

  public areaOfDevelopment;
  public descriptionOfActivities;
  public targetGroup;
  public responsibility;
  public startDate;
  public endDate;
  public resources;
  public comment;
  public kpiId;
  public isComlpete: Boolean;
  public isLoading: Boolean;
  public officeLevel: any;
  public AreaList: any = [];
  public ComponentList: any = [];
  public progressReport: any;
  public isTableLoading: Boolean;
  public scoreSum: any = [];

  public instrumentTool: any
  public dtOptions: DataTables.Settings = {};
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

  public schoolName: any;
  public districtName: any;
  public districtReponse: any = [];
  public isPageLoading: Boolean;
  public canAction: Boolean;
  public sipLogged: Boolean;
  public allActionPlanList: any = [];


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      order: ['0', 'desc']
    }


    this.userId = this.appservice.getLoggedInUserId();
    this.role = this.appservice.getLoggedInUserRole();
    this.officeLevel = this.appservice.getLoggedInUserOfficeLevel();
    this.emisNumber = this.getEmisCode();
    this.isPageLoading = true;
    this.canAction = false;


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

    this.sipService.GetDistrictSIP(this.emisNumber).subscribe((res: any) => {
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

      this.districtReponse = this.kpiList.filter(function (data) {
        return data.previousAreaOfEvaluation != data.currentAreaOfEvaluation;
      });

      let sippublished = this.kpiList.filter(function (data) {
        return data.status === 'SIPPublished';
      });

      if (sippublished.length > 0) {
        this.canAction = true;
      }

      let siplogged = this.kpiList.filter(function (data) {
        return data.isPrioritise;
      });

      if (siplogged.length > 0) {
        this.sipLogged = true;
      }

      this.isPageLoading = false;

    }, err => {

      this.isPageLoading = false;
    });

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
      title: 'Submit SIP Updates?',
      text: 'Are you sure you want to Submit this SIP updates to the District?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        let updateSIPUpdate = {
          "CompletedJSON": JSON.stringify(this.kpiList),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId,
          "Status": "SIPLogged"
        };
        console.log(JSON.stringify(this.kpiList[0]));
        this.sipService.submitSIPtoDistrict(updateSIPUpdate).subscribe((res: any) => {
          console.log(res);

        });

        Swal.fire({
          title: "Successful",
          text: 'The SIP updates has been submitted to the district for review',
          icon: 'success'
        }).then(result => {
          if (result.value || result.isDismissed) {
            //this.router.navigate(['/disputes/list'])
          }
        });

      }

    });

  }

  SendToSchoolUpdate() {

    Swal.fire({
      title: 'Send SIP Updates to School?',
      text: 'Are you sure you want to Submit SIP updates to the School?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        let updateSIPUpdate = {
          "CompletedJSON": JSON.stringify(this.kpiList),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId,
          "Status": "SendForEvidence"
        };
        console.log(JSON.stringify(this.kpiList[0]));
        this.sipService.submitSIPtoSchool(updateSIPUpdate).subscribe((res: any) => {
          console.log(res);

        });

        Swal.fire({
          title: "Successful",
          text: 'The SIP updates has been submitted to the school for review',
          icon: 'success'
        }).then(result => {
          if (result.value || result.isDismissed) {
            //this.router.navigate(['/disputes/list'])
          }
        });

      }

    });
  }

  PublishSIP() {

    Swal.fire({
      title: 'Publish SIP to School?',
      text: 'Are you sure you want to Submit SIP to the Schools?',
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
          "UserId": this.userId,
          "Status": "SIPPublished"
        };
        console.log(updateSIPUpdate);
        console.log(this.kpiList);
        this.sipService.publishSIPtoSchool(updateSIPUpdate).subscribe((res: any) => {
          console.log(res);

          this.isLoading = false;
          Swal.fire({
            title: "Successful",
            text: 'The SIP has been published to the school',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              //this.router.navigate(['/disputes/list'])
              window.location.reload();
            }
          });

        }, err => {
          this.isLoading = true;
        });

      }

    });
  }


  openCreatePlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  openCalculateScorePlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    console.log("openCalculateScorePlanModal " + this.kpi);
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  openViewPlanModal(content, i) {
    this.isFormSubmitted = false;
    this.kpi = this.kpiList[i];
    this.actionPlanList = [];
    this.allActionPlanList = [];
    this.isComlpete = false;
    this.isTableLoading = true;

    console.log(this.kpiList[i].schoolKPIID);
    this.sipService.GetActionPlansByEmisNumber(this.emisNumber, this.kpiList[i].schoolKPIID).subscribe((res: any) => {
      this.actionPlanList = res;
      this.allActionPlanList = res;

      let completed = this.actionPlanList.filter(function (data) {
        return data.isCompleted;
      });

      if (completed.length > 0) {
        this.isComlpete = true;
      }

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

  onCheckedCompletedChanged(event, i) {
    let selected = event.target.checked;
    console.log(selected);
    this.actionPlanList[i].isCompleted = selected;
  }

  approvePlan(event, i) {
    let selected = event.target.checked;
    console.log(selected);
    this.actionPlanList[i].isCompleted = selected;
  }

  onStatusChangeChanged(event, i) {
    let selected = event.target.checked;
    console.log(selected);
    if (selected)
      this.actionPlanList[i].status = 'Approved';
    else
      this.actionPlanList[i].status = null;
  }

  onScoreChangeChanged(event, i) {
    let selected = event.target.value;
    console.log(selected);
    this.selectedScore = selected;

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
            "kpiId": this.kpi.kpiid,
            "emisNumber": this.emisNumber
          };
          console.log(actionPlan);
          this.sipService.createActionPlan(actionPlan).subscribe(res => {
            console.log(res);
            console.log("sucess");
          });



          Swal.fire({
            timer: 8000,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'An Action Plan was created',
            icon: 'success'
          }).then(result => {

            if (result.value || result.isDismissed) {
              //window.location.reload()
              this.modalService.dismissAll();
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


  SubmitIntervention() {

    Swal.fire({
      title: 'Publish SIP Intervention?',
      text: 'Are you sure you want to Submit this SIP Intervention to the District?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        /*         let updateSIPIntervention = {
                  "KpiId": false,
                  "CompletedJSON": JSON.stringify(this.kpiList),
                  "EmisNumber": this.emisNumber,
                  "UserId": this.userId
                }; */

        //this.openCalculateScorePlanModal();
        console.log(JSON.stringify(this.actionPlanList[0]));
        /* this.sipService.submitSIPtoDistrict(updateSIPIntervention).subscribe((res: any) => {
          console.log(res);

        }); */

        Swal.fire({
          title: "Successful",
          text: 'The SIP Intervention has been submitted to the district for review',
          icon: 'success'
        }).then(result => {
          if (result.value || result.isDismissed) {
            //this.router.navigate(['/disputes/list'])
            this.modalService.dismissAll();
          }
        });

      }

    });

  }

  UpdateScore(index) {
    let isValid = true;

    if (isValid) {

      Swal.fire({
        title: 'Adjust School Rating?',
        text: 'Are you sure you want to adjust the school rating?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {

          this.isLoading = true;
          //console.log(JSON.stringify(this.kpi));

          //this.openCalculateScorePlanModal("CalculateScoreModal", this.kpi);

          let sum = 0

          // for (let x = 0; x < this.scoreSum.length; x++) {
          //   let data = parseFloat(this.scoreSum[x]);
          //   sum = sum + data;
          // }isFlaged
          let test = [];
          for (let x = 0; x < this.actionPlanList.length; x++) {
            let data = this.actionPlanList[x];
            if (data.isFlaged) {
              sum = sum + parseFloat(data.score)
            }
            let arra = {
              "sipActionId": this.actionPlanList[x].sipActionId,
              "comment": this.actionPlanList[x].comment,
              "isCompleted": this.actionPlanList[x].isCompleted,
              "isApproved": this.actionPlanList[x].isApproved
            }
            test.push(arra)
          }

          // console.log(parseFloat(sum.toFixed(2)));
          // console.log(this.scoreSum);
          console.log(this.actionPlanList);




          var sipActionModel = {
            "SchoolKPIID": this.kpi.id,
            "Score": parseFloat(sum.toFixed(2)),
            "UserId": this.userId
          }

          let data = { "CompletedJSON": JSON.stringify(test) }

          // {
          //   "sipActionId": 0,
          //   "comment": "string",
          //   "isCompleted": true
          // }

          console.log(sipActionModel);
          console.log(data);

          this.sipService.UpdateSchoolRating(sipActionModel).subscribe((res: any) => {
            console.log(res);

            this.sipService.UpdateSipActionPlanAll(data).subscribe(sub => {
              console.log(sub)
              this.isLoading = false;
              Swal.fire({
                title: "Successful",
                text: 'School rating adjusted',
                icon: 'success'
              }).then(result => {
                if (result.value || result.isDismissed) {
                  window.location.reload();
                  this.modalService.dismissAll();
                }
              });

            }, err => {
              console.log(err);
              this.isLoading = false;

              Swal.fire({
                timer: 5000,
                title: "Error",
                text: 'Your entry was unsuccessful, please try again',
                icon: 'error'
              });
            })


          }, err => {
            console.log(err);
            this.isLoading = false;

            Swal.fire({
              timer: 5000,
              title: "Error",
              text: 'Your entry was unsuccessful, please try again',
              icon: 'error'
            });
          });


        }

      });
    }

  }

  SubmitActionPlan() {
    Swal.fire({
      title: 'Adjust School Score?',
      text: 'Are you sure you want to adjust the school score?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {


        console.log(JSON.stringify(this.kpi));

        var sipActionModel = { "KPIID": this.kpi.id, "EmisNumber": this.emisNumber, "Score": this.kpi.score, "UserId": this.userId }
        console.log(sipActionModel);
        this.sipService.UpdateSchoolRating(sipActionModel).subscribe((res: any) => {
          console.log(res);

        });

        Swal.fire({
          title: "Successful",
          text: 'The School Score adjusted',
          icon: 'success'
        }).then(result => {
          if (result.value || result.isDismissed) {
            //this.router.navigate(['/disputes/list'])
          }
        });

      }

    });
  }

  OnIsPrioritiseSelected(event, i) {
    let selected = event.target.checked;
    this.kpiList[i].IsPrioritise = selected;
  }


  updateComment(flag, comment, i) {

    let value = comment.target.value

    if (flag == "comment") {

      this.actionPlanList[i].comment = value;

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

    } else if (flag == "score") {

      this.actionPlanList[i].score = value;
      this.actionPlanList[i].isFlaged = true;
      // this.scoreSum[i] = value;
      this.scoreSum.push(value);

    }

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

  viewProgressReport(content, i) {
    this.progressReport = null;
    this.progressReport = this.actionPlanList[i].progressPerQuarter

    this.modalService.open(content, { size: 'md' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {
    });
    console.log(this.actionPlanList[i]);
  }


  sendBack() {

    Swal.fire({
      title: 'Send Back Comment?',
      text: 'Send your comments back to the school?',
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
          "UserId": this.userId,
          "Status": "SIPLogged"// "SendBackSIP"
        };

        console.log(updateSIPUpdate);
        console.log(this.kpiList);

        this.sipService.publishSIPtoSchool(updateSIPUpdate).subscribe((res: any) => {
          // console.log(res);

          this.isLoading = false;
          Swal.fire({
            title: "Successful",
            text: 'Comment sent back to school',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              //this.router.navigate(['/disputes/list'])
              // window.location.reload();
            }
          });

        }, err => {
          this.isLoading = false;
          console.log(err)
          Swal.fire({
            title: "Error",
            text: 'Error with sending back your comment, please try again',
            icon: 'error'
          })
        });


      }

    });

  }

  isSIPSentBack() {

    let flag = false;


    if (this.kpiList) {
      let sippublished = this.kpiList.filter(function (data) {
        return data.status === 'SIPSendBack';
      });


      if (sippublished.length > 0) {
        flag = true;
      }

    }

    return flag;

  }

  getQuarter() {
    return "Quarter 1"
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

  getScore(score) {
    let ourput = null;

    if (score == "0.2" || score == 0.2) {
      ourput = "0% - 10%";
    } else if (score == "0.3" || score == 0.3) {
      ourput = "20% - 39%";
    } else if (score == "0.4" || score == 0.4) {
      ourput = "40% - 59%";
    } else if (score == "0.6" || score == 0.6) {
      ourput = "60% - 79%";
    } else if (score == "0.8" || score == 0.8) {
      ourput = "80% - 89%";
    } else if (score == "1" || score == 1) {
      ourput = "90% - 100%";
    }

    return ourput;
  }


}