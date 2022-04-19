import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as jquery from 'jquery';
// import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { UsersService } from '../../users/users.service';
import { NominationsService } from '../nominations.service';
import { AppService } from 'src/app/app.service'
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-nominate',
  templateUrl: './nominate.component.html',
  styleUrls: ['./nominate.component.scss']
})
export class NominateComponent implements OnInit, OnDestroy {

  currentIndex;
  nominees: any = [];
  secondees: any = [];
  nominated: boolean = false;
  seconded: boolean = false;
  loggedInUser: any;
  parentNominated: any;
  parentSeconded: any;
  emisCode: any;
  userId: any;
  parentId: any;
  public currentElection: any;

  public noNominees: Boolean;
  public noSecondee: Boolean;
  public isProcessComplete: Boolean;
  public nominationComplete: Boolean;
  public secondingComplete: Boolean;
  public nominatedParents: any;

  constructor(
    private router: Router,
    private nominationservice: NominationsService,
    private userService: UsersService,
    private appservice: AppService) {
    this.currentIndex = -1;
  }

  secOptions: DataTables.Settings = {};
  secTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  nomTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    sessionStorage.setItem('secondedUser', null);
    sessionStorage.setItem('nominatedUser', null);
    this.noNominees = false;
    this.noSecondee = false;
    this.parentId = this.appservice.getLoggedInParentId();
    this.emisCode = this.appservice.getLoggedInEmisCode();
    this.userId = parseInt(this.appservice.getLoggedInUserId());






    /*this.userService.getUserById(parseInt(this.userId)).subscribe((res: any) => {
      console.log(res)

      this.loggedInUser = res;
      this.nominationComplete = res.nominatedAlready;
      this.secondingComplete = res.secondedAlready;
      if (res) {

        if (res.nominatedAlready && res.secondedAlready) {
          this.isProcessComplete = true;
        }
        this.nominated = res.isNominated;
        this.seconded = res.isSeconded;



      }

    });*/

    let parentid = this.appservice.getLoggedInParentId();
    let userid = this.appservice.getLoggedInUserId();

    // Nominees
    this.nominationservice.getNominationsList(this.emisCode, false).subscribe((res: any) => {
      console.log(res);

      this.nominees = res.filter(function (e) {
        return ![parentid].includes(e.parentID) && e.nominatedBy == 0;
      });


      // console.log(this.nominees);
      //*ngIf="nominee.parentID != parentId || nominee.isNominated" 

      if (res.length == 0) {
        this.noNominees = true;
      }
      this.nomTrigger.next();
    }, err => {
      console.log(err)
    });

    //Nominated waiting to be seconded
    this.nominationservice.getNominationsList(this.emisCode, true).subscribe((res: any) => {
      console.log(res);

      this.nominatedParents = res
      this.secondees = res.filter(function (e) {
        return ![parentid].includes(e.parentID) && ![userid].includes(e.nominatedBy) && e.hasDecline == false;
      });



      if (this.secondees.length == 0) {
        this.noSecondee = true;
      }
      this.secTrigger.next();
    }, err => {
      console.log(err)
      this.noSecondee = true;
    });

    $('#nomineeDatatable tbody').on('click', 'tr', function () {

      if ($(this).find("td:eq(3)").text() == "F") {
        Swal.fire({
          title: 'Nominations',
          text: 'Are you sure you want to nominate ' + $(this).find("td:eq(0)").text() + " " + $(this).find("td:eq(1)").text() + "?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'

        }).then((result) => {
          if (result.value) {

            ///////
            $('#nomineeDatatable tbody').find('tr').each(function (i, el) {
              $(this).find('td:eq(2)').html('<i></i>');
            });

            $(this).find("td:eq(2)").html('<i class="mdi mdi-check"></i>');
            this.currentIndex = $(this).index();
            console.log($(this).attr('id'));

            ////
            sessionStorage.setItem('nominatedUser', $(this).attr('id'))


          }

        })

      }
    })


