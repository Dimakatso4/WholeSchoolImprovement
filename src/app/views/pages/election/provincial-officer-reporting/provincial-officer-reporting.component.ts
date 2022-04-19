import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from "../../users/users.service";
import { AppService } from "../../../../app.service";
import { ElectionService } from "../election.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-provincial-officer-reporting',
  templateUrl: './provincial-officer-reporting.component.html',
  styleUrls: ['./provincial-officer-reporting.component.scss']
})
export class ProvincialOfficerReportingComponent implements OnInit {

  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  basicModalCloseResult: string = '';
  
  public districtCode:any;
  public allDistricts:any;
  public totalPerDistrict: any;
  public conductedElections:any;
  public standard:any;
  public fullDay:any;
  public electedThroughBallot:any;
  public dulyElected:any;
  public successfullyElected:any;
  public noQuarum:any;
  public Disputes:any;
  public Resolution:any;
  public createReport:any;

  constructor(private userservice:UsersService, private electionService:ElectionService, private router:Router, private appService:AppService,public formBuilder: FormBuilder,private modalService:NgbModal) { }


  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      districtCode:['', Validators.required],
      totalPerDistrict: ['', Validators.required],
      conductedElections:['', Validators.required],
      standard: ['', Validators.required],
      fullDay: ['', Validators.required],
      electedThroughBallot: ['', Validators.required],
      dulyElected: ['', Validators.required],
      successfullyElected: ['', Validators.required],
      noQuarum: ['', Validators.required],
      Disputes: ['', Validators.required],
      Resolution: ['', Validators.required]
    })
    this.isCreateFormSubmitted = false;
  }

  get createForm() {
    return this.validationForm.controls;
  }


  createPEOReport(){


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
      
        }
        

       console.log(this.createReport);
       //this.electionService.createDeoWeeklyDashboard(this.createReport);

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
