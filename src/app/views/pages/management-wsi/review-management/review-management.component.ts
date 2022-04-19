import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { data } from 'jquery';
import { ManagementWsiService } from '../management-wsi.service';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as moment from 'moment';
import { ManagementPlan, Status } from '../../../../model/management-plan.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsersService } from "../../users/users.service";
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from '../../auth/auth.service';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-review-management',
  templateUrl: './review-management.component.html',
  styleUrls: ['./review-management.component.scss']
})
export class ReviewManagementComponent implements OnInit {
  public lessons = [];

  ///
  public statusData:any
  public disable: boolean;
  public disableTick: boolean;
  public data: any
  userForm: FormGroup;
  userFormCommet:FormGroup;
  isFormSubmitted: Boolean;
  hoSubForm: FormGroup;
  public year: any
  public activityName="";
  public startDate: any
  public endDate: any
  public responsibility: any
  public comment: any
  public startDate1: any
  public endDate2: any
  public status:any
  public planID: any
  public PeriodID:any
  public periodList:any
  public statusID:any
  public managementPeriod:any
   public OfficeLevelList: any
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // adata=[100]
  noDisputes;

  //
  public roleId :any
  public lis :any []
  public lis2= []
  selec=[]
  array=[]
  li: any;
  lii:any
  //check array
  managementPlans: ManagementPlan[] = [];
  statuses: Status[] = [];
  onSucess: any;
  public SubDirectorate:any
  public districtName:any
  public region:any
  public Directorate:any
  public ChiefDirectorate:any
   public Branch:any
  public officelevel:any
  public dataList :any
  public position:any
  public id:any
  public buttons1 :any
  public buttons2 :any
  public buttons3 :any
  public buttons4:any
  public button1 :any
  public button2 :any
  public button3 :any
  public button4:any
  view=[]
  public currentRole :any
  public userinfo:any
  public userOffice:any
  public userDirectorate:any
  public user:any
  public usersubDirectorate:any
  public userBranch:any
  public responsibilityType:any
  public subOfficelevel:any
  public subActivityName:any
  public  subResponsibility:any
  public   subStartDate:any
  public   subEndDate:any
  public   subNewActityName:any
  public  subComment:any
  public  subStatus:any
 // public   subOfficelevel:any
  public   subBranch:any
  public   subChiefDirectorate:any
  public    subDirectorate:any
  public   subSubDirectorate:any
  public    subRegion:any
  public    subDistrictName:any
  public    subPosition:any
  //public   id:any
  public    subManagementPeriod:any
  public   StatusID:any
  public   subResponsibilityType:any

  public BranchSelected = "";
  public HODirectorate="";
  public HOCDDataData="";
  HPbranchPostion: any;
  Branches: any
  BranchCD: any
  HOAllPositionfilter: any;
  HODData: any;
  HOSDData: any;
  HOPOsition: any;
  regionsData: any;
  
  schoolsMainData: any;
  schoolsMain: any;
  districtsData: any;
  circuitsData: any;
  clustersData: any;
  regionsDatas: any;
  districtsDatas: any;
  circuitsDatas: any;
  clustersDatas: any;
  allDistrictSchools :any

  districtPosition: any;
  
  dispositionsdatasub: any;
  dispositionsdataposition: any;
  dispositiondataBuss: any;
  dispositiondatadir: any;
  dispositiondatadirid: any;
  dispositiondataid: any
  public temp:any
  public subdirectorateSelected = "";

  public allBranches: any;
  public allChiefDirectorate: any;
  public allDirectorate: any;;
  public allSubDirectorate: any;
  public allPosition: any;
  public chiefDirectorates: any = [];
  public directorates: any = [];
  public subDirectorates: any = [];
  public positions: any = [];
  
  public schoolPositionList: any
  public responsibilities =[]
  public Headposition  =[]
  public Districtposition =[]
  public positionId: any = [];
  public updateOfficelevel: any = "";
  public updateChiefDirectorate="";
  public updateDirectorate = "";
  public updateSubDirectorate = "";
  public updatePosition = "";

  //public updateOfficelevel="";
  public updateRegion: any = "";
  public updateDistrictName: any = "";
  public updateBranch: any = "";
  
  public isPageLoading: Boolean;

  

