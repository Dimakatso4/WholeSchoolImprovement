import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../../disputes/disputes.service';
import { AppService } from 'src/app/app.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-school-table',
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit {

  public districtName;
  public schools;


  noDisputes;
  districtCode;

  constructor(private router: Router, private appservice: AppService, private disputservice: DisputesService) { }

  ngOnInit(): void {

    // districtCode: "EN"
    // emisCode: "700260018"
    // institutionName: 

    if(this.appservice.getLoggedInUserRole() == "PEO" || this.appservice.getLoggedInUserRole() == "HO"){
      this.districtCode = sessionStorage.getItem('district');
    } else {
      this.districtCode = this.appservice.getLoggedInDistrictCode();
    }

    

    this.disputservice.getDistrictByCode(this.districtCode).subscribe((res: any) => {
      this.districtName = res.districtName;

    }, err => {
      console.log(err)
      this.router.navigate(['/dashbaord'])
    })


    this.disputservice.getSchoolsByDistrict(this.districtCode).subscribe(res => {
      console.log(res);
      this.schools = res;

      if (this.schools.length > 0) {
        this.noDisputes = false;
      } else {
        this.noDisputes = true;
      }

    }, err => {
      console.log(err);
      this.noDisputes = true;
    })



  }

  view(i) {

    sessionStorage.setItem("school", this.schools[i].emisCode)
    this.router.navigate(['/election/monitor-view']);
  
  }

}
