import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../users/users.service";
import { AppService } from "../../../../app.service";
import { ElectionService } from "../election.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
//import { formatDate } from '@angular/common';

@Component({
  selector: 'app-district-officer-reporting',
  templateUrl: './district-officer-reporting.component.html',
  styleUrls: ['./district-officer-reporting.component.scss']
})
export class DistrictOfficerReportingComponent implements OnInit {

  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;

  constructor(private userservice:UsersService, private electionService:ElectionService, private router:Router, private appService:AppService,public formBuilder: FormBuilder) { }

  public districtCode:any;
  public allDistricts:any;
  public totalSchools: any;
  public appointmentOfOfficer:any;
  public appointmentOfTeam:any;
  public DETNo: any;
  public DETLetters:any;
  public SETNo: any;
  public SETLetters:any;
  public schoolPairing:any;
  public outstanding:any;
  public submitted:any;
  public handOverNarrative:any;
  public DETDate:any;
  public DTEAttendance:any;
  public SETDate:any;
  public STEAttendance:any;
  public phase2:any;
  public firstName:any;;
  public lastName:any
  
  public createReport:any;

  ngOnInit(): void {
    let deoId = this.appService.getLoggedInUserId();
    this.userservice.getAllDistricts().subscribe((res: any) => {
      this.allDistricts = res;
      console.log(this.allDistricts)

    });


    // this.userservice.getUserById(deoId).subscribe((res: any) => {
    //   let user = res;
    //   this.firstName = user.firstname;
    //   this.lastName = user.surname;

    // });


    $("input[type='date']").keydown(function (event) { event.preventDefault(); });

    this.validationForm = this.formBuilder.group({
      districtCode: ['', Validators.required],
      totalSchools: ['', [Validators.required,Validators.min(0)]],
      appointmentOfOfficer: ['', [Validators.required,Validators.min(0), Validators.max(100)]],
      DETNo: ['', [Validators.required,Validators.min(0)]],
      DETLetters: ['', [Validators.required,Validators.min(0)]],
      SETNo: ['', [Validators.required,Validators.min(0)]],
      SETLetters: ['', [Validators.required,Validators.min(0)]],
      schoolPairing: ['', [Validators.required,Validators.min(0), Validators.max(100)]],
      outstanding: ['', [Validators.required,Validators.min(0)]],
      submitted: ['', [Validators.required,Validators.min(0)]],
      handOverNarrative: ['', Validators.required],
      DETDate: ['', [Validators.required,Validators.pattern('^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$')]],
      DTEAttendance: ['', [Validators.required,Validators.min(0)]],
      SETDate: ['', [Validators.required,Validators.pattern('^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$')]],
      STEAttendance: ['', [Validators.required,Validators.min(0)]],
      phase2: ['', [Validators.required,Validators.min(0)]]
     
      
    });
    this.isCreateFormSubmitted = false;
    



  }

  get createForm() {
    return this.validationForm.controls;
  }

  saveReport(){


    if (this.validationForm.valid) {
    Swal.fire({
      title: 'Are you sure you want to save this district electoral officers weekly reporting?',
      text: 'District Electoral Officers Weekly Reporting',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        let deoId = this.appService.getLoggedInUserId();
       
        this.createReport = {
          id: 0,
          deoId: parseInt(deoId),
          noOfSchools: parseInt(this.totalSchools),
          appointmentOfDEONumber: parseInt(this.DETNo),
          appointmentOfDEOLetters: parseInt(this.DETLetters),
          appointmentOfSETNumber: parseInt(this.SETNo),
          appointmentOfSETLetters: parseInt(this.SETLetters),
          pairingOfSchools: parseInt(this.schoolPairing),
          electionScheduleSubmitted: parseInt(this.submitted),
          electionScheduleOustanding: parseInt(this.outstanding),
          handoverNarrativeReportSubmission: parseInt(this.handOverNarrative),
          schoolsPerDistrict: parseInt(this.totalSchools),
          trainingDETDate: new Date(this.DETDate).toISOString(),
          trainingDETTotalAttedance: parseInt(this.DTEAttendance),
          trainingSETDate: new Date(this.SETDate).toISOString(),
          trainingSETTotalAttedance: parseInt(this.STEAttendance),
          phase2HandoverCompleted: this.phase2,
          appointmentOfDEOPercentage: parseInt(this.appointmentOfOfficer),
          districtCode: this.districtCode,
          firstname: this.firstName,
          surname: this.lastName
        }
        

        console.log(this.createReport);
       this.electionService.createDeoWeeklyDashboard(this.createReport);

        Swal.fire(
          'Confirmation!',
          'District Electoral Officers weekly reporting saved.',
          'success'
        )
        this.router.navigate(['/election/weekly-deo-report']);
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }
    this.isCreateFormSubmitted = true;
  }

}
