import { Component, OnDestroy, OnInit,ViewChildren, QueryList, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { MeetingService } from '../../meeting/meeting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../users/users.service';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElectionService } from '../election.service';
declare var $: any;

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnDestroy,OnInit {
  @ViewChildren("checkbox") checkbox: QueryList<ElementRef>;

  public todaysDate:  any =  this.toISOLocal(new Date())
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public emisCode = this.appservice.getLoggedInEmisCode();
  public userRole = this.appservice.getLoggedInUserRole();
  public dtOptions: DataTables.Settings = {};
  public userID = this.appservice.getLoggedInUserId();
  public votersRoll:any;
  public schoolName:any;
  public castVote:any = 0;
  public voteField: any = false;
  public basicModalCloseResult: string = '';
  public maxVotes:any;
  public year = new Date(this.todaysDate)
  public voteYear = this.year.getFullYear()
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public formBuilder: FormBuilder,
    private appservice: AppService, 
    private modalService: NgbModal,
    private userservice:UsersService,
    private electionService: ElectionService,
    public datepipe: DatePipe
    ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc'],
      columnDefs: [
            {
                targets: -1,
                className: 'dt-center',
                
            }
          ]
    };

    this.userservice.getSchoolByEmisNumber(this.emisCode).subscribe((res: any) => {
        this.schoolName = res[0].institutionName
        console.log(JSON.stringify(res));
    });

    this.userservice.getAllUsers().subscribe((res: any) => {
     
      let emisCode = this.emisCode
      let filtered:any
      filtered = res.filter(function(e) {
        return(e['emisNumber'] == emisCode/* && e['userType'] == "PARENT"*/)
      });
      let people = filtered
      this.votersRoll = people.map((i) => { i.fullName =i.firstname + ' ' + i.surname; return i; });
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      
    });

    this.electionService.getNumberOfVotesAllowed(this.emisCode).subscribe((res: any) => {
    this.maxVotes = res

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

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => {});
  }
  
  public votedPeopleID:any = []
  public id:any = []
  castVoteCount(e,roll){
      //alert(JSON.stringify(e))
    if(e.target.checked){
      this.castVote ++
      this.votedPeopleID.push({id:roll.id, firstname:roll.firstname, surname:roll.surname, districtCode: roll.districtCode, emisNumber:roll.emisNumber,userType:roll.userType})
      this.id.push(roll.id)
    }else{
      this.castVote --
      this.votedPeopleID.pop({id:roll.id, firstname:roll.firstname, surname:roll.surname, districtCode: roll.districtCode, emisNumber:roll.emisNumber,userType:roll.userType})
      this.id.pop(roll.id)
    }
  }

  uncheckAll() {
    this.checkbox.forEach((element) => {
      element.nativeElement.checked = false;
    });
  
    this.votedPeopleID = []
    this.id = []
    this.castVote = 0
  }

  voteSubmit(){

    let votedfor:any
    let finalVoteList:any
    for(var i =0 ; i < this.votedPeopleID.length; i++){
      votedfor += this.votedPeopleID[i].firstname+' '+this.votedPeopleID[i].surname+'\n ,'
    }
    finalVoteList = votedfor.substring(9)
    
    Swal.fire({
      title: 'Save Meeting?',
      text: 'Are you sure you want to vote for :'+finalVoteList.substring(0,finalVoteList.length- 1)+'?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
         //alert(JSON.stringify( this.votedPeopleID))
         let totalVotes
         totalVotes = {
           userID: this.userID,
           emisCode: this.emisCode,
           votes : this.id,
           voteYear: this.voteYear
         }


         console.log(JSON.stringify(totalVotes))
         //alert(this.userID)
        // alert(this.emisCode)
         //alert(JSON.stringify( this.id))
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
      location.reload();
    })
   
  }



}
