import { Component, OnDestroy, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl, ValidationErrors} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {ManagementWsiService} from '../management-wsi.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { UsersService } from "../../users/users.service";
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from '../../auth/auth.service';
import { DropzoneDirective } from 'ngx-dropzone-wrapper';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { ManagementPlan, ManagementPlanRequest, Responsibility, Status ,Activity} from '../../../../model/management-plan.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-management-plan-ho',
  templateUrl: './management-plan-ho.component.html',
  styleUrls: ['./management-plan-ho.component.scss']
})
export class ManagementPlanHOComponent implements AfterViewInit, OnDestroy, OnInit {
  userForm: FormGroup;
  editForm:FormGroup;
  userEditForm:FormGroup;
  userFormCommet :FormGroup;
  isFormSubmitted: Boolean;
  HeadSubForm:FormGroup;
  HeadSubFormEdit :FormGroup;
  public disable: boolean;
  public activityName :any
  public startDate: any
  public endDate: any
  public responsibility: any
  public newActityName:any
  public comment: any
  public startDate1: any
  public endDate2: any
  public status: any
  public planID: any
  public EditactivityName = "";
  public EditstartDate: any
  public  EditendDate: any
  public  Editresponsibility: any
  public EditnewActityName:any
  public    Editcomment: any
  public    EditstartDate1: any
  public    EditendDate2: any
  public    Editstatus: any
  public    EditplanID: any
  public responsiblePersons:any;
  public ActivityList:any
   public roleId:any
   public PeriodID="";
   public periodList=[];
   public managementPeriod="";
   public  managementPeriodEdit:any
   public statusID:any
   public SubActivityName: any
  public SubStartDate: any
  public SubEndDate: any
  public SubResponsibility: any
  public managementPlanActivityId :any
  public maxDate:any
  public minDate:any
  public subActivity:any
  public districts;
  public lisSub= []
  public periodID:any
  public HeadList=[]
  public id:any
  public currentRole :any
  public OfficeLevelList: any
  public officelevel="";
  public schoolPositionList: any
  public responsibilities =[]
  public Headposition  =[]
  public Districtposition =[]
  public Branch :any;
  public ChiefDirectorate:any;
  public Directorate="";
  public SubDirectorate:any;
  public region="";
  public districtName="";
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
  public position:any=[];
  
  public currentOfficeLevel: any;
  public positionId: any = [];
  public updateOfficelevel: any = "";
  public updateChiefDirectorate="";
  public updateDirectorate = "";
  public updateSubDirectorate = "";
  public updatePosition = "";
  public  dataList :any
  //public updateOfficelevel="";
  public updateRegion: any = "";
  public updateDistrictName: any = "";
  public updateBranch: any = "";
  public positionList:any
  public userinfo:any
  public userOffice:any
  public userDirectorate:any
  public user:any
  public usersubDirectorate:any
  public userBranch:any
  public isPageLoading: Boolean;
 
 // public  managementPeriod
  lis=[]
  view=[]
  li:any;
 // managementPlans: ManagementPlan[] = [];
  statuses: Status[] = [];
  
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

managementPlans: ManagementPlan[] = [];
createManagementPlanForm: FormGroup;
 
