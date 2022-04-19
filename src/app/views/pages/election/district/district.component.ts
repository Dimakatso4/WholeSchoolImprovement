import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../../disputes/disputes.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  public districtName;
  public districts;


  noDisputes;
  districtCode;

  constructor(private router: Router, private appservice: AppService, private disputservice: DisputesService) { }

  ngOnInit(): void {

    this.disputservice.getAllDistricts().subscribe(res => {
      this.districts = res;
    }, err => {
      console.log(err);
      this.router.navigate(['/dashboard']);
    })


  }

  view(i) {
    sessionStorage.setItem("district", this.districts[i].code);
    this.router.navigate(['/election/schools']);
  }

  DailyReport(i) {
    sessionStorage.setItem("district", this.districts[i].code);
    this.router.navigate(['/election/daily-report']);
  }

}
