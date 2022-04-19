import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-kpi-list',
  templateUrl: './kpi-list.component.html',
  styleUrls: ['./kpi-list.component.scss']
})
export class KpiListComponent implements OnInit {

  public data: any;
  public data1: any[];
  public dataKPI:any;
  public tempData: any;
  public selectedKPI:number[];
  public userRole = this.appservice.getLoggedInUserRole();

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private http: HttpClient, private appservice:AppService) { }

  ngOnInit(): void {

  
   
   



    
    
  }
  getKPIID(e :any,sseQuestionID:number)
  {

    if(e.target.checked)
    {
      console.log(sseQuestionID + 'Checked');
      this.selectedKPI.push(sseQuestionID); 
    }
    else{
      console.log(sseQuestionID + 'UNChecked');
      this.selectedKPI = this.selectedKPI.filter(m=>m!=sseQuestionID);

    }

    console.log(this.selectedKPI)
 

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  addKPI(){


    // this.selectedKPI = new Array<number>();

    // this.selectedKPI.forEach(function (value) { 
      
      for (let i = 0; i < this.selectedKPI.length; i++) {
        console.log(this.selectedKPI[i]);

     

          // localStorage.setItem("KPIInfo", this.tempData);
          
      }
    
      console.log(JSON.stringify(this.data1));
      // console.log(this.addlocalStorageService.getKpiListID()); 
      

    // }); 

    this.router.navigate(['../action-plan/intervate-kpi']);
  }
}
