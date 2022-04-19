import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { getLocaleDateTimeFormat } from '@angular/common';
import { HandOverService } from '../handover.service';
import {AppService} from '../../../../app.service';
import { UsersService } from '../../users/users.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  
  public schoolname: any;
  public emisNumber: any;
  public districtName: any;  
  public electionResultsId: any;
  public documentList: any = [];
  public emisCode:any = this.appService.getLoggedInEmisCode();
  public districtCode = this.appService.getLoggedInDistrictCode();
  public todaysDate:  any =  this.toISOLocal(new Date())
  public timeDate: any;
  public handoverUploadDate:any;
  public newHandover:any;
  public handoverID:any;
  userRole: any;
  newDocs: any = {};
  docsTitle: any;
  userId;
  handOver: any;
  docPath;
  uploadEvent: any;
  selectedReport: any;

  reportType: any;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('basicModal') basicModal: any;
  
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: null,
    uploadMultiple: false,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  basicModalCloseResult: string = '';
  noRecordsElection: Boolean;

  constructor(private modalService: NgbModal, 
              private activeModal: NgbActiveModal, 
              private router: Router,
              private http: HttpClient, 
              private handOverService: HandOverService, 
              private userservice:UsersService,
              private appService: AppService) { }

  ngOnInit(): void {

    this.emisNumber = this.appService.getLoggedInEmisCode(); 
    this.userId = this.appService.getLoggedInUserId(); 
    this.userRole = this.appService.getLoggedInUserRole();
    this.handOverService.getHandoverBySchool(this.emisNumber).subscribe((res: any) => {
     console.log(JSON.stringify(res))
      this.handOver = res;
      if (this.handOver.length > 0) {
        // this.isUploadShown = true ; 
        console.log(this.handOver);
        this.schoolname = this.handOver[0].schoolName;
        this.districtCode = this.handOver[0].districtCode;
        this.districtName= this.handOver[0].districtName;
        this.electionResultsId = this.handOver[0].id;
        this.handoverID =  this.handOver[0].id;

        this.handOverService.getElectionDocsEmis(this.emisNumber).subscribe((res: any) => {
          this.documentList = res;
        });
      }
    });

    this.userservice.getSchoolByEmisNumber(this.emisCode).subscribe((res: any) => {
      this.schoolname = res[0].institutionName
    });

    this.userservice.getDistrictByCode(this.districtCode).subscribe((res: any) => {
      this.districtName =  res.districtName;
    });
  }

  toISOLocal(d) {
    var z  = n =>  ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0? '+' : '-';
    off = Math.abs(off);
  
    return d.getFullYear() + '-'
           + z(d.getMonth()+1) + '-' +
           z(d.getDate()) + 'T' +
           z(d.getHours()) + ':'  + 
           z(d.getMinutes())     
  }  

   openBasicModal(content) {
     this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onAddedFile(event:any): void {
    Swal.fire({
      title: 'Are you sure you want to submit this handover?',
      text: 'Your handover will be processed',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    })
  }

  onComplete(event:any): void {

    this.openBasicModal(this.basicModal);
    console.log('onAddedFile:', event);
    this.uploadEvent = event;

    // this.onUploadSuccess(event);
  }

  public handOverDocuments =[]
  onUpload(event: any): void{
    // this.basicModal.hide();
    // this.closeAddExpenseModal.nativeElement.click();
    // this.modal.close('by: close button');
    this.activeModal.close();
    this.selectedReport = this.reportType;
    console.log('onUploadSuccess:', this.uploadEvent);
    // this.docPath = event[1].path;
    this.docPath =  this.uploadEvent[1].path;
    console.log(this.docPath);
    var index = this.docPath.lastIndexOf( "/" );
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi; 
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;
    
    this.newDocs = {
      "title": this.docsTitle,
      "documentTypeId": 1,
      "documentPath": this.docPath,
      "uploadedBy": this.userId,
      "emisCode": this.emisNumber,
      "schoolName" : this.schoolname,
      "districtCode" : this.districtCode,
      "districtName" : this.districtName,
      "reportType" : this.selectedReport
    }
    this.handOverDocuments.push(this.newDocs)
    console.log(JSON.stringify(this.newDocs))

    this.handOverService.saveHandoverDocs(this.newDocs).subscribe(res => {
      console.log(res)
      //alert(res)
      console.log(JSON.stringify(this.newDocs));
      Swal.fire(
        'Confirmation!',
        'Handover saved.',
        'success'
      )

    }, err => {
      console.log(err)
    })
    location.reload();
  }

  resetDropzoneUploads() {

  }
  
  saveHandoverData() {
      Swal.fire({
        title: 'Save Handover?',
        text: 'Are you sure you want to save this Handover?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) { 
          this.newHandover = {
                "id": this.handoverID,
                "schoolName": this.schoolname,
                "emisNumber":  this.emisNumber,
                "districtCode": this.districtCode,
                "districtName": this.districtName,
                "electionResultsId": 0,
                "legislation1SouthAfricanSchoolAct": false,
                "legislation2ProvincialEducationAct": false,
                "legislation3GoverningBodiesOfPublicSchools": false,
                "legislation4GeneralNotice869of2006": false,
                "legislation5MisconductOfLearners": false,
                "legislation6GeneralNotice1149of2006": false,
                "legislation7GoverningBodiesOfPublicSchools": false,
                "legislation8ConstitutionOfSGB": false,
                "legislation9ProvincialCodeOfConductForSGBs": false,
                "legislation10VisionAndMissionStatement": false,
                "legislation11ActionPlansForFollowingYear": false,
                "policies1Admission": false,
                "policies2SchoolSportAndCulturalActivities": false,
                "policies3UseOfSchoolBuildingsAndFacilities": false,
                "policies4OccupationalHealthAndSafety": false,
                "policies5Religion": false,
                "policies6Language": false,
                "policies7HIVandAIDS": false,
                "policies8CodeOfConductForLearners": false,
                "policies9PaymentOfSchoolFeesAndSchoolSlidingScale": false,
                "financial1MinuteBook": false,
                "financial2CopyofAssetsRegister": false,
                "financial3CashBook": false,
                "financial4ReceiptBookCurrent": false,
                "financial4ReceiptBookCurrentSerial": " ",
                "financial5ReceiptBookCompleted": false,
                "financial5ReceiptBookCompletedSerial": " ",
                "financial6ChequeBookCurrent": false,
                "financial6ChequeBookCurrentSerial": " ",
                "financial7ChequeBookCompleted": false,
                "financial7ChequeBookCompletedSerial": " ",
                "financial8PettyCash": false,
                "financial8PettyCashSerial": "string",
                "financial9BankStatementsforPeriod1Januaryto30June": false,
                "financial10DocumentaryProofOfInvestment": false,
                "financial11ListofNGOsPartnersApproved": false,
                "financial12CopyofThe10thSchoolDayStatistics": false,
                "financial13CopiesofContractsofAllStaffEmployed": false,
                "financial14AuditedFinancialStatementsforPeriod1Januaryto31December": false,
                "financial15SchoolFinancialPolicy": false,
                "financial16ApprovedSchoolBudgetforCurrentFinancialYear": false,
                "financial17ResolutionToChargeSchoolFees": false,
                "learner1CopiesofAnalysisOfResultsOfPrevious3Years": false,
                "learner2StrategyToImproveLearnerPerformance": false,
                "learner3SchoolDevelopmentPlan": false,
                "learner4SchoolImprovementPlan": false
            }
         // console.log(JSON.stringify(this.newDocs));
         // this.handOverService.saveHandover(this.newHandover);
     
          Swal.fire(
            'Success',
            'Meeting saved.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Meeting not saved',
            'error'
          )
        }
        location.reload();
      })
      
  }
  
}
