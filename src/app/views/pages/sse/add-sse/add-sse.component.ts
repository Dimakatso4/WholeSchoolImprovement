import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SseService } from '../sse.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
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
import { ResultsComponent } from '../../election/results/results.component';



@Component({
  selector: 'app-add-sse-tool',
  templateUrl: './add-sse.component.html',
  styleUrls: ['./add-sse.component.scss'],

})

export class CaptureSSEComponent implements AfterViewInit, OnDestroy, OnInit {

  public userId = this.appService.getLoggedInUserId()
  public areaOfevaluationdata: any;
  public componentData: any;
  public kpiList: any = [];
  public emisNumber;
  public dynamicTable: any;
  public role: any;

  public showOverlay: boolean = true
  public kpiInfo: any;
  public isSSEExists: any;
  public districtCode: any;
  public userRole: any;
  public officeLevel: any;
  public isFormSubmitted: Boolean;
  public districtName: any;
  public IsSSECaptured = false;
  public schoolName: any;
  public isLoading: Boolean;
  public isPageLoading: Boolean;
  public assignedTo: any;
  // public KPICount: any = [];
  public AreaList: any = [];
  public ComponentList: any = [];
  public districtLevel: any;
  public canApprove: Boolean = true;

  public dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  // Dropzone.autoDiscover = false


  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;



  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.sseService.uploadLink, // "https://httpbin.org/post"
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 25,
    uploadMultiple: false,
    acceptedFiles: '.pdf'
  };

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private sseService: SseService,
    // config: NgbModalConfig,
    private appService: AppService
  ) {
    // customize default values of modals used by this component tree
    // config.backdrop = 'static';
    // config.keyboard = false;
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
      ordering: true,
      order: ['0', 'desc']
    }
    // Dropzone.autoDiscover = false;
    // this.config.
    // this.directiveRer
    /*     this.sseService.GetAllKpi(this.userId, this.emisNumber).subscribe((res: any) => {
          this.kpiList = res;
    
        }); */

    this.role = this.appService.getLoggedInUserOfficeLevel();
    this.userRole = this.appService.getLoggedInUserRole();
    this.officeLevel = this.appService.getLoggedInUserOfficeLevel();
    this.isPageLoading = true;


    if (this.appService.getLoggedInUserOfficeLevel() == "School" ||
      this.appService.getLoggedInEmisCode() && this.appService.getLoggedInEmisCode() != "null") {
      this.emisNumber = this.appService.getLoggedInEmisCode();
      this.districtCode = this.appService.getLoggedInDistrictCode();
    } else {
      this.emisNumber = this.getEmisCode();

      if (this.appService.getLoggedInUserOfficeLevel() == "District" ||
        this.appService.getLoggedInDistrictCode() && this.appService.getLoggedInDistrictCode() != "null") {
        this.districtCode = this.appService.getLoggedInDistrictCode();
      } else {
        this.districtCode = this.getDistrictCode();
      }

    }

    if (!this.emisNumber) {
      this.router.navigate(['/sse/school'])
    }

    this.sseService.getSchoolByEmisCode(this.emisNumber).subscribe((res: any) => {
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



    this.sseService.CheckIfSSEExists(this.emisNumber).subscribe((res: any) => {
      console.log(res);

      if (res > 0) {

        // this.isSSEExists = true;
        this.sseService.GetKPISchoolResponseAll(this.emisNumber).subscribe((response: any) => {
          console.log(response);
          this.kpiList = response;

          let areaId = [];
          let component = [];
          // this.KPICount = [];

          for (let x = 0; x < this.kpiList.length; x++) {
            this.kpiList[x].response = this.emptyDropDown(this.kpiList[x].response);
            // this.kpiList[x].managekpiid = this.kpiList[x].kpiid;

            if (x == 0 || !areaId.includes(this.kpiList[x].currentAreaOfEvaluation)) {
              areaId.push(this.kpiList[x].currentAreaOfEvaluation);
              this.AreaList.push(this.kpiList[x]);
            }

            if (x == 0 || !component.includes(this.kpiList[x].currentComponent)) {
              component.push(this.kpiList[x].currentComponent);
              this.ComponentList.push(this.kpiList[x]);
            }

          }


          // counting THE TOTAL

          // for (let x = 0; x < areaId.length; x++) {
          //   this.sseService.GetKPISchoolResponseTotals(areaId[x], this.emisNumber).subscribe((count: any) => {
          //     // console.log(count);

          //     if (count.length > 0) {
          //       let data = {
          //         "currentAreaOfEvaluation": areaId[x],
          //         "focusArea": count[count.length - 1].focusArea,
          //         "completedNumber": count[count.length - 1].completedNumber,
          //         "totalNumber": count[count.length - 1].totalNumber
          //       };

          //       // this.KPICount.push(data);
          //     }


          //   }, err => {
          //     console.log(err);
          //   })

          // }


          // ASSIGN TO SCHOOL
          let itemCreated = this.kpiList.filter(function (data) {
            return data.status == "Created";
          });

          if (itemCreated.length == 0) {
            this.isSSEExists = true;
          }

          let itemsubmitted = this.kpiList.filter(function (data) {
            return data.status == "Created" || data.status == "SSESendForEvidence"
              || data.status == "Send for Evidence" || data.status == "SendForEvidence";
          });


          if (itemsubmitted.length > 0 || !this.isSSEExists) {
            this.assignedTo = "School";
          }

          // ASSIGN TO BUSINESS UNIT HEAD
          let itemlogged = this.kpiList.filter(function (data) {
            return data.status == "SSELogged" || data.status == "SSESendForBUComment";
          });

          if (itemlogged.length > 0 && itemsubmitted.length == 0) {
            this.assignedTo = "District";// BU HEAD
          }


          // ASSIGN TO CIRCUIT MANAGER
          let itemvrified = this.kpiList.filter(function (data) {
            return data.status == "SSEBUApproved" || data.status == "SSESendForCircuitComment";
          });

          if (itemvrified.length > 0) {
            this.assignedTo = "Manager";
          }


          // ASSIGN TO DISTRICT DIRECTOR
          let itemapproved = this.kpiList.filter(function (data) {
            return data.status == "SSEApproved" || data.status == "SIPApproved";
          });

          if (itemapproved.length > 0) {
            this.assignedTo = "Director";
          }


          // SSE FINISHED & PUBLISHED
          let itempublished = this.kpiList.filter(function (data) {
            return data.status == "SSEPublished" || data.status == "SIPPublished";
          });

          if (itempublished.length > 0) {
            this.assignedTo = "Complete";
          }


          // if (itemSubmitted.length > 0 || !this.isSSEExists) {
          //   this.assignedTo = "School";
          // } else {
          //   if(itempublished.length > 0) {
          //     this.assignedTo = "Complete";
          //   } else {
          //     this.assignedTo = "District";
          //   }
          // }

          // console.log(itemSubmitted);
          console.log(this.assignedTo);
          this.isPageLoading = false;

        }, err => {
          this.isPageLoading = false;
        });

      } else {

        this.isSSEExists = false;
        this.sseService.GetAllKpi(this.userId, this.emisNumber).subscribe((response: any) => {
          console.log(response);
          this.kpiList = response;

          let areaId = [];
          let component = [];

          for (let x = 0; x < this.kpiList.length; x++) {
            this.kpiList[x].isSip = false;
            this.kpiList[x].evidence = null;
            this.kpiList[x].evidenceDescription = null;
            this.kpiList[x].schoolComment = null;
            this.kpiList[x].response = "";
            // this.kpiList[x].managekpiid = this.kpiList[x].kpiid;


            if (x == 0 || !areaId.includes(this.kpiList[x].currentAreaOfEvaluation)) {
              areaId.push(this.kpiList[x].currentAreaOfEvaluation);
              this.AreaList.push(this.kpiList[x]);
            }

            if (x == 0 || !component.includes(this.kpiList[x].currentComponent)) {
              component.push(this.kpiList[x].currentComponent);
              this.ComponentList.push(this.kpiList[x]);
            }

          }

          let itemSubmitted = this.kpiList.filter(function (data) {
            return data.status == "SSESendForEvidence" || data.status == "SendForEvidence"
              || data.status == "Send for Evidence";
          });

          if (itemSubmitted.length > 0 || !this.isSSEExists) {
            this.assignedTo = "School";
          } else {
            this.assignedTo = "District";
          }
          this.isPageLoading = false;

          console.log(this.kpiList);
          console.log(this.assignedTo);

        }, err => {
          this.isPageLoading = false;
        });
      }


    });

  }


  onUploadSuccess(event: any, i): void {
    console.log('onUploadSuccess:', event);
    console.log('path:', this.kpiList[i]);
    this.kpiList[i].documentPath = event[1].path;

  }

  test() {
    console.log(this.AreaList);
    console.log(this.ComponentList);
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

  selectKPIInput(event) {

    console.log(event.target.value);

  }

  /////////////// BUTTONS ACTIONED BY SCHOOL  ////////////////////////

  SubmitSSE() {

    let isValid = true;

    let invalidsse = this.kpiList.filter(function (data) {
      return data.ratingID == "1" && !data.cooment;
    });

    if (invalidsse.length == 0) {
      isValid = true
    }

    if (isValid) {

      Swal.fire({
        title: 'Submit SSE?',
        text: 'Once SSE is submitted you will not be able to update the form',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {

          this.isLoading = true;

          // for (let x = 0; x < kpi.length; x++) {

          //   if (kpi[x].ratingID && kpi[x].ratingID != 0 && kpi[x].ratingID != '0'
          //     || kpi[x].status == "Created") {
          //     kpi[x].status = "SSELoggedXXX";
          //   }
          // }

          let kpi = []//this.kpiList;
          for (let x = 0; x < this.kpiList.length; x++) {
            let data = this.kpiList[x];
            // if (data.ratingID && data.ratingID != 0 && data.ratingID != '0') {
            data.status = "SSELogged";
            // }

            kpi.push(data);

          }


          let createSSE = {
            "IsPublishing": false,
            "CompletedJSON": JSON.stringify(kpi),//JSON.stringify(this.kpiList),
            "EmisNumber": this.emisNumber,
            "UserId": this.userId
          };

          console.log(createSSE);
          console.log(kpi);
          // console.log(JSON.stringify(kpi));


          this.sseService.createSSE(createSSE).subscribe((res: any) => {
            console.log(res);
            this.isLoading = false;

            Swal.fire({
              title: "Successful",
              text: 'The SSE has been submitted to the Business Unit Head for review',
              icon: 'success'
            }).then(result => {
              if (result.value || result.isDismissed) {
                window.location.reload();
              }
            });
          }, err => {

            this.isLoading = false;
            Swal.fire(
              'Error!',
              'We apologize there was a problem with submitting your entry, please try again.',
              'error'
            )
          });


        }

      });
    }

    this.isFormSubmitted = true;

  }

  SaveSSE() {

    Swal.fire({
      title: 'Save SSE?',
      text: 'Your progress will only be saved',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;
        this.isFormSubmitted = false;

        let createSSE = {
          "CompletedJSON": JSON.stringify(this.kpiList),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
        };

        console.log(createSSE);
        console.log(this.kpiList);
        // console.log(JSON.stringify(kpi));

        this.sseService.saveSSE(createSSE).subscribe((res: any) => {
          // console.log(res);
          this.isLoading = false;

          Swal.fire({
            title: "Successful",
            text: 'SSE saved',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              // window.location.reload();
            }
          });
        }, err => {

          this.isLoading = false;
          Swal.fire(
            'Error!',
            'We apologize there was a problem with saving your entry, please try again.',
            'error'
          )
        });


      }

    });

  }

  SubmitExistingSSE() {
    let isvalid = true;

    if (isvalid) {

      Swal.fire({
        title: 'Submit Update SSE?',
        text: 'Once SSE is submitted you will not be able to update the form',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {

          this.isLoading = true;

          let kpi = []//this.kpiList;
          for (let x = 0; x < this.kpiList.length; x++) {
            let data = this.kpiList[x];
            // if (data.status == "SendForEvidence" || data.status == "SSESendForEvidence" || data.status == "Send for Evidence") {
            data.status = "SSELogged";
            // }

            kpi.push(data);

          }

          let updateSSE = {
            "IsPublishing": false,
            "CompletedJSON": JSON.stringify(kpi),
            "EmisNumber": this.emisNumber,
            "UserId": this.userId
          };

          console.log(updateSSE);
          console.log(kpi);
          // console.log(JSON.stringify(updateSSE));

          this.sseService.createSSE(updateSSE).subscribe((res: any) => {
            console.log(res);
            this.isLoading = false;

            Swal.fire({
              title: "Successful",
              text: 'The SSE has been submitted to the Business Unit Head for review',
              icon: 'success'
            }).then(result => {
              if (result.value || result.isDismissed) {
                window.location.reload();
              }
            });

          }, err => {
            console.log(err);
            this.isLoading = false;
            Swal.fire(
              'Error!',
              'We apologize there was a problem with submitting your entry, please try again.',
              'error'
            )

          });


        }

      });


    }


    this.isFormSubmitted = true;

  }


  ///////////////////////////////////////////

  DistrictApproveSSE() {

    Swal.fire({
      title: 'Publish SSE?',
      text: 'Are you sure you want to Publish this SSE?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let kpi = []
        for (let x = 0; x < this.kpiList.length; x++) {
          let data = this.kpiList[x];
          data.status = "SSEPublished";
          kpi.push(data);

        }

        let createSSE = {
          "IsPublishing": true,
          "CompletedJSON": JSON.stringify(kpi),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
        };
        console.log(createSSE);
        console.log(kpi);
        // console.log(JSON.stringify(kpi));

        this.sseService.PublishSSE(createSSE).subscribe((res: any) => {
          console.log(res);
          this.isLoading = false;
          this.assignedTo = "USER";
          Swal.fire({
            title: "Successful",
            text: 'The SSE has been published and SIP has been generated',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              window.location.reload();
            }
          });

        }, err => {

          this.isLoading = false;
          Swal.fire(
            'Error!',
            'We apologize there was a problem with submitting your entry, please try again.',
            'error'
          )
        });


      }

    });

  }

  BUApproveSSE() {

    Swal.fire({
      title: 'Verify SSE?',
      text: 'The SSE will verified and submitted to the Circuit Manager for review.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let kpi = []
        for (let x = 0; x < this.kpiList.length; x++) {
          let data = this.kpiList[x];
          // if (data.businessUnit == businessUnit) {
          data.status = "SSEBUApproved";
          kpi.push(data);
          // }
        }

        let createSSE = {
          "IsPublishing": false,
          "CompletedJSON": JSON.stringify(kpi),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
        };

        console.log(createSSE);
        console.log(kpi);
        // console.log(JSON.stringify(kpi));

        this.sseService.createSSE(createSSE).subscribe((res: any) => {
          console.log(res);
          this.isLoading = false;
          this.assignedTo = "USER";

          Swal.fire({
            title: "Successful",
            text: 'The SSE has been verified and submitted to the Circuit Manager for review.',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              window.location.reload();
            }
          });

        }, err => {

          this.isLoading = false;
          Swal.fire(
            'Error!',
            'We apologize there was a problem with submitting your entry, please try again.',
            'error'
          )
        });


      }

    });

  }

  CircuitManagerApproveSSE() {

    Swal.fire({
      title: 'Verify SSE?',
      text: 'The SSE will verified and submitted to the District Director for review.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let kpi = []
        for (let x = 0; x < this.kpiList.length; x++) {
          let data = this.kpiList[x];
          data.status = "SSEApproved";
          kpi.push(data);

        }

        let createSSE = {
          "IsPublishing": false,
          "CompletedJSON": JSON.stringify(kpi),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
        };

        console.log(createSSE);
        console.log(kpi);
        // console.log(JSON.stringify(kpi));

        this.sseService.createSSE(createSSE).subscribe((res: any) => {
          console.log(res);
          this.isLoading = false;
          this.assignedTo = "USER";

          Swal.fire({
            title: "Successful",
            text: 'The SSE has been verified and submitted to the District Ddirector for review.',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              window.location.reload();
            }
          });

        }, err => {

          this.isLoading = false;
          Swal.fire(
            'Error!',
            'We apologize there was a problem with submitting your entry, please try again.',
            'error'
          )
        });


      }

    });

  }

  sendBack(flag) {
    let nextPerson: any;
    let succesMsg: any;

    if (flag == "director") {
      nextPerson = "Circuit Manager";
      succesMsg = "Your comments will be captured and sent back to the Circuit Manager";
    } else if (flag == "manager") {
      nextPerson = "Business Unit Head";
      succesMsg = "Your comments will be captured and sent back to the Business Unit Head";
    } else if (flag == "BU") {
      nextPerson = "School";
      succesMsg = "Your comments will be captured and sent back to the School";
    } else {
      succesMsg = 'Your comments will be captured and sent back'
    }

    Swal.fire({
      title: 'Send Back SSE?',
      text: succesMsg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {

        this.isLoading = true;

        let kpi = [];
        let sendBack = false;
        for (let x = 0; x < this.kpiList.length; x++) {

          let data = this.kpiList[x];
          // if (data.comment && data.businessUnit == businessUnit) {


          if (flag == "director") {
            data.status = "SSESendForCircuitComment";
          } else if (flag == "manager") {
            data.status = "SSESendForBUComment";
          } else if (flag == "BU") {
            data.status = "SSESendForEvidence";
          }

          kpi.push(data);

          if (!sendBack) {
            sendBack = true
          }

          // }

        }


        let updateSSE = {
          "IsPublishing": false,
          "CompletedJSON": JSON.stringify(kpi),
          "EmisNumber": this.emisNumber,
          "UserId": this.userId
        };

        console.log(updateSSE);
        console.log(kpi);

        if (sendBack) {

          this.sseService.createSSE(updateSSE).subscribe((res: any) => {
            console.log(res);
            this.isLoading = false;
            this.assignedTo = "USER";

            Swal.fire({
              title: "Successful",
              text: 'The SSE has been sent back to the ' + nextPerson,
              icon: 'success'
            }).then(result => {
              if (result.value || result.isDismissed) {
                //this.router.navigate(['/disputes/list'])
                window.location.reload();
              }
            });

          }, err => {

            this.isLoading = false;
            Swal.fire(
              'Error!',
              'We apologize there was a problem with submitting your entry, please try again.',
              'error'
            )

          })

        } else {

          // this.sseService.createSSE(updateSSE).subscribe((res: any) => {
          //   console.log(res);
          this.isLoading = false;
          Swal.fire({
            title: "Successful",
            text: 'The SSE has been sent back',
            icon: 'success'
          }).then(result => {
            if (result.value || result.isDismissed) {
              //this.router.navigate(['/disputes/list'])
              window.location.reload();
            }
          });

          // }, err => {

          //   this.isLoading = false;
          //   Swal.fire(
          //     'Error!',
          //     'We apologize there was a problem with submitting your entry, please try again.',
          //     'error'
          //   )

          // })
        }


      }

    });

  }


  getEmisCode() {
    return sessionStorage.getItem("school");
  }

  getDistrictCode() {
    return sessionStorage.getItem("district");
  }

  setEmisCode(code) {
    sessionStorage.setItem("school", code);
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

    } else if (flag == "circuit") {

      this.kpiList[i].managerComment = value;

    } else if (flag == "director") {

      this.kpiList[i].directorComment = value;

    }

  }

  isSubmmitting() {

  }

  isRatingAbove(ratingid, rating) {
    let isRequired = false;

    if (ratingid && rating == "1-5") {
      let id = parseInt(ratingid);

      if (id > 2) {
        isRequired = true;
      }

    }

    return isRequired;
  }

  emptyDropDown(value) {
    let output = value;

    // if (value == "1" || value == "2" || value == "3" || value == "4"
    // || value == "5" || value == "Yes" || value == "No") {
    //   output = value
    // }

    if (value == 0 || value == "0") {
      output = "";
    }

    return output;

  }

  getPercentageCount(id) {
    let result = 0;

    if (id) {

      // let completedObj = this.kpiList.filter(function (data) {
      //   return id == data.currentAreaOfEvaluation && data.response != 0 &&
      //     data.response != "0" && data.ratingID != 0 && data.ratingID != "0";
      // });

      // let totalObj = this.kpiList.filter(function (data) {
      //   return id == data.currentAreaOfEvaluation;
      // });

      let completed = this.getCompletedKPI(id);
      let total = this.getTotalKPI(id);

      let calc = (completed / total) * 100;

      result = parseInt(calc.toFixed(1));

    }


    return result;

  }


  getCompletedKPI(id) {
    let result = 0;

    if (id) {

      let completed = this.kpiList.filter(function (data) {
        return id == data.currentAreaOfEvaluation && data.response != 0 &&
          data.response != "0" && data.ratingID != 0 && data.ratingID != "0";
      });

      result = completed.length;

    }


    return result;

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

  showPerAreaofEvaluation() {
    let show = false;




    return show
  }

  isBUHead(role) {
    let isBU = false;

    if (role == "CES" || role == "ASD" || role == "Deputy Director") {
      isBU = true;
    }

    return isBU

  }


  isCircuitManager(role) {
    let isBU = false;

    if (role == "Circuit Manager" || role == "DCES" || role == "XXX") {
      isBU = true;
    }

    return isBU

  }

  showComment(role, flag) {
    let show = false;

    if (flag == "BU") {
      if (role == "Complete" || role == "Manager" || role == "Director") {
        show = true;
      }
    } else if (flag == "manager") {
      if (role == "Complete" || role == "Director") {
        show = true;
      }
    } else if (flag == "director") {
      if (role == "Complete") {
        show = true;
      }
    }

    return show;
  }


}
