import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ElectionService } from '../election.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-weekly-peo-report',
  templateUrl: './weekly-peo-report.component.html',
  styleUrls: ['./weekly-peo-report.component.scss']
})
export class WeeklyPeoReportComponent implements OnInit {
  public peodashboard:any;
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

  constructor(private appService: AppService, private electionService: ElectionService, private modalService: NgbModal, private router: Router, private userService: UsersService, public formBuilder: FormBuilder, public datepipe: DatePipe, private userservice:UsersService) { }


  ngOnInit(): void {
  }

  get createForm() {
    return this.validationForm.controls;
  }

  openXlModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  view(i) {

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
