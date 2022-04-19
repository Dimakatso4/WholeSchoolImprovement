import { Component, OnInit, OnDestroy } from '@angular/core';
import { HandOverService } from '../handover.service';
import { Router } from '@angular/router';
import {AppService} from '../../../../app.service';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsersService} from "../../users/users.service";
import Swal from 'sweetalert2';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-list-handover',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy, OnInit {
  public emisCode = this.appservice.getLoggedInEmisCode();
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public userRole = this.appservice.getLoggedInUserRole();
  public userId = this.appservice.getLoggedInUserId();
  public todaysDate:  any =  this.toISOLocal(new Date())
  public handOverList:any;
  public newHandover:any;

  public user:any;
  public trainingCount = 1
  noHandover = false;
  public expanded:any = false
  public show:boolean = false;
  public buttonName:any = 'Show';
  public disabled:any;
  public dueDate:any;
  public dtOptions: DataTables.Settings = {};

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
  public reportType: any;
  public filtered: any;
  public displayDistrict:any;
  public disaplayEmis:any;
  public district:any
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  documentList: any;


  constructor(private handOverService: HandOverService, private router: Router, private appService: AppService, private modalService: NgbModal,  private appservice: AppService, private userservice:UsersService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    };

    if(this.userRole == "DEO"){
      this.userservice.getDistrictByCode(this.districtCode).subscribe((res: any) => {
          this.displayDistrict = res.districtName
          this.district = res.districtName
      });
    }else if(this.userRole == "SEO" || this.userRole == "PRINCIPAL"){
      this.userservice.getSchoolByEmisNumber(this.emisCode).subscribe((res: any) => {
        this.displayDistrict = res[0].institutionName
      });
    }

    this.handOverService.getHandoverByDistrict(this.districtCode).subscribe((res: any) => {
      if(this.userRole == "DEO"){
        let district = this.districtCode
        this.filtered = res.filter(function(e) {
          return (  e['districtCode'] == district);
        });
      }else if(this.userRole == "PRINCIPAL" || this.userRole == "SEO"  ){
        let emis =  this.emisCode
        this.filtered = res.filter(function(e) {
          return (  e['emisNumber'] == emis);
        });
      }
      this.handOverList = this.filtered;
      this.dueDate =  this.handOverList[0].dueDate
      console.log( JSON.stringify(this.handOverList))
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

  openXlModal(content) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  public handOverData:any;
  public schoolname:any;
  public emisNumber:any;
  public districtName:any
  viewHandover(handover) {
      console.log(handover)
      this.handOverService.getElectionDocsEmis(handover.emisNumber).subscribe((res: any) => {
     
        this.documentList = res;
    })

    this.handOverService.getHandoverBySchool(handover.emisNumber).subscribe((res: any) => {
      console.log(JSON.stringify(res));
      this.handOverData = res
      this.schoolname = this.handOverData[0].schoolName
      this.emisNumber = this.handOverData[0].emisNumber
      this.districtName = this.handOverData[0].districtName
      this.legislation1SouthAfricanSchoolAct = this.handOverData[0].legislation1SouthAfricanSchoolAct === true ? "true" : "false";
      this.legislation2ProvincialEducationAct = this.handOverData[0].legislation2ProvincialEducationAct === true ? "true" : "false";
      this.legislation3GoverningBodiesOfPublicSchools = this.handOverData[0].legislation3GoverningBodiesOfPublicSchools === true ? "true" : "false";
      this.legislation4GeneralNotice869of2006 = this.handOverData[0].legislation4GeneralNotice869of2006 === true ? "true" : "false";
      this.legislation5MisconductOfLearners = this.handOverData[0].legislation5MisconductOfLearners === true ? "true" : "false";
      this.legislation6GeneralNotice1149of2006 = this.handOverData[0].legislation6GeneralNotice1149of2006 === true ? "true" : "false";
      this.legislation7GoverningBodiesOfPublicSchools = this.handOverData[0].legislation7GoverningBodiesOfPublicSchools === true ? "true" : "false";
      this.legislation8ConstitutionOfSGB = this.handOverData[0].legislation8ConstitutionOfSGB === true ? "true" : "false";
      this.legislation9ProvincialCodeOfConductForSGBs = this.handOverData[0].legislation9ProvincialCodeOfConductForSGBs === true ? "true" : "false";
      this.legislation10VisionAndMissionStatement = this.handOverData[0].legislation10VisionAndMissionStatement === true ? "true" : "false";
      this.legislation11ActionPlansForFollowingYear = this.handOverData[0].legislation11ActionPlansForFollowingYear === true ? "true" : "false";
      this.policies1Admission = this.handOverData[0].policies1Admission === true ? "true" : "false";
      this.policies2SchoolSportAndCulturalActivities = this.handOverData[0].policies2SchoolSportAndCulturalActivities === true ? "true" : "false";
      this.policies3UseOfSchoolBuildingsAndFacilities = this.handOverData[0].policies3UseOfSchoolBuildingsAndFacilities === true ? "true" : "false";
      this.policies4OccupationalHealthAndSafety = this.handOverData[0].policies4OccupationalHealthAndSafety === true ? "true" : "false";
      this.policies5Religion = this.handOverData[0].policies5Religion === true ? "true" : "false";
      this.policies6Language = this.handOverData[0].policies6Language === true ? "true" : "false";
      this.policies7HIVandAIDS = this.handOverData[0].policies7HIVandAIDS === true ? "true" : "false";
      this.policies8CodeOfConductForLearners = this.handOverData[0].policies8CodeOfConductForLearners === true ? "true" : "false";
      this.policies9PaymentOfSchoolFeesAndSchoolSlidingScale = this.handOverData[0].policies9PaymentOfSchoolFeesAndSchoolSlidingScale === true ? "true" : "false";
      this.financial1MinuteBook = this.handOverData[0].financial1MinuteBook === true ? "true" : "false";
      this.financial2CopyofAssetsRegister = this.handOverData[0].financial2CopyofAssetsRegister === true ? "true" : "false";
      this.financial3CashBook = this.handOverData[0].financial3CashBook === true ? "true" : "false";
      this.financial4ReceiptBookCurrent = this.handOverData[0].financial4ReceiptBookCurrent === true ? "true" : "false";
      this.financial4ReceiptBookCurrentSerial = this.handOverData[0].financial4ReceiptBookCurrentSerial;
      this.financial5ReceiptBookCompleted = this.handOverData[0].financial5ReceiptBookCompleted === true ? "true" : "false";
      this.financial5ReceiptBookCompletedSerial = this.handOverData[0].financial5ReceiptBookCompletedSerial;
      this.financial6ChequeBookCurrent = this.handOverData[0].financial6ChequeBookCurrent === true ? "true" : "false";
      this.financial6ChequeBookCurrentSerial = this.handOverData[0].financial6ChequeBookCurrentSerial;
      this.financial7ChequeBookCompleted = this.handOverData[0].financial7ChequeBookCompleted === true ? "true" : "false";
      this.financial7ChequeBookCompletedSerial = this.handOverData[0].financial7ChequeBookCompletedSerial;
      this.financial8PettyCash = this.handOverData[0].financial8PettyCash === true ? "true" : "false";
      this.financial8PettyCashSerial = this.handOverData[0].financial8PettyCashSerial;
      this.financial9BankStatementsforPeriod1Januaryto30June = this.handOverData[0].financial9BankStatementsforPeriod1Januaryto30June === true ? "true" : "false";
      this.financial10DocumentaryProofOfInvestment = this.handOverData[0].financial10DocumentaryProofOfInvestment === true ? "true" : "false";
      this.financial11ListofNGOsPartnersApproved = this.handOverData[0].financial11ListofNGOsPartnersApproved === true ? "true" : "false";
      this.financial12CopyofThe10thSchoolDayStatistics  = this.handOverData[0].financial12CopyofThe10thSchoolDayStatistics  === true ? "true" : "false";
      this.financial13CopiesofContractsofAllStaffEmployed = this.handOverData[0].financial13CopiesofContractsofAllStaffEmployed === true ? "true" : "false";
      this.financial14AuditedFinancialStatementsforPeriod1Januaryto31December = this.handOverData[0].financial14AuditedFinancialStatementsforPeriod1Januaryto31December === true ? "true" : "false";
      this.financial15SchoolFinancialPolicy  = this.handOverData[0].financial15SchoolFinancialPolicy  === true ? "true" : "false";
      this.financial16ApprovedSchoolBudgetforCurrentFinancialYear = this.handOverData[0].financial16ApprovedSchoolBudgetforCurrentFinancialYear === true ? "true" : "false";
      this.financial17ResolutionToChargeSchoolFees = this.handOverData[0].financial17ResolutionToChargeSchoolFees === true ? "true" : "false";
      this.learner1CopiesofAnalysisOfResultsOfPrevious3Years = this.handOverData[0].learner1CopiesofAnalysisOfResultsOfPrevious3Years === true ? "true" : "false";
      this.learner2StrategyToImproveLearnerPerformance = this.handOverData[0].learner2StrategyToImproveLearnerPerformance === true ? "true" : "false";
      this.learner3SchoolDevelopmentPlan = this.handOverData[0].learner3SchoolDevelopmentPlan === true ? "true" : "false";
      this.learner4SchoolImprovementPlan = this.handOverData[0].learner4SchoolImprovementPlan === true ? "true" : "false";
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

  dueDateFunction(e){
    Swal.fire({
      title: 'Save Handover?',
      text: 'Are you sure you want to save this Handover?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
       
            this.handOverService.setDueDateHandover(this.districtCode, e).subscribe((res:any)=>{
              console.log("handover created")
            })

        
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

      let debounceResize: number;
      debounceResize = window.setTimeout(() => {
        location.reload();
        
      }, 2000);
    })
    
  }

}
