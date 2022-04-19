import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { MeetingService } from '../../meeting/meeting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UsersService } from '../../users/users.service';


@Component({
  selector: 'app-peo-meeting',
  templateUrl: './peo-meeting.component.html',
  styleUrls: ['./peo-meeting.component.scss']
})
export class PeoMeetingComponent implements  OnDestroy, OnInit {


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
  public minutes:any = null;
  public scheduledBy: any;
  public people:any = [];
  public atendents:any;
  public meeting: any;
  public userinfo:any;
  public selectedPeople:any = null;
  public emisCode = this.appservice.getLoggedInEmisCode();
  public selectedEmisCode:any;
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public meetingDocuments:any=[];
  public userRole = this.appservice.getLoggedInUserRole();
  public inviteType:any;
  public trainingTypes:any;
  public data:any;
  public dtOptions: DataTables.Settings = {};
  public schools:any;
  public selectedGroup:any;
  public districts:any; 

  editvalidationForm: FormGroup;
  editisCreateFormSubmitted: Boolean;
  public edittitle:any;
  public editstartDate: any;
  public editendDate: any;
  public editstartTime: any;
  public editendTime: any;
  public editvenue:any;
  public editdescription:any;
  public editminutes:any;
  public editselectedPeople:any;
  public editselectedGroup:any;
  public editmeetingDocuments:any;
  public editID:any;
  public disableSelect: boolean = true;
  public editatendents:any;
       

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private meetingService:MeetingService, 
    private router: Router, 
    private appservice: AppService, 
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userservice:UsersService
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
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true
    };

    this.validationForm = this.formBuilder.group({
      inviteType:['', Validators.required],
      title: ['', Validators.required],
      startDate:['', Validators.required],
      endDate: ['', Validators.required],
      venue: ['', Validators.required],
      description: ['', Validators.required],
      selectedPeople: ['', Validators.required],
      meetingDocuments:''
    })
    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      edittitle: ['', Validators.required],
      editstartDate:['', Validators.required],
      editendDate: ['', Validators.required],
      editvenue: ['', Validators.required],
      editdescription: ['', Validators.required],
      editselectedPeople: ['', Validators.required],
      minutes: ['', Validators.required],
      editmeetingDocuments:''
    })
    this.editisCreateFormSubmitted = false;

    this.meetingService.getTrainingTypes().subscribe((res: any) => {
      const filtered = res.filter(function(e) {
        return [4].includes(e.id) 
      });
      this.trainingTypes = filtered
      this.inviteType = filtered[0]
    });

    this.userservice.getAllUsers().subscribe((res: any) => {
      this.atendents  = res.map((i) => { i.fullName ='Fullname:'+ i.firstname + ' ' + i.surname +' '+ 'Role:' +i.userType; return i; });
      this.editatendents = res.map((i) => { i.fullName ='Fullname:' + i.firstname + ' ' + i.surname +'||'+ 'District Code & Role:' +i.districtCode + ' '+'&'+' ' +i.userType + '||' +'Emis Code:' +i.emisNumber  ; return i; });
     });

    
    this.meetingService.getAllMeetings().subscribe((res: any) => {
      const filtered = res.filter(function(e) {
        return (e['meetingTypeId'] == 4);
      });
      this.data = filtered;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  get createForm() {
    return this.validationForm.controls;
  }

  get editForm() {
    return this.editvalidationForm.controls;
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

  openXlModal(content) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
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
        let selectedPeopleID = [];
        for (var key in this.selectedGroup) {
          if (this.selectedGroup.hasOwnProperty(key)) {
             console.log(this.selectedGroup[key].id);
             selectedPeopleID.push(this.selectedGroup[key].id);
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

       this.meetingService.createNewMeeting(this.meeting);
        Swal.fire(
          'Success',
          'Meeting saved.',
          'success'
        )
        location.reload();
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


  updateData(handover){
    this.meetingService.getMeetingAtendees(handover.id).subscribe((res: any) => {
      let people = res.attendees;
       this.editselectedPeople =  people.map((i) => { i.fullName ='Fullname:' + i.firstname + ' ' + i.surname +'||'+ 'District Code & Role:' +i.districtCode + ' '+'&'+' ' +i.userType + '||' +'Emis Code:' +i.emisNumber  ; return i; });
       console.log(this.editselectedPeople)
     })

    
    this.editID =  handover.id
    this.edittitle = handover.title
    this.editstartDate = handover.startDate
    this.editendDate =  handover.endDate
    this.editvenue = handover.venue
    this.editdescription = handover.description
    this.editmeetingDocuments = handover.documents
    this.minutes = handover.minutes
  }

  editsaveMeeting()
  {
    if (this.editvalidationForm.valid) {
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
    
        let editselectedPeopleID = [];
        for (var key in this.editselectedPeople) {
          if (this.editselectedPeople.hasOwnProperty(key)) {
             editselectedPeopleID.push(this.editselectedPeople[key].id);
             this.meetingService.updateMeetingAtendees(this.editID,this.editselectedPeople[key].id);
          }
       }
      
        this.meeting = {
          id:  this.editID,
          title: this.edittitle,
          startDate: this.editstartDate,
          endDate: this.editstartDate,
          venue: this.editvenue,
          description: this.editdescription,
          scheduledBy: this.userinfo,
          userAttendees: editselectedPeopleID,
          minutes: this.minutes,
          meetingDocuments: this.meetingDocuments
      }

       console.log(JSON.stringify(this.meeting));
       this.meetingService.updateNewMeeting(this.meeting)
       //this.meetingService.updateMeetingDocuments(this.editID,this.meetingDocuments)
        Swal.fire(
          'Success',
          'Meeting saved.',
          'success'
        )
        location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Meeting not saved',
          'error'
        )
      }
    })
  }
  this.editisCreateFormSubmitted = true;
  }
  
  getUserByDistrict(e){
    this.meetingService.getUsersByDistrict(e.code).subscribe((res: any) => {
      const filtered = res.filter(function(e) {
        return ['DEO'].includes(e.userType) 
      });
      this.people = filtered;
      this.selectedGroup = this.people.map((i) => { i.fullName ='Fullname:' + i.firstname + ' ' + i.surname +' '+ 'CellNumber:' + i.cellNumber + ' ' + 'Email:' + i.emailAddress + ' ' +'Role:' +i.userType; return i; });
    });  
  }

  public trainingDocuments:any =[]
  getDocuments(e){
      this.meetingService.getMeetingDocuments(e.id).subscribe((res: any) =>{
          this.trainingDocuments = res.meetingDocuments
      }); 
    }

}
