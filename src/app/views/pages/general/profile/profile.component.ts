import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from "../profile.service";
import { UsersService } from "../..//users/users.service";
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userinfo: any;

  public fullname: any;
  public userID;
  // PARENT PROFILE
  public relationship = "";
  public typeOfSchool = "";
  public address1 = "";
  public address2 = "";
  public address3 = "";
  public addressPostalCode = "";
  public postal1 = "";
  public postal2 = "";
  public postal3 = "";
  public postalCode = "";

  constructor(
    private http: HttpClient,
    private userservice: UsersService,
    private router: Router,
    private appservice: AppService
  ) { }

  ngOnInit(): void {

    this.userinfo = {
      cell: "",
      city: "",
      complex: "",
      designation: "",
      districtCode: "",
      email: "",
      emisNumber: "",
      experience: "",
      firstName: "",
      gender: "",
      houseNumber: "",
      idNumber: "",
      informalsettlement: false,
      citizenship: "",
      persal: "",
      provinceId: "",
      qualification: "",
      section: "",
      streetName: "",
      surname: "",
    }

    this.userID = this.appservice.getLoggedInUserId();
    this.fullname = this.appservice.getIsLoggedInUsername();
    
    this.userservice.getUserId(this.appservice.getLoggedInUserId()).subscribe((res: any) => {
      this.userinfo = res
      console.log(this.userinfo);
    }, err => {
      console.log(err);
      this.router.navigate(['/dashbaord']);
    });
  }

  editprofile() {
    this.router.navigate(['../users/edit-profile']);
  }


}
