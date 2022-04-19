import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarService } from "../navbar.service";
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2'
import * as moment from 'moment'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isParent: Boolean;
  public parentNominated: Boolean;
  public NominationStarted: Boolean;
  public hasMultipleRole: Boolean;
  public hasMultipleSchools: Boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private navbarservice: NavbarService,
    private appService: AppService

  ) { }

  public userinfo: any;
  public userID;
  public role;
  public roleid;
  public rolename;

  ngOnInit(): void {
    this.isParent = false;
    this.userinfo = this.appService.getIsLoggedInUsername();
    this.roleid = this.appService.getIsLoggedInRoleID();
    this.rolename = this.appService.getIsLoggedInRoleName();
    // this.BusinessUnit = this.appService.getLoggedBusnissUnit()
    if (this.roleid == 1) {
      if (this.document.getElementById("aUsers")) {
        this.document.getElementById("aUsers").style.display = "block";
      }
      if (this.document.getElementById("anextlink")) {
        this.document.getElementById("anextlink").style.display = "block";

      }

    } else {
      if (this.document.getElementById("aUsers")) {
        this.document.getElementById("aUsers").style.display = "none";
      }
      if (this.document.getElementById("anextlink")) {
        this.document.getElementById("anextlink").style.display = "none";

      }
    }
    this.userID = this.appService.getLoggedInUserId();
    this.hasMultipleRole = false;

    if (this.appService.getUserHasMultipeRoles() == "true") {
      this.hasMultipleRole = true;
    }

    this.navbarservice.getRoleById(this.userID).subscribe((res: any) => {

      this.role = this.appService.getLoggedInUserRole();
      console.log(res);
      if (this.role == "PARENT") {
        let date = moment(new Date()).format('YYYY-MM-DD')
        this.isParent = true;

        this.navbarservice.getUserById(this.appService.getLoggedInUserId()).subscribe((user: any) => {
          console.log(user)

        }, err => {
          console.log(err);
        });


        // if (this.appService.getLoggedInUserRole() == "PARENT") {
        //   this.navbarservice.checkIfParentDecided(this.appService.getLoggedInEmisCode(), this.appService.getLoggedInParentId()).subscribe((user: any) => {
        //     console.log(user);

        //     if (user) {
        //       let nominated = user.isNominated;
        //       let delined = user.hasDecline;

        //       if (nominated && delined == null) {
        //         this.parentNominated = true;
        //         Swal.fire({
        //           toast: true,
        //           position: 'top-end',
        //           showConfirmButton: false,
        //           timer: 2000,
        //           title: 'New Notification',
        //           icon: 'info'
        //         })
        //       }

        //     }
        //   }, err => {
        //     console.log(err)
        //   });

        //   this.navbarservice.getSchoolByParentId(this.appService.getLoggedInParentId()).subscribe((schools: any) => {
        //     // console.log(schools);
        //     if (schools) {
        //       if (schools.length > 1) {
        //         this.hasMultipleSchools = true;
        //       }
        //     }
        //   }, err => {
        //     console.log(err);
        //   })

        // }

        // checks if parent is nominated and has accepted or declined
        // this.navbarservice.getNominatedParents(this.appService.getLoggedInEmisCode()).subscribe((parents: any) => {
        //   console.log(parents)
        //   let parentid = this.appService.getLoggedInParentId();
        //   const NominatedParent = parents.filter(function (parent) {
        //     return [parentid].includes(parent.parentID)
        //   });

        //   console.log(NominatedParent)
        //   if (NominatedParent.length > 0) {

        //     if (NominatedParent[0].isNominated) {
        //       this.navbarservice.checkIfParentDecided(this.appService.getLoggedInEmisCode(), this.appService.getLoggedInParentId()).subscribe((res: any) => {
        //         console.log(res)
        //         if (!res || res.hasDecline == null) {
        //           this.parentNominated = true;
        //           if (sessionStorage.getItem('messageSeen') != "true") {
        //             sessionStorage.setItem('messageSeen', 'true');
        //             Swal.fire({
        //               toast: true,
        //               position: 'top-end',
        //               showConfirmButton: false,
        //               timer: 6000,
        //               title: 'New Notification',
        //               icon: 'info'
        //             })
        //           }
        //         } else {
        //           this.parentNominated = false;
        //         }
        //       }, err => {
        //         console.log(err);
        //       })
        //     }
        //   }

        // }, err => {
        //   console.log(err)
        // })


        // checks if nomination has started and parent has nominated yet
        // this.navbarservice.getScheduledNominationByEmisCode(this.appService.getLoggedInEmisCode(), date).subscribe((nomination: any) => {
        //   console.log(nomination)
        //   if (nomination) {

        //     if (nomination.nominationFlag == "HasStarted") {
        //       this.navbarservice.getUserById(this.appService.getLoggedInUserId()).subscribe((user: any) => {
        //         if (!user.secondedAlready || !user.nominatedAlready) {
        //           this.NominationStarted = true;
        //         }
        //       }, err => {
        //         console.log(err)
        //       })
        //     }

        //   }
        // }, err => {
        //   console.log(err)
        // })


      }
    });
    //console.log(JSON.stringify(this.userinfo));

  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.clear();


    if (this.userID || this.roleid[1] == "ADMIN") {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  editProfile() {
    this.router.navigate(['./users/edit-profile']);

  }


}
