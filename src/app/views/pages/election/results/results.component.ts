import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ElectionService } from '../election.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {

  currLat;
  currLng;

  noElections = false;

  electionResults;
  constructor(private router: Router, private electionService: ElectionService, private appService: AppService) { }

  ngOnInit(): void {


    if (this.appService.getLoggedInUserRole() === "SEO" || this.appService.getLoggedInUserRole() === "SGB" || this.appService.getLoggedInUserRole() === "PRINCIPAL" || this.appService.getLoggedInUserRole() === "OFFICE BEARER") {

      this.electionService.getElectionResultsBySchool(this.appService.getLoggedInEmisCode()).subscribe((res: any) => {
        this.electionResults = res;

        if (this.electionResults.length > 0) {
          this.noElections = false;
        } else {
          this.noElections = true;
        }

        console.log(res);
      });

    } else if (this.appService.getLoggedInUserRole() === "DEO") {

      this.electionService.getElectionResultsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((res: any) => {
        this.electionResults = res;

        if (this.electionResults.length > 0) {
          this.noElections = false;
        } else {
          this.noElections = true;
        }

        console.log(res);
      });

    } else if (this.appService.getLoggedInUserRole() === "HO" || this.appService.getLoggedInUserRole() === "PEO" || this.appService.getLoggedInUserRole() === "ADMIN") {

      this.electionService.getElectionResultsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((res: any) => {
        this.electionResults = res;

        if (this.electionResults.length > 0) {
          this.noElections = false;
        } else {
          this.noElections = true;
        }


        console.log(res);
      });
    }

  }

  openSaveCandidateModal(i) {
    console.log(this.electionResults[i].id)
    sessionStorage.setItem("electionId", this.electionResults[i].id)
    this.router.navigate(["/election/view"])
  }

}