 submitted = false;
 public buttons1 :any
 public buttons2 :any
 public buttons3 :any
 public buttons4:any
 public button1 :any
 public button2 :any
 public button3 :any
 public button4:any
 public responsibilityType:any
 public updateResponsibilityType:any
// responsibilities: Responsibility[] = [];
  activities: Activity[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
 // dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  ///

  constructor(public formBuilder: FormBuilder, config: NgbModalConfig,
    private authService: AuthService,
    private userservice: UsersService,private router: Router,private managementwsiservice: ManagementWsiService, private modalService: NgbModal,
     private appService: AppService) {
          // customize default values of modals used by this component tree
          config.backdrop = 'static';
          config.keyboard = false;
      }
  ngOnInit(): void {

   
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
      this.isPageLoading = true;
    

    this.managementwsiservice.getManagementPlan().subscribe((data: any) => {
      this.lis = [...data]
      this.isPageLoading =false;
     
   
    })

     //get api
     this.managementwsiservice.ManagementListView().subscribe((data:any)=>{
      //console.warn(data)
      
      this.li=data;
      this.view=this.li;
      console.log(this.li)
     
    })
    this.managementwsiservice.getAllDistricts().subscribe(res => {
      this.districts = res;
    }, err => {
      console.log(err);
      //this.router.navigate(['/dashboard']);
    })
    this.getManagementPlans();
  this.disableReview();

    this.getStatuses();

    

    this.getActivities();
      //table
      this.builduserForm();

      this.dtTrigger.next();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        searching: true,
        ordering: true,
        paging: true,
        responsive: true,
        order: [0, 'desc']
      };
      this.dtTrigger.next();
    this.getManagementPlans();
    this.getStatuses();
     this.managementwsiservice.getAll().subscribe(res=>{
       console.log("All Subs",res)
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
    ///Create Form
    this.userForm = this.formBuilder.group({
      activityName: [''],
      responsibility: [''],
      startDate:['', Validators.required],
      endDate:['', Validators.required],
      newActityName: [''],
      comment: [''],
      status: [''],
      officelevel:['', Validators.required],
      Branch:[''],
      ChiefDirectorate:[''],
      Directorate:[''],
      SubDirectorate:[''],
      region:[''],
      districtName:[''],
      position:[''],
      id:[''],
      managementPeriod:['', Validators.required],
    
      roleId:[''],
      PeriodID:[''],
      responsibilityType:['']

    });

    this.editForm=this.formBuilder.group({
      activityName: [''],
      responsibility: [''],
      startDate: [''],
      endDate: [''],
      newActityName: [''],
      comment: [''],
      status: [''],
      managementPeriod:[''],
      roleId:[''],
      PeriodID:[''],
      updatePosition: [''],
      updateRegion: [''],
      updateDistrictName: [''],
      updateBranch: [''],
      updateChiefDirectorate: [''],
      updateDirectorate: [''],
      updateSubDirectorate: [''],
      updateOfficelevel:[''],
      id:[''],
      updateResponsibilityType:['']
    });
///edit Form
    this.userEditForm = this.formBuilder.group({
      EditactivityName: [''],
      Editresponsibility: [''],
      EditstartDate: [''],
      EditendDate: [''],
      //EditnewActityName: [''],
     // Editcomment: [''],
     // Editstatus: [''],
     planID: [''],
      roleId:[''],
      PeriodID:[''],
      managementPeriodEdit:[''],
      statusID:[5]
   
    });
    ///comment Form
    this.userFormCommet = this.formBuilder.group({
      activityName: [''],
     
      comment: [''],
     
      planID: [''],
   
    });
    this.HeadSubForm = this.formBuilder.group({
     
      managementPlanActivityId: [''],
      subActivity: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activityName: [''],
      PeriodID:[''],
      managementPeriod:['']
     
    })
    this.HeadSubFormEdit = this.formBuilder.group({
     
      managementPlanActivityId: [''],
      subActivity: ['', Validators.required],
      responsibility: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      activityName: [''],
      PeriodID:[''],
      managementPeriod:['']
     
    })
    this.currentRole = this.appService.getLoggedInUserRole();
    console.log(this.currentRole);
  
      this.managementwsiservice.ManagementListCapture().subscribe((data: any)=>{
    
        this.li = data;
        let role = this.appService.getLoggedInUserRole();
        console.log( "Currently admin data ",this.currentRole, this.li)

        this.buttons1 = data.filter(function (data) {

      return data.statusID == "5" || data.statusID =="6" || data.statusID =="14" || data.statusID =="10" ||data.statusID =="13";

     }); 
     this.buttons2 = data.filter(function (data) {

      return data.statusID == "6" ;

     });
     this.buttons3 = data.filter(function (data) {

      return data.statusID == "11" || data.statusID == "15"  ;

     });
     this.buttons4 = data.filter(function (data) {

      return data.statusID == "15"  ;

     });
     
    

       })

       this.managementwsiservice.getOfficeLevel().subscribe(res => {
        this.OfficeLevelList = res;
  
      })

    
      this.managementwsiservice.getSchoolPosition().subscribe(res=>{
        this.schoolPositionList=res;
        console.log("school list", this.schoolPositionList)
      })
  
    
    //Get Activity Names
    this.managementwsiservice.ActivityList().subscribe(result=>{
      console.log(result);
      this.ActivityList=result;
    });
    //Get Responsible person
    this.managementwsiservice.getResponsibleList().subscribe(list=>{
      console.log(list);
      this.responsiblePersons=list;
    });
    //Get Period List
  this.managementwsiservice.getAllPeriod().subscribe(result=>{
    console.log(result)
   // this.periodList=result;


  })

  let yearDate = new Date();
  this.periodList=[yearDate.getFullYear(),yearDate.getFullYear()+1]
  console.log(this.periodList)



  
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
      console.log(branch);
      let level = this.officelevel;
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
      console.log(this.chiefDirectorates)
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
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  onselectedbrach(HOBranchData) {

    if (HOBranchData.target.value != "0") {
      this.BranchSelected = HOBranchData.target.value

      //Chief Directorate
      this.HOCDDataData = this.HOAllPositionfilter.filter(e => e.branch == this.BranchSelected).map(item => item.chiefdirectorate)
        .filter((value, index, self) => self.indexOf(value) === index);
      //return self.findIndex(v => v.actor.name === value.actor.name) === index;
      //Dirctorate
      this.HODirectorate = this.HOAllPositionfilter.filter(e => e.branch == this.BranchSelected).map(item => item.directorate)
        .filter((value, index, self) => self.indexOf(value) === index);


      //this.HOPOsition =  this.HOAllPositionfilter.filter(e=>e.branch==this.BranchSelected && e.chiefdirectorate == null && e.directorate == null && e.subdirectorates== null);

    } else {

      this.HOCDDataData = this.HPbranchPostion.map(item => item.chiefdirectorate)
        .filter((value, index, self) => self.indexOf(value) === index);
    }

  }

  
  isLevelInvalid(office) {
    let isinvalid = false;
    let currentlevel = this.appService.getLoggedInUserOfficeLevel();
    let currentPosition = this.appService.getLoggedInUserRole();

    if (currentlevel == "District") {
      if (office == "Head Office") {
        isinvalid = true;
      }
    } else if (currentlevel == "School") {
      if (office == "Head Office" || office == "District") {
        isinvalid = true;
      }
    }

    return isinvalid

  }
  // region event//
  onselectedregion(region) {
    if (region) {

      // this.regionSelected = region;

      //filldistricts
      this.districtsData = this.schoolsMainData.filter(e => e.region == region).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillcircuits
      this.circuitsData = this.schoolsMainData.filter(e => e.region == region).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersData = this.schoolsMainData.filter(e => e.region == region).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillschools        
      //this.schoolsMain = this.schoolsMainData.filter(e=>e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);



    } else {
      this.regionsData = this.schoolsMainData.map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //this.regionsData = reg;
      this.districtsData = this.schoolsMainData.map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.circuitsData = this.schoolsMainData.map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);


      this.clustersData = this.schoolsMainData.map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.schoolsMain = this.schoolsMainData;

    }

    this.districtName = "";
    // console.log(this.districtsData)
    // console.log(this.schoolsMainData)
  }
  
  Subdirectorate(dispositionsdatasub) {
    console.log("selected valus",dispositionsdatasub)

    if (dispositionsdatasub.target.value != "0") {
      this.subdirectorateSelected = dispositionsdatasub.target.value;
      //fillregion
      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub.target.value).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);



    } else {

      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub.target.value).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);




    }
    console.log( "this is district data",this.dispositionsdataposition )

  }

 ///Function to create Activity
 
 builduserForm() {
  this.userForm = this.formBuilder.group({
    activityName: [''],
    roleId: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    statusID: [5],
    newActityName: [''],
    comment: ['No Comment']

   
  })
}
///Function to submit Activity


 ///modalsCreateActivity
  openEditModel(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });


  }

   ///modalEditActivity
   openEditModel2(content, id,activityName,responsibility,startDate,endDate,managementPeriod,PeriodID,statusID) {
   
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

     
      this.planID=id;
     
      this.managementwsiservice.getPlanById(id).subscribe(data=>{
      
        this.dataList=data
       
        this.setUpdateForm( this.dataList);
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

  setUpdateForm(user) {
    console.log("Data in passed function",user)
    if (user) {
      console.log("this office level",user[0])
      this.statusID=user[0].statusID
      this.comment=user[0].comment
      this.updateBranch= user[0].branch   
      this.activityName = user[0].activityName;
      this.responsibility = user[0].responsibility
      this.startDate = moment(user[0].startDate).format('YYYY-MM-DD');
      this.endDate = moment(user[0].endDate).format('YYYY-MM-DD');
      this.managementPeriod=user[0].managementPeriod;
      this.PeriodID= user[0].PeriodID;
      this.updateResponsibilityType=user[0].responsibilityType;
     
      this.status=user[0].status;
      this.updateOfficelevel=user[0].officeLevel;
     
      this.updateRegion=user[0].region;
      this.updateChiefDirectorate=user[0].chiefDirectorate;
      this.updateSubDirectorate=user[0].subDirectorate;
      this.updateDistrictName=user[0].district;
      this.updateDirectorate=user[0].directorate;

     // console.log("this office level",user.officeLevel)

      

      if (user[0].officeLevel == "Head Office" && user[0].responsibilityType=="Other") {
        console.log("Hi Other at Head Office")
        let dir = this.allDirectorate.filter(function (directorate) {
          return directorate.directorateName ==user[0].directorate;
        });
        //console.log("All d dir", dir)
        let sub = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });
        //console.log("All s sub ", sub )
        let chief = this.allChiefDirectorate.filter(function (directorate) {
          return directorate.chiefDirectorateName == user[0].chiefDirectorate;
        });

        let branch = this.allBranches.filter(function (directorate) {
          return directorate.branchName == user[0].branch;
        });
        //console.log("All B ", branch)
        //console.log("All Branches")

        this.chiefDirectorates = this.allChiefDirectorate.filter(function (directorate) {
          return directorate.branchId == branch[0].branchId;
        });

        this.directorates = this.allDirectorate.filter(function (directorate) {
          return directorate.chiefDirectorateId == chief[0].id;
        });
       // console.log("All Directorates",this.directorates)

        this.subDirectorates = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });
       // console.log("All sub  Directorates",this.subDirectorates )
        this.positionId = branch[0].id.split(",");


        this.updateBranch = branch[0].branchId + "#;" + branch[0].branchName + "#;" + branch[0].id;
       // console.log(this.updateBranch );
        this.updateChiefDirectorate = chief[0].id + "#;" + chief[0].chiefDirectorateName;
        //console.log(this.updateChiefDirectorate);
        this.updateDirectorate = dir[0].id + "#;" + dir[0].directorateName;
        //console.log(this.updateDirectorate);
        this.updateSubDirectorate = sub[0].id + "#;" + sub[0].subDirectorateName;
       // console.log(this.updateSubDirectorate );

        this.positionList = this.allPosition.filter(function (position) {
          return position.officelevel == user[0].officeLevel;
        });
       console.log("this are position selected",    this.positionList )
     

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
        
        this.positions = responsiblePerson.split(',');
        this.position=this.responsibility
        console.log(this.responsibility)
        console.log( this.position)
     
        if(user[0].officeLevel=="District" && user[0].responsibilityType=="Other")
        {
      
          this.position=responsiblePerson.split(',');
      
      

        }

      } else {
        console.log("office for School")
        this.updateBranch = user[0].branch;
        this.updateChiefDirectorate = user[0].chiefDirectorate;
        this.updateDirectorate = user[0].directorate;
        this.updateSubDirectorate = user[0].subDirectorate;


        this.positionList = this.allPosition.filter(function (position) {
          return position.officelevel == user[0].officeLevel;
        });
       

        this.updatePosition = user.position;
      }

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
        
        this.positions = responsiblePerson.split(',');
        this.position=this.responsibility
       
        if(user[0].officeLevel=="District" && user[0].responsibilityType=="Other")
        {
       
          this.position=responsiblePerson.split(',');
      
      

        }



    }
  }

   selectUpdateDirectorate(directorate) {

    if (directorate) {

      let dirid = this.getDropdownValue(directorate, "id");

      this.subDirectorates = this.allSubDirectorate.filter(function (data) {
        return data.directorateId == dirid;

      });

      // console.log(this.subDirectorates)
      if (this.subDirectorates.length == 0) {
        this.userForm.controls["updateSubDirectorate"].clearValidators();
        this.userForm.controls["updateSubDirectorate"].updateValueAndValidity();
      }

    }

  }

  
  updateSubdirectorate(dispositionsdatasub) {

    if (dispositionsdatasub) {
      this.subdirectorateSelected = dispositionsdatasub;
      //fillregion
      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);



    } else {

      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);




    }
    this.position="";
   
  }
  
  onupdateSelectedregion(region) {
    if (region) {


      //filldistricts
      this.districtsData = this.schoolsMainData.filter(e => e.region == region).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillcircuits
      this.circuitsData = this.schoolsMainData.filter(e => e.region == region).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersData = this.schoolsMainData.filter(e => e.region == region).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillschools        
      //this.schoolsMain = this.schoolsMainData.filter(e=>e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);



    } else {
      this.regionsData = this.schoolsMainData.map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //this.regionsData = reg;
      this.districtsData = this.schoolsMainData.map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.circuitsData = this.schoolsMainData.map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);


      this.clustersData = this.schoolsMainData.map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.schoolsMain = this.schoolsMainData;

    }

    this.updateDistrictName = "";

   
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
   
