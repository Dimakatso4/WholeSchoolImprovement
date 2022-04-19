import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SseService } from '../../sse/sse.service';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnDestroy, OnInit {

  public districtName;
  public districts;
  public isPageLoading: Boolean;


  noDisputes;
  districtCode;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private router: Router,
    private appservice: AppService,
    private sseservice: SseService) { }

  ngOnInit(): void {

    sessionStorage.removeItem("district")
    sessionStorage.removeItem("school")

    if (this.appservice.getLoggedInUserOfficeLevel() == "District" ||
      this.appservice.getLoggedInUserOfficeLevel() == "School") {
      this.router.navigate(['sip/list-sip']);
    } else {

      this.isPageLoading = true;


      this.sseservice.getAllDistricts().subscribe(res => {
        this.isPageLoading = false;
        this.districts = res;
        this.dtTrigger.next();
      }, err => {
        console.log(err);
        this.isPageLoading = false;
      })

    }


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

    this.router.navigate(['/sip/school']);
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
      this.router.navigate(['/sip/sip-school']);

    }
  }


  viewSIPReport(distrcit) {
    if (distrcit) {
      this.setDistrictCode(distrcit.districtCode);
      this.router.navigate(['/sip/school']);

    }
  }

}
