import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SseService } from '../../sse/sse.service';
import { AppService } from 'src/app/app.service';
import { DipService } from '../dip.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class SSEDistrictComponent implements OnDestroy, OnInit {

  public districtName;
  public districts;
  public isPageLoading: Boolean;


  noDisputes;
  districtCode;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private router: Router,
    private dipservice: DipService,
    private appservice: AppService,
    private sseservice: SseService) { }

  ngOnInit(): void {

    sessionStorage.removeItem("district")
    sessionStorage.removeItem("school");

    
    this.dipservice.GetBusinessUnits().subscribe(res => {
      this.isPageLoading = false;
      this.districts = res;
      this.dtTrigger.next();
    }, err => {
      console.log(err);
      this.isPageLoading = false;
    })

    // if (this.appservice.getLoggedInUserOfficeLevel() == "District" ||
    //   this.appservice.getLoggedInUserOfficeLevel() == "School") {
    //   this.router.navigate(['/sse/school']);
    // } else {

    //   this.isPageLoading = true;



    // }


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [1, 'asc']
    }


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  view(i) {
    sessionStorage.setItem("district", this.districts[i].districtCode);

    this.router.navigate(['/sse/school']);
  }

  DailyReport(i) {
    sessionStorage.setItem("district", this.districts[i].code);
    this.router.navigate(['/election/daily-report']);
  }

  setDistrictCode(code) {
    sessionStorage.setItem("district", code);
  }

  getDistrictCode() {
    return sessionStorage.getItem("district");
  }

  viewSchools(distrcit) {
    if (distrcit) {
      this.setDistrictCode(distrcit.districtCode);
      this.router.navigate(['/sse/school']);

    }
  }


  viewSSEReport(distrcit) {
    if (distrcit) {
      this.setDistrictCode(distrcit.districtCode);
      this.router.navigate(['/sse/school']);

    }
  }

}