this.EditstartDate=this.EditstartDate
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.EditstartDate
}
isActivityNameSelected: boolean =false;
ActivityNameSelected: boolean =true;
ActivityExist:boolean;
//Show and hide Activity Name 
selectInput(event) {
 
  let selected =  event.target.value;
  let ActivityList
  console.log(selected);
  this.PeriodID=this.PeriodID;
  console.log(this.PeriodID);
  this.managementwsiservice.checkActivity(selected,this.PeriodID).subscribe(data=>{
    console.log("Activity exist",data);
   
    if(data == null){
      this.ActivityExist=false;
    }else{
      this.ActivityExist=true;
    }

    console.log(this.ActivityExist);

  })
  if (selected == "Other") {
    this.isActivityNameSelected = true;
    this.ActivityNameSelected = false;
    this.userForm.controls["activityName"].clearValidators();

      this.userForm.controls["activityName"].updateValueAndValidity();
      this.activityName="";
  } else {
    this.isActivityNameSelected = false;
    this.userForm.controls["newActityName"].clearValidators();

      this.userForm.controls["newActityName"].updateValueAndValidity();
      this.newActityName="";
  }
 // this.cdref.detectChanges(); 

}
//Get Dustrict Position
getPosition(positions)
{ 
  let level=this.officelevel
  let position=this.allPosition.filter(function (data) {
  
    return data.officelevel == level && position.positions;

  });
   
 console.log("District All Positions",position)
}

