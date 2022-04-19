import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { MeetingService } from '../../meeting/meeting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UsersService } from '../../users/users.service';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common'
import { CourseService } from '../course.service';
declare var $: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnDestroy, OnInit {
  selectedPersonId: string = null;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  public title:any;
  public startDate: any =  this.toISOLocal(new Date())
  public endDate: any =  this.toISOLocal(new Date())
  public todaysDate:  any =  this.toISOLocal(new Date())
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
  public selectedPeople: any = null;
  public emisCode = this.appservice.getLoggedInEmisCode();
  public selectedEmisCode:any;
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public meetingDocuments:any=[];
  public userRole = this.appservice.getLoggedInUserRole();
  public userId = this.appservice.getLoggedInUserId();
  public inviteType:any;
  public trainingTypes:any;
  public data:any;
  public dtOptions: DataTables.Settings = {};
  public schools:any;
  public selectedGroup:any;
  public districts:any; 
  public selectedPeopleID:any = [];
  public show:boolean = false;
  public show1:boolean = false;
  public venuePresent:any;
  public document:any;

  editvalidationForm: FormGroup;
  editisCreateFormSubmitted: Boolean;
  public edittitle:any;
  public editstartDate: any 
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
  public dtOptions2:any
       

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  training: any;

  constructor(
    private meetingService:MeetingService, 
    private router: Router, 
    private appservice: AppService, 
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userservice:UsersService,
    public datepipe: DatePipe,
    public courseService:CourseService
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
      ordering:  true,
      order: ['0','desc']
    };

    this.validationForm = this.formBuilder.group({
      inviteType:['', Validators.required],
      title: ['', Validators.required],
      startDate:['', Validators.required],
      endDate: ['', Validators.required],
      venue: ['', Validators.required],
      description: ['', Validators.required],
      selectedPeople: ['', Validators.required]
    })
    
    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      edittitle: ['', Validators.required],
      editstartDate:['', Validators.required],
      editendDate: ['', Validators.required],
      editvenue: ['', Validators.required],
      editdescription: ['', Validators.required],
      editselectedPeople: ['', Validators.required],
      minutes: ['', Validators.required]
    })
    this.editisCreateFormSubmitted = false;
    
    this.courseService.getTraining().subscribe((res: any) => {
        this.training = res;
       // alert(JSON.stringify(this.training))
      });

    this.meetingService.getTrainingTypes().subscribe((res: any) => {
      let filtered;
      if(this.userRole == "HO" ){
         filtered = res.filter(function(e) {
          return [9].includes(e.id) 
        });
      }else if(this.userRole == "PEO"){
        filtered = res.filter(function(e) {
          return [10].includes(e.id) 
        });
      }else if(this.userRole == "DO"){
        filtered = res.filter(function(e) {
          return [11].includes(e.id) 
        });
      }else if(this.userRole == "DEO"){
        filtered = res.filter(function(e) {
          return [12].includes(e.id) 
        });
      }else if(this.userRole == "PRINCIPAL"){
        filtered = res.filter(function(e) {
          return [13].includes(e.id) 
        });
      }else if(this.userRole == "SEO"){
        filtered = res.filter(function(e) {
          return [14].includes(e.id) 
        });
      }
      
      this.trainingTypes = filtered
      this.description = this.trainingTypes[0].agenda
      this.inviteType = filtered[0]
    });

    this.meetingService.getAllvenues().subscribe((res: any) => {
      this.venuePresent = res
    })

    this.userservice.getAllUsers().subscribe((res: any) => {
      //console.log(res);
      let filtered:any = res;
      /*if(this.userRole == "HO" || this.userRole == "PEO" ){
        filtered = res.filter(function(e) {
        return(e['userType'] == "PEO" || e['userType'] == "HO" || e['userType'] == "DEO")
      });
      }else if(this.userRole == "DO" || this.userRole == "DEO"){
     
        let district = this.districtCode
         filtered = res.filter(function(e) {
         return(e['districtCode'] == district && e['userType'] == "DEO" || e['districtCode'] == district && e['userType'] == "SEO" || e['districtCode'] == district && e['userType'] == "PRINCIPAL" ||  e['districtCode'] == district && e['userType'] == "SGB" ||  e['districtCode'] == district && e['userType'] == "District Monitors" ||  e['districtCode'] == district && e['userType'] == "District Observers")
       });
      }else if(this.userRole == "PRINCIPAL" || this.userRole == "SEO"){
        let emisCode = this.emisCode
         filtered = res.filter(function(e) {
         return(e['emisNumber'] == emisCode)
       });
      }*/
      filtered.forEach(function(obj) {
        for(var i in obj) { 
          if(obj[i] === 'undefined') {
            obj[i] = null;
          }
        }
      });
      let people  = filtered
      console.log(people)
      this.atendents = people.map((i) => { i.fullName =i.firstname + ' ' + i.surname +' '+i.districtCode + ' ' +i.userType + ' ' +i.emisNumber  ; return i; });
      this.editatendents = people.map((i) => { i.fullName =i.firstname + ' ' + i.surname +' '+i.districtCode + ' ' +i.userType + ' ' +i.emisNumber  ; return i; });
    });

    this.meetingService.getAllMeetings().subscribe((res: any) => {
      let PlusDate:any;
      for(var i = 0; i<res.length; i++ ){
        PlusDate = new Date(res[i].endDate);
        PlusDate.setDate(PlusDate.getDate() + 5);
        res[i].DayPlus = this.toISOLocal(PlusDate)
      }
      console.log(res)
      let filtered:any;
      if(this.userRole == "HO" ){
        filtered = res.filter(function(e) {
          return (  e['meetingTypeId'] == 9);
        });
      }else  if(this.userRole == "PEO" ){
        filtered = res.filter(function(e) {
          return (  e['meetingTypeId'] == 10);
        });
      }else  if(this.userRole == "DO" ){
        let district = this.districtCode
         filtered = res.filter(function(e) {
          return ( e['districtCode'] == district && e['meetingTypeId'] == 11);
        });
      }else  if(this.userRole == "DEO" ){
        let district = this.districtCode
         filtered = res.filter(function(e) {
          return ( e['districtCode'] == district && e['meetingTypeId'] == 12);
        });
      }else  if(this.userRole == "PRINCIPAL" ){
        console.log(this.emisCode)
        let emis = this.emisCode
        let district = this.districtCode
         filtered = res.filter(function(e) {
          return ( e['districtCode'] == district && e['emisCode'] == emis && e['meetingTypeId'] == 13);
        });
       
      }else  if(this.userRole == "SEO" ){
        console.log(this.emisCode)
        let emis = this.emisCode
        let district = this.districtCode
         filtered = res.filter(function(e) {
          return (e['districtCode'] == district && e['emisCode'] == emis && e['meetingTypeId'] == 14);
        });
      }
      
        this.data = filtered;
        console.log(this.data)
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
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
    //this.editmeetingDocuments.push(event[1].path);

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
      
        for (var key in this.selectedPeople) {
          if (this.selectedPeople.hasOwnProperty(key)) {
             console.log(this.selectedPeople[key].id);
             this.selectedPeopleID.push(this.selectedPeople[key].id);
             
          }
       }
        this.meeting = {
          id: 0,
          userId: this.userId === 'undefined'?null:this.userId ,
          title: typeof this.title !== 'object'?this.title:this.title.title,
          startDate: this.startDate   === 'undefined'?null:this.startDate ,
          startTime: this.startDate   === 'undefined'?null:this.startDate ,
          endDate: this.endDate === 'undefined'?null:this.endDate ,
          endTime: this.endDate  === 'undefined'?null: this.endDate ,
          venue: typeof this.venue !== 'object'?this.venue:this.venue.title,
          description: this.description === 'undefined'?null:this.description ,
          scheduledBy: this.userinfo === 'undefined'?null: this.userinfo,
          userAttendees: this.selectedPeopleID === 'undefined'?null:this.selectedPeopleID,
          meetingDocuments: this.meetingDocuments.length == 0?["https://gdeelectionsstorage.blob.core.windows.net/sktcontainer/Vol21ISSUE1April2014.pdf"]:this.meetingDocuments,
          MeetingTypeId: this.inviteType.id  === 'undefined'?null:this.inviteType.id ,
          userRole:this.userRole === 'undefined'?null:this.userRole,
          districtCode :this.districtCode === 'undefined'?null:this.districtCode,
          emisCode :this.emisCode === 'undefined'?null:this.emisCode
      }
      console.log(JSON.stringify(this.meeting))
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
      this.editselectedPeople =  people.map((i) => { i.fullName = i.firstname + ' ' + i.surname + ' ' +i.districtCode + ' ' +i.userType + ' '+i.emisNumber  ; return i; });
      console.log(this.editselectedPeople)
    })
    console.log(handover)
    this.editID =  handover.id
    this.edittitle = handover.title
    this.editstartDate = handover.startDate
    this.editendDate =  handover.endDate
    this.editvenue = handover.venue
    this.editdescription = handover.description
    this.minutes = handover.minutes
    this.editmeetingDocuments =  handover.meetingDocuments
    
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

        if(this.meetingDocuments.length != 0){
          this.meetingService.updateMeetingDocuments(this.userId,this.editID,this.meetingDocuments)
        }

        let debounceResize: number;   
        debounceResize = window.setTimeout(() => {
        this.meetingService.deleteAttendee(this.editID);
        }, 3000);

        let EditselectedPeopleID = [];
            let people = this.editselectedPeople
            console.log(JSON.stringify(people))
            for(var i = 0;i < people.length; i++ ){
              EditselectedPeopleID.push(people[i].id);
          }
          
          debounceResize = window.setTimeout(() => {
            this.meetingService.updateMeetingAtendees(this.editID,EditselectedPeopleID);
          }, 3000);

        this.meeting = {
          id:  this.editID,
          userId: this.userId,
          title: typeof this.edittitle !== 'object'?this.edittitle:this.edittitle.title,
          startDate: this.editstartDate,
          endDate: this.editendDate,
          venue: typeof this.editvenue !== 'object'?this.editvenue:this.editvenue.title,
          description: this.editdescription,
          scheduledBy: this.userinfo,
          minutes: this.minutes,
          userAttendees: EditselectedPeopleID,
          meetingDocuments: this.meetingDocuments.length === 0?[" "]:this.meetingDocuments
      }
     
       this.meetingService.updateNewMeeting(this.meeting)
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
      
    })
    let debounceResize: number;
    debounceResize = window.setTimeout(() => {
      location.reload();
    }, 5000);
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
      this.dtOptions2 = {
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        searching: true,
        ordering:  true,
        order: ['4','desc']
      };
      this.meetingService.getMeetingDocuments(e.id).subscribe((res: any) =>{
        console.log(res)
        for (var key in res.meetingDocumentDetails) {
          if (res.meetingDocumentDetails.hasOwnProperty(key)) {
            res.meetingDocumentDetails[key].title = decodeURIComponent(res.meetingDocumentDetails[key].title)
          }
        }
        this.trainingDocuments = res.meetingDocumentDetails
      }); 
    }

    public viewAttendees:any
    getAttendees(e){
        this.meetingService.getMeetingAtendees(e.id).subscribe((res: any) =>{
          this.viewAttendees = res.attendees
          console.log( this.viewAttendees)
        
        });
      }

      handleInputChangeEdit(event) {
        this.venue = ""
        this.editvenue = ""
      }

      handleInputTraing() {
        this.title = ""
        this.edittitle = ""
      }

      deleteInvitee(element){   
        this.selectedPeople.splice(this.selectedPeople.findIndex(e => e.id === element),1);
        this.selectedPeople = this.selectedPeople.map((i) => { i.fullName =i.firstname + ' ' + i.surname +' '+i.districtCode + ' ' +i.userType + ' ' +i.emisNumber  ; return i; });
        console.log(this.selectedPeople)
      }

      deleteInviteeEdit(element){
        this.editselectedPeople.splice(this.editselectedPeople.findIndex(e => e.id === element),1);
        this.editselectedPeople = this.editselectedPeople.map((i) => { i.fullName =i.firstname + ' ' + i.surname +' '+i.districtCode + ' ' +i.userType + ' ' +i.emisNumber  ; return i; });
        console.log(this.editselectedPeople)
      }

      public meetingMinutes:any
      getAttenMinutes(e){
        this.meetingMinutes =  e
        this.meetingService.getMeetingDocuments(e.id).subscribe((res: any) =>{
          console.log(res)
          for (var key in res.meetingDocumentDetails) {
            if (res.meetingDocumentDetails.hasOwnProperty(key)) {
              res.meetingDocumentDetails[key].title = decodeURIComponent(res.meetingDocumentDetails[key].title)
            }
          }
          this.trainingDocuments = res.meetingDocumentDetails
        });
        this.meetingService.getMeetingAtendees(e.id).subscribe((res: any) =>{
          this.viewAttendees = res.attendees
          console.log( this.viewAttendees)
        
        });
      }

}
