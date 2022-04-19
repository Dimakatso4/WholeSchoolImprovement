import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/auth/login'])
  }

  parentlogin(){
    this.router.navigate(['/auth/parent-login'])
  }

  principallogin(){
    this.router.navigate(['/auth/principal-login'])

  }

}
