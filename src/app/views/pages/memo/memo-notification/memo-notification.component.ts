import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UsersService } from '../../users/users.service';
import { MemoService } from '../memo.service'
import { DatePipe } from '@angular/common'
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-memo-notification',
  templateUrl: './memo-notification.component.html',
  styleUrls: ['./memo-notification.component.scss']
})
export class MemoNotificationComponent implements OnDestroy, OnInit, AfterViewInit {

  selectedPersonId: string = null;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  public title: any;
  public startDate: any = this.toISOLocal(new Date())
  public dueDate: any;
  public todaysDate: any = this.toISOLocal(new Date())
  public todaysDatePlus1: any = new Date().setDate(new Date().getDate() + 10);
  public startTime: any;
  public endTime: any;
  public venue: any;
  public minutes: any = null;
  public scheduledBy: any;
  public people: any = [];
  public atendents: any;
  public meeting: any;
  public userinfo: any;
  public selectedPeople: any = null;
  public username = this.appservice.getIsLoggedInUsername();
  public emisCode = this.appservice.getLoggedInEmisCode();
  public selectedEmisCode: any;
  public districtCode = this.appservice.getLoggedInDistrictCode();
  public banner = {
    "title": "",
    "text": ""
  };
  public userRole = this.appservice.getLoggedInUserRole();
  public userId = this.appservice.getLoggedInUserId();
  public inviteType: any;
  public data: any;
  public schools: any;
  public selectedGroup: any;
  public districts: any;
  public selectedPeopleID: any = [];
  public show: boolean = false;
  public venuePresent: any;
  public year = new Date(this.todaysDate)
  public memoYear = this.year.getFullYear()


  editvalidationForm: FormGroup;
  isEditFormSubmitted: Boolean;
  public edittitle: any;
  public editstartDate: any;
  public editendDate: any;
  public editstartTime: any;
  public editendTime: any;
  public editvenue: any;
  public editdescription: any;
  public editminutes: any;
  public editselectedPeople: any;
  public editselectedGroup: any;
  public editmeetingDocuments: any;
  public editID: any;
  public disableSelect: boolean = true;
  public editatendents: any;
  public dtOptions2: any;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  dtTrigger: Subject<any> = new Subject<any>();
  listTrigger: Subject<any> = new Subject<any>();
  listTrigger2: Subject<any> = new Subject<any>();
  public dtOptions: DataTables.Settings = {};
  public listOptions: DataTables.Settings = {};
  public listOptions2: DataTables.Settings = {};
  id: string;

  public electioMemo: any;
  public scheduledElections: any;
  public electioMemoDetails = [];
  public recipients: any
  public memoDescrtion: any
  public memoDocuments = [];
  public editMemoDocuments = [];
  public schoolName: any;
  public schoolReceive = [];
  public completeSchoolList = [];
  public fullSchoolList = [];
  public editFullSchoolList = [];
  public description: any;


  public editDescription: any;
  public editDueDate: any;
  public editSchoolList = [];
  public currentYear = new Date();
  public currentDate: any;

  public deoEmail: any;
  public deoTelNumber: any;
  public responded: Boolean;
  public dataProgress: any;
  public selectedMemo: any;
  public memoDocument = [];
  public editMemoDocument = [];
  public selectedSchoolList = [];
  public recipientList = [];
  public showErrorMsg = false;
  public fileUUID = [];
  public deleteDocId = [];


