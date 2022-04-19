import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from "../users.service";
import { AuthService } from '../../auth/auth.service';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnDestroy, OnInit {


  validationForm: FormGroup;

  isCreateFormSubmitted: Boolean;

  myschools: any;
  validationFormActiveEdit: FormGroup;
  validationFormEdit: FormGroup;
  isEditFormSubmitted: Boolean;

  basicModalCloseResult: string = '';

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: null,
    uploadMultiple: false,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  uploadEvent: any;
  activeModal: any;
  selectedReport: any;
  docPath: any;
  docsTitle: any;
  newDocs: { title: any; documentTypeId: number; documentPath: any; uploadedBy: any; emisCode: string; schoolName: any; districtCode: string; districtName: any; reportType: any; };
  schoolname: any;
  handOverService: any;

  isPersalExist = false;
  userActive: any;
  validatioUpdateForm: FormGroup;
  other: any;


  constructor(

    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private userservice: UsersService,
    private authService: AuthService,
    private appService: AppService,
    public formBuilder: FormBuilder,
    config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })



  }
  modalReference: NgbModalRef;
  public showOverlay = true;
  public selectedType: string = "";
  public newUser: any = {};
  data = []
  public output: any;
  public firstname: any;
  public surname: any;
  public cellNumber: any;
  public emailAddress: any;
  public idNumber: any;
  public passport: any;
  public schoolName: any;
  public parentSchool: any;
  public districtName = "";
  public disputeOfficialName: any;
  public emisNumber = "";
  public districtCode = "";
  public provinceID: any;
  public createdBy: any;
  public creationDate: any;
  public title: any;
  public persal: any;
  //public persalNumberBoolean: boolean = false;
  public nationality = "";
  public officelevel = "";
  public SelectedSchool: any;
  public Headofficetest = "";
  public showregion = false;
  public showdistrict = false;
  public showschool = false;
  public showcircuit = false;
  public showcluster = false;
  public showschoolfirst = false;
  public showregions = false;
  public showdistricts = false;
  public showschools = false;
  public value: any = "";

  public showcircuits = false;
  public showclusters = false;
  public showHeadofficeinfo = false;
  public showDistricinfo = false;
  public ShowSchoolinfo = false;
  public selectedoffice: any;
  public selectedValue: any;
  public selected = "";
  public Status = "";
  public username = "";
  public UserActive: any;
  public institutionName: any;

  updateStatusModeltest: any = {};












  public userName: any
  public roleSelected: any
  public password: any
  public gender = "";
  public SchoolPosition: any
  public informalsettlement: any
  public house: any;
  public complex: any;
  public street: any;
  public section: any;
  public city: any;
  public userType: any
  public representative: any;
  public isEmployee: any;
  public isNominated: boolean;
  public roleId: any;
  public electionScore: any;
  public isSeconded: any;
  public provinceId: any;
  public qualification: any;
  public experience: any;
  public designation = "";
  public userinfo: any;
  public isBlacklisted: any;
  public Relationship: any = "";
  public TypeOfInstitution: any = "";
  public StreetAddress1: any;
  public StreetAddress2: any;
  public StreetAddress3: any;
  public StreetCode: any;
  public PostalAddress1: any;
  public PostalAddress2: any;
  public PostalAddress3: any;
  public PostalCode: any;
  public seoDistrictCode: any = "";
  public seoEmisNumber: any = "";
  public seoSchoolName: any;
  public invalidIdNumber: Boolean;
  public invalidEditIdNumber: Boolean;
  public reportType: any;
  public Businessunit: any;
  //public userId: Number


  public editIsEmployee: any;
  public editGender: any;
  public editIdNumber: any;
  public editPassport: any;
  public editPersal: any;
  public editDistrictCode: any;
  public editEmisNumber: any;
  public editQualification: any;
  public editExperience: any;
  public editSchool: any = "";
  public editDesignation: any = "";
  public editinformalsettlement: any;
  public edituserType: any;
  public editNationality: any;
  public editSeoEmisNumber: any = "";
  public noEditIDnumber;
  public noIDNumber;
  public emptyEditUsernumber: any;
  public emptyUsernumber: any;
  public editName: any;
  public editSurname: any;
  public editHouse: any;
  public editComplex: any;
  public editStreet: any;
  public editSection: any;
  public editCity: any;
  public editCellNumber: any;
  public editEmail: any;
  public editId: any;

  public allRoles: any;
  public editUserRole;

  public schoolMainSelected = "";
  public regionSelected = "";
  public districtSelected = "";
  public circuitSelected = "";
  public clusterSelected = "";

  public directorateSelected = "";
  public subdirectorateSelected = "";
  public positionSelected = "";
  public businessSelected = "";

  public BranchSelected = "";
  public CDSelected = "";
  public DirectorateSelected = "";
  public SubdirectorateSelected = "";
  public info: any
  public editdistrictName = "";
  public editcircuit = "";
  public editcluster = "";
  public editDirectorate = "";
  public editSubDirectorate = "";

  public editBranch = "";
  public editChiefDirectorate = "";
  public uniquPersal: Boolean;
  public uniqueMailAdress: Boolean;
  public fullname: any

  public position = "";
  public idnumber: any







  userId: any;
  //selectedoffice: any;
  selectedschools: any
  roles: any;
  role: any;
  numRules: any;
  designations: any;
  userRole: any;
  districts: any;
  schools: any;
  schoolstest: any;
  schoolstestmain: any;


  schoolsMainData: any;
  schoolsMain: any;
  regionsData: any;
  districtsData: any;
  circuitsData: any;
  clustersData: any;
  regionsDatas: any;
  districtsDatas: any;
  circuitsDatas: any;
  clustersDatas: any;

  districtPosition: any;
  dispositionsdatasub: any;
  dispositionsdataposition: any;
  dispositiondataBuss: any;
  dispositiondatadir: any;
  dispositiondatadirid: any;
  dispositiondataid: any

  HeadPostionBranch: any;
  HPbranchPostion: any;
  BrachCDPositon: any
  HObranchPosition: any;
  HOCheifDirectorate: any;
  HOCheifDirectoratenull: any;
  HODirectorate: any;
  HOSubDirectorate: any;
  HOPOsition: any;
  HoCDposition: any;
  HOAllPositionfilter: any;
  HOCDnull: null;
  HOBranchPosition: any;
  HOBranchData: any;
  HOCDDataData: any;
  HODData: any;
  HOSDData: any;








  districtschools: any;
  Circuits: any;
  Cluster: any;
  CricuitCluster: any
  CircuitClusters: any
  regiondistrict: any;
  circuitDistrict: any
  Branches: any
  BranchCD: any
  ndistricttest: any;
  clustersbyschool: any;
  districttest: any;
  Regiontest: any;
  selectRegiontest: any
  RegionDisSchool: any
  seoSchools: any;
  selectedUser: any;
  roleToSelect = [];
  parentID = 0;
  public schoolSelected;
  public selectedSchoolName: any = null;
  public editRoleSelected;
  public rolev;
  public isShown: boolean;
  public isCellnumberDuplicate = false;
  public isDuplicatePersonal = false;
  public iseditCellnumberDuplicate = false;
  public loggedInRole;
  public isPersalIdEmpty;
  public isNumberInvalid;
  public iseditNumberInvalid;
  public editofficelevel;
  public editStatus = "";
  public informalSettlement: any;
  public isDuplicate: any;

  public OfficeLevelList: any
  public genderList: any
  public citizenList: any
  public schoolPositionList: any





  public infos: any
  public circuit: any
  public cluster: any
  public Directorate = "";
  public SubDirectorate = "";
  public region = "";
  public House: any
  public isLoading: Boolean;


  public Branch = "";
  public ChiefDirectorate = "";
  public admin: any

  public uniqueIds: Boolean;
  public uniquePass: Boolean;
  public uniqueCellNumber: Boolean;
  public roletype: any;
  public host: any;

  public updateUserType: any = "";
  public updatePersal: any;
  public updateFirstname: any;
  public updateNationality: any = "";
  public updateIdnumber: any;
  public updatePassport: any;
  public updateGender: any = "";
  public updateUserName: any;
  public updateSurname: any;
  public updateOfficelevel: any = "";
  public updatePosition: any = "";
  public updateRegion: any = "";
  public updateDistrictName: any = "";
  public updateBranch: any = "";
  public updateChiefDirectorate: any = "";
  public updateDirectorate: any = "";
  public updateSubDirectorate: any = "";
  public updateSelectedSchool: any;
  public updateCellNumber: any;
  public updateEmailAddress: any;
  public updateRoletype: any = "";
  public execCount: any;
  public allDistrictSchools: any;
  public activateValidation: any

  public isPageLoading: Boolean;
  public isAdmin: Boolean;
  public isHO: Boolean;
  public level: any;

  public allBranches: any;
  public allChiefDirectorate: any;
  public allDirectorate: any;;
  public allSubDirectorate: any;
  public allPosition: any;
  public chiefDirectorates: any = [];
  public directorates: any = [];
  public subDirectorates: any = [];
  public positions: any = [];
  public positionList: any = [];
  public currentOfficeLevel: any;
  public positionId: any = [];


  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('basicModal') basicModal: any;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    //this. Editactiveuser()


    this.host = window.location.origin;
    this.loggedInRole = this.appService.getLoggedInUserRole();
    this.currentOfficeLevel = this.appService.getLoggedInUserOfficeLevel();

    this.validationFormActiveEdit = this.formBuilder.group({
      editId: [''],
      editStatus: ['']
    })

    this.isPageLoading = true;
    this.isAdmin = false;



    //create validator//
    this.validationForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      surname: ['', [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      gender: ['', Validators.required],
      idnumber: ['', [Validators.minLength(13), Validators.maxLength(13)],
        this.userservice.idNumberValidator.bind(this.userservice)],
      passport: ['', [], this.userservice.passportValidator.bind(this.userservice)],
      // persal: ['', [Validators.minLength(8), Validators.maxLength(8)], 
      //    this.userservice.parselValidator.bind(this.userservice)],
      persal: [''],
      cellNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)],

        this.userservice.cellValidator.bind(this.userservice)],
      userActive: ['Active'],
      officelevel: ['', Validators.required],
      SchoolPosition: [''],
      admin: [false],
      other: [false],

      emailAddress: ['', [Validators.required, Validators.email],

        this.userservice.emailValidator.bind(this.userservice)],
      districtCode: [''],
      seoDistrictCode: [''],
      userType: [''],
      emisNumber: [''],
      seoEmisNumber: [''],
      designation: [''],
      informalsettlement: [''],
      isEmployee: [false],
      qualification: [''],
      experience: [''],
      House: [''],
      complex: [''],
      street: [''],
      section: [''],
      city: [''],
      Relationship: [''],
      TypeOfInstitution: [''],
      StreetAddress1: [''],
      StreetAddress2: [''],
      StreetAddress3: [''],
      StreetCode: [''],
      PostalAddress1: [''],
      PostalAddress2: [''],
      PostalAddress3: [''],
      PostalCode: [''],
      isBlacklisted: [false],
      selectedSchoolName: [null],
      roleSelected: [''],
      nationality: ['', Validators.required],

      selected: [''],
      Status: [''],
      selectedoffice: [''],
      region: [''],
      position: [''],
      //Nompumelelo

      //
      informalSettlement: [''],



      districtName: [''],
      circuit: [''],
      cluster: [''],
      Directorate: [''],
      SubDirectorate: [''],

      Branch: [''],
      ChiefDirectorate: [''],
      password: [''],
      roletype: [''],
      userName: ['']










    });

    //Edit Form 
    this.validatioUpdateForm = this.formBuilder.group({
      updateUserType: [''],
      updatePersal: [''],
      updateFirstname: ['', Validators.required],
      updateNationality: ['', Validators.required],
      updateIdnumber: [''],
      updatePassport: [''],
      updateGender: [''],
      updateUserName: [''],
      updateSurname: [''],
      updateOfficelevel: [''],
      updatePosition: [''],
      updateRegion: [''],
      updateDistrictName: [''],
      updateBranch: [''],
      updateChiefDirectorate: [''],
      updateDirectorate: [''],
      updateSubDirectorate: [''],
      updateSelectedSchool: [null],
      updateCellNumber: ['', Validators.required],
      updateEmailAddress: ['', Validators.required],
      updateRoletype: ['']


    });

    this.validationFormEdit = this.formBuilder.group({
      firstname: ['', [Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      surname: ['', [Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],

      gender: [''],
      idnumber: [''],


      passport: [''],
      persal: [''],


      cellNumber: [''],



      officelevel: [''],
      SchoolPosition: [''],
      admin: [false],
      other: [false],

      emailAddress: [''],


      districtCode: [''],
      seoDistrictCode: [''],
      userType: [''],
      emisNumber: [''],
      seoEmisNumber: [''],
      designation: [''],
      informalsettlement: [''],
      isEmployee: [false],
      qualification: [''],
      experience: [''],
      House: [''],
      complex: [''],
      street: [''],
      section: [''],
      city: [''],
      Relationship: [''],
      TypeOfInstitution: [''],
      StreetAddress1: [''],
      StreetAddress2: [''],
      StreetAddress3: [''],
      StreetCode: [''],
      PostalAddress1: [''],
      PostalAddress2: [''],
      PostalAddress3: [''],
      PostalCode: [''],
      isBlacklisted: [false],
      selectedSchoolName: [null],
      roleSelected: [''],
      nationality: [''],

      selected: [''],
      Status: [''],
      selectedoffice: [''],
      region: [''],
      position: [''],
      //Nompumelelo

      //
      informalSettlement: [''],



      districtName: [''],
      circuit: [''],
      cluster: [''],
      Directorate: [''],
      SubDirectorate: [''],

      Branch: [''],
      ChiefDirectorate: [''],
      password: ['']










    });
    //edit validation//
    this.validationFormEdit = this.formBuilder.group({
      editName: [''],
      editSurname: [''],
      editGender: [''],
      editDistrictCode: [''],
      editCellNumber: [''],
      editPersal: [''],
      editEmail: [''],
      editEmisNumber: [''],
      editSeoEmisNumber: [''],
      edituserType: [''],
      editIdNumber: [''],
      editPassport: [''],
      editDesignation: [''],
      editinformalsettlement: [false],
      editIsEmployee: [false],
      editQualification: [''],
      editExperience: [''],
      editHouse: [''],
      editComplex: [''],
      editStreet: [''],
      editSection: [''],
      editCity: [''],
      editRoleSelected: [''],
      editisBlacklisted: [false],
      editNationality: [''],
      editofficelevel: [''],
      editStatus: [''],
      editdistrictName: [''],
      editcircuit: [''],
      editcluster: [''],
      editDirectorate: [''],
      editSubDirectorate: [''],

      editBranch: [''],
      editChiefDirectorate: [''],

    });

    this.isEditFormSubmitted = false;
    this.isCreateFormSubmitted = false;
    ////DropDowns From DataBase

    this.userservice.getOfficeLevel().subscribe(res => {
      this.OfficeLevelList = res;

    })
    this.userservice.getSchoolPosition().subscribe(position => {
      this.schoolPositionList = position;
      // console.log(position);
    })
    this.userservice.getCitizen().subscribe(list => {
      this.citizenList = list;
    }, err => {
      console.log(err);
      this.citizenList = [
        {
          'citizenship': 'South African'
        }, {
          'citizenship': 'Non South African'
        }
      ];
    })
    this.userservice.getGender().subscribe(result => {
      this.genderList = result;

    }, err => {
      console.log(err);

      this.genderList = [
        {
          'gender': 'Male'
        }, {
          'gender': 'Female'
        }, {
          'gender': 'Other'
        }
      ];
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



    // this.userservice.getAllUsers().subscribe((res: any) => {

    //   let parentid = this.appService.getLoggedInParentId();
    //   const NominatedParent = parents.filter(function (parent) {
    //     return [parentid].includes(parent.parentID)[parentid].includes(parent.parentID)
    //   });

    //   console.log(res)
    // if (this.appService.getLoggedInUserRole() === "ADMIN" || this.appService.getLoggedInUserRole() === "HO" || this.appService.getLoggedInUserRole() === "PEO") {
    //   this.data = res;

    // }

    //   this.dtTrigger.next();
    // }, err => {
    //   console.log(err);
    // });

    let officeLevel = this.appService.getLoggedInUserOfficeLevel();

    this.userservice.getAllUsers().subscribe((res: any) => {
      // console.log(res);
      this.data = [];
      let userid = this.appService.getLoggedInUserId();
      let role = this.appService.getLoggedInUserRole();
      this.isHO = false;

      let users = res.filter(function (user) {
        return userid.toString() != user.userId && user.position != "ADMIN";

      });


      if (officeLevel === "Head Office") {
        // GET ALL USERS FOR HEAD OFFICE LEVEL

        let directorate = this.appService.getLoggedInUserDirectorate();


        if(this.allPosition){
          this.positions = this.allPosition.filter(function (position) {
            return position.officelevel == officeLevel;
          });

        }

        if (directorate == "Information Technology Services & System Support" && role == "Director" || role == "System Administrator") {
          //  HEAD OFFICE SYSTEM ADMINISTRATOR
          this.isAdmin = true;
          this.level = "admin";

          let housers = users.filter(function (user) {
            return user.position != "System Administrator" && user.officeLevel != "Head Office"
              || user.position == "System Administrator" && user.officeLevel == "District"
              || user.position != "System Administrator" && user.officeLevel == "Head Office";
            //["System Administrator", "ADMIN"].includes(user.position)   
          });

          this.data = housers;

        } else {

          this.level = "ho";
          let directuser = users.filter(function (user) {
            return directorate == user.directorate;
          });

          this.data = directuser;
        }


      } else if (officeLevel === "District") {
        // GET ALL USERS FOR DISTRICT LEVEL        
        let code = this.appService.getLoggedInDistrictCode();

        if (role == "CES" || role == "System Administrator") {
          // DISTRICT SYSTEM ADMINISTRATOR
          // this.isAdmin = true;
          this.level = "admin";

          let districtuser = users.filter(function (user) {
            return user.position != "System Administrator" && user.districtCode == code
              && user.officeLevel != "Head Office";
          });

          this.data = districtuser;

        } else {

          this.level = "district";
          let users = res.filter(function (user) {
            return code == user.districtCode && userid != user.userId &&
            user.position != "System Administrator" && user.officeLevel != "Head Office";
          });

          this.data = users;
        }

      } else if (officeLevel === "School") {


        this.level = "school";
        let code = this.appService.getLoggedInEmisCode();

        let users = res.filter(function (user) {
          return code == user.emisNumber && userid != user.userId;
        });

        this.data = users;

        // if (role == "CES") {
        //   // DISTRICT SYSTEM ADMINISTRATOR
        //   this.isAdmin = true;
        //   let users = res.filter(function (user) {
        //     return user.officeLevel != "Head Office" && userid != user.userId;
        //   });

        //   this.data = users;

        // } else {

        //   let users = res.filter(function (user) {
        //     return code == user.districtCode && userid != user.userId;
        //   });

        //   this.data = users;
        // }

      } else {
        // this.data = res; ADMIN

        this.isAdmin = true;
        this.level = "admin";

        this.data = users;
      }



      this.isPageLoading = false;
      this.dtTrigger.next();

      // if (this.appService.getLoggedInUserRole() === "ADMIN" || this.appService.getLoggedInUserRole() === "System Administrator") {
      //   //get all users in the system
      //   // this.data = res;
      //   // console.log(this.data);

      // } else if (this.appService.getLoggedInUserRole() === "SEO" || this.appService.getLoggedInUserRole() === "PRINCIPAL" || this.appService.getLoggedInUserRole() === "SGB" || this.appService.getLoggedInUserRole() === "PARENT") {
      //   // get list of parents in a school
      //   let emiscode = this.appService.getLoggedInEmisCode();
      //   const parents: any = res.filter(function (parent) {
      //     return ["PARENT"].includes(parent.userType);
      //   });

      //   const users = parents.filter(function (user) {
      //     return [emiscode].includes(user.emisNumber)
      //   });


      //   this.userservice.getSchoolByEmisNumber(emiscode).subscribe((res: any) => {
      //     this.parentSchool = res[0].institutionName;
      //   }, err => {
      //     this.parentSchool = null;
      //   })

      //   // console.log(parents)
      //   // console.log(users)
      //   this.data = users;
      // } else if (this.appService.getLoggedInUserRole() === "DEO" || this.appService.getLoggedInUserRole() === "OBSERVER" || this.appService.getLoggedInUserRole() === "MONITOR") {
      //   // get list if user in a district
      //   let districtcode = this.appService.getLoggedInDistrictCode();
      //   const schoolusers = res.filter(function (schooluser) {
      //     return ["PARENT", "SEO", "SGB", "PRINCIPAL"].includes(schooluser.userType);
      //   })

      //   const users = schoolusers.filter(function (user) {
      //     return [districtcode].includes(user.districtCode)
      //   })

      //   // console.log(schoolusers)
      //   // console.log(users)
      //   this.data = users;
      // } else {
      //   this.data = res;
      //   this.loggedInRole = "SGB";
      // }

    }, err => {
      console.log(err);
      this.isPageLoading = false;
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

    this.authService.getCircuit().then((res: string[]) => {
      // let userRole = this.appService.getLoggedInUserRole();
      //this.Circuits = res;
      console.log(res)
      this.circuitDistrict = res;

      // this.myschools=res;
      //console.log("District'ist", this.districttest);
    });
    this.authService.GetUniqueCircuitNo().then((res: string[]) => {
      // let userRole = this.appService.getLoggedInUserRole();
      this.Circuits = res;

      // this.myschools=res;
      //console.log("District'ist", this.districttest);
    });
    this.authService.getCluster().then((res: string[]) => {
      // console.log("cluster");
      // let userRole = this.appService.getLoggedInUserRole();
      console.log(res)
      this.Cluster = res;
      this.CricuitCluster = res;





      // this.myschools=res;
      //console.log("District'ist", this.districttest);
    });

    this.authService.getDistrictByRegion().then((res: string[]) => {
      // console.log("DistrictbyregionName");
      // let userRole = this.appService.getLoggedInUserRole();
      console.log(res)
      this.ndistricttest = this.selectRegiontest = res;
      this.regiondistrict = res;
      // this.myschools=res;
      //console.log("District'ist", this.districttest);
    });

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

    this.authService.getSchools().then((res: string[]) => {
      // console.log("SchoolName");
      let userRole = this.appService.getLoggedInUserRole();
      this.districtschools = res;
      console.log(res)

    });

    this.authService.getregion().then((res: string[]) => {
      // console.log("region");
      // let userRole = this.appService.getLoggedInUserRole();
      this.Regiontest = res;
      console.log(res)
      // this.myschools=res;
      //console.log("District'ist", this.districttest);
    });

    this.authService.getSchools().then((res: string[]) => {
      // console.log("testschools");
      let userRole = this.appService.getLoggedInUserRole();
      this.schoolstest = res;
      //this.myschools=res;
      // console.log(this.schoolstest);
      console.log(res)
    });

    this.authService.getUserRoles().then((res: string[]) => {
      let userRole = this.appService.getLoggedInUserRole();
      this.numRules = res.length
      // console.log("test")
      // console.log(res)
      this.role = res;

    });


    this.isShown = false;

    /* this.authService.getBranchHeadPosition().then((res: string[]) => { 
       console.log("branches");
      // let userRole = this.appService.getLoggedInUserRole();        
       this.Branches  =res;
   
     });
   
     this.authService.getBranchCD().then((res: string[]) => { 
       console.log("CD");
      // let userRole = this.appService.getLoggedInUserRole();        
       this.BranchCD  =res;
   
     }); */






    //get unquie values of  Headoffice branch, cheifdirectorate..etc//











    /// to get  unquie values of  region ,district etc..//

    //old srikanth  only district  not  filtering from  region//
    //this.authService.getDistrictBySchool().then((res: string[]) => { 
    //console.log("DistrictName");
    // let userRole = this.appService.getLoggedInUserRole();
    // this.districttest = res;
    // this.myschools=res;
    //console.log("District'ist", this.districttest);
    // });


    // filter  schools by district//
    //  this.authService.getDistrictBySchool().then((res: string[]) => { 
    //  console.log("DistrictName");
    //  let userRole = this.appService.getLoggedInUserRole();
    //  this.districttest = res;
    //   this.myschools=res;
    // console.log("District'ist", this.districttest);
    // });


    //  this.districttest = this.authService.getDistrictBySchool(); 




    // this.userservice.getAllDesignations().subscribe(res => {
    //   this.designations = res;
    // });

    // this.userservice.getAllDistricts().subscribe(res => {
    //   this.districts = res;

    //   if (this.loggedInRole == "DEO") {
    //     this.districtCode = this.appService.getLoggedInDistrictCode();
    //     this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
    //     this.validationForm.controls["districtCode"].disable();

    //   } else if (this.loggedInRole == "SEO" || this.loggedInRole == "PRINCIPAL" || this.loggedInRole == "SGB") {
    //     this.districtCode = this.appService.getLoggedInDistrictCode();
    //     this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
    //     this.validationForm.controls["districtCode"].disable();

    //     this.userservice.getSchoolsByDistrict(this.districtCode).subscribe((school: any) => {
    //       this.schools = school;
    //       this.emisNumber = this.appService.getLoggedInEmisCode();
    //       this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
    //       this.validationForm.controls["emisNumber"].disable();
    //     }, err => {
    //       console.log(err);
    //       this.router.navigate(['/dashbaord']);
    //     });

    //   }
    // });

    // this.validationForm.controls["gender"].setValue("");
    // this.validationForm.controls["userType"].setValue("");
    // this.validationForm.controls["designation"].setValue("");
    // this.validationForm.controls["districtCode"].setValue("");
    // this.validationForm.controls["emisNumber"].setValue("");
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // processing: true,
      // searching: true,
      // ordering: true,
      order: [0, 'desc']
    }

    /* this.dtOptions = {
       pagingType: 'full_numbers',
       searching: true,
       ordering: true,
       order: [0, 'asc'],// sort table in descending order
       pageLength: 10
       //please put searchable:true here your code will work
     }; */
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  openBasicModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }


  onComplete(event: any): void {

    this.openBasicModal(this.basicModal);
    console.log('onAddedFile:', event);
    this.uploadEvent = event;

    // this.onUploadSuccess(event);
  }

  resetDropzoneUploads() {

  }



  fieldChange() {


    if (this.isCellnumberDuplicate) {
      this.isCellnumberDuplicate = false;

    }

    if (this.cellNumber[0] != "0") {
      this.isNumberInvalid = true;
    } else {
      this.isNumberInvalid = false;
    }

  }



  PersalChange() {


    if (this.isDuplicatePersonal) {
      this.isDuplicatePersonal = false;


    }

    if (this.cellNumber[0] != "0") {
      this.isNumberInvalid = true;
    } else {
      this.isNumberInvalid = false;
    }

  }


  editfieldChange() {
    if (this.iseditCellnumberDuplicate) {
      this.iseditCellnumberDuplicate = false
    }

    if (this.editCellNumber[0] != "0") {
      this.iseditNumberInvalid = true;
    } else {
      this.iseditNumberInvalid = false;
    }

  }

  ////////////////// CREATE USER  ////////////////
  // validateDistrict() {
  //   let userRole = this.validationForm.controls["userType"].value;
  //   let districtCode = this.validationForm.controls["districtCode"].value;
  //   let role = [];

  //   for (var key in this.roleSelected) {
  //     if (this.roleSelected.hasOwnProperty(key)) {
  //       role.push(this.roleSelected[key].roleName);
  //     }
  //   }


  //   if (role.includes('PEM') || role.includes('PEO') || role.includes('HO')) {
  //     this.validationForm.controls["districtCode"].setValue("");
  //     this.schools = [];
  //     this.seoSchools = [];
  //   }


  //   if (role.includes('PARENT') || role.includes('SGB') || role.includes('SEO') || role.includes('DEO') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER')) {
  //     this.validationForm.controls["districtCode"].setValidators([Validators.required]);
  //     this.validationForm.controls["districtCode"].updateValueAndValidity();

  //   } else {
  //     this.validationForm.controls["districtCode"].clearValidators();
  //     this.validationForm.controls["districtCode"].updateValueAndValidity();

  //   }


  //   if (role.includes('PARENT') || role.includes('SGB') || role.includes('SEO') || role.includes('PRINCIPAL')) {

  //     if (districtCode) {
  //       this.userservice.getSchoolsByDistrict(districtCode).subscribe((res: any) => {

  //         if (this.loggedInRole == "SGB" || this.loggedInRole == "SEO" || this.loggedInRole == "PRINCIPAL") {

  //           this.districtCode = this.appService.getLoggedInDistrictCode();
  //           this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
  //           this.validationForm.controls["districtCode"].disable();

  //           this.emisNumber = this.appService.getLoggedInEmisCode();
  //           this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
  //           this.validationForm.controls["emisNumber"].disable();

  //           // this.userservice.getSchoolsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((school: any) => {
  //           //   this.schools = school;
  //           //   this.emisNumber = this.appService.getLoggedInEmisCode();
  //           //   this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
  //           //   this.validationForm.controls["emisNumber"].disable();
  //           // }, err => {
  //           //   console.log(err);
  //           //   this.router.navigate(['/dashbaord'])
  //           // });

  //         } else {
  //           this.schools = res;
  //           this.validationForm.controls["emisNumber"].setValue("");
  //           console.log('execute');

  //         }
  //       });
  //     }

  //     this.validationForm.controls["emisNumber"].setValidators([Validators.required]);
  //     this.validationForm.controls["emisNumber"].updateValueAndValidity();


  //   } else {
  //     this.validationForm.controls["emisNumber"].clearValidators();
  //     this.validationForm.controls["emisNumber"].updateValueAndValidity();
  //     if (this.loggedInRole != "PRINCIPAL" || this.loggedInRole != "SEO") {
  //       this.schools = []

  //     }

  //   }


  //   // if (role.includes('SEO') || role.includes('PEM') || role.includes('HO') || role.includes('DEO') || role.includes('PRINCIPAL')) {
  //   //   this.isEmployee = true;
  //   // } else {
  //   //   this.isEmployee = false;
  //   // }

  //   if (role.includes('PARENT')) {
  //     this.validationForm.controls["TypeOfInstitution"].setValidators([Validators.required]);
  //     this.validationForm.controls["TypeOfInstitution"].updateValueAndValidity();
  //     this.validationForm.controls["Relationship"].setValidators([Validators.required]);
  //     this.validationForm.controls["Relationship"].updateValueAndValidity();

  //     this.validationForm.controls["informalsettlement"].setValue(false);
  //     this.validationForm.controls["house"].setValue('');
  //     this.validationForm.controls["complex"].setValue('');
  //     this.validationForm.controls["street"].setValue('');
  //     this.validationForm.controls["section"].setValue('');
  //     this.validationForm.controls["city"].setValue('');


  //   } else {
  //     this.validationForm.controls["TypeOfInstitution"].clearValidators();
  //     this.validationForm.controls["TypeOfInstitution"].updateValueAndValidity();
  //     this.validationForm.controls["TypeOfInstitution"].setValue('');
  //     this.validationForm.controls["Relationship"].clearValidators();
  //     this.validationForm.controls["Relationship"].updateValueAndValidity();
  //     this.validationForm.controls["Relationship"].setValue('');

  //     this.validationForm.controls["StreetAddress1"].setValue('');
  //     this.validationForm.controls["StreetAddress2"].setValue('');
  //     this.validationForm.controls["StreetAddress3"].setValue('');
  //     this.validationForm.controls["StreetCode"].setValue('');
  //     this.validationForm.controls["PostalAddress1"].setValue('');
  //     this.validationForm.controls["PostalAddress2"].setValue('');
  //     this.validationForm.controls["PostalAddress3"].setValue('');
  //     this.validationForm.controls["PostalCode"].setValue('');
  //   }

  //   if (role.includes('SEO') && role.includes('PRINCIPAL')) {

  //     this.validationForm.controls["seoEmisNumber"].setValidators([Validators.required]);
  //     this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();
  //   } else {
  //     this.validationForm.controls["seoEmisNumber"].clearValidators();
  //     this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();
  //     this.validationForm.controls["seoEmisNumber"].setValue('');
  //   }

  // }

  /* validatePersal() {
     if (this.isEmployee && (this.validationForm.controls["idnumber"].value == "" || this.validationForm.controls["idnumber"].value == undefined)) {
       this.validationForm.controls["persal"].setValidators([Validators.required]);
       this.validationForm.controls["persal"].updateValueAndValidity();
     } else {
       this.validationForm.controls["persal"].clearValidators();
       this.validationForm.controls["persal"].updateValueAndValidity();
     }
   } */

  /* clearIDValidation() {
     if (this.validationForm.controls["persal"].status == "VALID" && this.validationForm.controls["persal"].value != "") {
       this.validationForm.controls["idnumber"].clearValidators();
       this.validationForm.controls["idnumber"].updateValueAndValidity();
       console.log("take persal")
     } else {
       this.validationForm.controls["idnumber"].setValidators([Validators.required]);
       this.validationForm.controls["idnumber"].updateValueAndValidity();
       console.log("else")
     }
   }
 
   clearPersalValidation() {
     if (this.validationForm.controls["idnumber"].status == "VALID" && this.validationForm.controls["idnumber"].value != "") {
       this.validationForm.controls["persal"].clearValidators();
       this.validationForm.controls["persal"].updateValueAndValidity();
     } else {
       this.validationForm.controls["persal"].setValidators([Validators.required]);
       this.validationForm.controls["persal"].updateValueAndValidity();
     }
   }
 
   clearValidation() {
 
     console.log("ID: " + this.validationForm.controls["idnumber"].status)
     console.log("persal: " + this.validationForm.controls["persal"].status)
 
     if (this.validationForm.controls["persal"].status == "VALID" && this.validationForm.controls["persal"].value != "") {
       this.validationForm.controls["idnumber"].clearValidators();
       this.validationForm.controls["idnumber"].updateValueAndValidity();
     } else if (this.validationForm.controls["idnumber"].status == "VALID" && this.validationForm.controls["idnumber"].value != "") {
       this.validationForm.controls["persal"].clearValidators();
       this.validationForm.controls["persal"].updateValueAndValidity();
     } else {
       this.validationForm.controls["persal"].setValidators([Validators.required]);
       this.validationForm.controls["persal"].updateValueAndValidity();
       this.validationForm.controls["idnumber"].setValidators([Validators.required]);
       this.validationForm.controls["idnumber"].updateValueAndValidity();
       console.log("reset")
     }
   } */


  get createForm() {
    return this.validationForm.controls;
  }
  get updateForms() {
    return this.validatioUpdateForm.controls;
  }

  get editForm() {
    return this.validationFormEdit.controls;
  }

  /* get editactivForm() {
     return this.validationFormActiveEdit.controls;
   } */

  validateIDnumber() {
    this.invalidIdNumber = false;
    if (this.idnumber) {

      if (this.idnumber.length == 13) {
        let birthMonth = parseInt(this.idnumber.substring(2, 4))
        let birthDay = parseInt(this.idnumber.substring(4, 6))

        // SOUTH AFRICAN ID NUMBER VALIDATION
        let evenSingleNumber = this.idnumber[1] + this.idnumber[3] + this.idnumber[5] + this.idnumber[7] + this.idnumber[9] + this.idnumber[11];
        let product = parseInt(evenSingleNumber) * 2;
        let oddSum = parseInt(this.idnumber[0]) + parseInt(this.idnumber[2]) + parseInt(this.idnumber[4]) + parseInt(this.idnumber[6]) + parseInt(this.idnumber[8]) + parseInt(this.idnumber[10]);
        let sum = 0;
        evenSingleNumber = product.toString();
        for (let x = 0; x < evenSingleNumber.length; x++) {
          sum = sum + parseInt(evenSingleNumber[x]);

        }
        let aggregateSum = sum + oddSum;
        let secondChar = aggregateSum.toString();
        let finalResult = 10 - parseInt(secondChar[1]);


        // console.log("oddSum: " + oddSum)
        // console.log("evenSingleNumber: " + evenSingleNumber)
        // console.log("sum: " + sum)
        // console.log("aggregateSum: " + aggregateSum)
        console.log("finalResult: " + finalResult)
        // console.log(finalResult == parseInt(this.idNumber[12]))

        if (finalResult != parseInt(this.idnumber[12]) || birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
          this.invalidIdNumber = true;
        }

        this.getUsername("create");
        this.getUsername("update");
        /* if (parseInt(this.idnumber.substring(6, 10)) < 5000) {
           this.gender = "Female"
         } else if (parseInt(this.idnumber.substring(6, 10)) >= 5000) {
           this.gender = "Male"
 
         } */

      } else {
        this.invalidIdNumber = true;
        this.getUsername("create");
        this.getUsername("update");
      }
    }


    /* if (this.isCreateFormSubmitted) {
       if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
         this.emptyUsernumber = true;
         console.log("error field");
 
       } else {
         this.emptyUsernumber = false;
         console.log("success");
 
       }
       if (this.isCreateFormSubmitted) {
 
       }
 
 
 
 
       if (!this.isEmployee && !this.idNumber) {
         this.noIDNumber = true;
 
       } else {
         this.noIDNumber = false;
 
       }
 
     }
 
 
     if (this.nationality == "South African" && this.isCreateFormSubmitted) {
       if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
 
         if (this.modalService.hasOpenModals()) {
           this.emptyUsernumber = true;
         }
 
       } else {
         this.emptyUsernumber = false;
 
       }
     } else if (this.nationality == "Non South African") {
       if (this.passport && this.persal || this.passport && !this.idNumber && !this.persal || !this.passport && this.isEmployee && this.persal) {
         this.emptyUsernumber = false
       } else {
         this.emptyUsernumber = true
       }
 
     }
 
 
     if (!this.isEmployee && !this.idNumber && this.nationality == "South African") {
       this.noIDNumber = true;
     } else if (this.nationality == "Non South African" && !this.passport && !this.isEmployee) {
       this.noIDNumber = true;
     } else {
       this.noIDNumber = false;
     }
 
     if (!this.isEmployee) {
       this.persal = "";
 
     }
 
 
     console.log(this.emptyUsernumber, this.invalidIdNumber) */


  }




  updateDocumentStatus(i) {
    console.log(this.data[i])
    Swal.fire({
      title: 'Are you sure you want to Deactivate this User?',
      text: 'You will not be able to undo this change',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //Model
        this.updateStatusModeltest = {
          "userId": this.data[i].userId,
          "UserActive": "Deactive"
          //console.log(  this.data[i].userid)
        };
        console.log("tseting123" + this.data[i].userId)




        this.userservice.updateDocumentStatustest(this.updateStatusModeltest).subscribe(res => {
          console.log("In-Active", res);

          Swal.fire({
            timer: 5000,
            title: "Confirmation",
            text: 'User Deactivated successfully',
            icon: 'success'
          }).then(result => {

            if (result.value || result.isDismissed) {
              window.location.reload();
            }
          });

        }, err => {
          console.log(err);
          Swal.fire({
            timer: 5000,
            title: "Unsuccessful",
            text: 'Your entry was unsuccessful, please try again',
            icon: 'error'
          });
        })

      }
    })

  }

















  //editsubmittbutton//
  Editactiveuser() {
    this.UserActive = this.editStatus
    console.log("this useridtest" + this.userId)
    console.log("this the new status" + this.UserActive)
    this.userservice.updateUserProfileEmployeett(this.userId, this.UserActive).subscribe(userid => {
      console.log("checking the userid comingcorrect" + userid)
      this.userId = userid;
      Swal.fire({
        // timer: 5000,
        title: "Successful",
        text: 'User has been successfully created',
        icon: 'success'
      }).then(result => {
        this.modalService.dismissAll();
        if (result.value || result.isDismissed) {
          window.location.reload()
        }
      });
    }, err => {
      console.log(err);
    })


  }
  //enditsubmittbuttonends//

  //create submit button//
  /* saveNewUser() {
     if (this.persal !== '') {
       this.userservice.isDuplicatePersonal(this.persal)
         .subscribe(res => {
           console.log("thsi is persalduplicate", res);
           if (res == false) {
             this.isPersalExist = true;
             return " persal  avaialble";
           } else {
             this.isPersalExist = false;
             if (this.validationForm.valid) {
 
 
 
               if (this.modalService.hasOpenModals() && this.validationForm.valid && !this.noIDNumber && !this.emptyUsernumber && !this.invalidIdNumber) {
 
 
 
                 if (this.cellNumber[0] == "0") {
 
                   this.userservice.isCellnumberUnique(this.cellNumber).subscribe((result: boolean) => {
                     this.isCellnumberDuplicate = !result;
 
 
 
 
 
                   }, err => {
                     console.log(err);
                     this.cellNumber = "";
                   })
 
                 } else {
                   this.isNumberInvalid = true;
 
                 }
 
 
               }
 
               if (this.modalService.hasOpenModals()) {
                 this.isCreateFormSubmitted = true;
 
               }
 
 
 
               Swal.fire({
                 title: 'Are you sure you want to save user',
                 text: 'A user will be updated',
                 icon: 'question',
                 showCancelButton: true,
                 confirmButtonText: 'Yes',
                 cancelButtonText: 'No'
 
 
 
 
               }).
                 then((result) => {
                   if (result.value) {
                     //nompumeleo
 
 
                     ///Nompumelelo
                     this.userservice.createNewEmployee(this.roleSelected, this.nationality, this.persal, this.idNumber,
                       this.firstname, this.surname, this.gender, this.House, this.complex, this.street, "suburb", this.section, this.city, this.informalsettlement, this.cellNumber, this.emailAddress, "P@ssw0rd12345", this.Status, this.officelevel, this.selected, this.region, this.passport,
                       this.informalSettlement,
 
                       this.userType,
 
                       this.districtName,
                       this.circuit,
                       this.districtName,
                       this.circuit,
 
                       this.Directorate,
                       this.SubDirectorate,
 
                       this.Branch,
                       this.ChiefDirectorate
                     ).subscribe(userid => {
                       console.log(userid)
                       this.userId = userid;
                       this.userservice.WelcomEmail(this.idNumber).subscribe(res => {
                         console.log("Email Sent")
                       })
                       Swal.fire({
                         timer: 5000,
                         confirmButtonText: 'Yes',
                         cancelButtonText: 'No',
                         title: "Successful",
                         text: 'User has been successfully created',
 
                         icon: 'success'
                       }).then(result => {
                         this.modalService.dismissAll();
                         if (result.value || result.isDismissed) {
                           window.location.reload()
                         }
                       });
                     }, err => {
                       console.log(err);
                     })
 
 
 
                   }
                 })
 
 
               varRole += "}";
               console.log("roles roleOutput", roleOutput);
             }
           }
 
 
 
         }, err => {
           console.log("this is erro", err);
         });
 
     } else {
       if (this.validationForm.valid) {
 
 
 
         if (this.modalService.hasOpenModals() && this.validationForm.valid && !this.noIDNumber && !this.emptyUsernumber && !this.invalidIdNumber) {
 
 
 
           if (this.cellNumber[0] == "0") {
 
             this.userservice.isCellnumberUnique(this.cellNumber).subscribe((result: boolean) => {
               this.isCellnumberDuplicate = !result;
 
 
 
               // if (result) {
               //   Swal.fire({
               //     title: 'Are you sure you want to save this User?',
               //     text: 'Your user will be processed',
               //     icon: 'question',
               //     showCancelButton: true,
               //     confirmButtonText: 'Yes',
               //     cancelButtonText: 'No'
               //   }).then((result) => {
               //     if (result.value) {
 
 
 
 
               //       // }
               //     } else if (result.dismiss === Swal.DismissReason.cancel) {
               //       Swal.fire(
               //         'Cancelled',
               //         'Your entry was not save',
               //         'error'
               //       )
               //     }
               //   })
               // }
 
             }, err => {
               console.log(err);
               this.cellNumber = "";
             })
 
           } else {
             this.isNumberInvalid = true;
 
           }
 
 
         }
 
         if (this.modalService.hasOpenModals()) {
           this.isCreateFormSubmitted = true;
 
         }
 
 
 
         Swal.fire({
           title: 'Are you sure you want to save user',
           text: 'A user will be updated',
           icon: 'question',
           showCancelButton: true,
           confirmButtonText: 'Yes',
           cancelButtonText: 'No'
 
 
 
 
         }).
           then((result) => {
             if (result.value) {
 
 
 
               this.userservice.createNewEmployee(this.roleSelected, this.nationality, this.roleSelected, this.nationality, this.persal, this.idNumber,
                 this.firstname, this.surname, this.gender, this.House, this.complex, this.street, "suburb", this.section, this.city, this.informalsettlement, this.cellNumber, this.emailAddress, "P@ssw0rd12345", this.Status, this.officelevel, this.selectedSchoolName, this.region, this.passport
                 , this.informalSettlement,
 
                 this.userType,
 
                 this.districtName,
                 this.circuit,
                 this.cluster,
 
                 this.SubDirectorate,
 
                 this.Branch,
                 this.ChiefDirectorate
               ).subscribe(userid => {
                 console.log(userid)
                 this.userId = userid;
                 Swal.fire({
                   timer: 5000,
                   confirmButtonText: 'Yes',
                   cancelButtonText: 'No',
                   title: "Successful",
                   text: 'User has been successfully created',
 
                   icon: 'success'
                 }).then(result => {
                   this.modalService.dismissAll();
                   if (result.value || result.isDismissed) {
                     window.location.reload()
                   }
                 });
               }, err => {
                 console.log(err);
               })
 
 
 
             }
           })
 
 
         varRole += "}";
         console.log("roles roleOutput", roleOutput);
       }
     }
 
 
 
 
 
 
     let role = [];
     var roleOutput = [];
     for (var key in this.roleSelected) {
       if (this.roleSelected.hasOwnProperty(key)) {
         role.push(this.roleSelected[key].role);
         console.log("roles list", key);
         console.log("roles list", role);
       }
     }
 
     var varRole = "{";
 
     if (role.includes('ADMIN')) {
       roleOutput.push('ADMIN')
       varRole += "\"ADMIN\":\"ADMIN\"";
     }
 
     if (role.includes('SGB')) {
       if (varRole != "") {
         varRole += ",\"SGB\":\"SGB\"";
       } else {
         varRole += "\"SGB\":\"SGB\"";
       }
 
     }
     //copy bewlo
     if (role.includes('HO')) {
       if (varRole != "") {
         varRole += ",\"HO\":\"HO\"";
       } else {
         varRole += "\"HO\":\"HO\"";
       }
     }
     //copy above
 
     // if(this.validationForm.valid){
 
 
     //   if (this.modalService.hasOpenModals() && this.validationForm.valid && !this.noIDNumber && !this.emptyUsernumber && !this.invalidIdNumber) {
 
 
 
     //     if (this.cellNumber[0] == "0") {
 
     //       this.userservice.isCellnumberUnique(this.cellNumber).subscribe((result: boolean) => {
     //         this.isCellnumberDuplicate = !result;
 
 
 
     //         // if (result) {
     //         //   Swal.fire({
     //         //     title: 'Are you sure you want to save this User?',
     //         //     text: 'Your user will be processed',
     //         //     icon: 'question',
     //         //     showCancelButton: true,
     //         //     confirmButtonText: 'Yes',
     //         //     cancelButtonText: 'No'
     //         //   }).then((result) => {
     //         //     if (result.value) {
 
 
 
 
     //         //       // }
     //         //     } else if (result.dismiss === Swal.DismissReason.cancel) {
     //         //       Swal.fire(
     //         //         'Cancelled',
     //         //         'Your entry was not save',
     //         //         'error'
     //         //       )
     //         //     }
     //         //   })
     //         // }
 
     //       }, err => {
     //         console.log(err);
     //         this.cellNumber = "";
     //       })
 
     //     } else {
     //       this.isNumberInvalid = true;
 
     //     }
 
 
     //   }
 
     //   if (this.modalService.hasOpenModals()) {
     //     this.isCreateFormSubmitted = true;
 
     //   }
 
 
 
     //   Swal.fire({
     //     title: 'Are you sure you want to save user',
     //     text: 'A user will be updated',
     //     icon: 'question',
     //     showCancelButton: true,
     //     confirmButtonText: 'Yes',
     //     cancelButtonText: 'No'
 
 
 
 
     //   }).
     //   then((result) => {
     //     if (result.value) {     
 
 
 
     //       this.userservice.createNewEmployee(this.roleSelected, this.nationality,this.persal,this.idNumber, 
     //         this.firstname, this.surname,  this.gender, this.house, this.complex, this.street,"suburb", this.section, this.city, this.informalsettlement, this.cellNumber, this.emailAddress,"P@ssw0rd12345",this.Status,this.officelevel,this.selected,this.Businessunit,this.passport
     //         ).subscribe(userid => {
     //           console.log(userid)
     //           this.userId = userid; 
     //           Swal.fire({
     //             timer: 5000,
     //             confirmButtonText: 'Yes',
     //             cancelButtonText: 'No',
     //             title: "Successful",
     //             text: 'User has been successfully created',
 
     //             icon: 'success'
     //           }).then(result => {
     //             this.modalService.dismissAll();
     //             if (result.value || result.isDismissed  ) {
     //               window.location.reload()
     //             }
     //           });
     //         }, err => { 
     //           console.log(err);
     //         })
 
 
 
     //       }
     //   })
 
 
     //   varRole += "}";
     //     console.log("roles roleOutput", roleOutput);    
 
 
 
     // }
 
 
 
 
 
 
     this.isCreateFormSubmitted = true;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
     // this.isCreateFormSubmitted = true;
 
   } */











  //   //create submit button end//

  /*clearPersal() {
 
     let editIsEmployee = this.validationForm.controls["editIsEmployee"].value;
     let isEmployee = this.validationForm.controls["isEmployee"].value;
 
     if (!isEmployee) {
       this.validationForm.controls["persal"].setValue("");
     }
 
     if (!editIsEmployee) {
       this.validationForm.controls["editPersal"].setValue("");
     }
 
 
   } */


  //srikanth new addded//
  //onselecteds(districttest) {  
  //this.districtschools = this.schoolstest.filter(e=>e.district == districttest.target.value);
  //}

  //srikanth distric event//
  //onselecteds(regiondistrict) {  

  // this.districtschools = this.ndistricttest.filter(e=>e.districtName==regiondistrict.target.value);


  // }

  //for circuit  event is on  distrinct//
  onselecteds(regiondistrict) {


    console.log("regiondistrict", regiondistrict.target.value);
    if (regiondistrict.target.value != "0") {
      this.districtSelected = regiondistrict.target.value;
      //fillregion
      this.regionsData = this.schoolsMainData.filter(e => e.districtName == regiondistrict.target.value).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillcircuits
      this.circuitsData = this.schoolsMainData.filter(e => e.districtName == regiondistrict.target.value).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersData = this.schoolsMainData.filter(e => e.districtName == regiondistrict.target.value).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillschools
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


  }

  //for cluster event is on circuit//

  oncircuit(Circuit) {

    if (Circuit.target.value != "0") {

      this.showschool = true
      this.showschools = false

      this.circuitSelected = Circuit.target.value;
      //fillregion
      this.regionsData = this.schoolsMainData.filter(e => e.circuitNo == Circuit.target.value).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //filldistricts
      this.districtsData = this.schoolsMainData.filter(e => e.circuitNo == Circuit.target.value).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersData = this.schoolsMainData.filter(e => e.circuitNo == Circuit.target.value).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillschools
      //fillschools        
      //this.schoolsMain = this.schoolsMainData.filter(e=>e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);

    } else {

      this.showschool = false
      this.showschools = true

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

  }













  //event on  subdirectorate

  Subdirectorate(dispositionsdatasub) {

    if (dispositionsdatasub.target.value != "0") {
      this.subdirectorateSelected = dispositionsdatasub.target.value;
      //fillregion
      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub.target.value).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);



    } else {

      this.dispositionsdataposition = this.dispositiondatadirid.filter(e => e.subdirectorate == dispositionsdatasub.target.value).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);




    }
    console.log("district position",this.dispositionsdataposition)

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
    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }
  }




  //HoCDPosition(HOCheifDirectorate){
  //if(HOCheifDirectorate.target.value!="0"){
  //this.HoCDposition = this.HPbranchPostion.filter(e=>e.position==this.HeadPostionBranch && e.chiefdirectorate ==HOCheifDirectorate.target.value && e.directorate=="NULL" && e.subdirectorates=="NULL");

  //console.log ("this is position for hcd",  this.HoCDposition)  
  //}


  //}



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

  onupdateSelectedbrach(branch) {

    if (branch) {
      // this.BranchSelected = branch;

      //Chief Directorate
      this.HOCDDataData = this.HOAllPositionfilter.filter(e => e.branch == branch).map(item => item.chiefdirectorate)
        .filter((value, index, self) => self.indexOf(value) === index);
      //return self.findIndex(v => v.actor.name === value.actor.name) === index;
      //Dirctorate
      this.HODirectorate = this.HOAllPositionfilter.filter(e => e.branch == branch).map(item => item.directorate)
        .filter((value, index, self) => self.indexOf(value) === index);


      //this.HOPOsition =  this.HOAllPositionfilter.filter(e=>e.branch==this.BranchSelected && e.chiefdirectorate == null && e.directorate == null && e.subdirectorates== null);

    } else {

      this.HOCDDataData = this.HPbranchPostion.map(item => item.chiefdirectorate)
        .filter((value, index, self) => self.indexOf(value) === index);
    }
    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }

  }








  Position(dispositionsdataposition) {
    if (dispositionsdataposition.target.value != "0") {
      // this.Subdirectorate  = this.dispositionsdatasub.target.value
      this.positionSelected = dispositionsdataposition.target.value;
      //fillregion

      //fillregion
      this.dispositiondataBuss = this.dispositiondataid.filter(e => e.position == dispositionsdataposition.target.value).map(item => item.businessunit)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log("this is businessunit", this.dispositiondataBuss);
      //console.log("filters", this.regionSelected+"-"+this.districtSelected+"-"+this.circuitSelected+"-"+this.clusterSelected);     
      //this.schoolsMain = this.schoolsMainData.filter(e=>e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);
      //console.log("clusterschooldwithcircuit",this.schoolsMain );




    } else {

      this.dispositiondataBuss = this.dispositiondataid.filter(e => e.position == dispositionsdataposition.target.value).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);


    }

  }



  updateposition(dispositionsdataposition) {
    if (dispositionsdataposition) {
      // this.Subdirectorate  = this.dispositionsdatasub.target.value
      this.positionSelected = dispositionsdataposition;
      //fillregion

      //fillregion
      this.dispositiondataBuss = this.dispositiondataid.filter(e => e.position == dispositionsdataposition).map(item => item.businessunit)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log("this is businessunit", this.dispositiondataBuss);
      //console.log("filters", this.regionSelected+"-"+this.districtSelected+"-"+this.circuitSelected+"-"+this.clusterSelected);     
      //this.schoolsMain = this.schoolsMainData.filter(e=>e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);
      //console.log("clusterschooldwithcircuit",this.schoolsMain );




    } else {

      this.dispositiondataBuss = this.dispositiondataid.filter(e => e.position == dispositionsdataposition).map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index);


    }
    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }

  }



























  onclusterchange(cluster) {
    if (cluster.target.value != "0") {
      this.clusterSelected = cluster.target.value;
      //fillregion
      this.regionsData = this.schoolsMainData.filter(e => e.clusterNo == cluster.target.value).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //filldistricts
      this.districtsData = this.schoolsMainData.filter(e => e.clusterNo == cluster.target.value).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillcircuits
      this.circuitsData = this.schoolsMainData.filter(e => e.clusterNo == cluster.target.value).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillschools      
      console.log("filters", this.regionSelected + "-" + this.districtSelected + "-" + this.circuitSelected + "-" + this.clusterSelected);
      this.schoolsMain = this.schoolsMainData.filter(e => e.region == this.regionSelected && e.districtName == this.districtSelected && e.circuitNo == this.circuitSelected && e.clusterNo == this.clusterSelected);
      console.log("clusterschooldwithcircuit", this.schoolsMain);

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

    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }
  }

  onschoolchange(schoolname) {
    if (schoolname.target.value != "0") {



      //fillregion
      this.regionsData = this.schoolsMainData.filter(e => e.institutionName == schoolname.target.value).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);

      //filldistricts
      this.districtsData = this.schoolsMainData.filter(e => e.institutionName == schoolname.target.value).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillcircuits
      this.circuitsData = this.schoolsMainData.filter(e => e.institutionName == schoolname.target.value).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersData = this.schoolsMainData.filter(e => e.institutionName == schoolname.target.value).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

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
  }



  onschoolchanges(selectedSchoolName) {
    //let selected = event.target.value;
    //console.log ("this is lelo", selected);

    if (selectedSchoolName) {
      let school
      console.log(this.schoolsMainData)
      this.showdistricts = true;
      this.showregions = true;
      this.showschools = true;
      this.showcircuits = true;
      this.showclusters = true;
      //this.showschool =false;
      // this.showdistrict=false;
      //this.showregion=false;
      //this.showschool=false; 
      // this.showcircuit=false;
      //this.showcluster=false; 


      //fillregion
      this.regionsDatas = this.schoolsMainData.filter(e => e.institutionName == this.selectedSchoolName).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.regionsDatas);
      this.region = this.regionsDatas[0];
      console.log(this.region);
      //filldistricts
      this.districtsDatas = this.schoolsMainData.filter(e => e.institutionName == this.selectedSchoolName).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.districtsDatas);
      this.districtName = this.districtsDatas[0];
      console.log(this.districtName);
      //fillcircuits
      this.circuitsDatas = this.schoolsMainData.filter(e => e.institutionName == this.selectedSchoolName).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersDatas = this.schoolsMainData.filter(e => e.institutionName == this.selectedSchoolName).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

    } else {


      this.showdistricts = false;
      this.showregions = false;
      this.showcircuits = false;
      this.showclusters = false;
      this.showdistrict = false;
      //this.showregion=false;
      // this.showschool=false;
      //this.showschool =false; 
      // this.showcircuit=false;
      //this.showcluster=false; 

      this.regionsDatas = this.schoolsMainData.map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.regionsDatas);
      //this.regionsDatas = reg;
      this.districtsDatas = this.schoolsMainData.map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.districtsDatas);
      this.circuitsDatas = this.schoolsMainData.map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);


      this.clustersDatas = this.schoolsMainData.map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.schoolsMain = this.schoolsMainData;
    }
  }


  onupdateschoolchanges(selectedSchoolName) {
    //let selected = event.target.value;
    //console.log ("this is lelo", selected);

    if (selectedSchoolName) {

      this.showdistricts = true;
      this.showregions = true;
      this.showschools = true;
      this.showcircuits = true;
      this.showclusters = true;
      //this.showschool =false;
      // this.showdistrict=false;
      //this.showregion=false;
      //this.showschool=false; 
      // this.showcircuit=false;
      //this.showcluster=false; 


      //fillregion
      this.regionsDatas = this.schoolsMainData.filter(e => e.institutionName == selectedSchoolName).map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.regionsDatas);
      this.region = this.regionsDatas[0];
      console.log(this.region);
      //filldistricts
      this.districtsDatas = this.schoolsMainData.filter(e => e.institutionName == selectedSchoolName).map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.districtsDatas);
      this.districtName = this.districtsDatas[0];
      console.log(this.districtName);
      //fillcircuits
      this.circuitsDatas = this.schoolsMainData.filter(e => e.institutionName == selectedSchoolName).map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      //fillclusters
      this.clustersDatas = this.schoolsMainData.filter(e => e.institutionName == selectedSchoolName).map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

    } else {


      this.showdistricts = false;
      this.showregions = false;
      this.showcircuits = false;
      this.showclusters = false;
      this.showdistrict = false;
      //this.showregion=false;
      // this.showschool=false;
      //this.showschool =false; 
      // this.showcircuit=false;
      //this.showcluster=false; 

      this.regionsDatas = this.schoolsMainData.map(item => item.region)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.regionsDatas);
      //this.regionsDatas = reg;
      this.districtsDatas = this.schoolsMainData.map(item => item.districtName)
        .filter((value, index, self) => self.indexOf(value) === index);
      console.log(this.districtsDatas);
      this.circuitsDatas = this.schoolsMainData.map(item => item.circuitNo)
        .filter((value, index, self) => self.indexOf(value) === index);


      this.clustersDatas = this.schoolsMainData.map(item => item.clusterNo)
        .filter((value, index, self) => self.indexOf(value) === index);

      this.schoolsMain = this.schoolsMainData;
    }
    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }
  }




  //craete model//
  openLgModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.isCreateFormSubmitted = false;
      this.isEditFormSubmitted = false;

    }).catch((res) => {
    });

    if (!this.nationality) {
      this.validationForm.controls["idnumber"].disable();
    }


    if (!this.isAdmin) {

      this.officelevel = this.appService.getLoggedInUserOfficeLevel();
      this.roletype = "otherRole";
      this.validationForm.controls["roletype"].disable();
      this.onChangeOffice(this.officelevel)
      // console.log(this.officelevel);

      if (this.officelevel == "Head Office") {
        this.Directorate = this.appService.getLoggedInUserDirectorate();
        let direct = this.appService.getLoggedInUserDirectorate();

        let dir = this.allDirectorate.filter(function (directorate) {
          return directorate.directorateName == direct;
        });

        let sub = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });

        let chief = this.allChiefDirectorate.filter(function (directorate) {
          return directorate.id == dir[0].chiefDirectorateId;
        });

        let branch = this.allBranches.filter(function (directorate) {
          return directorate.branchId == chief[0].branchId;
        });

        this.subDirectorates = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });


        console.log(this.subDirectorates)
        console.log(dir)

        this.ChiefDirectorate = chief[0].chiefDirectorateName;
        this.Branch = branch[0].branchName;


        // let dir = this.Directorate;
        this.selectDirectorate(this.Directorate)



      } else if (this.appService.getLoggedInUserOfficeLevel() == "District") {
        let code = this.appService.getLoggedInDistrictCode();

        let district = this.allDistrictSchools.filter(function (e) {
          return code == e.districtCode;
        });

        this.region = district[0].region;
        this.districtName = district[0].districtName;
        this.districtCode = code;

      }

      // this.AdminRole(this.roletype);


    }

    // if (!this.isAdmin) {

    //   this.officelevel = this.appService.getLoggedInUserOfficeLevel();
    //   this.roletype = "otherRole";
    //   this.validationForm.controls["roletype"].disable();
    //   this.onChangeOffice(this.officelevel)
    //   this.AdminRole(this.roletype);
    //   // console.log(this.officelevel);

    //   if (this.appService.getLoggedInUserOfficeLevel() == "Head Office") {
    //     this.Directorate = this.appService.getLoggedInUserDirectorate();
    //     let dir = this.Directorate;
    //     this.selectDirectorate(this.Directorate,"create")

    //     let l1 = this.HPbranchPostion.filter(function (e) {
    //       return dir == e.directorate
    //     });

    //     this.chiefDirectorates = l1[0].chiefdirectorate;
    //     let cheif = this.chiefDirectorates
    //     this.selectChiefDirectorate(this.ChiefDirectorate)

    //     let l2 = this.HPbranchPostion.filter(function (e) {
    //       return cheif == e.chiefdirectorate;
    //     });

    //     this.Branch = l2[0].branch;
    //     // this.selectBranch(this.Branch)


    //   } else if (this.appService.getLoggedInUserOfficeLevel() == "District") {
    //     let code = this.appService.getLoggedInDistrictCode();

    //     let district = this.allDistrictSchools.filter(function (e) {
    //       return code == e.districtCode;
    //     });

    //     this.region = district[0].region;
    //     this.districtName = district[0].districtName;
    //     this.districtCode = code;

    //   }



    // }


  }

  //create modal end//

  //need to user this  make active to deactivated//
  openLgModaleditDeactive(content, Id) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.isCreateFormSubmitted = false;
      this.isEditFormSubmitted = false;

    }).
      catch((res) => {
      });
    this.userId = Id;

    // this.editStatus = this.Status
    console.log("this useridtest" + this.userId)


  }
  //need to user this  make active to deactivated//


  openLgModaledit(content) {

    // if (this.isCreateFormSubmitted) {
    //   if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
    //     this.emptyUsernumber = true;
    //     console.log("error field");

    //   } else {
    //     this.emptyUsernumber = false;
    //     console.log("success");

    //   }

    // }

    if (!this.isEmployee && !this.idNumber) {
      this.noIDNumber = true;

    } else {
      this.noIDNumber = false;

    }
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.isCreateFormSubmitted = false;
      this.isEditFormSubmitted = false;
    }).catch((res) => { });

  }
  ///endof modaal edit

  getSchools(e, isSEO) {

    let role = [];

    for (var key in this.roleSelected) {
      if (this.roleSelected.hasOwnProperty(key)) {
        role.push(this.roleSelected[key].roleName);
      }
    }

    if (isSEO) {
      // secondary district and school 

      this.validationForm.controls["seoEmisNumber"].setValue("");
      if (role.includes('SGB') || role.includes('SEO') || role.includes('PARENT') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER')) {
        this.userservice.getSchoolsByDistrict(e).subscribe((seo: any) => {

          if (this.loggedInRole == "SGB" || this.loggedInRole == "SEO" || this.loggedInRole == "PRINCIPAL") {

            this.seoDistrictCode = this.appService.getLoggedInDistrictCode();
            this.validationForm.controls["seoDistrictCode"].setValue(this.appService.getLoggedInDistrictCode());
            this.validationForm.controls["seoDistrictCode"].disable();

            this.seoEmisNumber = this.appService.getLoggedInEmisCode();
            this.validationForm.controls["seoEmisNumber"].setValue(this.appService.getLoggedInEmisCode());
            this.validationForm.controls["seoEmisNumber"].disable();

          } else {
            this.seoSchools = seo;
            this.validationForm.controls["seoEmisNumber"].setValue("");

          }

        });

        this.validationForm.controls["seoEmisNumber"].setValidators([Validators.required]);
        this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();

      } else {
        this.validationForm.controls["seoEmisNumber"].clearValidators();
        this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();

      }
    } else {
      // main district and school

      this.validationForm.controls["emisNumber"].setValue("");
      if (role.includes('SGB') || role.includes('SEO') || role.includes('PARENT') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER')) {
        this.userservice.getSchoolsByDistrict(e).subscribe((res: any) => {

          if (this.loggedInRole == "SGB" || this.loggedInRole == "SEO" || this.loggedInRole == "PRINCIPAL") {

            this.districtCode = this.appService.getLoggedInDistrictCode();
            this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
            this.validationForm.controls["districtCode"].disable();

            this.emisNumber = this.appService.getLoggedInEmisCode();
            this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
            this.validationForm.controls["emisNumber"].disable();

          } else {
            this.schools = res;
            this.seoSchools = res;
            this.validationForm.controls["emisNumber"].setValue("");

          }

        });

        this.validationForm.controls["emisNumber"].setValidators([Validators.required]);
        this.validationForm.controls["emisNumber"].updateValueAndValidity();

      } else {
        this.validationForm.controls["emisNumber"].clearValidators();
        this.validationForm.controls["emisNumber"].updateValueAndValidity();

      }
    }


  }

  editUserstatus(i) {
    {

      //this.editId = this.data[i].userId;
      this.editStatus = this.data[i].userActive;

    }
  }



  /* editUser(i) {
     {
       console.log("this is srikanth")
     }
     let maskIdNumber;
     let role = [];
 
 
     // changed to persal  it was idnumber --srikanth//
 
     console.log(this.data[i]);
     if (this.data[i].persal) {
       if (this.data[i].persal == null || this.data[i].persal == undefined || this.data[i].persal == "undefined") {
         maskIdNumber = "";
       } else {
         maskIdNumber = this.data[i].persal.substring(0, 6) + "*******";
       }
     } else {
       maskIdNumber = ""
     }
 
     this.noEditIDnumber = false;
     this.emptyEditUsernumber = false;
     this.selectedUser = this.data[i];
     this.editId = this.data[i].userId;
     this.editCity = this.data[i].city;
     this.editComplex = this.data[i].complex;
     this.editDesignation = this.data[i].designation;
     this.editEmail = this.data[i].email;
     this.editExperience = this.data[i].experience
     this.editGender = this.data[i].gender;
     this.editHouse = this.data[i].house;
     this.editIdNumber = this.data[i].idNumber;
     this.editPassport = this.data[i].idNumber;
     this.editIdNumber = maskIdNumber
     this.edituserType = this.data[i].userType;
     this.editStatus = this.data[i].userActive;
 
 
     // console.log(this.data[i].userType)
     //if (this.data[i].userType.includes(',')) {
     //this.editRoleSelected = this.data[i].userType.split(',');
     //} else {
     //   this.editRoleSelected = [this.data[i].userType];
     // }
 
     this.editinformalsettlement = this.data[i].informalsettlement;
     this.editIsEmployee = this.data[i].isEmployee;
     this.editName = this.data[i].firstName;
     this.editCellNumber = this.data[i].cell;
     this.editPersal = this.data[i].persal;
     this.editQualification = this.data[i].qualification;
     this.editinformalsettlement = this.data[i].informalsettlement;
     this.editSection = this.data[i].section;
     this.editStreet = this.data[i].street;
     this.editNationality = this.data[i].nationality;
     this.editSurname = this.data[i].surname;
     this.editUserRole = this.data[i].userType;
     this.editEmisNumber = this.data[i].emisNumber
     this.editDistrictCode = this.data[i].districtCode;
     this.editofficelevel = this.data[i].officeLevel;
     this.editId = this.data[i].userId
 
     if (this.editIdNumber == "undefined" || this.data[i].idNumber == "null" || this.data[i].idNumber == "undefined") {
       this.editIdNumber = "";
       this.editPassport = "";
 
 
     }
     if (this.editHouse == "undefined" || this.editHouse == "null") {
       this.editHouse = "";
 
     }
     if (this.editCity == "undefined" || this.editCity == "null") {
       this.editCity = "";
 
     }
     if (this.editComplex == "undefined" || this.editComplex == "null") {
       this.editComplex = "";
 
     }
     if (this.editSection == "undefined" || this.editSection == "null") {
       this.editSection = "";
 
     }
     if (this.editStreet == "undefined" || this.editStreet == "null") {
       this.editStreet = "";
 
     }
     if (this.editExperience == "undefined" || this.editExperience == "null") {
       this.editExperience = "";
 
     }
     if (this.editQualification == "undefined" || this.editQualification == "null") {
       this.editQualification = "";
 
     }
     if (this.editofficelevel == "undefined" || this.editofficelevel == "null") {
       this.editofficelevel = "";
 
     }
 
     for (var key in this.editRoleSelected) {
       if (this.editRoleSelected.hasOwnProperty(key)) {
         role.push(this.editRoleSelected[key]);
       }
     }
 
     if (this.editRoleSelected.includes('SEO') && this.editRoleSelected.includes('PRINCIPAL')) {
       // the selected user is assigned to 2 schools
       this.userservice.getUserRoleById(this.editId).subscribe((res: any) => {
 
         console.log(res)
 
         let seoRole = res.filter(function (data) {
           return ["SEO"].includes(data.roleName)
         });
         this.editSeoEmisNumber = seoRole[0].emisCode;
         console.log(seoRole[0].emisCode);
       })
     }
 
 
     if (this.editEmisNumber && this.editEmisNumber != "undefined" && this.editEmisNumber != "null") {
       this.userservice.getSchoolByEmisNumber(this.editEmisNumber).subscribe((res: any) => {
         console.log(res)
         this.schoolName = res[0].institutionName
       }, err => {
         console.log(err);
         this.schoolName = ""
       })
     }
 
     if (this.editDistrictCode && this.editDistrictCode != "undefined" && this.editDistrictCode != "null") {
 
       this.userservice.getSchoolsByDistrict(this.editDistrictCode).subscribe((seo: any) => {
         this.seoSchools = seo;
       });
 
       this.userservice.getDistrictByCode(this.editDistrictCode).subscribe((res: any) => {
         this.districtName = res.districtName;
 
       }, err => {
         console.log(err);
         this.districtName = "";
       })
     }
 
 
     if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
       this.emptyEditUsernumber = true;
 
     } else {
       this.emptyEditUsernumber = false;
 
     }
 
     if (!this.editIsEmployee && !this.editIdNumber) {
       this.noEditIDnumber = true;
     } else {
       this.noEditIDnumber = false;
     }
 
 
 
     if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
       this.emptyUsernumber = true;
 
     } else {
       this.emptyUsernumber = false;
 
     }
 
     if (!this.isEmployee && !this.idNumber) {
       this.noIDNumber = true;
 
     } else {
       this.noIDNumber = false;
 
     }
 
   } */


  /* validateEditIDnumber() {
     this.noEditIDnumber = false;
     this.emptyEditUsernumber = false;
     this.invalidEditIdNumber = false;
 
     if (this.editIdNumber) {
       if (this.editIdNumber.length == 13) {
         let birthMonth = parseInt(this.editIdNumber.substring(2, 4))
         let birthDay = parseInt(this.editIdNumber.substring(4, 6))
 
 
         if (birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
           this.invalidEditIdNumber = true;
         }
       }
     }
 
 
     if (this.editIdNumber.length == 13) {
 
       if (parseInt(this.editIdNumber.substring(6, 10)) < 5000) {
         this.editGender = "Female"
       } else if (parseInt(this.editIdNumber.substring(6, 10)) >= 5000) {
         this.editGender = "Male"
 
       }
     }
 
     if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
       this.emptyEditUsernumber = true;
       console.log("error field");
 
     } else {
       this.emptyEditUsernumber = false;
       console.log("success");
 
     }
 
     if (!this.editIsEmployee && !this.editIdNumber) {
       this.noEditIDnumber = true;
     } else {
       this.noEditIDnumber = false;
     }
   } */


  //updateeditActive(){

  //this.userservice.updateUserProfileEmployeett(this.editId,this.editStatus).subscribe(userId =>{
  //console.log(userId)
  //this.userId = userId;
  //Swal.fire({
  // timer: 5000,
  //title: "Successful",
  //text: 'User has been successfully updated',
  //icon: 'success'

  //});

  //}


  //}
  // updateeditActive() {
  //   console.log( this.editId,this.editStatus);
  //  this.userId = this.editId
  //   this.editStatus = this.UserActive
  //   this.userservice.updateUserProfileEmployeettt(this.userId,this.UserActive,
  //   ).subscribe(userId => {  

  //     console.log("this is the outsr" + userId);
  //     Swal.fire({
  //        timer: 5000,
  //       title: "Successful",
  //       text: 'User has been successfully updated',
  icon: 'success'

  //     }).then((results) => {
  //       if (results.value || results.isDismissed) {
  //         this.modalService.dismissAll();
  //        // this.router.navigate(['/users/new-user']);
  //         window.location.reload();

  //       }
  //     })
  //   }, err => {
  //     console.log(err);
  //     Swal.fire({
  //       timer: 5000,
  //       title: "Error!",
  //       text: 'Your entry was unsuccessful, please testtry again',
  //       icon: 'error'
  //     });


  //   });

  //   this.noEditIDnumber = false;
  //   this.emptyEditUsernumber = false;
  //   let role = [];
  //   let roleOutput = [];








  //   console.log(this.validationFormEdit);

  //   if (this.modalService.hasOpenModals() && this.validationFormEdit.valid && !this.emptyEditUsernumber && !this.noEditIDnumber && !this.invalidEditIdNumber) {

  //     if (this.editCellNumber[0] == "0") {

  //       // this.userservice.isCellnumberUnique(this.editCellNumber).subscribe((result: Boolean) => {
  //       //   this.iseditCellnumberDuplicate = !result;

  //       //   if (result) {
  //       //   }

  //       // }, err => {
  //       //   console.log(err)
  //       // })

  //       for (var key in this.editRoleSelected) {
  //         if (this.editRoleSelected.hasOwnProperty(key)) {
  //           role.push(this.editRoleSelected[key].roleName);
  //         }
  //       }

  //       if (!role[0] || role == undefined) {
  //         for (var key in this.editRoleSelected) {
  //           if (this.editRoleSelected.hasOwnProperty(key)) {
  //             role.push(this.editRoleSelected[key]);
  //           }
  //         }

  //       }
  //       Swal.fire({
  //         title: 'Are you sure you want to save user',
  //         text: 'A user will be updated',
  //         icon: 'question',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes',
  //         cancelButtonText: 'No'
  //       }).then((result) => {
  //         if (result.value) {


  //           let idnumber;
  //           if (!this.selectedUser.idNumber || this.editIdNumber.includes('*') && this.selectedUser.idNumber.substring(0, 6) + "*******" == this.editIdNumber.substring(0, 6) + "*******") {
  //             idnumber = this.selectedUser.idNumber;
  //           } else {
  //             idnumber = this.editIdNumber;
  //           }
  //           // let roletest = '"HO":"","DEO":"TN","PEO":""'roleOutput

  //           if (role.includes('SEO') && role.includes('PRINCIPAL')) {
  //             roleOutput.push('"PRINCIPAL":"' + this.editEmisNumber + '"')
  //             roleOutput.push('"SEO":"' + this.editSeoEmisNumber + '"')

  //           }
  //           if (role.includes('SEO') && !role.includes('PRINCIPAL')) {
  //             roleOutput.push('"SEO":"' + this.editEmisNumber + '"')

  //           }
  //           if (!role.includes('SEO') && role.includes('PRINCIPAL')) {
  //             roleOutput.push('"PRINCIPAL":"' + this.editEmisNumber + '"')

  //           }
  //           if (role.includes('DEO')) {
  //             roleOutput.push('"DEO":"' + this.editDistrictCode + '"')

  //           }
  //           if (role.includes('PEO')) {
  //             roleOutput.push('"PEO":""');

  //           }
  //           if (role.includes('PEM')) {
  //             roleOutput.push('"PEM":""');

  //           }
  //           if (role.includes('HO')) {
  //             roleOutput.push('"HO":""');

  //           }
  //           if (role.includes('OFFICE_BEARERS')) {
  //             roleOutput.push('"OFFICE_BEARERS":"' + this.editDistrictCode + '"');

  //           }
  //           if (role.includes('OBSERVER')) {
  //             roleOutput.push('"OBSERVER":"' + this.editDistrictCode + '"');

  //           }
  //           if (role.includes('MONITOR')) {
  //             roleOutput.push('"MONITOR":"' + this.editDistrictCode + '"');

  //           }

  //           this.userservice.updateUserProfileEmployee(this.editId, this.editName, this.editSurname,
  //             this.editCellNumber, this.editEmail, this.editHouse, this.editComplex, this.editStreet, this.editSection,
  //             this.editCity, this.editExperience, this.editQualification, this.editGender, this.editDesignation, roleOutput, this.editPersal,
  //           ).subscribe(res => {
  //             console.log(res);
  //             Swal.fire({
  //               // timer: 5000,
  //               title: "Successful",
  //               text: 'User has been successfully updated',
  //               icon: 'success'
  //             }).then((results) => {
  //               if (results.value || results.isDismissed) {
  //                 this.modalService.dismissAll();
  //                 this.router.navigate(['/users/new-user']);
  //                 window.location.reload();

  //               }
  //             })
  //           }, err => {
  //             console.log(err);
  //             Swal.fire({
  //               timer: 5000,
  //               title: "Error!",
  //               text: 'Your entry was unsuccessful, please try again',
  //               icon: 'error'
  //             });

  //           });

  //         } else if (result.dismiss === Swal.DismissReason.cancel) {
  //           Swal.fire(
  //             'Cancelled',
  //             'Your entry was not save',
  //             'error'
  //           )
  //         }
  //       })



  //     } else {
  //       this.iseditNumberInvalid = true;
  //     }


  //   }
  //   this.isEditFormSubmitted = true;


  // }









  /* updateUser() {
     //console.log("edit name", this.editId);
     console.log(this.validationFormEdit);
     this.userservice.updateUserProfileEmployee(this.editId, this.editName, this.editSurname, this.editofficelevel,
       this.editCellNumber, this.editEmail, this.editHouse, this.editComplex, this.editStreet, this.editSection,
       this.editCity, this.editExperience, this.editQualification, this.editGender, this.editDesignation, "",
     ).subscribe(res => {
       console.log(res);
       Swal.fire({
         // timer: 5000,
         title: "Successful",
         text: 'User has been successfully updated',
         icon: 'success'
       }).then((results) => {
         if (results.value || results.isDismissed) {
           this.modalService.dismissAll();
           this.router.navigate(['/users/new-user']);
           window.location.reload();
 
         }
       })
     }, err => {
       console.log(err);
       Swal.fire({
         timer: 5000,
         title: "Error!",
         text: 'Your entry was unsuccessful, please try again',
         icon: 'error'
       });
 
 
     });
 
     this.noEditIDnumber = false;
     this.emptyEditUsernumber = false;
     let role = [];
     let roleOutput = [];
 
     if (this.editIdNumber.length == 13) {
       let birthMonth = parseInt(this.editIdNumber.substring(2, 4))
       let birthDay = parseInt(this.editIdNumber.substring(4, 6))
 
 
       if (birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
         this.invalidEditIdNumber = true;
       }
     }
 
 
     if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
       this.emptyEditUsernumber = true;
       // console.log("error field");
 
     } else {
       this.emptyEditUsernumber = false;
       // console.log("success");
 
     }
 
 
     if (!this.editIsEmployee && !this.editIdNumber) {
       this.noEditIDnumber = true;
       // console.log("error field");
     } else {
       this.noEditIDnumber = false;
       // console.log("success");
     }
 
     console.log(this.validationFormEdit);
 
     if (this.modalService.hasOpenModals() && this.validationFormEdit.valid && !this.emptyEditUsernumber && !this.noEditIDnumber && !this.invalidEditIdNumber) {
 
       if (this.editCellNumber[0] == "0") {
 
         // this.userservice.isCellnumberUnique(this.editCellNumber).subscribe((result: Boolean) => {
         //   this.iseditCellnumberDuplicate = !result;
 
         //   if (result) {
         //   }
 
         // }, err => {
         //   console.log(err)
         // })
 
         for (var key in this.editRoleSelected) {
           if (this.editRoleSelected.hasOwnProperty(key)) {
             role.push(this.editRoleSelected[key].roleName);
           }
         }
 
         if (!role[0] || role == undefined) {
           for (var key in this.editRoleSelected) {
             if (this.editRoleSelected.hasOwnProperty(key)) {
               role.push(this.editRoleSelected[key]);
             }
           }
 
         }
         Swal.fire({
           title: 'Are you sure you want to save user',
           text: 'A user will be updated',
           icon: 'question',
           showCancelButton: true,
           confirmButtonText: 'Yes',
           cancelButtonText: 'No'
         }).then((result) => {
           if (result.value) {
 
 
             let idnumber;
             if (!this.selectedUser.idNumber || this.editIdNumber.includes('*') && this.selectedUser.idNumber.substring(0, 6) + "*******" == this.editIdNumber.substring(0, 6) + "*******") {
               idnumber = this.selectedUser.idNumber;
             } else {
               idnumber = this.editIdNumber;
             }
             // let roletest = '"HO":"","DEO":"TN","PEO":""'roleOutput
 
             if (role.includes('SEO') && role.includes('PRINCIPAL')) {
               roleOutput.push('"PRINCIPAL":"' + this.editEmisNumber + '"')
               roleOutput.push('"SEO":"' + this.editSeoEmisNumber + '"')
 
             }
             if (role.includes('SEO') && !role.includes('PRINCIPAL')) {
               roleOutput.push('"SEO":"' + this.editEmisNumber + '"')
 
             }
             if (!role.includes('SEO') && role.includes('PRINCIPAL')) {
               roleOutput.push('"PRINCIPAL":"' + this.editEmisNumber + '"')
 
             }
             if (role.includes('DEO')) {
               roleOutput.push('"DEO":"' + this.editDistrictCode + '"')
 
             }
             if (role.includes('PEO')) {
               roleOutput.push('"PEO":""');
 
             }
             if (role.includes('PEM')) {
               roleOutput.push('"PEM":""');
 
             }
             if (role.includes('HO')) {
               roleOutput.push('"HO":""');
 
             }
             if (role.includes('OFFICE_BEARERS')) {
               roleOutput.push('"OFFICE_BEARERS":"' + this.editDistrictCode + '"');
 
             }
             if (role.includes('OBSERVER')) {
               roleOutput.push('"OBSERVER":"' + this.editDistrictCode + '"');
 
             }
             if (role.includes('MONITOR')) {
               roleOutput.push('"MONITOR":"' + this.editDistrictCode + '"');
 
             }
 
             this.userservice.updateUserProfileEmployee(this.editId, this.editName, this.editSurname,
               this.editCellNumber, this.editEmail, this.editHouse, this.editComplex, this.editStreet, this.editSection,
               this.editCity, this.editExperience, this.editQualification, this.editGender, this.editDesignation, roleOutput, this.editPersal,
             ).subscribe(res => {
               console.log(res);
               Swal.fire({
                 // timer: 5000,
                 title: "Successful",
                 text: 'User has been successfully updated',
                 icon: 'success'
               }).then((results) => {
                 if (results.value || results.isDismissed) {
                   this.modalService.dismissAll();
                   this.router.navigate(['/users/new-user']);
                   window.location.reload();
 
                 }
               })
             }, err => {
               console.log(err);
               Swal.fire({
                 timer: 5000,
                 title: "Error!",
                 text: 'Your entry was unsuccessful, please try again',
                 icon: 'error'
               });
 
             });
 
           } else if (result.dismiss === Swal.DismissReason.cancel) {
             Swal.fire(
               'Cancelled',
               'Your entry was not save',
               'error'
             )
           }
         })
 
 
 
       } else {
         this.iseditNumberInvalid = true;
       }
 
 
     }
     this.isEditFormSubmitted = true;
 
 
   } */

  Cancel() {
    this.validationForm.reset();
    this.isCreateFormSubmitted = false;

    this.modalService.dismissAll();



    this.validationForm.controls["firstname"].setValue("");
    this.validationForm.controls["surname"].setValue("");
    // this.validationForm.controls["isEmployee"].setValue(false);
    this.validationForm.controls["gender"].setValue("");
    this.validationForm.controls["idnumber"].setValue("");
    this.validationForm.controls["persal"].setValue("");
    this.validationForm.controls["userType"].setValue("");
    // this.validationForm.controls["designation"].setValue("");
    // this.validationForm.controls["informalsettlement"].setValue(false);
    // this.validationForm.controls["house"].setValue("");
    // this.validationForm.controls["complex"].setValue("");
    // this.validationForm.controls["street"].setValue("");
    // this.validationForm.controls["section"].setValue("");
    // this.validationForm.controls["city"].setValue("");
    this.validationForm.controls["cellNumber"].setValue("");
    this.validationForm.controls["emailAddress"].setValue("");
    // this.validationForm.controls["isBlacklisted"].setValue(false);
    // this.validationForm.controls["qualification"].setValue("");
    // this.validationForm.controls["experience"].setValue("");
    // this.validationForm.controls["roleSelected"].setValue("");
    // this.validationForm.controls["schoolSelected"].setValue("");
    this.validationForm.controls["nationality"].setValue("");
    this.validationForm.controls["officelevel"].setValue("");





  }

  getSchoolName(emisNumber, isSEO) {


    if (isSEO) {
      // secondary district and school
      this.userservice.getSchoolByEmisNumber(emisNumber).subscribe((res: any) => {
        this.seoSchoolName = res[0].institutionName;
      }, err => {
        this.seoSchoolName = null;
      })
    } else {
      // main district and school

      this.userservice.getSchoolByEmisNumber(emisNumber).subscribe((res: any) => {
        this.parentSchool = res[0].institutionName;
      }, err => {
        this.parentSchool = null;
      })
    }

  }


  showHide(flag) {
    let role = [];

    if (flag == "seo") {
      // show additional school and district fields
      for (var key in this.roleSelected) {
        if (this.roleSelected.hasOwnProperty(key)) {
          role.push(this.roleSelected[key].roleName);
        }
      }

      if (role || role.length > 0) {
        return role.includes('SEO') && role.includes('PRINCIPAL');
      } else {
        return false;
      }

    } else if (flag == "parent") {
      //  
      for (var key in this.roleSelected) {
        if (this.roleSelected.hasOwnProperty(key)) {
          role.push(this.roleSelected[key].roleName);
        }
      }

      if (role.includes('PARENT') || this.loggedInRole == "PRINCIPAL") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "notparent") {
      // show additional school and district fields
      for (var key in this.roleSelected) {
        if (this.roleSelected.hasOwnProperty(key)) {
          role.push(this.roleSelected[key].roleName);
        }
      }


      if (this.loggedInRole != "PRINCIPAL") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "district") {
      // show additional school and district fields
      for (var key in this.roleSelected) {
        if (this.roleSelected.hasOwnProperty(key)) {
          role.push(this.roleSelected[key].roleName);
        }
      }


      if (role.includes('SGB') || role.includes('SEO') || role.includes('DEO') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER') || this.loggedInRole == "PRINCIPAL") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "school") {
      // show additional school and district fields
      for (var key in this.roleSelected) {
        if (this.roleSelected.hasOwnProperty(key)) {
          role.push(this.roleSelected[key].roleName);
        }
      }

      if (role.includes('SGB') || role.includes('SEO') || role.includes('PRINCIPAL') || role.includes('PARENT') || this.loggedInRole == "PRINCIPAL") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "districtupdate") {
      // on edit form show hide district
      for (var key in this.editRoleSelected) {
        if (this.editRoleSelected.hasOwnProperty(key)) {
          role.push(this.editRoleSelected[key].roleName);
        }
      }

      if (!role[0] || role == undefined) {
        for (var key in this.editRoleSelected) {
          if (this.editRoleSelected.hasOwnProperty(key)) {
            role.push(this.editRoleSelected[key]);
          }
        }

      }


      if (role.includes('SGB') || role.includes('SEO') || role.includes('DEO') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER') || role.includes('PARENT')) {
        return true;
      } else {
        return false;
      }

    } else if (flag == "schoolupdate") {
      // on edit form show hide school
      for (var key in this.editRoleSelected) {
        if (this.editRoleSelected.hasOwnProperty(key)) {
          role.push(this.editRoleSelected[key].roleName);
        }
      }

      if (!role[0] || role == undefined) {
        for (var key in this.editRoleSelected) {
          if (this.editRoleSelected.hasOwnProperty(key)) {
            role.push(this.editRoleSelected[key]);
          }
        }

      }

      // console.log(role)
      if (role.includes('SGB') || role.includes('SEO') || role.includes('PRINCIPAL') || role.includes('PARENT')) {
        return true;
      } else {
        return false;
      }

    } else if (flag == "seoupdate") {
      // show additional school and district fields
      for (var key in this.editRoleSelected) {
        if (this.editRoleSelected.hasOwnProperty(key)) {
          role.push(this.editRoleSelected[key].roleName);
        }
      }
      if (!role[0] || role == undefined) {
        for (var key in this.editRoleSelected) {
          if (this.editRoleSelected.hasOwnProperty(key)) {
            role.push(this.editRoleSelected[key]);
          }
        }

      }

      // console.log(role)
      if (role && role.length > 0) {
        return role.includes('SEO') && role.includes('PRINCIPAL');
      } else {
        return false;
      }

    } else if (flag == "blacklist") {
      // show blacklist option base on the logged in user role
      for (var key in this.editRoleSelected) {
        if (this.editRoleSelected.hasOwnProperty(key)) {
          role.push(this.editRoleSelected[key]);
        }
      }
      return false
    } {
      return false;
    }

  }







  onChangeOffice(officelevel) {

    if (officelevel == "Regions") {
      this.showregion = true;
      this.showdistrict = false;
      this.showschool = false;
      this.showschools = false;
      this.showcluster = false;
      this.showcircuit = false;
      this.showHeadofficeinfo = false;
    } else if (officelevel == "District") {
      this.showdistrict = true;
      this.showDistricinfo = true;
      this.showregion = true;
      this.showregions = false;
      this.showcircuits = false;
      this.showclusters = false;
      this.showdistricts = false;
      this.showschool = false;
      this.showschools = false;
      this.showcircuit = false;
      this.showcluster = false;
      this.showHeadofficeinfo = false;
      this.ShowSchoolinfo = false;
    } else if (officelevel == "School") {
      this.admin = false;
      this.showdistrict = false;
      this.showDistricinfo = false;
      this.showregion = false;
      this.showschools = true;
      this.officelevel = "School";
      this.showcircuit = false;
      this.showcluster = false;
      this.showschool = false;
      this.showHeadofficeinfo = false;
      this.ShowSchoolinfo = true;
    } else if (officelevel == "Head Office") {

      this.showcluster = false;
      this.showDistricinfo = false;
      this.showdistrict = false;
      this.showregion = false;
      this.showschool = false;
      this.showcircuit = false;
      this.showschools = false;
      this.showHeadofficeinfo = true;
      this.ShowSchoolinfo = false;
      this.showregions = false;
      this.showcircuits = false;
      this.showclusters = false;
      this.showdistricts = false;

    }

    // console.log(this.showregion);
  }


  checkBrach() {
    this.validationForm.controls.branch.reset();
    this.validationForm.controls.branch.updateValueAndValidity();
  }



  validateEditDistrict() {
    let districtCode = this.validationFormEdit.controls["editDistrictCode"].value;
    let role = [];

    for (var key in this.editRoleSelected) {
      if (this.editRoleSelected.hasOwnProperty(key)) {
        role.push(this.editRoleSelected[key].roleName);
      }
    }
    console.log(this.editRoleSelected)


    if (role.includes('PEM') || role.includes('PEO') || role.includes('HO')) {
      // this.validationFormEdit.controls["editDistrictCode"].setValue("");
      this.schools = [];
      this.seoSchools = [];
    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('SEO') || role.includes('DEO') || role.includes('PRINCIPAL') || role.includes('MONITOR') || role.includes('OBSERVER')) {
      // this.validationFormEdit.controls["editDistrictCode"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editDistrictCode"].updateValueAndValidity();

    } else {
      // this.validationFormEdit.controls["editDistrictCode"].clearValidators();
      // this.validationFormEdit.controls["editDistrictCode"].updateValueAndValidity();

    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('SEO') || role.includes('PRINCIPAL')) {

      if (districtCode) {
        this.userservice.getSchoolsByDistrict(districtCode).subscribe((res: any) => {

          if (this.loggedInRole == "SGB" || this.loggedInRole == "SEO" || this.loggedInRole == "PRINCIPAL") {

            this.districtCode = this.appService.getLoggedInDistrictCode();
            this.validationFormEdit.controls["editDistrictCode"].setValue(this.appService.getLoggedInDistrictCode());
            this.validationFormEdit.controls["editDistrictCode"].disable();

            this.editEmisNumber = this.appService.getLoggedInEmisCode();
            this.validationFormEdit.controls["editEmisNumber"].setValue(this.appService.getLoggedInEmisCode());
            this.validationFormEdit.controls["editEmisNumber"].disable();

            // this.userservice.getSchoolsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((school: any) => {
            //   this.schools = school;
            //   this.emisNumber = this.appService.getLoggedInEmisCode();
            //   this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
            //   this.validationForm.controls["emisNumber"].disable();
            // }, err => {
            //   console.log(err);
            //   this.router.navigate(['/dashbaord'])
            // });

          } else {
            this.schools = res;
            // this.validationFormEdit.controls["editEmisNumber"].setValue("");

          }
        }, err => {
          console.log(err);
        });
      }

      // this.validationFormEdit.controls["editEmisNumber"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editEmisNumber"].updateValueAndValidity();


    } else {
      // this.validationFormEdit.controls["editEmisNumber"].clearValidators();
      // this.validationFormEdit.controls["editEmisNumber"].updateValueAndValidity();
      if (this.loggedInRole != "PRINCIPAL" || this.loggedInRole != "SEO") {
        this.schools = []

      }

    }


    if (role.includes('SEO') || role.includes('PEM') || role.includes('HO') || role.includes('DEO') || role.includes('PRINCIPAL')) {
      this.editIsEmployee = true;
    } else {
      this.editIsEmployee = false;
    }

    // if (role.includes('PARENT')) {
    //   this.validationFormEdit.controls["TypeOfInstitution"].setValidators([Validators.required]);
    //   this.validationFormEdit.controls["TypeOfInstitution"].updateValueAndValidity();
    //   this.validationFormEdit.controls["Relationship"].setValidators([Validators.required]);
    //   this.validationFormEdit.controls["Relationship"].updateValueAndValidity();

    //   this.validationFormEdit.controls["informalsettlement"].setValue(false);
    //   this.validationFormEdit.controls["house"].setValue('');
    //   this.validationFormEdit.controls["complex"].setValue('');
    //   this.validationFormEdit.controls["street"].setValue('');
    //   this.validationFormEdit.controls["section"].setValue('');
    //   this.validationFormEdit.controls["city"].setValue('');


    // } else {
    //   this.validationFormEdit.controls["TypeOfInstitution"].clearValidators();
    //   this.validationFormEdit.controls["TypeOfInstitution"].updateValueAndValidity();
    //   this.validationFormEdit.controls["TypeOfInstitution"].setValue('');
    //   this.validationFormEdit.controls["Relationship"].clearValidators();
    //   this.validationFormEdit.controls["Relationship"].updateValueAndValidity();
    //   this.validationFormEdit.controls["Relationship"].setValue('');

    //   this.validationFormEdit.controls["StreetAddress1"].setValue('');
    //   this.validationFormEdit.controls["StreetAddress2"].setValue('');
    //   this.validationFormEdit.controls["StreetAddress3"].setValue('');
    //   this.validationFormEdit.controls["StreetCode"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress1"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress2"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress3"].setValue('');
    //   this.validationFormEdit.controls["PostalCode"].setValue('');
    // }

    if (role.includes('SEO') && role.includes('PRINCIPAL')) {

      // this.validationFormEdit.controls["editSeoEmisNumber"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editSeoEmisNumber"].updateValueAndValidity();
    } else {
      // this.validationFormEdit.controls["editSeoEmisNumber"].clearValidators();
      // this.validationFormEdit.controls["editSeoEmisNumber"].updateValueAndValidity();
      this.validationFormEdit.controls["editSeoEmisNumber"].setValue('');
    }

  }

  // isParent() {

  //   let role = [];
  //   for (var key in this.roleSelected) {
  //     if (this.roleSelected.hasOwnProperty(key)) {
  //       //  console.log(this.selectedPeople[key].id);
  //       role.push(this.roleSelected[key].roleName);
  //     }
  //   }

  //   if (role.includes(''))
  // }
  public roleName: any = [];
  public docuTypeRole: any;
  viewRolesShowUpload(role) {
    this.roleName = false
    for (let i = 0; i < role.length; i++) {
      if (role[i].roleName.includes('PEO') || role[i].roleName.includes('DEO') || role[i].roleName.includes('SEO') || role[i].roleName.includes('DISTRICT_MONITOR') || role[i].roleName.includes('DISTRICT_OBSERVER') || role[i].roleName.includes('PROVINCIAL_MONITOR') || role[i].roleName.includes('OFFICE_BEARER') || role[i].roleName.includes('PROVINCIAL_OBSERVER') || role[i].roleName.includes('DISTRICT_ELECTORAL_TEAM') || role[i].roleName.includes('SEO') || role[i].roleName.includes('DISTRICT_MONITOR') || role[i].roleName.includes('SCHOOL_TASK_TEAM') || role[i].roleName.includes('INTER_PROVINCIAL_TASK_ TEAM'))
        this.roleName = true
      this.docuTypeRole = role[i].roleName
    }
    //alert(this.docuTypeRole)
  }


  public appointmentLetter = []
  onUpload() {
    this.activeModal.close();
    console.log('onUploadSuccess:', this.uploadEvent);
    if (this.docuTypeRole == "PEO") {
      this.selectedReport = "Provincial Electoral Officer Appointment Letter"
    } else if (this.docuTypeRole == "DEO") {
      this.selectedReport = "District Electoral Officer Appointment Letter"
    }
    else if (this.docuTypeRole == "SEO") {
      this.selectedReport = "School Electoral Officer Appointment Letter"
    }
    else if (this.docuTypeRole == "DISTRICT_MONITOR") {
      this.selectedReport = "District Monitor Appointment Letter"
    }
    else if (this.docuTypeRole == "DISTRICT_OBSERVER") {
      this.selectedReport = "District Observer Appointment Letter"
    }
    else if (this.docuTypeRole == "PROVINCIAL_MONITOR") {
      this.selectedReport = "Provincial Monitor Appointment Letter"
    }
    else if (this.docuTypeRole == "PROVINCIAL_OBSERVER") {
      this.selectedReport = "Provincial Observer Appointment Letter"
    }
    else if (this.docuTypeRole == "DISTRICT_ELECTORAL_TEAM") {
      this.selectedReport = "Provincial Electoral Team Appointment Letter"
    }
    else if (this.docuTypeRole == "SCHOOL_TASK_TEAM") {
      this.selectedReport = "School Task Team Appointment Letter"
    }
    else if (this.docuTypeRole == "INTER_PROVINCIAL_TASK_ TEAM") {
      this.selectedReport = "Inter Provincial Task Team Appointment Letter"
    }



    this.newDocs = {
      "title": this.selectedReport,
      "documentTypeId": 4,
      "documentPath": this.docPath,
      "uploadedBy": this.appService.getLoggedInUserId(),
      "emisCode": this.emisNumber,
      "schoolName": this.schoolname,
      "districtCode": this.districtCode,
      "districtName": this.districtName,
      "reportType": this.selectedReport
    }
    this.appointmentLetter.push(this.newDocs)
    console.log(JSON.stringify(this.newDocs))
    //alert(JSON.stringify(this.newDocs))

  }

  // confirm() {
  //   this.userId = "12345623";
  //   this.userservice.WelcomEmail(this.userId).subscribe(res => {
  //     console.log("Email Sent")
  //   });
  // }

  // confirmSms() {
  //   this.userId = "598";
  //   this.userservice.welcomeSms(this.userId).subscribe(res => {
  //     console.log("sms Sent")
  //   });

  // }


  DeactivaStatus(UserId, firstName, surname, persal) {
    console.log(UserId);
    this.userId = UserId;
    this.firstname = firstName;
    this.surname = surname;
    this.persal = persal;
    console.log(this.userId);

    this.UserActive = "Deactive";
    Swal.fire({


      title: 'Are you sure you want to Deactived ' + " " + this.firstname + " " + this.surname + " " + " With  User Name " + this.persal,
      text: 'A user will be Deactived',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'




    }).
      then((result) => {
        if (result.value) {
          this.userservice.UpdateStatus(this.userId, this.UserActive).subscribe(res => {


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: this.firstname + ' has been successfully  Deactivated',

              icon: 'success'
            }).then(result => {
              this.modalService.dismissAll();
              if (result.value || result.isDismissed) {
                window.location.reload()
              }
            });
          }, err => {
            console.log(err);
          })
        }
      });


  }

  ActivateStatus(UserId, firstName, surname, persal) {
    console.log(UserId);
    this.userId = UserId;
    this.firstname = firstName;
    this.surname = surname;
    this.persal = persal;

    this.UserActive = "Active";



    Swal.fire({


      title: 'Are you sure you want to  Activate save user' + "  " + this.firstname + " " + this.surname + " " + " With  User Name  " + this.persal,
      text: 'A user will be Activated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'




    }).
      then((result) => {
        if (result.value) {
          this.userservice.UpdateStatus(this.userId, this.UserActive).subscribe(res => {


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: this.firstname + ' has been successfully Activated',

              icon: 'success'
            }).then(result => {
              this.modalService.dismissAll();
              if (result.value || result.isDismissed) {
                window.location.reload()
              }
            });
          }, err => {
            console.log(err);
          })
        }
      });


  }
  //NEW SUBMIT BUTTON Lelouw

  getFormValidationErrors() {

    // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.validationForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.validationForm.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }

  submit() {
    // this.getFormValidationErrors();
    // console.log(this.validationForm);
    let isValid = false;


    if (this.validationForm.valid && this.userType == "NonGDE" ||
      this.validationForm.valid && this.userType == "GDE" && this.isPersalValid(this.persal)) {
      isValid = true
    }



    if (isValid) {


      Swal.fire({
        title: 'Are you sure you want to new save user',
        text: 'A user will be Created',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).then((result) => {
        if (result.value) {

          this.isLoading = true;

          let districtcode = null;
          let districtname = null;
          let emiscode = null;
          let schoolname = null;

          let branch = this.getDropdownValue(this.Branch, 'name')
          let cheifdir = this.getDropdownValue(this.ChiefDirectorate, 'name')
          let dir = this.getDropdownValue(this.Directorate, 'name')
          let subdir = this.getDropdownValue(this.SubDirectorate, 'name')


          if (this.selectedSchoolName) {
            schoolname = this.selectedSchoolName;
            let school = this.allDistrictSchools.filter(function (data) {
              return schoolname == data.institutionName;
            });

            emiscode = school[0].emisNumber.toString()

          }

          if (this.districtName) {

            districtname = this.districtName;
            let district = this.allDistrictSchools.filter(function (data) {
              return districtname == data.districtName;
            });

            districtcode = district[0].districtCode

          }

          //nompumeleo
          let data = {
            "citizenship": this.nationality,
            "persal": this.persal,
            "idNumber": this.idnumber,
            "firstName": this.firstname,
            "surname": this.surname,
            "gender": this.gender,
            "houseNumber": this.House,
            "complexName": this.complex,
            "streetName": this.street,
            "section": this.section,
            "city": this.city,
            "cell": this.cellNumber,
            "email": this.emailAddress,
            // "password": "pa@s" + this.cellNumber,
            "userActive": "Active",
            "position": this.position,
            "officeLevel": this.officelevel,
            "schoolName": schoolname,
            "businessUnit": this.region,
            "Passport": this.passport,
            "userType": this.userType,
            "emisNumber": emiscode,
            "districtCode": districtcode,
            "informalSettlement": "yes",
            "districtName": districtname,
            "directorate": dir,
            "subDirectorate": subdir,
            "branch": branch,
            "chiefDirectorate": cheifdir,
            "Region": this.region,
            "Roletype": this.roletype,
            "username": this.userName
          };

          ///Nompumelelo
          console.log(data)
          this.userservice.AddUser(data).subscribe(userid => {
            console.log(userid);
            let id = userid;
            this.userId = userid;

            // if (this.passport != null && this.persal != null) {
            //   this.userId = this.persal;
            //   console.log("persal as UserId" + this.userId);
            // }
            // if (this.persal != null && this.idNumber != null) {
            //   this.userId = this.persal;
            //   console.log("persal as UserId" + this.userId);
            // }
            // if (this.passport != null && this.persal == null) {
            //   this.userId = this.passport;
            //   console.log("passport as UserId" + this.userId);
            // }
            // if (this.persal == null && this.idNumber != null) {
            //   this.userId = this.idNumber;
            //   console.log("idNumber as UserId" + this.userId);
            // }

            console.log(this.userId);
            this.userservice.generatePasswordById(id).subscribe((password: any) => {

              this.userId = password

              this.userservice.WelcomEmail(id, password).subscribe(() => { });

              this.userservice.welcomeSms(id, password).subscribe(() => { });

              this.isLoading = false;
              Swal.fire({
                title: "Successful",
                text: 'User has been successfully created',
                icon: 'success'
              }).then(result => {
                if (result.value || result.isDismissed) {
                  window.location.reload()
                  // this.data.push(loginUser)
                  this.modalService.dismissAll();
                }
              });


            }, err => {
              console.log(err);
              // this.isLoading = false;

              if (err.status < 300) {
                console.log(err.error.text);
                let password = err.error.text;

                this.userservice.WelcomEmail(id, password).subscribe(() => { });

                this.userservice.welcomeSms(id, password).subscribe(() => { });

                this.isLoading = false;
                Swal.fire({
                  title: "Successful",
                  text: 'User has been successfully created',
                  icon: 'success'
                }).then(result => {
                  if (result.value || result.isDismissed) {
                    window.location.reload()
                    this.modalService.dismissAll();
                  }
                });


              }
            })


          }, err => {
            console.log(err);
            this.isLoading = false;
          })



        }
      })
    }


    this.isCreateFormSubmitted = true;

  }

  ///END OF SUBMIT BUTTON Lelouw
  //Cancell BUtoon
  CancelForm() {
    this.validationForm.reset();
    this.validatioUpdateForm.reset();
    this.modalService.dismissAll();

  }

  ///New Update Lelouw
  openEditModel4(content, i) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      this.activateValidation = false;
    }).catch((res) => { });

    console.log(this.data[i])
    this.selectedUser = this.data[i];
    this.activateValidation = false;
    this.setUpdateForm(this.selectedUser);

    this.execCount = 0;

    this.validateRoleId(this.updateRoletype)

    if (!this.isAdmin) {

      this.validatioUpdateForm.controls["updateRoletype"].disable()
      this.validatioUpdateForm.controls["updateRegion"].clearValidators();
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].clearValidators();
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateBranch"].clearValidators();
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity()

      if (this.data[i].officeLevel == "Head Office") {
        let direct = this.appService.getLoggedInUserDirectorate();
        let officelevel = this.appService.getLoggedInUserOfficeLevel();

        let dir = this.allDirectorate.filter(function (directorate) {
          return directorate.directorateName == direct;
        });



        // this.chiefDirectorates = this.allChiefDirectorate.filter(function (directorate) {
        //   return directorate.branchId == branch[0].branchId;
        // });

        // this.directorates = this.allDirectorate.filter(function (directorate) {
        //   return directorate.chiefDirectorateId == chief[0].id;
        // });

        let sub = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });

        this.subDirectorates = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });
                // let chief = this.allChiefDirectorate.filter(function (directorate) {
        //   return directorate.chiefDirectorateName == user.chiefDirectorate;
        // });

        // let branch = this.allBranches.filter(function (directorate) {
        //   return directorate.branchName == user.branch;
        // });


        this.positions = this.allPosition.filter(function (position) {
          return position.officelevel == officelevel;
        });


        console.log(this.subDirectorates)
        // this.subDirectorates = sub

        this.updateSubDirectorate = sub[0].id + "#;" + sub[0].subDirectorateName;

      }

    }


    if (!this.updateNationality) {
      this.validatioUpdateForm.controls["updateIdnumber"].disable();
    }



  }

  ///update button

  updateUserInfo() {
    // this.getFormValidationErrors();

    let isValid = false;
    console.log(this.validatioUpdateForm)


    if (this.validatioUpdateForm.valid && this.updateUserType == "NonGDE" ||
      this.validatioUpdateForm.valid && this.updateUserType == "GDE" && this.isPersalValid(this.updatePersal)) {
      isValid = true
    }


    if (isValid || this.validatioUpdateForm.valid) {

      Swal.fire({
        title: 'Are you sure you want to updated user',
        text: 'A user Info will be updated',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            // let loginUser = {
            //   citizenship: this.nationality,
            //   persal: this.persal,
            //   idNumber: this.idnumber,
            //   firstName: this.firstname,
            //   surname: this.surname,
            //   gender: this.gender,
            //   houseNumber: this.House,
            //   complexName: this.complex,
            //   streetName: this.street,
            //   suburb: "Suburb",
            //   section: this.section,
            //   city: this.city,
            //   cell: this.cellNumber,
            //   email: this.emailAddress,
            //   password: this.password,
            //   userActive: "Active",
            //   position: this.position,
            //   officeLevel: this.officelevel,
            //   schoolName: this.selectedSchoolName,
            //   businessUnit: this.region,
            //   Passport: this.passport,
            //   updateUserType: this.userType,
            //   username: this.userName,

            //   "informalSettlement": "informalSettlement ",



            //   "districtName": this.districtName,
            //   //"circuit": circuit,
            //   // "cluster": cluster,
            //   "directorate": this.Directorate,
            //   "subDirectorate": this.SubDirectorate,

            //   "branch": this.Branch,
            //   "chiefDirectorate": this.ChiefDirectorate,
            //   "Region": this.region,
            //   Roletype: this.roletype
            // };

            let schoolname
            let districtcode
            let emicode
            let districtname
            this.isLoading = true;

            let branch = this.getDropdownValue(this.updateBranch, 'name')
            let cheifdir = this.getDropdownValue(this.updateChiefDirectorate, 'name')
            let dir = this.getDropdownValue(this.updateDirectorate, 'name')
            let subdir = this.getDropdownValue(this.updateSubDirectorate, 'name')

            let data = {
              "branch": branch,
              "businessUnit": this.Businessunit,
              "cell": this.updateCellNumber,
              "chiefDirectorate": cheifdir,
              "circuit": this.circuit,
              "citizenship": this.updateNationality,
              "city": this.selectedUser.city,
              "cluster": this.cluster,
              "comment": this.selectedUser.comment,
              "complexName": this.selectedUser.complexName,
              "directorate": dir,
              "districtCode": this.selectedUser.districtCode,// districtcode,
              "districtName": this.selectedUser.districtName,// districtname,
              "email": this.updateEmailAddress,
              "emisNumber": this.selectedUser.emisNumber,//emicode,
              "firstName": this.updateFirstname,
              "gender": this.updateGender,
              "houseNumber": this.selectedUser.houseNumber,
              "idNumber": this.updateIdnumber,
              "informalSettlement": this.selectedUser.informalSettlement,
              "officeLevel": this.updateOfficelevel,
              "passport": this.updatePassport,
              "persal": this.updatePersal,
              "position": this.updatePosition,
              "region": this.updateRegion,
              "roletype": this.updateRoletype,
              "schoolName": this.selectedUser.schoolName,//schoolname,
              "section": this.selectedUser.section,
              "streetName": this.selectedUser.streetName,
              "subDirectorate": subdir,
              "suburb": this.selectedUser.suburb,
              "surname": this.updateSurname,
              "userActive": this.selectedUser.userActive,
              "userId": this.selectedUser.userId,
              "userType": this.updateUserType,
              "username": this.updateUserName
            }

            console.log(data);

            this.userservice.updateUser(data).subscribe(res => {
              console.log(res);

              this.isLoading = false;
              Swal.fire({
                title: "Successful",
                text: 'User has been successfully updated',
                icon: 'success'
              }).then(result => {
                // this.validatioUpdateForm.reset();
                if (result.value || result.isDismissed) {
                  window.location.reload()
                  this.modalService.dismissAll();
                }
              });



            }, err => {
              console.log(err)
              this.isLoading = false;
              Swal.fire(
                'Error!',
                'We apologize there was a problem with saving you updates, please try again.',
                'error'
              )
            });
            ///Nompumelelo


          }
        })
    }

    this.isEditFormSubmitted = true;
  }



  //admin checkbox
  isAdminSelected: boolean;
  selectAdmin(admin) {
    this.other = admin;
    console.log(this.other);
    //console.log('slected admin ', e);
    this.position = "System Administrator";
    if (this.officelevel == 'District' && admin == true) {
      this.validationForm.controls["region"].setValidators([Validators.required]);
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].setValidators([Validators.required]);
      this.validationForm.controls["districtName"].updateValueAndValidity();

      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";

    } else if (this.officelevel == 'Head ' && admin == true) {

    }



    if (this.other == false) {

      this.validationForm.controls.other.setValue(false);

      this.validationForm.controls["Branch"].clearValidators();

      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].clearValidators();
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["Directorate"].clearValidators();
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].clearValidators();
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
      this.validationForm.controls["region"].clearValidators();
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].clearValidators();
      this.validationForm.controls["districtName"].updateValueAndValidity();
      this.validationForm.controls["selectedSchoolName"].clearValidators();
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();
      this.validationForm.controls["persal"].clearValidators();
      this.validationForm.controls["persal"].updateValueAndValidity();
      this.validationForm.controls["passport"].clearValidators();
      this.validationForm.controls["passport"].updateValueAndValidity();
      this.validationForm.controls["position"].setValidators([Validators.required]);
      this.validationForm.controls["position"].updateValueAndValidity();
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.districtName = "";
      this.region = "";
      this.selectedSchoolName = null;
      this.position = "";


    }

    //this.createForm.validator.reset();
  }

  selectOther(e) {
    console.log('slected other ', e);
    if (e.target.checked) {
      this.validationForm.controls.admin.setValue(false);


    }
  }
  setVlidators(other) {

  }

  //validate unique
  unique(persal) {
    let filtered;

    filtered = this.data.filter(function (e) {
      return [persal] == (e.persal)
    });

    if (filtered.length > 0) {
      this.uniquPersal = true;


    } else {
      this.uniquPersal = false;

    }
  }
  ///unique ID
  uniqueId(idNumber) {
    let filtered;

    filtered = this.data.filter(function (e) {
      return [idNumber] == (e.idNumber)
    });

    if (filtered.length > 0) {
      this.uniqueIds = true;
      /*  Swal.fire(
          'Confirmation!',
          'Handover Checklist saved.',
          'success'
        )*/

    } else {
      this.uniqueIds == false;

    }


  }
  ///UNIQUE Pass
  uniquepass(passport) {
    let filtered;

    filtered = this.data.filter(function (e) {
      return [passport] == (e.passport)
    });

    if (filtered.length > 0) {
      this.uniquePass = true;
      /*  Swal.fire(
          'Confirmation!',
          'Handover Checklist saved.',
          'success'
        )*/

    } else {
      this.uniquePass == false;

    }


  }
  ///unique Cell
  uniqueCell(cellNumber) {
    let filtered;

    filtered = this.data.filter(function (e) {
      return [cellNumber] == (e.cell)
    });

    if (filtered.length > 0) {
      this.uniqueCellNumber = true;
      /*  Swal.fire(
          'Confirmation!',
          'Handover Checklist saved.',
          'success'
        )*/

    } else {
      this.uniqueCellNumber == false;

    }


  }
  //Unique email
  uniqueemail(emailAddress) {
    let filtered;

    filtered = this.data.filter(function (e) {
      return [emailAddress] == (e.email)
    });

    if (filtered.length > 0) {
      this.uniqueMailAdress = true;
      /*  Swal.fire(
          'Confirmation!',
          'Handover Checklist saved.',
          'success'
        )*/

    } else {
      this.uniqueMailAdress == false;

    }


  }
  ///roletype radio button
  AdminRole(roletype) {

    this.Branch = "";
    this.ChiefDirectorate = "";
    this.chiefDirectorates = [];
    this.Directorate = "";
    this.directorates = [];
    this.SubDirectorate = "";
    // this.subDirectorates = [];
    this.districtName = "";
    this.region = "";
    this.position = "";
    this.positions = [];
    // this.positionList = [];
    this.selectedSchoolName = null;
    // this.roletype = roletype;

    if (this.appService.getLoggedInUserOfficeLevel() == "Head Office" && this.officelevel == 'Head Office') {
      roletype = "otherRole";
      this.roletype = "otherRole";
      this.validationForm.controls["roletype"].disable();
    } else {

      this.validationForm.controls["roletype"].enable();
    }


    if (roletype == 'otherRole' && this.officelevel == 'Head Office') {
      this.validationForm.controls["Branch"].setValidators([Validators.required]);
      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].setValidators([Validators.required]);
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["Directorate"].setValidators([Validators.required]);
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].setValidators([Validators.required]);
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
      this.validationForm.controls["position"].setValidators([Validators.required]);
      this.validationForm.controls["position"].updateValueAndValidity();

      ///clear
      this.validationForm.controls["region"].clearValidators();
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].clearValidators();
      this.validationForm.controls["districtName"].updateValueAndValidity();
      this.validationForm.controls["selectedSchoolName"].clearValidators();
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();

      ///clear values
      this.districtName = "";
      this.region = "";
      this.selectedSchoolName = null;

    } else if (roletype == 'admin' && this.officelevel == 'Head Office') {

      ///clear
      this.validationForm.controls["region"].clearValidators();
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].clearValidators();
      this.validationForm.controls["districtName"].updateValueAndValidity();
      this.validationForm.controls["selectedSchoolName"].clearValidators();
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();
      this.validationForm.controls["Branch"].clearValidators();
      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].clearValidators();
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["Directorate"].clearValidators();
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].clearValidators();
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();


      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.districtName = "";
      this.region = "";
      this.selectedSchoolName = null;
      this.position = "System Administrator";


    } else if (roletype == 'otherRole' && this.officelevel == 'District') {

      //set
      // this.validationForm.controls["Directorate"].setValidators([Validators.required]);
      // this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].setValidators([Validators.required]);
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
      this.validationForm.controls["region"].setValidators([Validators.required]);
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].setValidators([Validators.required]);
      this.validationForm.controls["districtName"].updateValueAndValidity();

      //clear
      this.validationForm.controls["Directorate"].clearValidators();
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["Branch"].clearValidators();
      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].clearValidators();
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["selectedSchoolName"].clearValidators();
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();

      //clearvalue    
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.selectedSchoolName = null;


    } else if (roletype == 'admin' && this.officelevel == 'District') { //set

      this.validationForm.controls["region"].setValidators([Validators.required]);
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].setValidators([Validators.required]);
      this.validationForm.controls["districtName"].updateValueAndValidity();

      //clear 
      this.validationForm.controls["selectedSchoolName"].clearValidators();
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();
      this.validationForm.controls["Branch"].clearValidators();
      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].clearValidators();
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["Directorate"].clearValidators();
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].clearValidators();
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();

      //clear vlaue
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.selectedSchoolName = null;
      this.position = "System Administrator";

    } else {

      //set
      this.validationForm.controls["region"].setValidators([Validators.required]);
      this.validationForm.controls["region"].updateValueAndValidity();
      this.validationForm.controls["districtName"].setValidators([Validators.required]);
      this.validationForm.controls["districtName"].updateValueAndValidity();
      this.validationForm.controls["selectedSchoolName"].setValidators([Validators.required]);
      this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();

      //clear
      this.validationForm.controls["Branch"].clearValidators();
      this.validationForm.controls["Branch"].updateValueAndValidity();
      this.validationForm.controls["ChiefDirectorate"].clearValidators();
      this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
      this.validationForm.controls["Directorate"].clearValidators();
      this.validationForm.controls["Directorate"].updateValueAndValidity();
      this.validationForm.controls["SubDirectorate"].clearValidators();
      this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
      this.validationForm.controls["roletype"].clearValidators();
      this.validationForm.controls["roletype"].updateValueAndValidity();

      //clearValues
      this.Branch = "";
      this.ChiefDirectorate = "";
      this.Directorate = "";
      this.SubDirectorate = "";
      this.region = "";
      this.position = "";
      this.roletype = "";
    }


  }

  validateRoleId(roletype) {

    // console.log("COUMTING: " + this.execCount)
    if (this.execCount >= 1) {
      this.updateBranch = "";
      this.updateChiefDirectorate = "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateDistrictName = "";
      this.updateRegion = "";
      this.updatePosition = "";
      this.updateSelectedSchool = null;

      this.chiefDirectorates = [];
      this.directorates = [];
      // this.subDirectorates = [];
      this.positionList = [];

      if (this.appService.getLoggedInUserOfficeLevel() == "Head Office" && this.officelevel == 'Head Office') {
        roletype = "otherRole";
        this.updateRoletype = "otherRole";
        this.validatioUpdateForm.controls["updateRoletype"].disable();
      } else {
        this.validatioUpdateForm.controls["updateRoletype"].enable();
      }

    }
    this.execCount = this.execCount + 1;



    if (roletype == 'otherRole' && this.updateOfficelevel == 'Head Office') {
      this.validatioUpdateForm.controls["updateBranch"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDirectorate"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSubDirectorate"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

      ///clear
      this.validatioUpdateForm.controls["updateRegion"].clearValidators();
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].clearValidators();
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSelectedSchool"].clearValidators();
      this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();

      ///clear values
      this.updateDistrictName = "";
      this.updateRegion = "";
      this.updateSelectedSchool = null;;

    } else if (roletype == 'admin' && this.updateOfficelevel == 'Head Office') {

      ///clear
      this.validatioUpdateForm.controls["updateRegion"].clearValidators();
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].clearValidators();
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateBranch"].clearValidators();
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSubDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].clearValidators();
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSelectedSchool"].clearValidators();
      this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();

      this.updateBranch = "";
      this.updateChiefDirectorate = "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateDistrictName = "";
      this.updateRegion = "";
      this.updateSelectedSchool = null;;
      this.updatePosition = "System Administrator";


    } else if (roletype == 'otherRole' && this.updateOfficelevel == 'District') {

      //set
      this.validatioUpdateForm.controls["updateDirectorate"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSubDirectorate"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateRegion"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

      //clear
      this.validatioUpdateForm.controls["updateBranch"].clearValidators();
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSelectedSchool"].clearValidators();
      this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();

      //clearvalue    
      this.updateBranch = "";
      this.updateChiefDirectorate = "";
      this.updateSelectedSchool = null;;


    } else if (roletype == 'admin' && this.updateOfficelevel == 'District') { //set

      this.validatioUpdateForm.controls["updateRegion"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();

      //clear
      this.validatioUpdateForm.controls["updateSelectedSchool"].clearValidators();
      this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateBranch"].clearValidators();
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSubDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].clearValidators();
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

      //clear vlaue
      this.updateBranch = "";
      this.updateChiefDirectorate = "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateSelectedSchool = null;;
      this.updatePosition = "System Administrator";

    } else if (this.updateOfficelevel == 'School') {
      //set
      this.validatioUpdateForm.controls["updateRegion"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDistrictName"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSelectedSchool"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

      //clear
      this.validatioUpdateForm.controls["updateBranch"].clearValidators();
      this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateSubDirectorate"].clearValidators();
      this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateRoletype"].clearValidators();
      this.validatioUpdateForm.controls["updateRoletype"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePosition"].clearValidators();
      this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

      //clearValues
      this.updateBranch = "";
      this.updateChiefDirectorate = "";
      this.updateDirectorate = "";
      this.updateSubDirectorate = "";
      this.updateRegion = "";
      this.updatePosition = "";
      this.updateRoletype = "";
    } else {
      {
        //set
        // this.validatioUpdateForm.controls["updateRegion"].setValidators([Validators.required]);
        // this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
        // this.validatioUpdateForm.controls["updateDistrictName"].setValidators([Validators.required]);
        // this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
        // this.validatioUpdateForm.controls["updateSelectedSchool"].setValidators([Validators.required]);
        // this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();
        // this.validatioUpdateForm.controls["updatePosition"].setValidators([Validators.required]);
        // this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

        //clear
        this.validatioUpdateForm.controls["updateRegion"].clearValidators();
        this.validatioUpdateForm.controls["updateRegion"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateBranch"].clearValidators();
        this.validatioUpdateForm.controls["updateBranch"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateDistrictName"].clearValidators();
        this.validatioUpdateForm.controls["updateDistrictName"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateSelectedSchool"].clearValidators();
        this.validatioUpdateForm.controls["updateSelectedSchool"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updatePosition"].clearValidators();
        this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateChiefDirectorate"].clearValidators();
        this.validatioUpdateForm.controls["updateChiefDirectorate"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateDirectorate"].clearValidators();
        this.validatioUpdateForm.controls["updateDirectorate"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateSubDirectorate"].clearValidators();
        this.validatioUpdateForm.controls["updateSubDirectorate"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updateRoletype"].clearValidators();
        this.validatioUpdateForm.controls["updateRoletype"].updateValueAndValidity();
        this.validatioUpdateForm.controls["updatePosition"].clearValidators();
        this.validatioUpdateForm.controls["updatePosition"].updateValueAndValidity();

        //clearValues
        this.updateBranch = "";
        this.updateChiefDirectorate = "";
        this.updateDirectorate = "";
        this.updateSubDirectorate = "";
        this.updateRegion = "";
        this.updatePosition = "";
        this.updateRoletype = "";
      }
    }

    // this.execCount = true;
    console.log(roletype)

    if (!this.activateValidation) {
      this.setUpdateForm(this.selectedUser)
    }


  }

  //clearRoles
  clearRole() {
    this.roletype = "";
  }

  //UserName
  UserName(flag) {

    if (flag == "create") {

      if (this.userType == 'GDE') {
        this.userName = this.persal;
        console.log("username is", this.persal)
      } else if (this.userType == 'NonGDE') {
        this.userName = this.nationality == "Non South African" ? this.passport : this.idnumber;

      }

    } else if (flag == "update") {

      if (this.updateUserType == 'GDE') {
        this.updateUserName = this.updatePersal;

      } else if (this.updateUserType == 'NonGDE') {
        this.updateUserName = this.updateNationality == "Non South African" ? this.updatePassport : this.updateIdnumber;

      }

    }

  }

  //clearPersal
  clearPersalNumber(userType) {
    // this.persal = "";
    // this.userName = "";


    if (userType == "NonGDE") {
      this.persal = "";
    }
    userType = null;


    if (userType == "NonGDE") {

      this.validationForm.controls["persal"].clearValidators();
      this.validationForm.controls["persal"].updateValueAndValidity();
      this.persal = "";
      this.userName = "";

    } else if (userType == "GDE") {

      this.validationForm.controls["persal"].setValidators([Validators.required]);
      this.validationForm.controls["persal"].updateValueAndValidity();
      this.userName = "";
    }

    this.getUsername("create");
    this.getUsername("update");
  }


  clearUpdatePersalNumber(userType) {
    // this.persal = "";
    // this.userName = "";


    if (userType == "NonGDE") {
      this.updatePersal = "";
    }
    userType = null;


    if (userType == "NonGDE") {

      this.validatioUpdateForm.controls["updatePersal"].clearValidators();
      this.validatioUpdateForm.controls["updatePersal"].updateValueAndValidity();
      this.updatePersal = "";
      this.userName = "";

    } else if (userType == "GDE") {

      this.validatioUpdateForm.controls["updatePersal"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updatePersal"].updateValueAndValidity();
      this.userName = "";
    }

    this.getUsername("update");
  }

  //clear Passport and Id Number
  resetNationality(nationality) {
    // this.passport = "";
    // this.idnumber = "";
    if (nationality == "South African") {

      this.validationForm.controls["idnumber"].setValidators([Validators.required]);
      this.validationForm.controls["idnumber"].updateValueAndValidity();
      this.validationForm.controls["passport"].clearValidators();
      this.validationForm.controls["passport"].updateValueAndValidity();
      this.passport = "";

    } else if (nationality == "Non South African") {
      this.validationForm.controls["passport"].setValidators([Validators.required]);
      this.validationForm.controls["passport"].updateValueAndValidity();
      this.validationForm.controls["idnumber"].clearValidators();
      this.validationForm.controls["idnumber"].updateValueAndValidity();
      this.idnumber = "";

    }

    this.validationForm.controls["idnumber"].enable();

    this.getUsername("create");

  }

  resetupdateNationality(nationality) {

    if (nationality == "South African") {

      this.validatioUpdateForm.controls["updateIdnumber"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updateIdnumber"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updatePassport"].clearValidators();
      this.validatioUpdateForm.controls["updatePassport"].updateValueAndValidity();
      this.updatePassport = "";

    } else if (nationality == "Non South African") {
      this.validatioUpdateForm.controls["updatePassport"].setValidators([Validators.required]);
      this.validatioUpdateForm.controls["updatePassport"].updateValueAndValidity();
      this.validatioUpdateForm.controls["updateIdnumber"].clearValidators();
      this.validatioUpdateForm.controls["updateIdnumber"].updateValueAndValidity();
      this.updateIdnumber = "";

    }

    this.getUsername("create");
    this.getUsername("update");

  }
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
  //CancelClear
  clearData() {

    //this.isCreateFormSubmitted = false;
    this.validationForm.controls;

    this.validationForm.controls["persal"].clearValidators();
    this.validationForm.controls["persal"].updateValueAndValidity();
    this.validationForm.controls["Branch"].clearValidators();
    this.validationForm.controls["Branch"].updateValueAndValidity();
    this.validationForm.controls["ChiefDirectorate"].clearValidators();
    this.validationForm.controls["ChiefDirectorate"].updateValueAndValidity();
    this.validationForm.controls["Directorate"].clearValidators();
    this.validationForm.controls["Directorate"].updateValueAndValidity();
    this.validationForm.controls["SubDirectorate"].clearValidators();
    this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
    this.validationForm.controls["selectedSchoolName"].clearValidators();
    this.validationForm.controls["selectedSchoolName"].updateValueAndValidity();
    this.validationForm.controls["region"].clearValidators();
    this.validationForm.controls["region"].updateValueAndValidity();
    this.validationForm.controls["districtName"].clearValidators();
    this.validationForm.controls["districtName"].updateValueAndValidity();
    this.validationForm.controls["firstname"].clearValidators();
    this.validationForm.controls["firstname"].updateValueAndValidity();
    this.validationForm.controls["surname"].clearValidators();
    this.validationForm.controls["surname"].updateValueAndValidity();
    this.validationForm.controls["nationality"].clearValidators();
    this.validationForm.controls["nationality"].updateValueAndValidity();
    this.validationForm.controls["idnumber"].clearValidators();
    this.validationForm.controls["idnumber"].updateValueAndValidity();
    this.validationForm.controls["passport"].clearValidators();
    this.validationForm.controls["passport"].updateValueAndValidity();
    this.validationForm.controls["gender"].clearValidators();
    this.validationForm.controls["gender"].updateValueAndValidity();
    this.validationForm.controls["officelevel"].clearValidators();
    this.validationForm.controls["officelevel"].updateValueAndValidity();
    this.validationForm.controls["cellNumber"].clearValidators();
    this.validationForm.controls["cellNumber"].updateValueAndValidity();
    this.validationForm.controls["emailAddress"].clearValidators();
    this.validationForm.controls["emailAddress"].updateValueAndValidity();
    this.validationForm.controls["position"].clearValidators();
    this.validationForm.controls["position"].updateValueAndValidity();
    this.validationForm.controls["roletype"].clearValidators();
    this.validationForm.controls["roletype"].updateValueAndValidity();
    this.validationForm.controls["userType"].clearValidators();
    this.validationForm.controls["userType"].updateValueAndValidity();
    this.validationForm.controls["userName"].clearValidators();
    this.validationForm.controls["userName"].updateValueAndValidity();
    this.validationForm.controls["cellNumber"].setValue("");
    this.validationForm.controls["nationality"].setValue("");
    this.modalService.dismissAll();
    this.persal = "";
    this.userName = "";
    this.firstname = "";
    this.surname = "";
    this.nationality = "";
    this.idnumber = "";
    this.passport = "";
    this.gender = "";
    this.officelevel = "";
    this.roletype = "";
    this.userType = "";
    this.Branch = "";
    this.ChiefDirectorate = "";
    this.Directorate = "";
    this.SubDirectorate = "";

    this.position = "";
    this.cellNumber = "";
    this.emailAddress = "";
    this.selectedSchoolName = null;
    // this.validationForm.controls;



  }


  resetFlag() {
    if (this.isDuplicate) {
      this.isDuplicate = false;
    }
  }

  checkPersalDuplcate(persal) {


    if (persal) {
      if (persal.length >= 8) {
        console.log(persal)
        this.userservice.getUserByPersal(persal).subscribe((res: any) => {
          console.log(res);

          if (res) {
            this.isDuplicate = true;
          } else {
            this.isDuplicate = false;
          }

        }, err => {
          console.log(err);
          this.isDuplicate = false;
        })

        this.getUsername("create");
      }
    }
  }

  isLenthInvalid(name) {
    let isInvalid = false;

    if (name) {
      if (name.length <= 3) {
        isInvalid = true;
      }
    }

    return isInvalid;
  }

  getUsername(flag) {

    if (flag == "create") {

      if (this.userType == "GDE") {
        this.userName = this.persal;

      } else {

        if (this.nationality == "South African") {
          this.userName = this.idnumber
        } else if (this.nationality == "Non South African") {
          this.userName = this.passport
        }
      }
    } else if (flag == "update") {
      if (this.updateUserType == "GDE") {
        this.updateUserName = this.updatePersal;

      } else {

        if (this.updateNationality == "South African") {
          this.updateUserName = this.updateIdnumber
        } else if (this.updateNationality == "Non South African") {
          this.updateUserName = this.updatePassport
        }
      }
    }


  }

  isPersalValid(persal) {
    let isValid = false;

    if (persal) {
      if (persal.length == 8) {
        isValid = true;
      }
    }

    return isValid;

  }

  // updateRoleType(roletype) {
  //   console.log(roletype)
  // }

  getDistrict(districtName) {
    console.log(districtName)
  }

  getSchoolInfo(school) {
    console.log(school)
  }

  setUpdateForm(user) {
    if (user) {

      this.updateUserType = user.userType;
      this.updatePersal = user.persal;
      this.updateIdnumber = user.idNumber;
      this.updatePassport = user.passport;
      this.updateUserName = user.username;
      this.updateOfficelevel = user.officeLevel;
      this.updateRoletype = user.roletype;
      this.updateFirstname = user.firstName;
      this.updateNationality = user.citizenship;
      this.updateGender = user.gender;
      this.updateSurname = user.surname;
      this.updateRegion = user.region;
      this.updateSelectedSchool = user.schoolName;
      this.updateCellNumber = user.cell;
      this.updateEmailAddress = user.email;
      this.updateDistrictName = user.districtName;

      if (this.appService.getLoggedInUserOfficeLevel() == "Head Office" && user.officeLevel == 'Head Office') {
        this.validatioUpdateForm.controls["updateRoletype"].disable();
      } else {
        this.validatioUpdateForm.controls["updateRoletype"].enable();
      }

      if (this.isAdmin && user.officeLevel == "Head Office" && user.roletype == "otherRole") {
        let dir = this.allDirectorate.filter(function (directorate) {
          return directorate.directorateName == user.directorate;
        });

        let sub = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });

        let chief = this.allChiefDirectorate.filter(function (directorate) {
          return directorate.chiefDirectorateName == user.chiefDirectorate;
        });

        let branch = this.allBranches.filter(function (directorate) {
          return directorate.branchName == user.branch;
        });

        this.chiefDirectorates = this.allChiefDirectorate.filter(function (directorate) {
          return directorate.branchId == branch[0].branchId;
        });

        this.directorates = this.allDirectorate.filter(function (directorate) {
          return directorate.chiefDirectorateId == chief[0].id;
        });

        this.subDirectorates = this.allSubDirectorate.filter(function (directorate) {
          return directorate.directorateId == dir[0].id;
        });
        this.positionId = branch[0].id.split(",");


        this.updateBranch = branch[0].branchId + "#;" + branch[0].branchName + "#;" + branch[0].id;
        console.log(this.updateBranch)
        this.updateChiefDirectorate = chief[0].id + "#;" + chief[0].chiefDirectorateName;
        console.log(this.updateChiefDirectorate)
        this.updateDirectorate = dir[0].id + "#;" + dir[0].directorateName;
        console.log(this.updateDirectorate )
        this.updateSubDirectorate = sub[0].id + "#;" + sub[0].subDirectorateName;
        console.log(this.updateSubDirectorate)

        this.positionList = this.allPosition.filter(function (position) {
          return position.officelevel == user.officeLevel;
        });

        this.updatePosition = user.position;

        // console.log(this.positionList)
      } else {
        this.updateBranch = user.branch;
        this.updateChiefDirectorate = user.chiefDirectorate;
        this.updateDirectorate = user.directorate;
        this.updateSubDirectorate = user.subDirectorate;


        this.positionList = this.allPosition.filter(function (position) {
          return position.officelevel == user.officeLevel;
        });

        this.updatePosition = user.position;
      }



    }
  }

  setValidationFlag(flag): void {
    this.activateValidation = flag;
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

  selectBranch(branch, flag) {

    this.ChiefDirectorate = "";
    this.Directorate = "";
    this.SubDirectorate = "";
    this.position = "";
    this.updateChiefDirectorate = "";
    this.updateDirectorate = "";
    this.updateSubDirectorate = "";
    this.updatePosition = "";

    if (flag == "create" && branch) {
      this.chiefDirectorates = [];
      console.log(branch);
      let level = this.officelevel;
      let branchid = this.getDropdownValue(branch, "id");
      this.positionId = this.getDropdownValue(branch, "position").split(",");

      this.chiefDirectorates = this.allChiefDirectorate.filter(function (data) {
        return data.branchId == branchid;

      });

      this.positions = this.allPosition.filter(function (position) {
        return position.officelevel == level;
      });

    } else if (flag == "update" && branch) {
      this.chiefDirectorates = [];
      console.log(branch);
      let level = this.updateOfficelevel;

      let branchid = this.getDropdownValue(branch, "id");
      this.positionId = this.getDropdownValue(branch, "position").split(",");



      this.chiefDirectorates = this.allChiefDirectorate.filter(function (data) {
        return data.branchId == branchid;

      });

      this.positionList = this.allPosition.filter(function (position) {
        return position.officelevel == level;
      });

    }
    console.log(this.positionId)

  }

  selectupdateBranch(branch) {
    console.log(branch);
    // this.chiefDirectorates = this.allChiefDirectorate;
    let level = this.officelevel;

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

  selectChiefDirectorate(chief) {
    // this.Directorate = "";
    console.log(chief);
    this.Directorate = "";
    this.SubDirectorate = "";
    this.updateDirectorate = "";
    this.updateSubDirectorate = "";
    let flag = "create"

    if (flag == "create" && chief) {
      // this.chiefDirectorates = [];

      let chiefdirid = this.getDropdownValue(chief, "id");

      this.directorates = this.allDirectorate.filter(function (data) {
        return data.chiefDirectorateId == chiefdirid;

      });

    }

  }

  selectDirectorate(directorate) {
    this.SubDirectorate = "";
    this.updateSubDirectorate = "";
    console.log(directorate);
    // let flag = "create"

    if (directorate) {


      let dirid = this.getDropdownValue(directorate, "id");

      let arr = this.allSubDirectorate.filter(function (data) {
        return data.directorateId == dirid;

      });
      if (arr.length > 0) {
        this.subDirectorates = arr;
      }
      // console.log(this.subDirectorates)

      if (this.subDirectorates.length == 0) {
        this.validationForm.controls["SubDirectorate"].clearValidators();
        this.validationForm.controls["SubDirectorate"].updateValueAndValidity();
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
        this.validationForm.controls["updateSubDirectorate"].clearValidators();
        this.validationForm.controls["updateSubDirectorate"].updateValueAndValidity();
      }

    }

  }

  getPostionByBranch(office) {
    console.log(office)
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


}











