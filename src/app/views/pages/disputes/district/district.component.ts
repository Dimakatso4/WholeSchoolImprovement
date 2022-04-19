import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisputesService } from '../disputes.service';
import { AppService } from 'src/app/app.service';
import * as jquery from 'jquery';
import { Subject } from 'rxjs';

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

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.disputservice.getAllDistricts().subscribe(res => {
      console.log(res);
      this.districts = res;
      this.dtTrigger.next();
    }, err => {
      console.log(err)
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // processing: true,
      // responsive: true,
      paging: true,
      search: true

    };
  }

  view(i) {
    sessionStorage.setItem("district", this.districts[i].code);
    this.router.navigate(['/disputes/schools']);
    // console.log(this.districts[i].code)
  }

}