  ///
  @ViewChild('content') content: ElementRef;  

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private userservice: UsersService,
    private modalService: NgbModal,
    private appService: AppService, private managementwsiservice: ManagementWsiService,private ngxService: NgxUiLoaderService) { 

    }

  ngOnInit(): void {
    //table
    this.isPageLoading =true;
    this.getManagementPlans();
    this.getStatuses();
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      paging: true,
      responsive: true,
    };



    this.userForm = this.formBuilder.group({
      activityName: [''],
      responsibility: [''],
      startDate: [''],
      endDate: [''],
      newActityName: [''],
      comment: [''],
      status: [''],
      officelevel:[''],
      Branch:[''],
      ChiefDirectorate:[''],
      Directorate:[''],
      SubDirectorate:[''],
      region:[''],
      districtName:[''],
      position:[''],
      id:[''],
      managementPeriod:[''],
      statusID:[''],
      responsibilityType:['']

    })
    
    this.hoSubForm = this.formBuilder.group({
      activityName:[''],
      subActivityName: [''],
      subResponsibility: [''],
      subStartDate: [''],
      subEndDate: [''],
      subNewActityName: [''],
      subComment: [''],
      subStatus: [''],
      subOfficelevel:[''],
      subBranch:[''],
      subChiefDirectorate:[''],
      subDirectorate:[''],
      subSubDirectorate:[''],
      subRegion:[''],
      subDistrictName:[''],
      subPosition:[''],
      id:[''],
      subManagementPeriod:[''],
      StatusID:[''],
      subResponsibilityType:['']

    })
      ///comment Form
      this.userFormCommet = this.formBuilder.group({
        activityName: [''],
       
        comment: [''],
       
        planID: [''],
     
      });
    this.isFormSubmitted = false;

    this.currentRole = this.appService.getLoggedInUserRole();
    console.log(this.currentRole);
    this.userinfo=this.appService.getLoggedInUserId();
    console.log(this.userinfo);
    this.userservice.getUserId(this.userinfo).subscribe((data:any)=>{
      console.log(data)
      this.user=data;
    this.userOffice=this.user.officeLevel;
    this.userDirectorate=this.user.directorate;
    this.usersubDirectorate=this.user.subDirectorate;
    this.userBranch=this.user.branch;
    console.log("The currecent user for management",this.userOffice, this.userDirectorate);
 
    })
    //get api
    this.managementwsiservice.ManagementListReview().subscribe((data: any) => {
     this.lis = [...data]
     console.log( this.lis )
      this.lis2 = [...data]
      this.disableReview(this.lis);
      this.isPageLoading =false;
      //this.disableCheck(this.lis);

      // this.lis=this.li;

    /* this.lis = data.filter(function (data) {

      return data.status != "Plan Published" && data.status !="Item logged" && data.status !="selected" && data.status !="Approve" && data.status !="Request Update";

     }); */

   
    

      this.dtTrigger.next();
      if (this.lis.length > 0) {
        this.noDisputes = false;
      } else {
        this.noDisputes = true;
      }

    }, err => {
      console.log(err);
      this.noDisputes = true;
    })

    //status list
    this.managementwsiservice.getStatusReview().subscribe(data=>{
      this.statusData=data
      console.log(data);
     })

      //get api
      this.managementwsiservice.ManagementListView().subscribe((data:any)=>{
        //console.warn(data)
        
        this.li=data;
        this.view=this.li;
        console.log(this.li)
       
      })
       //management  list
       this.managementwsiservice.ManagementListReview().subscribe((data: any)=>{
       // console.log(data);
        this.li = data;
        console.log( this.li)
        
        this.buttons1 = data.filter(function (data) {

          return data.statusID == "1" || data.statusID =="2" || data.statusID =="8"|| data.statusID =="9"   ;
    
         }); 
         this.buttons2 = data.filter(function (data) {
    
          return data.statusID == "4" ;
    
         });
         this.buttons3 = data.filter(function (data) {
    
          return data.statusID == "8" || data.statusID == "9"  ;
    
         });
         this.buttons4 = data.filter(function (data) {
    
          return data.statusID == "15"  ;
    
         });
       
        
      })
      this.managementwsiservice.getAllPeriod().subscribe(result=>{
        console.log(result)
        this.periodList=result;
      })
      ///Data Filter

      this.managementwsiservice.getOfficeLevel().subscribe((res:any) => {
        this.OfficeLevelList = res
        console.log(res)

        this.OfficeLevelList= res.filter(function (res) {

          return res.officeLevel != "School" ;
    
         });

         
  
      })

      this.userservice.getAllPositions().subscribe(position => {
        this.allPosition = position;
        console.log(position)
  
      }, err => {
        console.log(err);
  
      })
  
      this.userservice.getAllBranches().subscribe((branch: any) => {
        console.log(branch)
        this.allBranches = branch;
      }, err => {
        console.log(err)
  
      })
  
      this.userservice.getAllCheifDirectorate().subscribe((cheifdir: any) => {
        console.log(cheifdir)
        this.allChiefDirectorate = cheifdir;
      }, err => {
        console.log(err)
  
      })
  
      this.userservice.getAllDirectorate().subscribe((dir: any) => {
        console.log(dir)
        this.allDirectorate = dir;
      }, err => {
        console.log(err)
  
      })
  
      this.userservice.getAllSubDirectorate().subscribe((subdir: any) => {
        console.log(subdir)
        this.allSubDirectorate = subdir;
      }, err => {
        console.log(err)
  
      })
      this.managementwsiservice.GetPositionList("School").subscribe((res:any)=>{
        this.responsibilities =res;
        console.log("OFFICE LEVEL SCHOOL", this.responsibilities)
      })
      this.managementwsiservice.GetPositionList("Head Office").subscribe((res:any)=>{
        this.Headposition =res;
        console.log("OFFICE LEVEL Head ",  this.Headposition )
      })
      this.managementwsiservice.GetPositionList("District").subscribe((res:any)=>{
        this.Districtposition=res;
        console.log("OFFICE LEVEL District", this.Districtposition)
      })
        
  this.authService.getHeadPosition().then((res: string[]) => {

    let userRole = this.appService.getLoggedInUserRole();
    console.log(res)
    this.HPbranchPostion = res;
    this.HOAllPositionfilter = res;

    // let AllBranches = res.map((item: any) => item.branch).filter((value, index, self) => self.indexOf(value) === index);
    let AllChiefDirectorate = res.map((item: any) => item.chiefdirectorate).filter((value, index, self) => self.indexOf(value) === index);
    let AllDirectorates = res.map((item: any) => item.directorate).filter((value, index, self) => self.indexOf(value) === index);
    let AllSubDirectorates = res.map((item: any) => item.subdirectorates).filter((value, index, self) => self.indexOf(value) === index);
    let AllPosition = res.map((item: any) => item.position).filter((value, index, self) => self.indexOf(value) === index);
    // console.log(AllBranches);
    // console.log(AllChiefDirectorate);
    // console.log(AllDirectorates);
    // console.log(AllSubDirectorates);
    // console.log(AllPosition);
    // this.allBranches = AllBranches;
    // this.allChiefDirectorate = AllChiefDirectorate;
    // this.allDirectorate = AllDirectorates;
    // this.allSubDirectorate = AllSubDirectorates;
    // this.allPosition = AllPosition;


    //branch//
    //this.HOBranchData = this.HPbranchPostion.map(item => item.branch)
    //.filter((value, index, self) => self.indexOf(value) === index);

    this.Branches = this.HPbranchPostion.map(item => item.branch)
      .filter((value, index, self) => self.indexOf(value) === index);


    //cheifDirectorate 

    // this.HOCDDataData = this.HPbranchPostion .map(item=>item.chiefdirectorate) 
    //  .filter((value, index, self) => self.indexOf(value) === index);   

    this.BranchCD = this.HPbranchPostion.map(item => item.chiefdirectorate)
      .filter((value, index, self) => self.indexOf(value) === index);

    //Directorate
    this.HODData = this.HPbranchPostion.map(item => item.directorate)
      .filter((value, index, self) => self.indexOf(value) === index);

    //Subdirectorate
    this.HOSDData = this.HPbranchPostion.map(item => item.subdirectorates)
      .filter((value, index, self) => self.indexOf(value) === index);

    //Postion
    this.HOPOsition = this.HPbranchPostion.map(item => item.position)
      .filter((value, index, self) => self.indexOf(value) === index);


    // console.log("schoolsMainData", res);




  })
  this.authService.getSchoolsMain().then((res: string[]) => {
    console.log(res)
    let userRole = this.appService.getLoggedInUserRole();
    this.schoolsMainData = res;
    this.schoolsMain = res;

    this.allDistrictSchools = res;

    // to get  unquie values of  region ,district etc..//
    this.regionsData = this.schoolsMainData.map(item => item.region)
      .filter((value, index, self) => self.indexOf(value) === index);

    //this.regionsData = reg;districtCode
    this.districtsData = this.schoolsMainData.map(item => item.districtName)
      .filter((value, index, self) => self.indexOf(value) === index);
    // this.districtsData = this.schoolsMainData.filter((value, index, self) => self.indexOf(value) === index);

    this.circuitsData = this.schoolsMainData.map(item => item.circuitNo)
      .filter((value, index, self) => self.indexOf(value) === index);


    this.clustersData = this.schoolsMainData.map(item => item.clusterNo)
      .filter((value, index, self) => self.indexOf(value) === index);

  });

  
  this.authService.districtPosition().then((res: string[]) => {
    // let userRole = this.appService.getLoggedInUserRole();
    //this.Circuits = res;
    this.dispositiondatadirid = res;
    this.dispositiondataid = res
    this.dispositiondatadir = this.dispositiondatadirid.map(item => item.directorate)
      .filter((value, index, self) => self.indexOf(value) === index);


    //this.dispositionsdatasub = reg;
    this.dispositionsdatasub = this.dispositiondatadirid.map(item => item.subdirectorate)
      .filter((value, index, self) => self.indexOf(value) === index);
    //position//
    this.dispositionsdataposition = this.dispositiondatadirid.map(item => item.position)
      .filter((value, index, self) => self.indexOf(value) === index);
    //Business //
    this.dispositiondataBuss = this.dispositiondatadirid.map(item => item.businessunit)
      .filter((value, index, self) => self.indexOf(value) === index);


    // this.myschools=res;
    //console.log("District'ist", this.districttest);
  });
    
         
   
  }

  
  selectBranch(branch, flag) {

    this.ChiefDirectorate = "";
    this.Directorate = "";
    this.SubDirectorate = "";
    this.position = "";
    this.updateChiefDirectorate = "";
    this.updateDirectorate = "";
    this.updateSubDirectorate = "";
    this.updatePosition = "";
    this.id="";

    if (flag == "create" && branch) {
      this.chiefDirectorates = [];
      console.log( "Selected Branch",branch);
      let level = this.subOfficelevel;
      console.log( "Office level",this.subOfficelevel);
      let branchid = this.getDropdownValue(branch, "id");
      this.BranchSelected = this.getDropdownValue(branch, "name");
      this.positionId = this.getDropdownValue(branch, "position").split(",");
      
      this.chiefDirectorates = this.allChiefDirectorate.filter(function (data) {
        return data.branchId == branchid;

      });
      let position_Id=this.positionId
      this.positions = this.allPosition.filter(function (position) {
        return position.officelevel  == level &&  position_Id.includes(position.id.toString());
       
      

      });

      console.log(branchid)
      console.log(   this.chiefDirectorates)
      console.log(this.positions)
      console.log(position_Id)
      console.log( this.BranchSelected )

    } else if (flag == "update" && branch) {

      this.chiefDirectorates = [];
      this.position = "";
      console.log(branch);
      let level = this.updateOfficelevel;
      let branchid = this.getDropdownValue(branch, "id");
      this.BranchSelected = this.getDropdownValue(branch, "name");
      this.positionId = this.getDropdownValue(branch, "position").split(",");
      
      this.chiefDirectorates = this.allChiefDirectorate.filter(function (data) {
        return data.branchId == branchid;

      });
      let position_Id=this.positionId
      this.positions = this.allPosition.filter(function (position) {
        return position.officelevel  == level &&  position_Id.includes(position.id.toString());
       
      

      });

      console.log(branchid)
      console.log(   this.chiefDirectorates)
      console.log("All Position in Head Office",this.positions)
      console.log(position_Id)
      console.log( this.BranchSelected )

    }
   



  }
  
  
  setId(id, flag) {

    if (id) {
      if (flag == "branch") {
        let level = this.officelevel;
        // this.positions = this.allPosition.filter(function (position) {
        //   return position.officelevel == level && [id].includes(position.id.toString());
        //   //userid != user.usrId && user.position != "ADMIN";

        // });

        console.log(id);
      }
    }

  }

  getDropdownValue(value, flag) {

    let output;

    if (value) {
      let brancharray = value.split("#;");
      if (flag == "id") {
        output = brancharray[0];
      } else if (flag == "name") {
        output = brancharray[1];
      } else if (flag == "position") {
        output = brancharray[2];
       
      }
    }

    return output

  }

  getDropdownValues(value, flag) {

    let output;

    if (value) {
      let brancharray = value.split("#;");
      if (flag == "id") {
        output = brancharray[0];
      } else if (flag == "name") {
        output = brancharray[1];
      } else if (flag == "position") {
        output = brancharray[2];
      }else if(flag=="chiefDirectorateName"){
        output = brancharray[1];
      }

    }

    return output

  }

  
  selectChiefDirectorate(chief) {
    // this.Directorate = "";
    console.log(chief);
   // this.Directorate = "";
    //this.SubDirectorate = "";
    //this.updateDirectorate = "";
   // this.updateSubDirectorate = "";
    let flag = "create"

    if (flag == "create" && chief) {
      // this.chiefDirectorates = [];

      let chiefdirid = this.getDropdownValue(chief, "id");
      this.selectChiefDirectorate = this.getDropdownValue(chief, "name");
      this.directorates = this.allDirectorate.filter(function (data) {
        return data.chiefDirectorateId == chiefdirid;

      });

    }
    console.log( this.selectChiefDirectorate )

  }
   
  selecSubDirectorate(SubDirectorate) {
    //this.Directorate = "";
   
    
    let flag = "create"

    if (flag == "create" && SubDirectorate) {
      // this.chiefDirectorates = [];

      
      this.SubDirectorate = this.getDropdownValue(SubDirectorate, "name");
     
    }
    console.log( this.allSubDirectorate )

  }

  selectDirectorate(directorate) {
    this.SubDirectorate = "";
   this.updateSubDirectorate = "";
    console.log(directorate);
    let flag = "create"

    if (directorate) {


      let dirid = this.getDropdownValue(directorate, "id");
      this.selectDirectorate=this.getDropdownValue(directorate, "name");
      let arr = this.allSubDirectorate.filter(function (data) {
        return data.directorateId == dirid;

      });
      if (arr.length > 0) {
        this.subDirectorates = arr;
      }
       console.log( this.selectDirectorate)

      if (this.subDirectorates.length == 0) {
        this.userForm.controls["SubDirectorate"].clearValidators();
        this.userForm.controls["SubDirectorate"].updateValueAndValidity();
      }


    }

  }

  getPostionByBranch(office) {
    console.log( this.Directorate)
  }

  isFromBranch(id, val) {
    let hide = false;

    if (id && this.positionId.length > 0) {


      let position = this.positionId.filter(function (data) {
        return data == id;

      });

      if (position.length == 0) {
        hide = true;
      }

    }

    return hide;

  }
 
  ////function to get plan List
  getManagementPlans(){
    this.managementwsiservice.getManagementPlans()
    .subscribe(res => {
      this.managementPlans = res;


      console.log('management plans', this.managementPlans);
    }, error => {
      console.log('management plans resulted in error', error);
    })
  }
 ////function to get status List
  getStatuses(){
    this.managementwsiservice.getStatusReview()
    .subscribe((res:any) => {
      this.statuses = res;
      console.log('status found', this.statuses);
    }, err => {
      console.log('getting status resulted in an error', err);
    })
  }
   
  //load validation controls
  get Form() {
    return this.userForm.controls;
  }
  //load validation controls


 
  //Show and hide 
  statusResults: boolean;
  selectStatus(event) {
    let selected = event.target.value;
    if (selected == 1) {
      this.statusResults = true;
      this.userForm.controls["comment"].setValidators([Validators.required]);

      this.userForm.controls["comment"].updateValueAndValidity();
     

    } else {
      this.statusResults = false;
      this.userForm.controls["comment"].clearValidators();

      this.userForm.controls["comment"].updateValueAndValidity();
      this.comment="";
    }

  }
  //show anf hide end

  //reviewModal
  openEditModel3(content, id) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });
   
    
   
    this.managementwsiservice.getPlanById(id).subscribe(data=>{
  
      this.dataList=data
      this.Branch= this.dataList[0].branch

       this.responsibilityType =this.dataList[0].responsibilityType;
    this.activityName = this.dataList[0].activityName;
    this.responsibility = this.dataList[0].responsibility
    this.startDate = moment(this.dataList[0].startDate).format('YYYY-MM-DD');
    this.endDate = moment(this.dataList[0].endDate).format('YYYY-MM-DD');
    this.managementPeriod=this.dataList[0].managementPeriod;
    this.PeriodID= this.dataList[0].PeriodID;
    this.planID= id;
    this.comment=this.dataList[0].comment;
    this.status=this.dataList[0].statusID;
    this.officelevel=this.dataList[0].officeLevel;
   this.statusID=this.dataList[0].statusID;
    this.region=this.dataList[0].region;
    this.ChiefDirectorate=this.dataList[0].chiefDirectorate;
    this.SubDirectorate=this.dataList[0].subDirectorate;
    this.districtName=this.dataList[0].district;
    this.Directorate=this.dataList[0].directorate;
      console.log("this is the selected Id values", this.dataList,"and branch", this.Branch)

      var responsibilityId;
      var responsiblePerson;
      for (let index = 0; index < this.responsibility.length; index++)
       {
         if(index === 0)
          responsibilityId = this.responsibility[index].id,
          responsiblePerson = this.responsibility[index].rolename;
          else 
          responsibilityId = responsibilityId + "," +this.responsibility[index].id,
          responsiblePerson =  responsiblePerson+ ","+this.responsibility[index].rolename;
      }
        //this.position =responsibilityId.split(',');
        this.position=responsiblePerson
        this.id=responsibilityId
      
    })

    

  
  }
 ///
 

