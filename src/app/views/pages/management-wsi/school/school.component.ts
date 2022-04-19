import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';
import { SseService } from '../../sse/sse.service';

@Component({
  selector: 'app-school-table',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnDestroy, OnInit {

  public districtName;
  public schools;


  noDisputes;
  public districtCode: any
  public officeLevel: any
  public isPageLoading: Boolean;
  public isHO: Boolean;



  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(
    private router: Router,
    private appservice: AppService,
    private sseService: SseService) { }

  ngOnInit(): void {

    // console.log(this.districtCode);
    this.isPageLoading = true;

    this.officeLevel = this.appservice.getLoggedInUserOfficeLevel();

    if (this.officeLevel == "District" || this.officeLevel == "School") {
      this.districtCode = this.appservice.getLoggedInDistrictCode();
      this.isHO = false;
    } else {
      this.isHO = true;
      this.districtCode = this.getDistrictCode();
    }

    /* if(this.appservice.getLoggedInUserRole() == "PEO" || this.appservice.getLoggedInUserRole() == "HO"){
      this.districtCode = sessionStorage.getItem('district');
    } else {
      this.districtCode = this.appservice.getLoggedInDistrictCode();
    } */

    this.sseService.getDistrictByCode(this.districtCode).subscribe((res: any) => {
      console.log(res);
      this.districtName = res.districtName;

    }, err => {
      console.log(err);
      this.districtName = ""
    });

    this.sseService.getSchoolsByDistrictCode(this.districtCode).subscribe(res => {
      console.log(res);
      this.isPageLoading = false;
      this.schools = res;
      this.dtTrigger.next();

    }, err => {
      this.isPageLoading = false;
      console.log(err);
      this.noDisputes = true;
    });


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

    sessionStorage.setItem("school", this.schools[i].emisCode)
    this.router.navigate(['/sse/list-sse']);

  }


  setEmisCode(code) {
    sessionStorage.setItem("school", code);
  }

  getEmisCode() {
    return sessionStorage.getItem("school");
  }

  getDistrictCode() {
    return sessionStorage.getItem("district");
  }

  viewSSE(school) {
    console.log(school)
    if (school) {
      this.setEmisCode(school.emisNumber);
      this.router.navigate(['/sse/list-sse']);
    }
  }

  viewSIP(school) {
    console.log(school)
   
    
    if (school) {
      this.setEmisCode(school.emisNumber);
      this.router.navigate(['/sse/sip/list-sip']);
    }

  }

  viewActionPlan(school) {
    console.log(school)
    
  }

  viewProfile(school) {
    console.log(school)
    
  }

  viewReport(school) {
    console.log(school)
    
  }


}
