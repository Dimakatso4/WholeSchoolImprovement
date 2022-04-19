import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import {ManagementWsiService} from '../management-wsi.service';
import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
import { DataTableDirective } from 'angular-datatables';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

//
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake'


@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.scss']
})
export class ManagementUserComponent implements AfterViewInit, OnDestroy, OnInit {

  requiredForm: FormGroup;
  public year :any
  public activityName :any
  public  startDate :any
  public  endDate: any
  public responsibility :any
  public comment :any
  public startDate1 :any
  public endDate2 :any
  public status :any
  public planID :any
  public week:any
 public managementPlanActivityId 
  public SubActivityName: any
  public SubStartDate: any
  public SubEndDate: any
  public SubResponsibility: any
  public  ActivityId:any
  public districtCode:any
  public userinfo:any
  public districtName:any
  public lisSub= []
  public HeadList=[]
  list: any ={}
  noDisputes;
  lis=[]
  li:any;
  ///
  title = 'htmltopdf';
   
  @ViewChild('pdfTable') pdfTable: ElementRef;

 // @ContentChild('pdfTable2') pdfTable2: ElementRef;
   
  public downloadAsPDF() {
    const doc = new jsPDF();
    
    const pdfTable = this.pdfTable.nativeElement;
    
    var html = htmlToPdfmake(pdfTable.innerHTML);
      
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
      
  }
  ///
  config = {
    isDayDisabledCallback: (date) => [0, 6].includes(date.day()) 
  };
  
 // thus we ensure the data is fetched before rendering
 @ViewChild(DataTableDirective, { static: false })
 dtElement: DataTableDirective;
// dtTrigger: Subject<any> = new Subject<any>();

 @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
 ///
  constructor(private modalService: NgbModal,     config: NgbModalConfig,  private userservice: UsersService,
    private appservice: AppService, private fb: FormBuilder,private router: Router,private managementwsiservice: ManagementWsiService)  {

   // customize default values of modals used by this component tree
   config.backdrop = 'static';
   config.keyboard = false;
   }
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this.userinfo=this.appservice.getLoggedInUserId();
    console.log(this.userinfo);
    this.userservice.getUserId(this.userinfo).subscribe((data:any)=>{
     this.districtCode =data.districtCode;
     this.districtName=data.districtName;
     console.log("Current user info",data)
     console.log( "Current user info",this.districtName ,  this.districtCode)
    })
    
        //get api
        this.managementwsiservice.ManagementListView().subscribe((data:any)=>{
          //console.warn(data)
          
          this.li=data;
          this.lis=this.li;
          console.log(this.li)
         
        })

        
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  openEditModel1(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });

}



//ViweDistrictList
openEditModel6(content, id,name,startDate,endDate,periodID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  this.districtCode=this.districtCode;
   this.activityName=name;
  // this.periodID=periodID;
  // this.minDate=moment(startDate).format('YYYY-MM-DD');
  // this.maxDate=moment(endDate).format('YYYY-MM-DD');
  console.log( this.managementPlanActivityId ,  this.districtCode);
  this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
    
    this.lisSub=list;
    console.log("this is main and sub-Activity-list", this.lisSub);
  })
    

}

//ViweHeadOfficeList
openEditModelHeadOffice(content, id,name,startDate,endDate,periodID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  this.districtCode=this.districtCode;
   this.activityName=name;
  // this.periodID=periodID;
  // this.minDate=moment(startDate).format('YYYY-MM-DD');
  // this.maxDate=moment(endDate).format('YYYY-MM-DD');
  console.log( this.managementPlanActivityId ,  this.districtCode);
  this.managementwsiservice.getAllSubActivities(this.managementPlanActivityId,this.districtCode).subscribe((list:any)=>{
    
    //this.lisSub=list;
   // console.log("this is main and sub-Activity-list", this.lisSub);
    this.lisSub = list.filter(function (data) {

      return data.statusID == 4;

    });
  })
    

}

 //ViweHeadOffList
 ModelHeadSub(content, id,name,startDate,endDate,periodID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  //this.districtCode=this.districtCode;
   this.activityName=name;
   this.managementwsiservice.GetHeadOfficeSubListByMainId(this.managementPlanActivityId).subscribe((data:any)=>{
    console.log("data for sub in head off per Activi",data)
    this.HeadList=data;
  })
    

}

}


  