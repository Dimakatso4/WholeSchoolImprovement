import { Component,OnDestroy , OnInit, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService} from "../../../../app.service"
import { UsersService } from "../../users/users.service";
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-intervation',
  templateUrl: './intervation.component.html',
  styleUrls: ['./intervation.component.scss']
})
export class IntervationComponent implements OnDestroy, OnInit {

  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  isVisible: boolean = true;
  show: boolean = false;
  public tagetGroup:any;
  public resources:any;
  public startDate: any;
  public endDate: any;
  public startTime: any;
  public endTime: any;
  public responsibility: any;
  public areaOfDevelopment:any;
  public description:any;
  public intervationInfo:any;
  public dtOptions: DataTables.Settings = {};
  public userRole = this.appservice.getLoggedInUserRole();
 
  
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private appservice:AppService, 
    private userService:UsersService, 
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      tagetGroup: ['', Validators.required],
      resources:['', Validators.required],
      startDate:['', Validators.required],
      endDate: ['', Validators.required],
      venue: ['', Validators.required],
      description: ['', Validators.required],
      responsibility: ['', Validators.required],
      areaOfDevelopment: ['', Validators.required],
      meetingDocuments:""
    })
    this.isCreateFormSubmitted = false;

    this.validationForm = new FormGroup({
      tagetGroup: new FormControl(),
      resources: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      responsibility: new FormControl(),
      description: new FormControl(),
      areaOfDevelopment: new FormControl()
   });
  }

  get createForm() {
    return this.validationForm.controls;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  saveInstrument()
  {
    if(this.validationForm.valid) {
      console.log(JSON.stringify("varlid"));
      // console.log(JSON.stringify(this.areaOfEvaluationValue));

      Swal.fire({
        title: 'Are you sure?',
        text: "You wanna send this form!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText:'Yes, Send it!',
        cancelButtonText:'No, Cancel it!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed)
          {Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Action plan succussful submitted',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          if (result.value || result.isDismissed) {
            this.router.navigate(['../action-plan/intervation-list']);

            this.intervationInfo = {
              // sipId:1,
              areaOfDevelopment: this.areaOfDevelopment,
              targetGroup: this.tagetGroup,
              responsibility: this.responsibility,
              startDate: this.startDate,
              finishDate: this.endDate,
              descriptionOfActivities: this.description,
              resources:this.resources,
              progressPerQuarter:"40%",
              kpiQuestions: "test"
          }
            console.log(JSON.stringify(this.intervationInfo));
           
          }
          });
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Action Plan creation was cancelled:)',
            'error'
          )
        }
      })
    //   logDispute(){
   
    //   console.log("click");
        
    
    // };

    }
    this.isCreateFormSubmitted = true;
  }

}
