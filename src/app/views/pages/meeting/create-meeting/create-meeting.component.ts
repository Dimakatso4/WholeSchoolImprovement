import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MeetingService } from "../meeting.service";
import { AppService} from "../../../../app.service"
import { UsersService } from "../../users/users.service";
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {
  selectedPersonId: string = null;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  public title:any;
  public startDate: any;
  public endDate: any;
  public startTime: any;
  public endTime: any;
  public venue:any;
  public description:any;
  public minutes:any;
  public scheduledBy: any;
  public people:any = [];
  public atendents:any;
  public meeting: any;
  public userinfo:any;
  public selectedPeople: any = null;
  public emisCode = this.appservice.getLoggedInEmisCode();
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public meetingDocuments:any=[];
  public userRole = this.appservice.getLoggedInUserRole();
  public inviteType:any;
  public trainingTypes:any;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private meetingService: MeetingService, 
    private appservice:AppService, 
    private userService:UsersService, 
    public formBuilder: FormBuilder
    
    ) { }
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  ngOnInit(): void {
    ///////User Role Declaration//////
    this.userRole = this.appservice.getLoggedInUserRole()
    //////Get Invitaition types/////////
    this.meetingService.getTrainingTypes().subscribe((res: any) => {
      console.log(JSON.stringify(res));
    /////Get Invitation types By Role////  
      if(this.userRole == "DEO"){
        const filtered = res.filter(function(e) {
          return [1, 6, 7].includes(e.id) 
        });
        this.trainingTypes = filtered
      }else if(this.userRole == "SEO"){
        const filtered = res.filter(function(e) {
          return [3].includes(e.id) 
        });
        this.trainingTypes = filtered

      }else if(this.userRole == "HO"){
        const filtered = res.filter(function(e) {
          return [2,4,8].includes(e.id) 
        });
        this.trainingTypes = filtered

      }
      else if(this.userRole == "PEO"){
        const filtered = res.filter(function(e) {
          return [4].includes(e.id) 
        });
        this.trainingTypes = filtered

      }
    });
    
    ///////Get attendies by Roles/////
    if(this.userRole == "DEO"){
      this.userService.getAllUsers().subscribe((res: any) => {
        const filtered = res.filter(function(e) {
          return [5].includes(e.id) 
        });
        this.people = res;
        this.atendents = this.people.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' + i.idNumber + ' ' + i.cellNumber + ' ' + i.emailAddress + ' ' + i.house + ' ' + i.complex + ' ' + i.street + ' ' + i.section + ' ' + i.city; return i; });
      });
    }else if(this.userRole == "SEO"){
      this.meetingService. getUsersBySchool(this.emisCode).subscribe((res: any) => {
        this.people = res;
        this.atendents = this.people.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' + i.idNumber + ' ' + i.cellNumber + ' ' + i.emailAddress + ' ' + i.house + ' ' + i.complex + ' ' + i.street + ' ' + i.section + ' ' + i.city; return i; });
      });
    }else if(this.userRole == "HO" || this.userRole == "PEO"){
      this.userService.getAllUsers().subscribe((res: any) => {
        this.people = res;
        this.atendents = this.people.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' + i.idNumber + ' ' + i.cellNumber + ' ' + i.emailAddress + ' ' + i.house + ' ' + i.complex + ' ' + i.street + ' ' + i.section + ' ' + i.city; return i; });
      });
    }

    

 
    this.validationForm = this.formBuilder.group({
      inviteType:['', Validators.required],
      title: ['', Validators.required],
      startDate:['', Validators.required],
      endDate: ['', Validators.required],
      venue: ['', Validators.required],
      description: ['', Validators.required],
      selectedPeople: ['', Validators.required],
      meetingDocuments:""
    })
    this.isCreateFormSubmitted = false;
    
  }

  get createForm() {
    return this.validationForm.controls;
  }


  onUploadError(event: any): void {
    console.log('onUploadError:', event);

  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event[1].path);
    this.meetingDocuments.push(event[1].path);

  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
      this.meetingDocuments = [];
    }
  }

  saveMeeting()
  {
    if(this.validationForm.valid) {
    Swal.fire({
      title: 'Save Meeting?',
      text: 'Are you sure you want to save this meeting?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        
        this.userinfo = this.appservice.getLoggedInUserId()
        //console.log(JSON.stringify(this.selectedPeople))
        let selectedPeopleID = [];
        for (var key in this.selectedPeople) {
          if (this.selectedPeople.hasOwnProperty(key)) {
             console.log(this.selectedPeople[key].id);
             selectedPeopleID.push(this.selectedPeople[key].id);
          }
       }
    
        this.meeting = {
          id: 0,
          title: this.title,
          startDate: this.startDate,
          startTime: this.startDate,
          endDate: this.endDate,
          endTime: this.endDate,
          venue: this.venue,
          description: this.description,
          scheduledBy: this.userinfo,
          userAttendees: selectedPeopleID,
          meetingDocuments: this.meetingDocuments,
          MeetingTypeId: this.inviteType.id,
          userRole:this.userRole,
          districtCode :this.districtCode,
          emisCode :this.emisCode
      }
        console.log(JSON.stringify(this.meeting));
        
       this.meetingService.createNewMeeting(this.meeting);
       
        Swal.fire(
          'Success',
          'Meeting saved.',
          'success'
        )
        this.router.navigate(['/meeting/meetings']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Meeting not saved',
          'error'
        )
      }
    })
 }
  this.isCreateFormSubmitted = true;
  }

}
