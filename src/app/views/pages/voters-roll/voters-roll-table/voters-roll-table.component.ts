import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { VoterDetailsService } from '../voter-details.service'
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service'

// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-voters-roll-table',
  templateUrl: './voters-roll-table.component.html',
  styleUrls: ['./voters-roll-table.component.scss']
})
export class VotersRollTableComponent implements OnDestroy, OnInit {

  voters;
  voter;
  emiscode;

  public data: any;
  public nominations: any;

  dtTrigger: Subject<any> = new Subject<any>();
  public dtOptionsNom: any = {};
  basicModalCloseResult: string = '';
  nominee: any;
  votersRoll: any
  nomineeEditForm: FormGroup;
  votersRollEditForm: FormGroup;
  noData;

  constructor(private voterservice: VoterDetailsService, private router: Router, private appservice: AppService, private route: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true
    // };
    this.emiscode = this.appservice.getLoggedInEmisCode();

    this.nomineeEditForm = this.formBuilder.group({
      firstNameNominee: "",
      lastNameNominee: "",
      institutionNameNominee: "",
      idNumberNominee: "",
      mobileNonNominee: "",
      mobileBlackListed: ""

    });

    this.votersRollEditForm = this.formBuilder.group({
      firstNameVottersRoll: "",
      lastNameVottersRoll: "",
      institutionVottersRoll: "",
      idNumberVottersRoll: "",
      mobileNonVottersRoll: "",
      mobileBlackListed: ""

    });


    this.noData = true;
    // this.voterservice.getAllVotersRoll(this.emiscode).subscribe((res: any) => {
    //   console.log(res);
    //   this.votersRoll = res;

    //   this.dtTrigger.next();
    // });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  openBasicModal(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }

  viewVottersRoll(i) {
    console.log('view ', i);

  }

  editVottersRoll(i) {
    console.log("edit ", i);

  }

  deleteVottersRoll(i) {
    console.log("delete ", i);

  }


  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }

  onSubmitNominee() {

    // this.electionService.saveVoterInformation(this.nominee);
    Swal.fire(
      'Confirmation!',
      'Information was saved.',
      'success'
    )
  }

  onSubmitVotersRoll() {
    Swal.fire(
      'Confirmation!',
      'Information was saved.',
      'success'
    )
  }

  /* const dataTable = new DataTable("#dataTableExample");
  this.votersService.getInfoByEmisCode(this.emisCode).subscribe(res => {

    this.voters = res;
    console.log(res); */

  // for (var x = 0; x < this.voters.length; x++) {
  //   this.voter = [
  //     this.voter[x].title,
  //     this.voter[x].startDate,
  //     this.voter[x].startTime,
  //     this.voter[x].scheduledBy,
  //     "<a><i class='mdi mdi-eye text-dark' (click)='view(0)'></i></a>&nbsp;&nbsp;&nbsp;<a><i class='mdi mdi-pencil text-dark' (click)='edit(0)'></i></a>"
  //   ]
  // }

  /*       let importData = {
          headings: [
            "Name",
            "I.D./Password",
            "Email",
            "Name of Child",
            "Grade of Child",
            "Action"
          ],
          data: [
            this.voter
          ]
        }
        dataTable.insert(importData);
        console.log(this.voters);
  
  
  
      }); */

}