///Function to disable date
getToday(): string {
  return new Date().toISOString().split('T')[0] 
  this.endDate="";
}
getday(): string {
   
this.startDate=this.startDate
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.startDate
}
///Function to disable date
///Function to disable date
getTodayEdit(): string {
return new Date().toISOString().split('T')[0] 
}
getdayEdit(): string {
 
this.startDate=this.startDate
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.startDate
}
//Clear form update activity end date
clearEndDate()
{
  this.endDate = null;
}
   ///modalTo Add Sub Activities at Head Office
   openAddHOsub(content, id,activityName,responsibility,startDate,endDate,managementPeriod,PeriodID,statusID) {
   
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

     
      this.planID=id;
     
      this.managementwsiservice.getPlanById(id).subscribe(data=>{
      
        this.dataList=data
        this.activityName=data[0].activityName;
       
        this.subManagementPeriod=data[0].managementPeriod
       console.log("Main Data",data)
        //this.setUpdateForm( this.dataList);
        if(data[0].officeLevel=="School")
        {
          console.log("hi")
          this.position=data[0].responsibility
      
        console.log( this.position)

        }else if(data[0].officeLevel=="District" && data[0].responsibilityType=="All")
        {
          console.log("hi")
          this.position=data[0].responsibility
      
        console.log( this.position)

        }else if(data[0].officeLevel=="Head Office" && data[0].responsibilityType=="All")
        {
          console.log("hi")
          this.position=data[0].responsibility
      
        console.log( this.position)

        }
     
     
     
   
      })

    

  }

  //Clear Office Levele Validations
  ///roletype radio button
  AdminRole(subResponsibilityType) {
    let roletype =" "
    this.Branch = "";
    this.ChiefDirectorate = "";
    this.chiefDirectorates = [];
    this.Directorate = "";
    this.directorates = [];
    this.SubDirectorate = "";
  
    this.districtName = "";
    this.region = "";
    this.id = "";
    this.positions = [];


   


    if ( subResponsibilityType == 'Other' && this.officelevel == 'Head Office') {
      this.userForm.controls["Branch"].setValidators([Validators.required]);
      this.userForm.controls["Branch"].updateValueAndValidity();
      this.userForm.controls["ChiefDirectorate"].setValidators([Validators.required]);
      this.userForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.userForm.controls["Directorate"].setValidators([Validators.required]);
      this.userForm.controls["Directorate"].updateValueAndValidity();
      this.userForm.controls["SubDirectorate"].setValidators([Validators.required]);
      this.userForm.controls["SubDirectorate"].updateValueAndValidity();
     

      ///clear
      this.userForm.controls["region"].clearValidators();
      this.userForm.controls["region"].updateValueAndValidity();
      this.userForm.controls["districtName"].clearValidators();
      this.userForm.controls["districtName"].updateValueAndValidity();
      

      ///clear values
      this.districtName = "";
      this.region = "";
     

    } else if (subResponsibilityType == 'All' && this.officelevel == 'Head Office') {

      ///clear
      this.userForm.controls["region"].clearValidators();
      this.userForm.controls["region"].updateValueAndValidity();
      this.userForm.controls["districtName"].clearValidators();
      this.userForm.controls["districtName"].updateValueAndValidity();
     
      this.userForm.controls["Branch"].clearValidators();
      this.userForm.controls["Branch"].updateValueAndValidity();
      this.userForm.controls["ChiefDirectorate"].clearValidators();
      this.userForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.userForm.controls["Directorate"].clearValidators();
      this.userForm.controls["Directorate"].updateValueAndValidity();
      this.userForm.controls["SubDirectorate"].clearValidators();
      this.userForm.controls["SubDirectorate"].updateValueAndValidity();


      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.districtName = "";
      this.region = "";
   
    


    } else if ( subResponsibilityType == 'Other' && this.officelevel == 'District') {

    
      this.userForm.controls["SubDirectorate"].setValidators([Validators.required]);
      this.userForm.controls["SubDirectorate"].updateValueAndValidity();
      this.userForm.controls["region"].setValidators([Validators.required]);
      this.userForm.controls["region"].updateValueAndValidity();
      this.userForm.controls["districtName"].setValidators([Validators.required]);
      this.userForm.controls["districtName"].updateValueAndValidity();

      //clear
      this.userForm.controls["Directorate"].clearValidators();
      this.userForm.controls["Directorate"].updateValueAndValidity();
      this.userForm.controls["Branch"].clearValidators();
      this.userForm.controls["Branch"].updateValueAndValidity();
      this.userForm.controls["ChiefDirectorate"].clearValidators();
      this.userForm.controls["ChiefDirectorate"].updateValueAndValidity();
   ;

      //clearvalue    
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate="";


    } else if (subResponsibilityType == 'All' && this.officelevel == 'District') { //set

      ///clear
      this.userForm.controls["region"].clearValidators();
      this.userForm.controls["region"].updateValueAndValidity();
      this.userForm.controls["districtName"].clearValidators();
      this.userForm.controls["districtName"].updateValueAndValidity();
     
      this.userForm.controls["Branch"].clearValidators();
      this.userForm.controls["Branch"].updateValueAndValidity();
      this.userForm.controls["ChiefDirectorate"].clearValidators();
      this.userForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.userForm.controls["Directorate"].clearValidators();
      this.userForm.controls["Directorate"].updateValueAndValidity();
      this.userForm.controls["SubDirectorate"].clearValidators();
      this.userForm.controls["SubDirectorate"].updateValueAndValidity();


      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.districtName = "";
      this.region = "";

    } else {

     
     

      //clear
      this.userForm.controls["region"].clearValidators();
      this.userForm.controls["region"].updateValueAndValidity();
      this.userForm.controls["districtName"].clearValidators();
      this.userForm.controls["districtName"].updateValueAndValidity();
      this.userForm.controls["Branch"].clearValidators();
      this.userForm.controls["Branch"].updateValueAndValidity();
      this.userForm.controls["ChiefDirectorate"].clearValidators();
      this.userForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.userForm.controls["Directorate"].clearValidators();
      this.userForm.controls["Directorate"].updateValueAndValidity();
      this.userForm.controls["SubDirectorate"].clearValidators();
      this.userForm.controls["SubDirectorate"].updateValueAndValidity();
     

      //clearValues
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.region = "";
      this.position = "";
      
    }


  }

 getFormValidationErrorsEdit() {

  // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

  let totalErrors = 0;

  Object.keys(this.userForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.userForm.get(key).errors;
    if (controlErrors != null) {
      totalErrors++;
      Object.keys(controlErrors).forEach(keyError => {
        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }
  });

  console.log('Number of errors: ', totalErrors);
}

//Function tosubmit update Activity
UpdateSubmit() {
  this.getFormValidationErrorsEdit();
  var managementPlanReqPayload = [];
var managementPlanRequest = this.userForm.value;
//payload.roleId = payload.roleId.toString();
console.log(this.userForm.value);
  if (this.userForm.valid) {
    var objManagementPlan = {
      "planID": this.planID,
      "activityName":this.activityName,
    "responsibilityId":this.id.toString(),
    "startDate":this.startDate,
    "endDate":this.endDate,
    "statusID":this.statusID,
    "comment":this.comment,
    "PeriodID":1,
  "Branch":this.Branch, 
  "Directorate":this.Directorate,
  
  "SubDirectorate":this.SubDirectorate,
  "Region":this.region,
  "District":this.districtName,
  "ChiefDirectorate":this.ChiefDirectorate,
  "OfficeLevel":this.officelevel,
  "ResponsibilityType":this.responsibilityType
  
  };
  
  console.log(objManagementPlan )
     // console.log(data );
    Swal.fire({
      title: 'Are you sure you want to Review Activity',
      text: 'Activity will be Updated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {
          //nompumeleo

     
          managementPlanReqPayload.push(objManagementPlan);
          console.log(managementPlanReqPayload);
            this.managementwsiservice.createManagementPlans(managementPlanReqPayload).subscribe(res => {
              console.log('management plan created', res);
              
            }, err => {
              console.log('management plan creation resulted in an error', err);
            })
          ///Nompumelelo


          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Ok',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity Will be Updated',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        }
      })
  } else if (this.userForm.invalid) {
    console.log("user not created")
  }
  this.isFormSubmitted = true;
}
  