  constructor(
    private router: Router,
    private appservice: AppService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private userservice: UsersService,
    public datepipe: DatePipe,
    public memoservice: MemoService,
    private _Activatedroute: ActivatedRoute
  ) { }

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    errorReset: null,
    addRemoveLinks: true,
    url: this.memoservice.documentUrl,//'https://httpbin.org/post', 
    maxFilesize: 50,
    acceptedFiles: 'image/*,application/*',
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  ngOnInit(): void {
    this.responded = false;
    this.currentDate = moment(this.currentYear).format('D MMMM YYYY')
    this.validationForm = this.formBuilder.group({
      dueDate: ['', Validators.required]
    })
    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editDueDate: ['', Validators.required]
    })
    this.isEditFormSubmitted = false;



    if (this.appservice.getLoggedInUserRole() == "PRINCIPAL" || this.appservice.getLoggedInEmisCode() && this.appservice.getLoggedInEmisCode() != "null" && this.appservice.getLoggedInEmisCode() != "undefined") {

      this.memoservice.getElectionsBySchool(this.appservice.getLoggedInEmisCode()).subscribe((election: any) => {
        console.log(election)
        this.scheduledElections = election;
      }, err => {
        console.log(err)
      })

      this.memoservice.getSchoolByEmisNumber(this.appservice.getLoggedInEmisCode()).subscribe((school: any) => {
        // console.log(school)
        this.schoolName = school[0].institutionName;
        this.banner = {
          "title": school[0].institutionName,
          "text": "School"
        }
        this.memoservice.getElectionMemo().subscribe((res: any) => {
          let memo = [];
          for (let x = 0; x < res.length; x++) {

            if (res[x].schoolNames) {
              let list: String = res[x].schoolNames
              if (list.includes(this.schoolName)) {
                memo.push(res[x]);
              }

            }
          }
          this.electioMemo = memo;
          this.dtTrigger.next();
        }, err => {
          console.log(err);
          this.electioMemo = [];
          this.dtTrigger.next();
        })
      }, err => {
        console.log(err)
        this.electioMemo = [];
        // this.banner = "School";

        this.banner = {
          "title": "School",
          "text": "School"
        }
        this.dtTrigger.next();
      })


    } else {


      this.memoservice.getDistrictByCode(this.appservice.getLoggedInDistrictCode()).subscribe((district: any) => {
        // console.log(district);
        // this.banner = district.districtName;
        this.banner = {
          "title": district.districtName,
          "text": "District"
        }
      }, err => {
        console.log(err);
        // this.banner = "District";
        this.banner = {
          "title": "District",
          "text": "School"
        }
      })

      let code = this.appservice.getLoggedInDistrictCode();
      this.memoservice.getElectionMemo().subscribe((res: any) => {
        console.log(res);
        // this.electioMemo = res;
        this.electioMemo = res.filter(function (e) {
          return [code].includes(e.districtCode);
        });
        this.dtTrigger.next();
      }, err => {
        console.log(err);
      })




      this.memoservice.getDistrictUsers(this.appservice.getLoggedInDistrictCode(), "PRINCIPAL").subscribe((users: any) => {
        // console.log(users)

        this.memoservice.getSchoolsByDistrict(this.appservice.getLoggedInDistrictCode()).subscribe((schools: any) => {
          console.log(schools);
          for (let x = 0; x < schools.length; x++) {
            let principal = null;
            let Fullname = null;

            for (let y = 0; y < users.length; y++) {
              if (schools[x].emisCode == users[y].emisNumber) {
                principal = users[y].id;
                Fullname = users[y].firstname + " " + users[y].surname;
                // console.log(principal, users[y].emisNumber)
                break;
              }
            }
            // console.log(principal)
            let data = {
              "id": x,
              "emisCode": schools[x].emisCode,
              "schoolName": schools[x].institutionName,
              "userId": principal,
              "principal": Fullname,
              "isSchoolInvited": true
            }
            let editData = {
              "id": x,
              "emisCode": schools[x].emisCode,
              "schoolName": schools[x].institutionName,
              "userId": principal,
              "principal": Fullname,
              "isSchoolInvited": false
            }


            this.schoolReceive.push(data);
            this.fullSchoolList.push(data);
            this.editFullSchoolList.push(editData);

          }
          // console.log(this.schoolReceive);
          // this.listTrigger.next();
          // // this.listTrigger2.next();
          // this.listOptions = {
          //   pagingType: 'full_numbers',
          //   pageLength: 10,
          //   retrieve: true,
          //   responsive: true,
          //   order: [0, 'asc']// sort table in descending order
          // };
          // console.log(this.schoolReceive)
        }, err => {
          console.log(err);
          this.fullSchoolList = [];
          this.editFullSchoolList = [];
        })
      }, err => {
        console.log(err);
        this.fullSchoolList = [];
        this.editFullSchoolList = [];
      })
    }

    this.memoservice.getUserById(this.appservice.getLoggedInUserId()).subscribe((user: any) => {
      console.log(user)
      this.deoEmail = user.emailAddress;
      this.deoTelNumber = user.cellNumber;

    }, err => {
      console.log(err);
      this.deoEmail = "";
      this.deoTelNumber = "";
    })


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      order: [[0, 'desc']]// sort table in descending order
    };


  }

  ngAfterViewInit(): void {
    // this.listTrigger2.next();
    this.listTrigger.next();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.listTrigger.unsubscribe();
    // this.listTrigger2.unsubscribe();
  }

  toISOLocal(d) {
    var z = n => ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0 ? '+' : '-';
    off = Math.abs(off);

    return d.getFullYear() + '-'
      + z(d.getMonth() + 1) + '-' +
      z(d.getDate()) + 'T' +
      z(d.getHours()) + ':' +
      z(d.getMinutes())
  }

  get createForm() {
    return this.validationForm.controls;
  }

  get editForm() {
    return this.editvalidationForm.controls;
  }

  onUploadError(event: any): void {
    console.log('Error: ', event);

  }

  onUploadSuccess(event: any, flag): void {
    console.log('Success: ', event);

    if (flag == "create") {
      this.memoDocument.push(event[1].path);
      this.fileUUID.push(event[0].upload.uuid)

    } else if (flag == "update") {
      this.editMemoDocument.push(event[1].path);
      this.fileUUID.push(event[0].upload.uuid)

    }
    // this.memoDocument.push(event[0].name); 
    // console.log(this.memoDocument)

  }


  resetDropzoneUploads(): void {
    console.log(this.directiveRef);
    if (this.directiveRef) {
      this.directiveRef.reset();
      this.memoDocument = [];
      this.editMemoDocument = [];
    }
  }


  openModal(content) {
    // console.log(this.formClosed)
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

    this.fileUUID = [];
    this.memoDocument = [];
    this.isCreateFormSubmitted = false;
    this.completeSchoolList = this.fullSchoolList;

  }

  openRowModal(content, id, flag) {
    this.dataProgress = 'loading';
    this.memoDocuments = [];
    this.editSchoolList = [];
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

    if (flag == "update") {
      this.fileUUID = [];
      this.editMemoDocument = [];
      this.memoservice.getElectionMemoById(this.electioMemo[id].id).subscribe((memo: any) => {
        console.log(memo);

        this.selectedMemo = memo;
        this.editMemoDocuments = memo.memoDocuments;
        this.deleteDocId = [];
        this.editDescription = memo.description;
        this.editDueDate = memo.dueDate;
        if (memo.schoolNames) {
          this.editSchoolList = this.editFullSchoolList;
          let schools = memo.schoolNames.split(',');
          let school = [];

          for (let x = 0; x < schools.length; x++) {
            let schoolInfo = schools[x].split(':');
            let data = {
              "emisCode": schoolInfo[0],
              "schoolName": schoolInfo[1] == "null" || schoolInfo[1] == "undefined" ? "" : schoolInfo[1],
              "principal": schoolInfo[2] == "null" ? "" : schoolInfo[2]
            }

            school.push(data);
          }

          // console.log(schoollist[x].schoolNames == schoolnames[y]);
          for (let x = 0; x < this.editSchoolList.length; x++) {

            for (let y = 0; y < school.length; y++) {

              if (this.editSchoolList[x].emisCode == school[y].emisCode) {
                this.editSchoolList[x].isSchoolInvited = true;
                break;
              }
            }

          }
          // this.editSchoolList = schoollist;
          // console.log(this.editSchoolList)
        }
        // if (this.memoDocuments.length == 0) {
        this.dataProgress = "done";

        // }

      }, err => {
        console.log(err);
        this.dataProgress = "done";;
      })
    } else if (flag == "document") {
      this.memoservice.getElectionMemoById(id).subscribe((memo: any) => {
        console.log(memo);

        this.memoDocuments = memo.memoDocuments;
        // if (this.memoDocuments.length == 0) {
        this.dataProgress = "done";

        // }

      }, err => {
        console.log(err);
        this.dataProgress = "done";
      })
    } else if (flag == "recipient") {
      console.log(this.electioMemo[id]);
      this.recipientList = [];

      if (this.electioMemo[id].schoolNames) {
        let schools = this.electioMemo[id].schoolNames.split(',');

        for (let x = 0; x < schools.length; x++) {
          let schoolInfo = schools[x].split(':');
          let data = {
            "emisCode": schoolInfo[0],
            "schoolName": schoolInfo[1] == "null" || schoolInfo[1] == "undefined" ? "" : schoolInfo[1],
            "principal": schoolInfo[2] == "null" ? "" : schoolInfo[2],
          }

          this.recipientList.push(data)
        }


        // console.log(this.recipientList)
      }


      // let list = this.electioMemo[id].schoolNames.split(',');

      // "emisCode": schools[x].emisCode,
      // "schoolName": schools[x].institutionName,
      // "userId": principal,
      // "principal": Fullname,
      // for (let x = 0; x < list.length; x++) {
      //   let obj = list[x].split(':');
      //   let data = {
      //     "emiscode": obj[0],
      //     "schoolName": obj[1]
      //   }
      //   this.recipientList.push(data)
      // }

      this.dataProgress = "done";

    } else if (flag == "description") {
      console.log(this.electioMemo[id]);
      this.memoDescrtion = this.electioMemo[id].description;
      this.dataProgress = "done";
    }


  }


  Cancel(flag) {

    if (flag == "create") {
      this.modalService.dismissAll();
    } else if (flag == "update") {
      this.modalService.dismissAll();
    }

  }


  createElectionMemo() {
    this.showErrorMsg = false;

    let schoolList = [];
    let userId = [];
 ///////////////////////////////////////////////////////////////////////////   
    let duedate = moment(this.dueDate).format('DD MMMM yyyy')
    let subject = "Memo for the " + moment(new Date()).format('YYYY') + " election";

    this.memoservice.sendMemoNotification(16, duedate, moment(new Date()).format('YYYY'),
      this.appservice.getIsLoggedInUsername(), subject, moment(new Date()).format('DD MMMM yyyy'),
      this.deoTelNumber, this.deoEmail, this.banner.title).subscribe(() => {
        console.log("sent")
      }, err => {
        console.log(err);
      })
///////////////////////////////////////////////////////////////////////
    for (let x = 0; x < this.completeSchoolList.length; x++) {

      if (this.completeSchoolList[x].isSchoolInvited) {

        let data = this.completeSchoolList[x].emisCode + ":" + this.completeSchoolList[x].schoolName + ":" + this.completeSchoolList[x].principal

        schoolList.push(data);
        if (this.completeSchoolList[x].userId && this.completeSchoolList[x].userId != null) {
          userId.push(this.completeSchoolList[x].userId)
        }
      }

    }
    this.selectedSchoolList = schoolList;
    this.showErrorMsg = true;
    // console.log(userId)
    // console.log(this.completeSchoolList)
    // console.log(schoolList)
    // console.log(schoolList.toString())

    if (this.validationForm.valid && this.memoDocument.length > 0 && schoolList.length > 0) {
      Swal.fire({
        title: 'Send Memo?',
        text: 'Your memo will be sent to all the selected schools',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {


          let description = $("textarea").val();
          let schoolName = schoolList.toString();


          let electionMemo = {
            "id": 0,
            "description": description,
            "dueDate": this.dueDate,
            "schoolNames": schoolName,
            "districtCode": this.appservice.getLoggedInDistrictCode(),
            "submittedBy": parseInt(this.appservice.getLoggedInUserId()),
            "documents": this.memoDocument.toString()
          }



          console.log(JSON.stringify(electionMemo));
          this.memoservice.createMemo(electionMemo).subscribe((memoId: any) => {
            console.log(memoId)
            let duedate = moment(this.dueDate).format('DD MMMM yyyy')
            let subject = "Memo for the " + moment(new Date()).format('YYYY') + " election";

            this.memoservice.sendMemoNotification(memoId, duedate, moment(new Date()).format('YYYY'),
              this.appservice.getIsLoggedInUsername(), subject, moment(new Date()).format('DD MMMM yyyy'),
              this.deoTelNumber, this.deoEmail, this.banner.title).subscribe(mail => {
                console.log(mail)
              }, err => {
                console.log(err);
              })

            this.memoservice.addAttendees(memoId, userId).subscribe((res: any) => {
              console.log(res)
              Swal.fire(
                'Success',
                'Election memo saved successfully and sent to all the selected schools',
                'success'
              ).then((confirmed) => {
                if (confirmed.value || confirmed.isDismissed) {
                  location.reload();
                  this.modalService.dismissAll();
                }
              })
            }, err => {
              console.log(err)
              Swal.fire(
                'Success',
                'Election memo saved successfully and sent to all the schools',
                'success'
              ).then((confirmed) => {
                if (confirmed.value || confirmed.isDismissed) {
                  location.reload();
                  this.modalService.dismissAll();
                }
              })
            })
          }, err => {
            console.log(err);
            Swal.fire(
              'Error!',
              'Your entry was unsuccessful, please try again',
              'error'
            )
          })


        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Election Memo not sent.',
            'error'
          )
        }
      })
    }
    this.isCreateFormSubmitted = true;
  }


  updateElectionMemo() {
    this.showErrorMsg = false;

    let schoolList = [];
    let userId = [];
    let isDocValid = true;

    if (this.editMemoDocument.length == 0 && this.editMemoDocuments.length == 0) {
      isDocValid = false;
    }

    for (let x = 0; x < this.editSchoolList.length; x++) {

      if (this.editSchoolList[x].isSchoolInvited) {

        let data = this.editSchoolList[x].emisCode + ":" + this.editSchoolList[x].schoolName + ":" + this.editSchoolList[x].principal;

        schoolList.push(data);
        if (this.editSchoolList[x].userId && this.editSchoolList[x].userId != null) {
          userId.push(this.editSchoolList[x].userId)
        }
      }

    }
    this.selectedSchoolList = schoolList;
    this.showErrorMsg = true;
    // console.log(userId)
    // console.log(schoolList.toString())


    if (this.editvalidationForm.valid && schoolList.length > 0 && isDocValid) {
      Swal.fire({
        title: 'Save Memo?',
        text: 'Your update will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {

        if (result.value) {

          let schoolName = schoolList.toString();

          if (this.deleteDocId.length > 0) {
            for (let x = 0; x < this.deleteDocId.length; x++) {
              console.log("Delete doc: " + this.deleteDocId[x])
              this.memoservice.deleteDocument(this.deleteDocId[x]).subscribe((res) => { console.log(res) })
            }
          }

          if (!this.editMemoDocument || this.editMemoDocument.length == 0) {
            // NO DOCUMENT UPLOADED

            let electionMemo = {
              "id": this.selectedMemo.id,
              "description": this.editDescription,
              "dueDate": this.editDueDate,
              "schoolNames": schoolName,
              "districtCode": this.appservice.getLoggedInDistrictCode(),
              "submittedBy": parseInt(this.appservice.getLoggedInUserId())
            }


            // console.log(JSON.stringify(electionMemo));
            // console.log(electionMemo);
            this.memoservice.UpdateMemoNoDocument(electionMemo).subscribe((res: any) => {


              Swal.fire({
                title: 'Send Notification?',
                text: 'Do you want to send a notification to all the selected schools?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then((result) => {

                if (result.value) {


                  if (userId.length == 0) {
                    userId.push(0);
                  }


                  let duedate = moment(this.editDueDate).format('DD MMMM yyyy')
                  let subject = "Updated memo for the " + moment(new Date()).format('YYYY') + " election";

                  this.memoservice.sendMemoNotification(this.selectedMemo.id, duedate, moment(new Date()).format('YYYY'),
                    this.appservice.getIsLoggedInUsername(), subject, moment(new Date()).format('DD MMMM yyyy'),
                    this.deoTelNumber, this.deoEmail, this.banner.title).subscribe(mail => {
                      console.log(mail)
                    }, err => {
                      console.log(err);
                    })


                  this.memoservice.addAttendees(parseInt(this.selectedMemo.id), userId).subscribe((res: any) => {
                    console.log(res)
                    Swal.fire(
                      'Success',
                      'Election memo saved successfully and sent to all the schools',
                      'success'
                    ).then((confirmed) => {
                      if (confirmed.value || confirmed.isDismissed) {
                        location.reload();
                        this.modalService.dismissAll();
                      }
                    })
                  }, err => {
                    console.log(err)
                    Swal.fire(
                      'Error!',
                      'Your memo could not be submitted, please try again',
                      'error'
                    )
                  })

                } else {
                  Swal.fire(
                    'Success',
                    'Election memo saved successfully',
                    'success'
                  ).then((confirmed) => {
                    if (confirmed.value || confirmed.isDismissed) {
                      location.reload();
                      this.modalService.dismissAll();
                    }
                  })
                }
              })
            }, err => {
              console.log(err);
              Swal.fire(
                'Error!',
                'Your entry was unsuccessful, please try again',
                'error'
              )
            })
          } else {

            let electionMemo = {
              "id": this.selectedMemo.id,
              "description": this.editDescription,
              "dueDate": this.editDueDate,
              "schoolNames": schoolName,
              "districtCode": this.appservice.getLoggedInDistrictCode(),
              "submittedBy": parseInt(this.appservice.getLoggedInUserId()),
              "documents": this.editMemoDocument.toString()
            }


            // console.log(JSON.stringify(electionMemo));
            // console.log(electionMemo);
            this.memoservice.updateMemoWithDocument(electionMemo).subscribe((res: any) => {


              Swal.fire({
                title: 'Send Notification?',
                text: 'Do you want to send a notification to all the selected schools?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then((result) => {

                if (result.value) {


                  if (userId.length == 0) {
                    userId.push(0);
                  }

                  this.memoservice.addAttendees(parseInt(this.selectedMemo.id), userId).subscribe((res: any) => {
                    console.log(res)
                    Swal.fire(
                      'Success',
                      'Election memo saved successfully and sent to all the schools',
                      'success'
                    ).then((confirmed) => {
                      if (confirmed.value || confirmed.isDismissed) {
                        location.reload();
                        this.modalService.dismissAll();
                      }
                    })
                  }, err => {
                    console.log(err)
                    Swal.fire(
                      'Error!',
                      'Your memo could not be submitted, please try again',
                      'error'
                    )
                  })

                } else {
                  Swal.fire(
                    'Success',
                    'Election memo saved successfully',
                    'success'
                  ).then((confirmed) => {
                    if (confirmed.value || confirmed.isDismissed) {
                      location.reload();
                      this.modalService.dismissAll();
                    }
                  })
                }
              })
            }, err => {
              console.log(err);
              Swal.fire(
                'Error!',
                'Your entry was unsuccessful, please try again',
                'error'
              )
            })
          }


        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Election Memo not saved.',
            'error'
          )
        }
      })
    }
    this.isEditFormSubmitted = true;
  }


  removeDocument(event: any, flag, docId): void {
    //create update table

    console.log(this.fileUUID);
    if (flag == "create") {
      let id = event.upload.uuid;
      for (let x = 0; x < this.fileUUID.length; x++) {

        if (id == this.fileUUID[x]) {
          this.memoDocument.splice(x, 1);
          this.fileUUID.splice(x, 1);
        }
      }

    } else if (flag == "update") {
      let id = event.upload.uuid;
      for (let x = 0; x < this.fileUUID.length; x++) {
        // console.log(this.fileUUID[x])
        // console.log(event.upload.uuid)
        if (id == this.fileUUID[x]) {
          // if (event.name == this.editMemoDocument[x]) {
          this.editMemoDocument.splice(x, 1);
          this.fileUUID.splice(x, 1);
        }
      }

    } else if (flag == "table") {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Remove document from list',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.deleteDocId.push(docId)
          for (let x = 0; x < this.editMemoDocuments.length; x++) {

            if (docId == this.editMemoDocuments[x].id) {
              this.editMemoDocuments.splice(x, 1);

            }
          }
          console.log(this.deleteDocId)
        }
      })
    }

  }

  isElectionScheduled(id, flag) {

    if (this.scheduledElections) {
      let complete = this.scheduledElections.filter(function (e) {
        return [id].includes(e.memoId) && ["Election Scheduled"].includes(e.status);
      });

      let inprogress = this.scheduledElections.filter(function (e) {
        return [id].includes(e.memoId) && !["Election Scheduled"].includes(e.status);
      });


      if (flag == "new") {

        if (inprogress.length == 0 && complete.length == 0) {
          return true;
        } else {
          return false;
        }

      } else if (flag == "complete") {
        if (inprogress.length == 0 && complete.length > 0) {
          return true;
        } else {
          return false;
        }
      } else if (flag == "inprogress") {
        if (inprogress.length > 0 && complete.length == 0) {
          return true;
        } else {
          // elections = this.scheduledElections.filter(function (e) {
          //   return [id].includes(e.scheduledBy);
          // });
          return false;
        }
      }
    } else {
      return false;
    }


  }


  removeSavedDocument(i) {
    // console.log(this.documents[i])
    Swal.fire({
      title: 'Are you sure you want to remove this document?',
      text: 'You will not be able to undo this change',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {



      }
    })

  }


  updateSchoolList(action, id) {

    // console.log(this.completeSchoolList[id])
    if (action == "add") {
      this.completeSchoolList[id].isSchoolInvited = true;

    } else if (action == "remove") {

      this.completeSchoolList[id].isSchoolInvited = false;

    } else if (action == "removeall") {

      for (let x = 0; x < this.completeSchoolList.length; x++) {
        this.completeSchoolList[x].isSchoolInvited = false;
      }


    } else if (action == "addall") {

      for (let x = 0; x < this.completeSchoolList.length; x++) {
        // list1[x].isSchoolInvited = true;
        this.completeSchoolList[x].isSchoolInvited = true;
      }

      // this.schoolReceive = list1.filter(function (e) {
      //   return [true].includes(e.isSchoolInvited)
      // });

      // this.editFullSchoolList = list1.filter(function (e) {
      //   return [false].includes(e.isSchoolInvited)
      // });

      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   // Destroy the table first
      //   dtInstance.destroy();
      //   // Call the dtTrigger to rerender again
      //   this.listTrigger2.next();
      // });
    }

    this.showErrorMsg = false;

  }


  updateNewSchoolList(action, id) {

    // console.log(this.editSchoolList[id])
    if (action == "add") {
      this.editSchoolList[id].isSchoolInvited = true;

    } else if (action == "remove") {

      this.editSchoolList[id].isSchoolInvited = false;

    } else if (action == "removeall") {

      for (let x = 0; x < this.editSchoolList.length; x++) {
        this.editSchoolList[x].isSchoolInvited = false;
      }


    } else if (action == "addall") {

      for (let x = 0; x < this.editSchoolList.length; x++) {
        this.editSchoolList[x].isSchoolInvited = true;
      }

      // this.schoolReceive = list1.filter(function (e) {
      //   return [true].includes(e.isSchoolInvited)
      // });

      // this.editFullSchoolList = list1.filter(function (e) {
      //   return [false].includes(e.isSchoolInvited)
      // });

      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   // Destroy the table first
      //   dtInstance.destroy();
      //   // Call the dtTrigger to rerender again
      //   this.listTrigger2.next();
      // });
    }

    this.showErrorMsg = false;

  }

}



    //   filtered = res.filter(function (e) {
    //     return [16].includes(e.id)
    //   });

    // if (this.validationForm.valid && this.memoDocument.length > 0 && schoolList.length > 0) {
    //   Swal.fire({
    //     title: 'Send Memo?',
    //     text: 'Your memo will be sent to all the selected schools',
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes',
    //     cancelButtonText: 'No'
    //   }).then((result) => {
    //     if (result.value) {


    //       let description = $("textarea").val();
    //       let schoolName = schoolList.toString();

    //       if (!this.editMemoDocument || this.editMemoDocument.length == 0) {
    //         // NO DOCUMENT UPLOADED



    //       let description = this.editDescription; //$("textarea").val()
    //       let schoolName = schoolList.toString();


    //       let electionMemo = {
    //         "id": this.selectedMemo.id,
    //         "description": this.editDescription,
    //         "dueDate": this.editDueDate,
    //         "schoolNames": schoolName,
    //         "districtCode": this.appservice.getLoggedInDistrictCode(),
    //         "submittedBy": parseInt(this.appservice.getLoggedInUserId()),
    //         "documents": this.editMemoDocument.toString()
    //       }


    //       // console.log(JSON.stringify(electionMemo));
    //       // console.log(electionMemo);
    //       this.memoservice.updateMemo(electionMemo).subscribe((res: any) => {


    //         Swal.fire({
    //           title: 'Send Notification?',
    //           text: 'Do you want to send a notification to all the selected schools?',
    //           icon: 'question',
    //           showCancelButton: true,
    //           confirmButtonText: 'Yes',
    //           cancelButtonText: 'No'
    //         }).then((result) => {

    //           if (result.value) {


    //             if (userId.length == 0) {
    //               userId.push(0);
    //             }

    //             this.memoservice.addAttendees(parseInt(this.selectedMemo.id), userId).subscribe((res: any) => {
    //               console.log(res)
    //               Swal.fire(
    //                 'Success',
    //                 'Election memo saved successfully and sent to all the schools',
    //                 'success'
    //               ).then((confirmed) => {
    //                 if (confirmed.value || confirmed.isDismissed) {
    //                   location.reload();
    //                   this.modalService.dismissAll();
    //                 }
    //               })
    //             }, err => {
    //               console.log(err)
    //               Swal.fire(
    //                 'Error!',
    //                 'Your memo could not be submitted, please try again',
    //                 'error'
    //               )
    //             })

    //           } else {
    //             Swal.fire(
    //               'Success',
    //               'Election memo saved successfully',
    //               'success'
    //             ).then((confirmed) => {
    //               if (confirmed.value || confirmed.isDismissed) {
    //                 location.reload();
    //                 this.modalService.dismissAll();
    //               }
    //             })
    //           }
    //         })
    //       }, err => {
    //         console.log(err);
    //         Swal.fire(
    //           'Error!',
    //           'Your entry was unsuccessful, please try again',
    //           'error'
    //         )
    //       })
    //       } else {


    //         let description = this.editDescription; //$("textarea").val()
    //         let schoolName = schoolList.toString();


    //         let electionMemo = {
    //           "id": this.selectedMemo.id,
    //           "description": this.editDescription,
    //           "dueDate": this.editDueDate,
    //           "schoolNames": schoolName,
    //           "districtCode": this.appservice.getLoggedInDistrictCode(),
    //           "submittedBy": parseInt(this.appservice.getLoggedInUserId()),
    //           "documents": this.editMemoDocument.toString()
    //         }


    //         // console.log(JSON.stringify(electionMemo));
    //         // console.log(electionMemo);
    //         this.memoservice.updateMemo(electionMemo).subscribe((res: any) => {


    //           Swal.fire({
    //             title: 'Send Notification?',
    //             text: 'Do you want to send a notification to all the selected schools?',
    //             icon: 'question',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes',
    //             cancelButtonText: 'No'
    //           }).then((result) => {

    //             if (result.value) {


    //               if (userId.length == 0) {
    //                 userId.push(0);
    //               }

    //               this.memoservice.addAttendees(parseInt(this.selectedMemo.id), userId).subscribe((res: any) => {
    //                 console.log(res)
    //                 Swal.fire(
    //                   'Success',
    //                   'Election memo saved successfully and sent to all the schools',
    //                   'success'
    //                 ).then((confirmed) => {
    //                   if (confirmed.value || confirmed.isDismissed) {
    //                     location.reload();
    //                     this.modalService.dismissAll();
    //                   }
    //                 })
    //               }, err => {
    //                 console.log(err)
    //                 Swal.fire(
    //                   'Error!',
    //                   'Your memo could not be submitted, please try again',
    //                   'error'
    //                 )
    //               })

    //             } else {
    //               Swal.fire(
    //                 'Success',
    //                 'Election memo saved successfully',
    //                 'success'
    //               ).then((confirmed) => {
    //                 if (confirmed.value || confirmed.isDismissed) {
    //                   location.reload();
    //                   this.modalService.dismissAll();
    //                 }
    //               })
    //             }
    //           })
    //         }, err => {
    //           console.log(err);
    //           Swal.fire(
    //             'Error!',
    //             'Your entry was unsuccessful, please try again',
    //             'error'
    //           )
    //         })
    //       }



    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       Swal.fire(
    //         'Cancelled',
    //         'Election Memo not sent.',
    //         'error'
    //       )
    //     }
    //   })
    // }