import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { getLocaleDateTimeFormat } from '@angular/common';
import { HandOverService } from '../handover.service';
import {AppService} from '../../../../app.service';
import { UsersService } from '../../users/users.service';
// import { truncate } from 'node:fs';

@Component({
  selector: 'app-handover-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {


  public schoolname: any;
  public emisNumber: any;
  public districtName: any;
  public electionResultsId: any;
  public legislation1SouthAfricanSchoolAct: any;
  public legislation2ProvincialEducationAct: any;
  public legislation3GoverningBodiesOfPublicSchools: any;
  public legislation4GeneralNotice869of2006: any;
  public legislation5MisconductOfLearners: any;
  public legislation6GeneralNotice1149of2006: any;
  public legislation7GoverningBodiesOfPublicSchools: any;
  public legislation8ConstitutionOfSGB: any;
  public legislation9ProvincialCodeOfConductForSGBs: any;
  public legislation10VisionAndMissionStatement: any;
  public legislation11ActionPlansForFollowingYear: any;
  public policies1Admission: any;
  public policies2SchoolSportAndCulturalActivities: any;
  public policies3UseOfSchoolBuildingsAndFacilities: any;
  public policies4OccupationalHealthAndSafety: any;
  public policies5Religion: any;
  public policies6Language: any;
  public policies7HIVandAIDS: any;
  public policies8CodeOfConductForLearners: any;
  public policies9PaymentOfSchoolFeesAndSchoolSlidingScale: any;
	public financial1MinuteBook: any;
  public financial2CopyofAssetsRegister: any;
  public financial3CashBook: any;
  public financial4ReceiptBookCurrent: any;
  public financial4ReceiptBookCurrentSerial: any;
  public financial5ReceiptBookCompleted: any;
  public financial5ReceiptBookCompletedSerial: any;
  public financial6ChequeBookCurrent: any;
  public financial6ChequeBookCurrentSerial: any;
  public financial7ChequeBookCompleted: any;
  public financial7ChequeBookCompletedSerial: any;
  public financial8PettyCash: any;
  public financial8PettyCashSerial: any;
  public financial9BankStatementsforPeriod1Januaryto30June: any;
  public financial10DocumentaryProofOfInvestment: any;
  public financial11ListofNGOsPartnersApproved: any;
  public financial12CopyofThe10thSchoolDayStatistics : any;
  public financial13CopiesofContractsofAllStaffEmployed: any;
  public financial14AuditedFinancialStatementsforPeriod1Januaryto31December: any;
  public financial15SchoolFinancialPolicy : any;
  public financial16ApprovedSchoolBudgetforCurrentFinancialYear: any;
  public financial17ResolutionToChargeSchoolFees: any;
  public learner1CopiesofAnalysisOfResultsOfPrevious3Years: any;
  public learner2StrategyToImproveLearnerPerformance: any;
  public learner3SchoolDevelopmentPlan: any;
  public learner4SchoolImprovementPlan: any;
  public schoolName:any;
  public emisCode:any = this.appservice.getLoggedInEmisCode();
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public todaysDate:  any =  this.toISOLocal(new Date())
  public handoverDate:any;
  public id: any;

  public data: any;
  public documentList: any = [];
  public document:any;

  public show:boolean = false;
  public buttonName:any = 'Show';

  isUploadShown: boolean = true ; 
  isListShown: boolean = false ; 
  noRecordsElection = false;
  newData: any = {};
  newDocs: any = {};
  docsTitle: any;
  userId;
  roles: any;
  designations: any;
  userRole: any;
  districts: any;
  schools: any;
  handOver: any;
  emisHandOver: any;
  
  uploadEvent: any;
  selectedReport: any;
  reportType: any;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('basicModal') basicModal: any;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: null,
    uploadMultiple: true,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  docPath;
  basicModalCloseResult: string = '';

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(private modalService: NgbModal, 
              private activeModal: NgbActiveModal, 
              private router: Router, 
              private http: HttpClient, 
              private handOverService: HandOverService, 
              private userservice:UsersService,
              private appservice: AppService, 
              private appService: AppService) { }

  ngOnInit(): void {

    this.emisNumber = this.appService.getLoggedInEmisCode(); 
    this.userId = this.appService.getLoggedInUserId(); 
    this.userRole = this.appService.getLoggedInUserRole();
    this.handOverService.getHandoverBySchool(this.emisNumber).subscribe((res: any) => {
      this.handOver = res;


      if (this.handOver.length > 0) {
        // this.isUploadShown = true ; 
        console.log(this.handOver);
        this.schoolname = this.handOver[0].schoolName;
        this.districtCode = this.handOver[0].districtCode;
        this.districtName= this.handOver[0].districtName;
        this.electionResultsId = this.handOver[0].id;

        this.handOverService.getElectionDocsEmis(this.emisNumber).subscribe((res: any) => {
          this.documentList = res;
        });
    
      }

    });


      this.handOverService.getHandoverByEmis(this.emisNumber).subscribe((dat: any) => {
        this.emisHandOver = dat;
        // this.handOverService.getAllDistricts().subscribe(dat => {
        //   this.districts = dat;
          console.log(dat);
        // }
        // );


      if (this.emisHandOver.length > 0) {
        this.isUploadShown = true ; 
        console.log(this.emisHandOver);
        this.id = this.emisHandOver[0].id
        this.legislation1SouthAfricanSchoolAct = this.emisHandOver[0].legislation1SouthAfricanSchoolAct === true ? "true" : "false";
        this.legislation2ProvincialEducationAct = this.emisHandOver[0].legislation2ProvincialEducationAct === true ? "true" : "false";
        this.legislation3GoverningBodiesOfPublicSchools = this.emisHandOver[0].legislation3GoverningBodiesOfPublicSchools === true ? "true" : "false";
        this.legislation4GeneralNotice869of2006 = this.emisHandOver[0].legislation4GeneralNotice869of2006 === true ? "true" : "false";
        this.legislation5MisconductOfLearners = this.emisHandOver[0].legislation5MisconductOfLearners === true ? "true" : "false";
        this.legislation6GeneralNotice1149of2006 = this.emisHandOver[0].legislation6GeneralNotice1149of2006 === true ? "true" : "false";
        this.legislation7GoverningBodiesOfPublicSchools = this.emisHandOver[0].legislation7GoverningBodiesOfPublicSchools === true ? "true" : "false";
        this.legislation8ConstitutionOfSGB = this.emisHandOver[0].legislation8ConstitutionOfSGB === true ? "true" : "false";
        this.legislation9ProvincialCodeOfConductForSGBs = this.emisHandOver[0].legislation9ProvincialCodeOfConductForSGBs === true ? "true" : "false";
        this.legislation10VisionAndMissionStatement = this.emisHandOver[0].legislation10VisionAndMissionStatement === true ? "true" : "false";
        this.legislation11ActionPlansForFollowingYear = this.emisHandOver[0].legislation11ActionPlansForFollowingYear === true ? "true" : "false";
        this.policies1Admission = this.emisHandOver[0].policies1Admission === true ? "true" : "false";
        this.policies2SchoolSportAndCulturalActivities = this.emisHandOver[0].policies2SchoolSportAndCulturalActivities === true ? "true" : "false";
        this.policies3UseOfSchoolBuildingsAndFacilities = this.emisHandOver[0].policies3UseOfSchoolBuildingsAndFacilities === true ? "true" : "false";
        this.policies4OccupationalHealthAndSafety = this.emisHandOver[0].policies4OccupationalHealthAndSafety === true ? "true" : "false";
        this.policies5Religion = this.emisHandOver[0].policies5Religion === true ? "true" : "false";
        this.policies6Language = this.emisHandOver[0].policies6Language === true ? "true" : "false";
        this.policies7HIVandAIDS = this.emisHandOver[0].policies7HIVandAIDS === true ? "true" : "false";
        this.policies8CodeOfConductForLearners = this.emisHandOver[0].policies8CodeOfConductForLearners === true ? "true" : "false";
        this.policies9PaymentOfSchoolFeesAndSchoolSlidingScale = this.emisHandOver[0].policies9PaymentOfSchoolFeesAndSchoolSlidingScale === true ? "true" : "false";
        this.financial1MinuteBook = this.emisHandOver[0].financial1MinuteBook === true ? "true" : "false";
        this.financial2CopyofAssetsRegister = this.emisHandOver[0].financial2CopyofAssetsRegister === true ? "true" : "false";
        this.financial3CashBook = this.emisHandOver[0].financial3CashBook === true ? "true" : "false";
        this.financial4ReceiptBookCurrent = this.emisHandOver[0].financial4ReceiptBookCurrent === true ? "true" : "false";
        this.financial4ReceiptBookCurrentSerial = this.emisHandOver[0].financial4ReceiptBookCurrentSerial;
        this.financial5ReceiptBookCompleted = this.emisHandOver[0].financial5ReceiptBookCompleted === true ? "true" : "false";
        this.financial5ReceiptBookCompletedSerial = this.emisHandOver[0].financial5ReceiptBookCompletedSerial;
        this.financial6ChequeBookCurrent = this.emisHandOver[0].financial6ChequeBookCurrent === true ? "true" : "false";
        this.financial6ChequeBookCurrentSerial = this.emisHandOver[0].financial6ChequeBookCurrentSerial;
        this.financial7ChequeBookCompleted = this.emisHandOver[0].financial7ChequeBookCompleted === true ? "true" : "false";
        this.financial7ChequeBookCompletedSerial = this.emisHandOver[0].financial7ChequeBookCompletedSerial;
        this.financial8PettyCash = this.emisHandOver[0].financial8PettyCash === true ? "true" : "false";
        this.financial8PettyCashSerial = this.emisHandOver[0].financial8PettyCashSerial;
        this.financial9BankStatementsforPeriod1Januaryto30June = this.emisHandOver[0].financial9BankStatementsforPeriod1Januaryto30June === true ? "true" : "false";
        this.financial10DocumentaryProofOfInvestment = this.emisHandOver[0].financial10DocumentaryProofOfInvestment === true ? "true" : "false";
        this.financial11ListofNGOsPartnersApproved = this.emisHandOver[0].financial11ListofNGOsPartnersApproved === true ? "true" : "false";
        this.financial12CopyofThe10thSchoolDayStatistics  = this.emisHandOver[0].financial12CopyofThe10thSchoolDayStatistics  === true ? "true" : "false";
        this.financial13CopiesofContractsofAllStaffEmployed = this.emisHandOver[0].financial13CopiesofContractsofAllStaffEmployed === true ? "true" : "false";
        this.financial14AuditedFinancialStatementsforPeriod1Januaryto31December = this.emisHandOver[0].financial14AuditedFinancialStatementsforPeriod1Januaryto31December === true ? "true" : "false";
        this.financial15SchoolFinancialPolicy  = this.emisHandOver[0].financial15SchoolFinancialPolicy  === true ? "true" : "false";
        this.financial16ApprovedSchoolBudgetforCurrentFinancialYear = this.emisHandOver[0].financial16ApprovedSchoolBudgetforCurrentFinancialYear === true ? "true" : "false";
        this.financial17ResolutionToChargeSchoolFees = this.emisHandOver[0].financial17ResolutionToChargeSchoolFees === true ? "true" : "false";
        this.learner1CopiesofAnalysisOfResultsOfPrevious3Years = this.emisHandOver[0].learner1CopiesofAnalysisOfResultsOfPrevious3Years === true ? "true" : "false";
        this.learner2StrategyToImproveLearnerPerformance = this.emisHandOver[0].learner2StrategyToImproveLearnerPerformance === true ? "true" : "false";
        this.learner3SchoolDevelopmentPlan = this.emisHandOver[0].learner3SchoolDevelopmentPlan === true ? "true" : "false";
        this.learner4SchoolImprovementPlan = this.emisHandOver[0].learner4SchoolImprovementPlan === true ? "true" : "false";

        if (this.userRole == "DEO" || this.userRole == "HO" || this.userRole == "SEO" || this.userRole == "PEO" || this.userRole == "PEM" || this.userRole == "PRINCIPAL"){
          this.isUploadShown = false;
          this.isListShown = true;
        }else if(this.userRole == "SGB"  || this.userRole == "OFFICE_BEARERS"){
          this.isUploadShown = true;
          this.isListShown = true;
    
        }
      

      } 

    });


    this.handOverService.getAllUsers().subscribe((res: any) => {
      this.data = res;


      let obj = {
        // Quickly get the headings
        headings: Object.keys(this.data[0]),

        // data array
        data: []
      };

      for (let i = 0; i < this.data.length; i++) {

        obj.data[i] = [];

        for (let p in this.data[i]) {
          if (this.data[i].hasOwnProperty(p)) {
            obj.data[i].push(this.data[i][p]);
          }
        }
      }

    });


    if (this.userRole == "DEO" || this.userRole == "HO" || this.userRole == "SEO" || this.userRole == "PEO" || this.userRole == "PEM" ){
      this.isUploadShown = false;
      this.isListShown = true;
    }
    // else{
    //   this.isUploadShown = true;
    //   this.isListShown = false;

    // }
    this.userservice.getSchoolByEmisNumber(this.emisCode).subscribe((res: any) => {
      this.schoolname = res[0].institutionName
      console.log(JSON.stringify(res));
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

  submitHandOver() {

    console.log("Handover working");
  }

  resetDropzoneUploads() {

    console.log("Handover working2");
  }

  saveHandoverData() {
    Swal.fire({
      title: 'Are you sure you want to submit this handover?',
      text: 'Your handover will be processed',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.newData = {
          "id": this.id,
          "schoolName": this.schoolname,
          "emisNumber": this.emisNumber,
          "districtCode": this.districtCode,
          "districtName": this.districtName,
          "electionResultsId": this.electionResultsId,
          "legislation1SouthAfricanSchoolAct": this.legislation1SouthAfricanSchoolAct === "true" ? true : false,
          "legislation2ProvincialEducationAct": this.legislation2ProvincialEducationAct === "true" ? true : false,
          "legislation3GoverningBodiesOfPublicSchools": this.legislation3GoverningBodiesOfPublicSchools === "true" ? true : false,
          "legislation4GeneralNotice869of2006": this.legislation4GeneralNotice869of2006 === "true" ? true : false,
          "legislation5MisconductOfLearners": this.legislation5MisconductOfLearners === "true" ? true : false,
          "legislation6GeneralNotice1149of2006": this.legislation6GeneralNotice1149of2006 === "true" ? true : false,
          "legislation7GoverningBodiesOfPublicSchools": this.legislation7GoverningBodiesOfPublicSchools === "true" ? true : false,
          "legislation8ConstitutionOfSGB": this.legislation8ConstitutionOfSGB === "true" ? true : false,
          "legislation9ProvincialCodeOfConductForSGBs": this.legislation9ProvincialCodeOfConductForSGBs === "true" ? true : false,
          "legislation10VisionAndMissionStatement": this.legislation10VisionAndMissionStatement === "true" ? true : false,
          "legislation11ActionPlansForFollowingYear": this.legislation11ActionPlansForFollowingYear === "true" ? true : false,
          "policies1Admission": this.policies1Admission === "true" ? true : false,
          "policies2SchoolSportAndCulturalActivities": this.policies2SchoolSportAndCulturalActivities === "true" ? true : false,
          "policies3UseOfSchoolBuildingsAndFacilities": this.policies3UseOfSchoolBuildingsAndFacilities === "true" ? true : false,
          "policies4OccupationalHealthAndSafety": this.policies4OccupationalHealthAndSafety === "true" ? true : false,
          "policies5Religion": this.policies5Religion === "true" ? true : false,
          "policies6Language": this.policies6Language === "true" ? true : false,
          "policies7HIVandAIDS": this.policies7HIVandAIDS === "true" ? true : false,
          "policies8CodeOfConductForLearners": this.policies8CodeOfConductForLearners === "true" ? true : false,
          "policies9PaymentOfSchoolFeesAndSchoolSlidingScale": this.policies9PaymentOfSchoolFeesAndSchoolSlidingScale === "true" ? true : false,
          "financial1MinuteBook":  this.financial1MinuteBook === "true" ? true : false,
          "financial2CopyofAssetsRegister": this.financial2CopyofAssetsRegister === "true" ? true : false,
          "financial3CashBook": this.financial3CashBook === "true" ? true : false,
          "financial4ReceiptBookCurrent": this.financial4ReceiptBookCurrent === "true" ? true : false,
          "financial4ReceiptBookCurrentSerial": this.financial4ReceiptBookCurrentSerial,
          "financial5ReceiptBookCompleted": this.financial5ReceiptBookCompleted === "true" ? true : false,
          "financial5ReceiptBookCompletedSerial": this.financial5ReceiptBookCompletedSerial,
          "financial6ChequeBookCurrent": this.financial6ChequeBookCurrent === "true" ? true : false,
          "financial6ChequeBookCurrentSerial": this.financial6ChequeBookCurrentSerial,
          "financial7ChequeBookCompleted": this.financial7ChequeBookCompleted === "true" ? true : false,
          "financial7ChequeBookCompletedSerial": this.financial7ChequeBookCompletedSerial,
          "financial8PettyCash": this.financial8PettyCash === "true" ? true : false,
          "financial8PettyCashSerial": this.financial8PettyCashSerial,
          "financial9BankStatementsforPeriod1Januaryto30June": this.financial9BankStatementsforPeriod1Januaryto30June === "true" ? true : false,
          "financial10DocumentaryProofOfInvestment": this.financial10DocumentaryProofOfInvestment === "true" ? true : false,
          "financial11ListofNGOsPartnersApproved": this.financial11ListofNGOsPartnersApproved === "true" ? true : false,
          "financial12CopyofThe10thSchoolDayStatistics": this.financial12CopyofThe10thSchoolDayStatistics  === "true" ? true : false,
          "financial13CopiesofContractsofAllStaffEmployed": this.financial13CopiesofContractsofAllStaffEmployed === "true" ? true : false,
          "financial14AuditedFinancialStatementsforPeriod1Januaryto31December": this.financial14AuditedFinancialStatementsforPeriod1Januaryto31December === "true" ? true : false,
          "financial15SchoolFinancialPolicy": this.financial15SchoolFinancialPolicy  === "true" ? true : false,
          "financial16ApprovedSchoolBudgetforCurrentFinancialYear": this.financial16ApprovedSchoolBudgetforCurrentFinancialYear === "true" ? true : false,
          "financial17ResolutionToChargeSchoolFees": this.financial17ResolutionToChargeSchoolFees === "true" ? true : false,
          "learner1CopiesofAnalysisOfResultsOfPrevious3Years": this.learner1CopiesofAnalysisOfResultsOfPrevious3Years === "true" ? true : false,
          "learner2StrategyToImproveLearnerPerformance": this.learner2StrategyToImproveLearnerPerformance === "true" ? true : false,
          "learner3SchoolDevelopmentPlan": this.learner3SchoolDevelopmentPlan === "true" ? true : false,
          "learner4SchoolImprovementPlan": this.learner4SchoolImprovementPlan === "true" ? true : false

        }
          this.handOverService.saveHandover(this.newData)
          console.log(JSON.stringify(this.newData));
          this.isUploadShown = true ; 
          Swal.fire(
            'Confirmation!',
            'Handover saved.',
            'success'
          )


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
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

  onUpload(event: any): void {
    // let output = event;
    this.activeModal.close();
    this.selectedReport = this.reportType;
    console.log('onUploadSuccess:', event);
    this.docPath = this.uploadEvent[1].path;
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

    this.handOverService.saveHandoverDocs(this.newDocs).subscribe(res => {
      console.log(res)
      console.log(JSON.stringify(this.newDocs));
      Swal.fire(
        'Confirmation!',
        'Handover saved.',
        'success'
      )


    }, err => {
      console.log(err)
    })

  }  

  
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

}
