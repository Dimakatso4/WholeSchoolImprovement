import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {

  results;
  reason;
  error = false;
  certificate;
  fullname;
  userId = this.route.snapshot.params['userid'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.results = document.getElementsByName('optionsRadios');

    this.fullname = localStorage.getItem('firstname') + " " + localStorage.getItem('surname');

    this.route.queryParams.subscribe(params => {

      if(params.userid != undefined) {
        this.userId = params.userid;
        localStorage.setItem("UserId",this.userId);
      }

    });
    


  }


  decline() {

  }

  agree() {
    
    if (this.userId == undefined) {
      this.router.navigate(['./Activate-New-Profile']);
    } else {
      this.router.navigate(['./Activate-New-Profile']);
    }

  }

  scrollTo(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  hideError() {
    this.error = false;
  }

  submitResults() {
    this.error = false
//  console.log(this.re)
    if (this.results == "accept" || this.results == "decline") {

      if (this.results == "accept") {
        console.log("Proceed to create profile");
        this.router.navigate(['./Activate-New-Profile']);
      } else {
        if (this.reason == '' || this.reason == undefined && this.results == "decline") {
          this.error = true;
        } else {
          console.log("Send Notification to principal");
          this.router.navigate(['./auth/login']);
        }
      }
    }

  }



}
