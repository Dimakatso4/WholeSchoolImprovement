import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeetingService } from "../meeting.service";
import { AppService} from "../../../../app.service"
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.scss']
})
export class EditMeetingComponent implements OnInit {

  constructor(private appservice:AppService,private modalService: NgbModal, private router: Router, private http: HttpClient, private meetingService: MeetingService, public formBuilder: FormBuilder) { }

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
  public id:any;
  public selectedPeople: any = null;
  public meeting:any;
  public userinfo:any;
  public editData:any;
  public districtCode:any;
  public people:any;
  public atendents:any;
  public atendentsValue:any;
  private data:any;
  public meetingDocuments:any = [];
  public peopleEdit:any;


 
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  ngOnInit(): void {

    
  

    this.districtCode = this.appservice.getLoggedInDistrictCode();
    this.meetingService.getUsersByDistrict(this.districtCode).subscribe((res: any) => {
      this.people = res;
      this.atendents = this.people.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' + i.idNumber + ' ' + i.cellNumber + ' ' + i.emailAddress + ' ' + i.house + ' ' + i.complex + ' ' + i.street + ' ' + i.section + ' ' + i.city; return i; });
      //console.log(JSON.stringify(this.atendents) );
    
    });

    this.editData = JSON.parse(localStorage.getItem('editRecord'));
    this.title = this.editData.title
    this.startDate = this.editData.startDate
    this.endDate = this.editData.endDate
    this.venue = this.editData.venue
    this.description = this.editData.description
    this.meetingDocuments = this.editData.meetingDocuments
    //alert(this.meetingDocuments);
    
    this.meetingService.getMeetingAtendees(this.editData.id).subscribe((res: any) => { 
      this.peopleEdit = res.attendees
      this.selectedPeople = this.peopleEdit.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' + i.idNumber + ' ' + i.cellNumber + ' ' + i.emailAddress + ' ' + i.house + ' ' + i.complex + ' ' + i.street + ' ' + i.section + ' ' + i.city; return i; });
      console.log(JSON.stringify(this.selectedPeople))
    })

    this.meetingService.getMeetingDocuments(this.editData.id).subscribe((res: any) => { 
      this.meetingDocuments  = res.meetingDocuments
      console.log(this.meetingDocuments)
      
    })


    this.validationForm = this.formBuilder.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      venue: ['', Validators.required],
      description: ['', Validators.required],
      minutes: ['', Validators.required],
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
    console.log('onUploadSuccess:', event);
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
    if (this.validationForm.valid) {
    Swal.fire({
      title: 'Save Meeting?',
      text: 'Are you sure you want to save this meeting?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.data = JSON.parse(localStorage.getItem('editRecord'));
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
          id: this.data.id,
          title: this.title,
          startDate: this.startDate,
          endDate: this.endDate,
          venue: this.venue,
          description: this.description,
          scheduledBy: this.userinfo,
          userAttendees: selectedPeopleID,
          minutes: this.minutes,
          meetingDocuments: this.meetingDocuments
      }
        console.log(JSON.stringify(this.meeting));
        this.meetingService.updateNewMeeting(this.meeting)
    
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