UpdateSubmitCheck(planID,activityName,responsibility,startDate,endDate,status) {
  var responsibilityId;
  var responsiblePerson;
  for (let index = 0; index < responsibility.length; index++)
   {
     if(index === 0)
      responsibilityId = responsibility[index].roleId,
      responsiblePerson = responsibility[index].rolename;
      else 
      responsibilityId = responsibilityId + "," +responsibility[index].roleId,
      responsiblePerson =  responsiblePerson+ ","+responsibility[index].rolename;
  }

  this.activityName = activityName;
  this.responsibility =responsiblePerson.split(',');
  this.startDate = moment(startDate).format('YYYY-MM-DD');
  this.endDate = moment(endDate).format('YYYY-MM-DD');
  this.roleId= responsibilityId ;
 this.status = status;
 // this.comment = data[0].comment;
  this.planID = planID;
  if(this.status=="Approved")
       {
        this.status ="8"
       }
       if(this.status=="Request update")
       {
        this.status ="9"
       }
    
  this.getFormValidationErrorsEdit();
  var managementPlanReqPayload = [];
var managementPlanRequest = this.userForm.value;
//payload.roleId = payload.roleId.toString();
console.log(this.userForm.value);
  if (this.userForm.valid) {
    var objManagementPlan = {
      "planID": this.planID ,
      "activityName": this.activityName,
    "responsibilityId": this.roleId.toString(),
    "startDate":this.startDate,
    "endDate":this.endDate,
   "statusID":this.status,
    "comment":this.comment
  };
  console.log(objManagementPlan )
  
          //nompumeleo

     
          managementPlanReqPayload.push(objManagementPlan);
          console.log(managementPlanReqPayload);
            this.managementwsiservice.createManagementPlans(managementPlanReqPayload).subscribe(res => {
              console.log('management plan created', res);
              
            }, err => {
              console.log('management plan creation resulted in an error', err);
            })
          ///Nompumelelo


          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity Selected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    
  } else if (this.userForm.invalid) {
    console.log("user not created")
  }
  this.isFormSubmitted = true;
}
UpdateSubmitUnCheck(planID,activityName,responsibility,startDate,endDate,status) {
  var responsibilityId;
  var responsiblePerson;
  for (let index = 0; index < responsibility.length; index++)
   {
     if(index === 0)
      responsibilityId = responsibility[index].roleId,
      responsiblePerson = responsibility[index].rolename;
      else 
      responsibilityId = responsibilityId + "," +responsibility[index].roleId,
      responsiblePerson =  responsiblePerson+ ","+responsibility[index].rolename;
  }

  this.activityName = activityName;
  this.responsibility =responsiblePerson.split(',');
  this.startDate = moment(startDate).format('YYYY-MM-DD');
  this.endDate = moment(endDate).format('YYYY-MM-DD');
  this.roleId= responsibilityId ;
 this.status = status;
 // this.comment = data[0].comment;
  this.planID = planID;
  if(this.status=="ApproveTick")
  {
   this.status ="2"
  }
  if(this.status=="RequestTick")
  {
   this.status ="1"
  }

    
  this.getFormValidationErrorsEdit();
  var managementPlanReqPayload = [];
var managementPlanRequest = this.userForm.value;
//payload.roleId = payload.roleId.toString();
console.log(this.userForm.value);
  if (this.userForm.valid) {
    var objManagementPlan = {
      "planID": this.planID ,
      "activityName": this.activityName,
    "responsibilityId": this.roleId.toString(),
    "startDate":this.startDate,
    "endDate":this.endDate,
   "statusID":this.status,
    "comment":this.comment
  };
  console.log(objManagementPlan )
  
          //nompumeleo

     
          managementPlanReqPayload.push(objManagementPlan);
          console.log(managementPlanReqPayload);
            this.managementwsiservice.createManagementPlans(managementPlanReqPayload).subscribe(res => {
              console.log('management plan created', res);
              
            }, err => {
              console.log('management plan creation resulted in an error', err);
            })
          ///Nompumelelo


          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity UnSelected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    
  } else if (this.userForm.invalid) {
    console.log("user not created")
  }
  this.isFormSubmitted = true;
}
  logDispute() {
    this.getFormValidationErrors();
    if (this.userForm.valid) {
      let data = {
        planID: this.planID,
        activityName: this.activityName,
        responsibility: this.responsibility,
        startDate: this.startDate,
        endDate: this.endDate,
       
        status: this.status,
        comment: this.comment
       
      };
        console.log(data );
      Swal.fire({
        title: 'Are you sure you want to  Captured This Review ',
        text: 'A Review  will  Captured',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
  
      }).
        then((result) => {
          if (result.value) {
            //nompumeleo
  
       
            this.managementwsiservice.updateActivity(data).subscribe((res: any) => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo
  
  
            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Ok',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'A Review Will Captured',
  
              icon: 'success'
            }).then(result => {
             this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
               window.location.reload()
              }
            });
  
  
  
  
          }
        })
    } else if (this.userForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }
 //Check Erros On Submit
 getFormValidationErrors() {

  // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

  let totalErrors = 0;

  Object.keys(this.userForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.userForm.get(key).errors;
    if (controlErrors != null) {
      totalErrors++;
      Object.keys(controlErrors).forEach(keyError => {
        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }
  });

  console.log('Number of errors: ', totalErrors);
}
  disableReview(buttondis: any) {
   
    console.log(buttondis[0].status);
    var disableButton = buttondis.filter(data =>

      data.status == "Pending review",
     

    );

    if (disableButton.length == 0) {
      this.disable = false;

    } else {
      console.log("false button")
      this.disable = true;
    }


    

  }
 

  reviewold() {
    
    console.log(this.lis)
    for (let index = 0; index < this.lis.length; index++) {


      if( this.lis[index].status==="Plan Approved")
      {
        this.lis[index].status ="Approve"
      }
      if( this.lis[index].status ==="Update")
      {
        this.lis[index].status ="Request Update"
      }
      if( this.lis[index].status==="ApproveTick")
      {
        this.lis[index].status ="Approve"
      }
      if( this.lis[index].status ==="RequestTick")
      {
        this.lis[index].status ="Request Update"
      }

      
      console.log(this.lis[index]);
      this.managementwsiservice.updateActivity(this.lis[index]).subscribe(result => {
        
        
      })


    }
    Swal.fire({
      title: 'New management Review?',
      text: "You wanna send this form!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed)
       {Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your entry has been saved'
       
      }).then(result => {
        if (result.value || result.isDismissed) {
  
          window.location.reload();
        }
      });
          
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Cancelled',
        'Your entry was cancelled:)',
        'error'
      )
    }
  })

  }
 
   
    //////
    reviewselected()
    {
    
      console.log(this.lis)
      for (let index = 0; index < this.lis.length; index++) {
  
  
        if( this.lis[index].status==="ApproveTick")
        {
          this.lis[index].status ="2"
        }else if( this.lis[index].status ==="RequestTick")
        {
          this.lis[index].status ="1"
        } else if( this.lis[index].status==="Approved")
        {
          this.lis[index].status ="10"
        }else if( this.lis[index].status ==="Request update")
        {
          this.lis[index].status ="10"
        }else if( this.lis[index].status ==="Item logged")
        {
          this.lis[index].status ="10"
        }else if( this.lis[index].status ==="Item Flagged")
        {
          this.lis[index].status ="1"
        }

        var responsibilityId;
  
  for (let index = 0; index < this.lis[index].responsibility.length; index++)
   {
     if(index === 0)
      responsibilityId = this.lis[index].responsibility[index].roleId;
  
      else 
      responsibilityId = responsibilityId + "," +this.lis[index].responsibility[index].roleId;
     
  }
        var objManagementPlan = {
          "planID": this.lis[index].planID ,
          "activityName": this.lis[index].activityName,
        "responsibilityId":  responsibilityId.toString(),
        "startDate":moment(this.lis[index].startDate).format('YYYY-MM-DD'),
        "endDate":moment(this.lis[index].endDate).format('YYYY-MM-DD'),
       "statusID":this.lis[index].status ,
        "comment":this.lis[index].comment
      };
        
        console.log(objManagementPlan);
        var managementPlanReqPayload = [];
        managementPlanReqPayload.push(objManagementPlan);
        console.log( managementPlanReqPayload);
        this.managementwsiservice.createManagementPlans(managementPlanReqPayload).subscribe(res => {
          console.log('management plan created', res);
          
        }, err => {
          console.log('management plan creation resulted in an error', err);
        })
  
      }

     
    }

   //Function to check  Per Activity
  UpdateSubmitChecked(planID,status) {
 
    this.planID = planID;
    if(status=="Approved")
       {
        this.status ="8"
       }
       if(status=="Request update")
       {
        this.status ="9"
       }
    this.managementwsiservice.UpdateStatuById( this.planID,this.status).subscribe(result=>{
    console.log("Successful")
    })
  
  
  
            Swal.fire({
              timer: 3000,
              //confirmButtonText: 'Ok',
             // cancelButtonText: 'No',
              title: "Successful",
              text: 'Activity Selected',
  
              icon: 'success'
            }).then(result => {
             this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
              window.location.reload()
              }
            });
  
  
  
  
          
      
  
  }
 //Function to Uncheck  Per Activity
  UpdateSubmitUnChecked(planID,status) {
   
    this.planID = planID;
    if(status=="ApproveTick")
    {
     this.status ="2"
    }
    if(status=="RequestTick")
    {
     this.status ="1"
    }
  
    this.managementwsiservice.UpdateStatuById( this.planID,this.status).subscribe(result=>{
    console.log("Successful")
    })
  
  
  
            Swal.fire({
              timer: 3000,
              //confirmButtonText: 'Ok',
             // cancelButtonText: 'No',
              title: "Successful",
              text: 'Activity UnSelected',
  
              icon: 'success'
            }).then(result => {
             this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
              window.location.reload()
              }
            });
  
  
  
  
          
      
  
  }
  //Function to check all Activity
  checkedAllItems() {
   
    for (let index = 0; index < this.lis.length; index++) {
  
  
      if( this.lis[index].status==="Approved")
      {
        this.lis[index].status ="8"
      }
      if( this.lis[index].status ==="Request update")
      {
        this.lis[index].status ="9"
      }
     
      
  
      
      console.log(this.lis[index].planID);
      this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].status).subscribe(result => {
        
        console.log("updated")
      })
  
  
    }
  
  
  
            Swal.fire({
              timer: 3000,
              //confirmButtonText: 'Ok',
             // cancelButtonText: 'No',
              title: "Successful",
              text: ' All Activities Selected',
  
              icon: 'success'
            }).then(result => {
             this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
              window.location.reload()
              }
            });
  
  
  
  
          
      
  
  }
  //Function to Uncheck  all Activity
  UncheckedAll() {
   
    for (let index = 0; index < this.lis.length; index++) {
  
  
      if( this.lis[index].status==="ApproveTick")
      {
        this.lis[index].status ="2"
      }
      if( this.lis[index].status ==="RequestTick")
      {
        this.lis[index].status ="1"
      }
     
      
  
      
      console.log(this.lis[index].planID);
      this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].status).subscribe(result => {
        
        console.log("updated")
      })
  
  
    }
  
  
  
            Swal.fire({
              timer: 3000,
              //confirmButtonText: 'Ok',
             // cancelButtonText: 'No',
              title: "Successful",
              text: 'All Activities UnSelected',
  
              icon: 'success'
            }).then(result => {
             this.modalService.dismissAll();
              // this.validationFormEdits.reset();
              if (result.value || result.isDismissed) {
              window.location.reload()
              }
            });
  
  
  
  
          
      
  
  }
  //Submit For Review All Activities
  review() {

  Swal.fire({
    title: 'Are you sure you want to Submit A Reviewed  Activities For '+'  '+this.lis[0].managementPeriod+''+'Management Plan',
    text: 'A Management Plan Activities Will Be Submitted',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 
        for (let index = 0; index < this.lis.length; index++) {


          if( this.lis[index].status==="Approved"|| this.lis[index].status==="ApproveTick" )
          {
            this.lis[index].status ="11"
          }
          if( this.lis[index].status ==="Request update" ||this.lis[index].status ==="RequestTick")
          {
            this.lis[index].status ="12"
          }
          
          
          console.log(this.lis[index]);
          this.managementwsiservice.updateActivity(this.lis[index]).subscribe(result => {
            console.log("sucess")
            
          })
    
    
        }
  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'Activities Will be submitted',

    icon: 'success'
  }).then(result => {
   this.modalService.dismissAll();
    // this.validationFormEdits.reset();
    if (result.value || result.isDismissed) {
     window.location.reload()
    }
  });




}
})


}
//Submit For Review Only The Selected
SubmitAll() {

  Swal.fire({
    title: 'Are you sure you want to Submit A Reviewed  Activities For '+'  '+this.lis[0].managementPeriod+''+'Management Plan',
    text: 'A Management Plan Activities Will Be Submitted',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 
  console.log(this.lis)
  for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].status==="ApproveTick"|| this.lis[index].status==="Approved")
          {
            this.lis[index].status ="11"
          }
          if( this.lis[index].status ==="RequestTick"||this.lis[index].status ==="Request update"  )
          {
            this.lis[index].status ="12"
          }
    
    /*if( this.lis[index].status ==="Item logged")
    {
      this.lis[index].status ="10"
    } */
    

    
    console.log(this.lis[index].planID);
    this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].status).subscribe(result => {
      
      console.log("updated")
    })


  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'Activities Will be submitted',

    icon: 'success'
  }).then(result => {
   this.modalService.dismissAll();
    // this.validationFormEdits.reset();
    if (result.value || result.isDismissed) {
     window.location.reload()
    }
  });




}
})


}
Submitchecked() {

  Swal.fire({
    title: 'Are you sure you want to Submit A Reviewed  Activities For '+'  '+this.lis[0].managementPeriod+' '+'Management Plan',
    text: 'A WSI Management Plan Activities Will Be Submitted',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 
  console.log(this.lis)
  for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].status==="ApproveTick")
          {
            this.lis[index].status ="11"
          }
          if( this.lis[index].status ==="RequestTick" )
          {
            this.lis[index].status ="12"
          } 
          if(this.lis[index].status==="Approved" || this.lis[index].status==="Request update" )
          {
           this.lis[index].status ="10"
          } 
    

    
    console.log(this.lis[index].planID);
    this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].status).subscribe(result => {
      
      console.log("updated")
    })


  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'Activities Will be submitted',

    icon: 'success'
  }).then(result => {
   this.modalService.dismissAll();
    // this.validationFormEdits.reset();
    if (result.value || result.isDismissed) {
     window.location.reload()
    }
  });




}
})


}

//Convert data table to pdf
public SavePDF(): void {
  let doc = new jsPDF();
  doc.html(this.content.nativeElement);
  doc.save('output.pdf');
}
public convertToPDF() {
  html2canvas(this.content.nativeElement).then(canvas => {
    console.log(this.content.nativeElement)
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('l', 'mm', 'a3'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
    pdf.save('review-management.pdf'); // Generated PDF
  });
}
 //comment modal
 openEditModel4(content, id,comment) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });
  this.planID = id;
   
  this.comment = comment
  console.log("comment",  this.comment)

}



   
  }
  
  