    $('#secondDatatable tbody').on('click', 'tr', function () {
      //console.log($(this).find("td:eq(0)").text());
      //console.log($(this).attr('id')); get row id
      /* if(this.currentIndex > -1){
        console.log('remove lI');
        $(this).find("td:eq(2)").empty();
      }
 
      $(this).find("td:eq(2)").append('<i class="mdi mdi-check"></i>');
      this.currentIndex = $(this).index();
      console.log(this.currentIndex); */
      if ($(this).find("td:eq(3)").text() == "F") {

        Swal.fire({
          title: 'Second',
          text: 'Are you sure you want to second ' + $(this).find("td:eq(0)").text() + " " + $(this).find("td:eq(1)").text() + "?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'

        }).then((result) => {
          if (result.value) {

            ///////
            $('#secondDatatable tbody').find('tr').each(function (i, el) {
              $(this).find('td:eq(2)').html('<i></i>');
            });

            $(this).find("td:eq(2)").html('<i class="mdi mdi-check"></i>');
            this.currentIndex = $(this).index();
            console.log($(this).attr('id'));


            sessionStorage.setItem('secondedUser', $(this).attr('id'))

            ////

          }

        })

      }

    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']]

    };


    this.secOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc']]

    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.nomTrigger.unsubscribe();
    this.secTrigger.unsubscribe();
  }

  saveChanges() {

    let nominatedUser;



    if (this.nominationComplete) {
      let userid = this.appservice.getLoggedInUserId();
      let nominatedparent = this.nominatedParents.filter(function (e) {
        return userid == e.nominatedBy;
      });
      if (nominatedparent || nominatedparent.length > 0) {
        nominatedUser = !nominatedparent[0].parentID ? null : nominatedparent[0].parentID;
      } else {
        nominatedUser = sessionStorage.getItem('nominatedUser') == "null" ? null : sessionStorage.getItem('nominatedUser');
      }
    } else {
      nominatedUser = sessionStorage.getItem('nominatedUser') == "null" ? null : sessionStorage.getItem('nominatedUser');
    }
    // console.log(nominatedparent[0].parentID);
    let secondedUser = sessionStorage.getItem('secondedUser') == "null" ? null : sessionStorage.getItem('secondedUser');

    if (!this.nominationComplete && nominatedUser || this.nominationComplete && secondedUser) {


      if (sessionStorage.getItem('nominatedUser') != "null") {
        this.nominated = true;
      }


      if (sessionStorage.getItem('secondedUser') != "null") {
        this.seconded = true;

      }

      Swal.fire({
        title: 'Save Nomination?',
        text: 'Your nomination details will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).then((result) => {
        if (result.value) {


          this.nominationservice.saveNominations(this.userId, parseInt(nominatedUser), this.nominated, this.seconded, this.emisCode).subscribe((res: any) => {
            console.log(res);
            this.nominationservice.sendNominationNotification(parseInt(nominatedUser), this.emisCode).subscribe(sms => {
              console.log(sms);
              Swal.fire(
                'Confirmation!',
                'You nomination was saved.',
                'success'
              ).then(result => {
                if (result.value || result.isDismissed) {
                  this.router.navigate(['/dashboard']);

                }
              })

            }, err => {
              console.log(err);
              Swal.fire(
                'Error',
                'Your entry was unsuccessful, please try again',
                'error'
              )
            })


          }, (err) => {
            console.log(err);
            Swal.fire(
              'Error',
              'Your entry was unsuccessful, please try again',
              'error'
            )
          })

        }

      })
    } else {

      Swal.fire(
        this.nominationComplete ? 'Did not second' : 'Did not nominate',
        this.nominationComplete ? 'Please second someone before saving' : 'Please nominate someone before saving',
        'error'
      )

    }

  }

  cancell() {

    $('#nomineeDatatable tbody').find('tr').each(function (i, el) {
      $(this).find('td:eq(2)').html('<i></i>');
    });
    sessionStorage.setItem('nominatedUser', null);

    $('#secondDatatable tbody').find('tr').each(function (i, el) {
      $(this).find('td:eq(2)').html('<i></i>');
    });
    sessionStorage.setItem('secondedUser', null);

  }

}