get Form() {
  return this.userForm.controls;
}
get Forms() {
  return this.editForm.controls;
}
get FormC() {
  return this.userFormCommet.controls;
}
get FormS() {
  return this.HeadSubForm.controls;
}
get FormHo() {
  return this.HeadSubFormEdit.controls;
}
//Function to add new SubActivity
logDispute() {
    
  if (this.HeadSubForm.valid) {
    let  HeadSub = {
    
      "id": 0,
      "subActivity": this.subActivity,
      "responsibility": this.responsibility,
      "startDate":this.startDate,
      "endDate": this.endDate,
      "managementPlanActivityId": this.managementPlanActivityId,
      "statusID": 7,
      "stutus": "string",
      "periodID": this.PeriodID,
      "period": "string"



    };
      console.log( HeadSub );
    Swal.fire({
      title: 'Are you sure you want to Add Sub-Activity',
      text: 'A Sub-Activity will be added',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {
          //nompumeleo

          this.managementwsiservice.HeadSubActivity( HeadSub).subscribe(res => {
            console.log(res);
            console.log("sucess");
          });
          ///Nompumelelo


          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Ok',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'A  sub-Activity  Added',

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
  } else if (this.HeadSubForm.invalid) {
    console.log("user not created")
  }
  this.isFormSubmitted = true;
}
//Cancell Functionality
Cancel()
{
  this.userForm.reset();
  this.isFormSubmitted = false;

  this.modalService.dismissAll();
 
    this.userForm.controls["responsibility"].setValue("");
    this.userForm.controls["startDate"].setValue("");
    this.userForm.controls["endDate"].setValue("");
 this.userForm.controls["activityName"].setValue("");
}

CancelEdit()
{
 //this.userEditForm.reset();
 // this.isFormSubmitted = false;

  this.modalService.dismissAll();

    this.userEditForm.controls["Editresponsibility"].setValue("");
    this.userEditForm.controls["EditstartDate"].setValue("");
    this.userEditForm.controls["EditendDate"].setValue("");
 
    this.userEditForm.controls["EditactivityName"].setValue("");


}
//Cancell Functionality
toISOLocalDate(d) {

  var z = n => ('0' + n).slice(-2);

  var zz = n => ('00' + n).slice(-3);

  var off = d.getTimezoneOffset();

  var sign = off < 0 ? '+' : '-';

  off = Math.abs(off);



  return d.getFullYear() + '-'

    + z(d.getMonth() + 1) + '-' +

    z(d.getDate())



}

getFormValidationErrorsEdit() {

  // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

  let totalErrors = 0;

  Object.keys(this.editForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.editForm.get(key).errors;
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
var managementPlanRequest = this.editForm.value;
console.log("Values im passing ",this.BranchSelected,this.selectDirectorate)
 console.log(this.editForm.value);
 console.log(this.editForm.value.id)
//payload.roleId = payload.roleId.toString();
if(this.updateOfficelevel=="District"){
  console.log("position in district")
let roleId =this.editForm.value.id

let level=this.updateOfficelevel
let position=this.allPosition.filter(function (data) {

  return data.officelevel == level && roleId.includes(data.position);

});


let relDoc = [];

for (var key in this.editForm.value.id) {

if (position.hasOwnProperty(key)) {

  relDoc.push(position[key].id)
  //this.assignedSchool=relDoc[0].institution;
}
this.editForm.value.id=relDoc.toString();
}

console.log(relDoc)



}else {
  //let id =this.id
  

  let relDoc = [];
console.log(this.position)
for (var key in this.position) {

  if (this.position.hasOwnProperty(key)) {

    relDoc.push(this.position[key].id)
    //this.assignedSchool=relDoc[0].institution;
  }


  console.log("Selected Id",relDoc.toString()) 
//console.log("Selected postion",position)
this.editForm.value.id=relDoc.toString();

  }
console.log(this.status)
}
if(this.statusID==12)
{
  console.log("hi")
  this.statusID ="13";
  console.log("The new  ID Im submiting",this.statusID )
}
console.log("The ID Im submiting",this.statusID )
  if (this.editForm.valid) {
  
    let branch = this.getDropdownValue(this.updateBranch, 'name')
    let cheifdir = this.getDropdownValue(this.updateChiefDirectorate, 'name')
    let dir = this.getDropdownValue(this.updateDirectorate, 'name')
    this.temp = this.getDropdownValue(this.updateSubDirectorate, 'name')
     
    if(this.editForm.value.updateOfficelevel=="District"){
      this.temp =this.updateSubDirectorate;
    }
    var objManagementPlan = {

      "planID": this.planID,
      "activityName":this.editForm.value.activityName,
    "responsibilityId":this.editForm.value.id.toString(),
    "startDate":this.editForm.value.startDate,
    "endDate":this.editForm.value.endDate,
    "statusID":this.statusID,
    "comment":this.comment,
    "PeriodID":1,
  "Branch":branch, 
  "Directorate":dir,
  
  "subDirectorate": this.temp,
  "Region":this.updateRegion,
  "District":this.updateDistrictName,
  "ChiefDirectorate":cheifdir,
  "OfficeLevel":this.editForm.value.updateOfficelevel,
  "ResponsibilityType":this.editForm.value.updateResponsibilityType
  
  };
  
  console.log(objManagementPlan )
     // console.log(data );
    Swal.fire({
      title: 'Are you sure you want to Update Activity',
      text: ' Activity will be Updated',
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
           ;
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
//Clear Office Levele Validations
  ///roletype radio button
  AdminRole(responsibilityType) {
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


   


    if ( responsibilityType == 'Other' && this.officelevel == 'Head Office') {
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
     

    } else if (responsibilityType == 'All' && this.officelevel == 'Head Office') {

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
   
    


    } else if ( responsibilityType == 'Other' && this.officelevel == 'District') {

    
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


    } else if (responsibilityType == 'All' && this.officelevel == 'District') { //set

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
  //Clear Office Levele Validations
  ///roletype radio button
  ClearUpdate(updateResponsibilityType) {
    let roletype =" "
    this.updateBranch = "";
    this.updateChiefDirectorate = "";
    this.chiefDirectorates = [];
    this.updateDirectorate = "";
    this.directorates = [];
    this.updateSubDirectorate = "";
    this.position = [];
    this.updateDistrictName = "";
    this.updateRegion = "";
    this.id = "";
    this.positions = [];
    this.position ="";


   


    if ( updateResponsibilityType =='Other' && this.updateOfficelevel == 'Head Office') {
      this.editForm.controls["updateBranch"].setValidators([Validators.required]);
      this.editForm.controls["updateBranch"].updateValueAndValidity();
      this.editForm.controls["updateChiefDirectorate"].setValidators([Validators.required]);
      this.editForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateDirectorate"].setValidators([Validators.required]);
      this.editForm.controls["updateDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateSubDirectorate"].setValidators([Validators.required]);
      this.editForm.controls["updateSubDirectorate"].updateValueAndValidity();
     

      ///clear
      this.editForm.controls["updateRegion"].clearValidators();
      this.editForm.controls["updateRegion"].updateValueAndValidity();
      this.editForm.controls["updateDistrictName"].clearValidators();
      this.editForm.controls["updateDistrictName"].updateValueAndValidity();
      

      ///clear values
      this.districtName = "";
      this.region = "";
     

    } else if (updateResponsibilityType =='All' && this.officelevel == 'Head Office') {

      ///clear
      this.editForm.controls["updateRegion"].clearValidators();
      this.editForm.controls["updateRegion"].updateValueAndValidity();
      this.editForm.controls["updateDistrictName"].clearValidators();
      this.editForm.controls["updateDistrictName"].updateValueAndValidity();
      this.editForm.controls["updateDirectorate"].clearValidators();
      this.editForm.controls["updateDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateBranch"].clearValidators();
      this.editForm.controls["updateBranch"].updateValueAndValidity();
      this.editForm.controls["updateChiefDirectorate"].clearValidators();
      this.editForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateSubDirectorate"].clearValidators();
      this.editForm.controls["updateSubDirectorate"].updateValueAndValidity();


      this.updateBranch = "";
      this.updateChiefDirectorate= "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateDistrictName = "";
    this.updateRegion = "";
   
     // this.position = "System Administrator";


    } else if ( updateResponsibilityType =='Other' && this.updateOfficelevel == 'District') {

    
      this.editForm.controls["updateSubDirectorate"].setValidators([Validators.required]);
      this.editForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateRegion"].setValidators([Validators.required]);
      this.editForm.controls["updateRegion"].updateValueAndValidity();
      this.editForm.controls["updateDistrictName"].setValidators([Validators.required]);
      this.editForm.controls["updateDistrictName"].updateValueAndValidity();

      //clear
      this.editForm.controls["updateDirectorate"].clearValidators();
      this.editForm.controls["updateDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateBranch"].clearValidators();
      this.editForm.controls["updateBranch"].updateValueAndValidity();
      this.editForm.controls["updateChiefDirectorate"].clearValidators();
      this.editForm.controls["updateChiefDirectorate"].updateValueAndValidity();
   ;

      //clearvalue    
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate="";


    } else if (updateResponsibilityType =='All' && this.officelevel == 'District') { //set

      this.editForm.controls["updateRegion"].clearValidators();
      this.editForm.controls["updateRegion"].updateValueAndValidity();
      this.editForm.controls["updateDistrictName"].clearValidators();
      this.editForm.controls["updateDistrictName"].updateValueAndValidity();
      this.editForm.controls["updateDirectorate"].clearValidators();
      this.editForm.controls["updateDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateBranch"].clearValidators();
      this.editForm.controls["updateBranch"].updateValueAndValidity();
      this.editForm.controls["updateChiefDirectorate"].clearValidators();
      this.editForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateSubDirectorate"].clearValidators();
      this.editForm.controls["updateSubDirectorate"].updateValueAndValidity();

      //clear vlaue
      this.updateBranch = "";
      this.updateChiefDirectorate= "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateDistrictName = "";
    this.updateRegion = "";
     

    } else {

     
     

      //clear
      this.editForm.controls["updateRegion"].clearValidators();
      this.editForm.controls["updateRegion"].updateValueAndValidity();
      this.editForm.controls["updateDistrictName"].clearValidators();
      this.editForm.controls["updateDistrictName"].updateValueAndValidity();
      this.editForm.controls["updateDirectorate"].clearValidators();
      this.editForm.controls["updateDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateBranch"].clearValidators();
      this.editForm.controls["updateBranch"].updateValueAndValidity();
      this.editForm.controls["updateChiefDirectorate"].clearValidators();
      this.editForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.editForm.controls["updateSubDirectorate"].clearValidators();
      this.editForm.controls["updateSubDirectorate"].updateValueAndValidity();
     

      //clearValues
      this.updateBranch = "";
    this.updateChiefDirectorate = "";
   // this.chiefDirectorates = [];
    this.updateDirectorate = "";
   // this.directorates = [];
    this.updateSubDirectorate = "";
  
    this.updateDistrictName = "";
    this.updateRegion = "";
    
   // this.positions = [];

      
    }


  }


//End Office Level Validation


UpdateSubmitCheck(planID,status) {
 
  this.planID = planID;
  if(status=="Item logged" || "item Flagged")
  {
   this.status ="6"
  }
  if(status=="Change Request")
  {
   this.status ="14"
  }
  if(this.status=="Activity Approved")
  {
   this.statusID ="15"
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
UpdateSubmitUnCheck(planID,status) {
 
  this.planID = planID;
  if(status=="Item Selected")
  {
   this.status ="5"
  }
  if(status=="Request Selected")
  {
   this.status ="13"
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
checkedAll() {
 
  for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].status==="Item Selected")
    {
      this.lis[index].status ="6"
    }
    if( this.lis[index].status ==="Item logged")
    {
      this.lis[index].status ="6"
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
UncheckedAll() {
 
  for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].status==="Item Selected")
    {
      this.lis[index].status ="5"
    }
    if( this.lis[index].status ==="Item logged")
    {
      this.lis[index].status ="5"
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
checkedApproved(planID,status) {
 {

  this.planID = planID;
    
    if(status ==="Activity Approved")
    {
      this.statusID ="15"
    }
   
    

    
    
    this.managementwsiservice.UpdateStatuById(this.planID,this.statusID).subscribe(result => {
      
      console.log(" Approved updated")
    })


  }



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: ' Activities Selected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}
UncheckedApproved(planID,status) {
  {
 
   this.planID = planID;
     
     if(status ==="Approved Selected")
     {
       this.statusID ="11"
     }
    
     
 
     
     
     this.managementwsiservice.UpdateStatuById(this.planID,this.statusID).subscribe(result => {
       
       console.log(" Approved updated")
     })
 
 
   }
 
 
 
           Swal.fire({
             timer: 3000,
             //confirmButtonText: 'Ok',
            // cancelButtonText: 'No',
             title: "Successful",
             text: ' Activities Selected',
 
             icon: 'success'
           }).then(result => {
            this.modalService.dismissAll();
             // this.validationFormEdits.reset();
             if (result.value || result.isDismissed) {
            window.location.reload()
             }
           });
 
 
 
 
         
     
 
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


  


 openEditModel3()
 {
  this.router.navigate(['/Management-wsi/end-user'])
 }

 getManagementPlans(){
  this.managementwsiservice.getManagementPlans()
  .subscribe(res => {
    this.managementPlans = res;
    console.log('management plans results', res);
  }, error => {
    console.log('management plans resulted in error', error);
  })
}

openCreateManagementPlanModel(content) {
  this.buildCreateManagementPlanForm();
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log('Create Plan Modal closed' + result);

  }).catch((res) => { });
}

buildCreateManagementPlanForm() {
  this.createManagementPlanForm = this.formBuilder.group({
    activityName: [ '', Validators.required],
    roleId: [ '', Validators.required],
    startDate: [ '', Validators.required],
    endDate: [ '', Validators.required],
    statusID: [1],
    comment: ['No Comment']
  })
}


get createManagementPlanFormControl() {
  return this.createManagementPlanForm.controls;
}


getStatuses(){
this.managementwsiservice.getStatuses()
.subscribe(res => {
  this.statuses = res;
}, err => {
  console.log('getting status resulted in an error', err);
});
}


 

getActivities() {
this.managementwsiservice.ActivityList()
.subscribe(res => {
  this.activities = res;
}, err => {
  console.log('get activities resulted in an error', err);
});
}
//Get Activity By Id

//Submit Function For Each Activity
Submit() 
{
  console.log("position id",this.userForm.value.id,"the selected position",this.position)
  if(this.officelevel=="District" && this.responsibilityType=="Other")
  {
    console.log("position in district",this.userForm.value.id,"the selected position",this.position)
  let roleId =this.userForm.value.id
  console.log("all Position in district" ,this.allPosition)
  let level=this.officelevel
  let position=this.allPosition.filter(function (data) {
  
    return data.officelevel == level && roleId.includes(data.rolename);

  });


  let relDoc = [];

for (var key in this.userForm.value.id) {

  if (position.hasOwnProperty(key)) {

    relDoc.push(position[key].id)
    //this.assignedSchool=relDoc[0].institution;
  }
  this.position=relDoc.toString();
}

console.log(relDoc)



  }else{
let relDocs = [];

for (var key in this.userForm.value.id) {

  if (this.userForm.value.id.hasOwnProperty(key)) {

    relDocs.push(this.userForm.value.id[key].id)
    //this.assignedSchool=relDoc[0].institution;
  }


  console.log("Selected Id",relDocs.toString()) 
//console.log("Selected postion",position)
this.position=relDocs.toString();

  }
  //console.log("Selected Id",relDocs.toString()) 
console.log("Selected postion",this.position)
  }

  this.getFormValidationErrors();
  var managementPlanReqPayload = [];
  var managementPlanRequest = this.userForm.value;
//payload.roleId = payload.roleId.toString();
console.log(this.newActityName,this.userForm.value.id);
console.log(this.userForm.value.id)
console.log(this.userForm.value);
if(this.userForm.valid){
  
if(this.newActityName != '')
{
  this.userForm.value.activityName=this.newActityName;
  console.log("The activity Name captured is ",this.userForm.value.activityName)
  
  let data= {
    "activityID": 0,
  "activityName": this.userForm.value.activityName
};
  console.log(data);
  this.managementwsiservice.addNewActivity(data).subscribe(res=>{
     console.log("activity LIst updated")
   }); 

}else
{
 
  console.log("The activity Name captured is from dropdown ",this.userForm.value.activityName);

}
   this.managementPeriod="1";
  var objManagementPlan = {
    "planID":0,
    "activityName":this.userForm.value.activityName,
  "responsibilityId":this.position.toString(),
  "startDate":this.userForm.value.startDate,
  "endDate":this.userForm.value.endDate,
  "statusID":5,
  "comment":" No Comment",
  "PeriodID":this.managementPeriod,
"Branch":this.BranchSelected, 
"Directorate":this.selectDirectorate,

"SubDirectorate": this.SubDirectorate,
"Region":this.region,
"District":this.districtName,
"ChiefDirectorate":this.selectChiefDirectorate,
"OfficeLevel":this.officelevel,
"responsibilityType":this.userForm.value.responsibilityType

};

  console.log(objManagementPlan )
     // console.log(data );
    Swal.fire({
      title: 'Are you sure you want to Create Activity',
      text: ' Activity will be Created',
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
//Submit For Review All Activities
SubmitReviewAll() {

  Swal.fire({
    title: 'Are you sure you want to Submit Management Plan Activities For '+'  '+this.lis[0].managementPeriod+' ' +'For Review',
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


    if( this.lis[index].status==="Item Selected")
    {
      this.lis[index].status ="3"
    }
    if( this.lis[index].status ==="Item logged")
    {
      this.lis[index].status ="3"
    }
    if( this.lis[index].status ==="Request update")
    {
      this.lis[index].status ="3"
    }
    if( this.lis[index].status ==="Change Request")
    {
      this.lis[index].status ="3"
    }
    if( this.lis[index].status==="Request Selected")
    {
      this.lis[index].status ="3"
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
//GetPosistionList
/*
positionList(officelevel)
{
  console.log("list",officelevel)
  this.managementwsiservice.GetPositionList("School").subscribe((res:any)=>{
    this.responsibilities =res;
  })
} */
//Submit For Review Only The Selected
Submitchecked() {

  Swal.fire({
    title: 'Are you sure you want to Submit Management Plan Activities For '+'  '+this.lis[0].managementPeriod+' ' +'For Review',
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


    if( this.lis[index].status==="Item Selected")
    {
      this.lis[index].status ="3"
    }
    if( this.lis[index].status==="Request Selected")
    {
      this.lis[index].status ="3"
    }

    
    if( this.lis[index].status ==="Item logged")
    {
      this.lis[index].status ="10"
    }
    

    
    console.log(this.lis[index].planID);
    this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].status).subscribe(result => {
      
      console.log("Submitting for review")
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

//Publishing Function for Main activity
publish() {
  
 console.log(this.lis[0].managementPeriod)
 
  Swal.fire({
    title: 'Are you sure you want to Publish All Activities On   Management Plan For '+'  '+this.lis[0].managementPeriod,
    text: 'A Management Plan will be Plublished',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
 
  console.log(this.lis)
  for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].status==="Activity Approved")
    {
      this.lis[index].statusID ="4"
    }
    
    if( this.lis[index].status ==="Approved Selected")
    {
      this.lis[index].statusID ="4"
    } 
    

    
    console.log(this.lis[index].planID);
    this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].statusID).subscribe(result => {
      
      console.log("Puplished")
    })


  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'A Management Plan will be Plublished',

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
//Publishing The Selected Function for Main activity
publishSelected() {
  
  console.log(this.lis[0].managementPeriod)
  
   Swal.fire({
     title: 'Are you sure you want to Publish The Selected Activities On Management Plan For '+'  '+this.lis[0].managementPeriod,
     text: 'A Management Plan will be Plublished',
     icon: 'question',
     showCancelButton: true,
     confirmButtonText: 'Yes',
     cancelButtonText: 'No'
 
   }).
     then((result) => {
       if (result.value) {
  
   console.log(this.lis)
   for (let index = 0; index < this.lis.length; index++) {


    if( this.lis[index].statusID=="15")
    {
      this.lis[index].statusID ="4"
      
    }
    if( this.lis[index].statusID =="15")
    {
      this.lis[index].statusID ="4"
      
  
    }
 
     
     console.log(this.lis[index].planID);
     this.managementwsiservice.UpdateStatuById(this.lis[index].planID,this.lis[index].statusID).subscribe(result => {
       
       console.log(" sELECE Puplished")
     })
 
 
   }
 
   Swal.fire({
     timer: 5000,
     confirmButtonText: 'Ok',
     cancelButtonText: 'No',
     title: "Successful",
     text: 'A Management Plan will be Plublished',
 
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

disableReview()
 {
   
  this.managementwsiservice.ManagementListCapture().subscribe((data: any)=>{
    // console.log(data);
     this.li = data;
    // this.disableReview(this.li);
     console.log( this.li)
    
    
  console.log( this.li);
  var disableButton = this.li.filter(data =>

    data.status == "Item Selected",
   

  );

  if (disableButton.length == 0) {
    this.disable = false;

  } else {
    console.log("false button")
    this.disable = true;
  }

})
  

}
openEditModelHOsub(content, id,name,startDate,endDate,periodID,managementPeriod) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });

  this.managementPlanActivityId = id;
 
  this.activityName=name;
  this.PeriodID=periodID;
  this.managementPeriod=managementPeriod;
  //this.minDate=moment(startDate).format('YYYY-MM-DD');
 // this.maxDate=moment(endDate).format('YYYY-MM-DD');
  this.maxDate=this.toISOLocalDate(endDate);
  this.minDate=this.toISOLocalDate(startDate);
 // console.log(maxDate,minDate)

  
  
   

}
openEditModelSubList(content, id,name,startDate,endDate,PeriodID,managementPeriod) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });

  this.managementPlanActivityId = id;
 
  this.activityName=name;
  this.PeriodID=managementPeriod;
  //this.minDate=moment(startDate).format('YYYY-MM-DD');
 // this.maxDate=moment(endDate).format('YYYY-MM-DD');
  this.maxDate=this.toISOLocalDate(endDate);
  this.minDate=this.toISOLocalDate(startDate);
 // console.log(maxDate,minDate)

  
  
   

}
///View Edit Per HeadOffice 
openListHO(content, id,subActivity,responsibility,startDate,endDate,periodID,managementPlanActivityId,statusID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });

  this.managementPlanActivityId = managementPlanActivityId;
 this.id=id;
  this.statusID=statusID;
  console.log(this.statusID)
  this.startDate= moment(startDate).format('YYYY-MM-DD');
  this.endDate =moment(endDate).format('YYYY-MM-DD');
 // this.managementPeriod=managementPeriod;
  this.periodID=periodID;
  this.subActivity=subActivity;
  this.responsibility=responsibility
 
 



  
  
   

}
///Update per Headoffice subActivity
UpdateHoSub() {
  if( this.statusID==4){
    this.statusID=4;
  }
  if (this.HeadSubFormEdit.valid) {
    let  HeadSub = {
    
      "id": this.id,
      "subActivity": this.subActivity,
      "responsibility": this.responsibility,
      "startDate":this.startDate,
      "endDate": this.endDate,
      "managementPlanActivityId": this.managementPlanActivityId,
      "statusID": this.statusID,
      "stutus": "string",
      "periodID": this.periodID,
      "period": "string"



    };
      console.log(HeadSub );
    Swal.fire({
      title: 'Are you sure you want to Add Sub-Activity',
      text: 'A Sub-Activity will be Updated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'

    }).
      then((result) => {
        if (result.value) {
          //nompumeleo

          this.managementwsiservice.UpdateHeadSub( 
            HeadSub.id,
          
            HeadSub.managementPlanActivityId,
            HeadSub.subActivity,
            HeadSub.responsibility,
            HeadSub.startDate,
            HeadSub.endDate,
            HeadSub.periodID,
            HeadSub.statusID).subscribe(res => {
            console.log(res);
            console.log("sucess");
          });
          ///Nompumelelo


          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Ok',
            cancelButtonText: 'No',
            title: "Successful",
            text: 'A  sub-Activity  Updated',

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
  } else if (this.HeadSubFormEdit.invalid) {
    console.log("user not created")
  }
  this.isFormSubmitted = true;
}

 //ViweHeadOffList
 ModelHeadSub(content, id,name,startDate,endDate,periodID) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  
   this.activityName=name;
  this.periodID=periodID;

  console.log(this.managementPlanActivityId)
  this.managementwsiservice.GetHeadOfficeSubList().subscribe(res=>{
    console.log("data for sub in head off",res)
  })
  this.managementwsiservice.GetHeadOfficeSubListByMainId(this.managementPlanActivityId).subscribe((data:any)=>{
    console.log("data for sub in head off per Activi",data)
    this.HeadList=data;
    this.button1 = data.filter(function (data) {

      return data.statusID == "7" || data.statusID =="6"  ;

     }); 
     this.button2 = data.filter(function (data) {

      return data.statusID == "6" ;

     });
    

  })
  
 
    

}
 //ViweDistrictList
 openEditdistrictList(content, id) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.managementPlanActivityId = id;
  console.log( "ID on the first modal",this.managementPlanActivityId);
 
    

}
 //ViweDistrictList
 openEditModelSubListPerDistrict(content, districtCode) {
  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);

  }).catch((res) => { });
  this.planID= this.managementPlanActivityId;
  console.log("plan Id on the second modal")
   
 console.log( this.managementPlanActivityId ,districtCode);
  this.managementwsiservice.getAllSubActivities(this.planID,districtCode).subscribe((list:any)=>{
    
    this.lisSub=list;
    console.log("this is main and sub-Activity-list", this.lisSub);
 })
    

}


//Submit For Publish All sub  Activities
PublishAll() {
 
  
 
    Swal.fire({
      title: 'Are you sure you want to Publish The Sub-Activities For Management Plan  '+'  '+this.lis[0].managementPeriod,
      text: 'A Management Plan will be Plublished',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
  
    }).
      then((result) => {
        if (result.value) {
          
    for (let index = 0; index < this.HeadList.length; index++) {
  
  
      if( this.HeadList[index].statusID=="6")
      {
        this.HeadList[index].statusID ="4"
        
      }
      if( this.HeadList[index].statusID =="7")
      {
        this.HeadList[index].statusID ="4"
        
    
      }
    
  
      
      
     
      this.statusID=this.HeadList[index].statusID;
      console.log("new Id", this.HeadList[index].id,"New Status",this.statusID)
      this.managementwsiservice.updateHeadById( this.HeadList[index].id,this.statusID).subscribe(result=>{
        console.log("Successful")
        })
      
  
  
    }
  
    Swal.fire({
      timer: 5000,
      confirmButtonText: 'Ok',
      cancelButtonText: 'No',
      title: "Successful",
      text: 'A Management Plan will be Plublished',
  
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
  //Submit For Publish Selected sub  Activities
Publishchecked() {
 
  
 
  Swal.fire({
    title: 'Are you sure you want to Publish The Sub-Activities For Management Plan  '+'  '+this.lis[0].managementPeriod,
    text: 'A Management Plan will be Plublished',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'

  }).
    then((result) => {
      if (result.value) {
        
  for (let index = 0; index < this.HeadList.length; index++) {


    if( this.HeadList[index].statusID=="6")
    {
      this.HeadList[index].statusID ="4"
      
    }
    if( this.HeadList[index].statusID =="7")
    {
      this.HeadList[index].statusID ="10"
      
  
    }
  

    
    
   
    this.statusID=this.HeadList[index].statusID;
    console.log("new Id", this.HeadList[index].id,"New Status",this.statusID)
    this.managementwsiservice.updateHeadById( this.HeadList[index].id,this.statusID).subscribe(result=>{
      console.log("Successful")
      })
    


  }

  Swal.fire({
    timer: 5000,
    confirmButtonText: 'Ok',
    cancelButtonText: 'No',
    title: "Successful",
    text: 'A Management Plan will be Plublished',

    icon: 'success'
  }).then(result => {
   this.modalService.dismissAll();
    // this.validationFormEdits.reset();
    if (result.value || result.isDismissed) {
    //window.location.reload()
    }
  });




}
})


}

//Check SubActivities for Head Ofice
checkedAllSub() {
  
  for (let index = 0; index < this.HeadList.length; index++) {


    if( this.HeadList[index].statusID=="7")
    {
      this.HeadList[index].statusID ="6"
      
    }
    
  

    
    
   
    this.statusID=this.HeadList[index].statusID;
    console.log("new Id", this.HeadList[index].id,"New Status",this.statusID)
    this.managementwsiservice.updateHeadById( this.HeadList[index].id,this.statusID).subscribe(result=>{
      console.log("Successful")
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
//Check SubActivities for Head Ofice
UncheckedAllSub() {
  
  for (let index = 0; index < this.HeadList.length; index++) {


    if( this.HeadList[index].statusID=="6")
    {
      this.HeadList[index].statusID ="7"
      
    }
    
  

    
    
   
    this.statusID=this.HeadList[index].statusID;
    console.log("new Id", this.HeadList[index].id,"New Status",this.statusID)
    this.managementwsiservice.updateHeadById( this.HeadList[index].id,this.statusID).subscribe(result=>{
      console.log("Successful")
      })
    

  }



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: ' All Activities UnSelected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}
//Select Activity for Head office Sub
CheckBoxHead(id,statusID) {
 
  this.id = id;
  
  
   this.statusID = 6;
  
  console.log("New  status", this.statusID)
  this.managementwsiservice.updateHeadById(this.id,this.statusID).subscribe(result=>{
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
//Select Activity for Head office Sub
UnCheckBoxHead(id,statusID) {
 
  this.id = id;
 
   this.statusID =7
  
  
  this.managementwsiservice.updateHeadById(this.id,this.statusID).subscribe(result=>{
  console.log("Successful")
  })



          Swal.fire({
            timer: 3000,
            //confirmButtonText: 'Ok',
           // cancelButtonText: 'No',
            title: "Successful",
            text: 'Activity  UnSelected',

            icon: 'success'
          }).then(result => {
           this.modalService.dismissAll();
            // this.validationFormEdits.reset();
            if (result.value || result.isDismissed) {
            window.location.reload()
            }
          });




        
    

}

//Clear form update activity end date
clearEndDate()
{
  this.endDate = null;
}

 




 
}

  
