import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LibraryService } from './library.service';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { json } from 'ngx-custom-validators/src/app/json/validator';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  toISOLocal(): any {
    throw new Error('Method not implemented.');
  }

  public noDocuments;
  public documents;
  public documenthistory;
  public userRole;

  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: Boolean;
  public docPath = "";
  uploadedDocument: File = null;
  public username;
  public loggedUserId;
  public docApproveDate: any;
  public docApprovedBy: any;
  public docLastApproved: any;
  public docReviewDate: any;
  public docRelpolicy: any;
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public docNum: any;
  public docDesc: any;
  public docArea: any;
  public contDirect: any;
  public Docstatus: any;
  public areaOfevaluationdata: any;
  public documentNames: any;
  public users: any;
  IsActive: any;
  updateStatusModel: any = {};
  public isDeleted: boolean = false;
  public message: any;
  public cellNo: any;
  public docStatusData: any;
  public userUserID: any;
  public selectedType: string = "Please select one";
  public fullname: any;
  public fullnames: any;
  public documentSavedBy: any;
  public documentApprovedDate: any;
  public documentApprovedBy: any;
  public contactPerson: any;
  public contactPersonFullName: any;
  public usersList: any;
  public directorate; any;
  public pos: any;
  public subDirectorate: any;
  public officeLevel: any;
  public dateNextReview: any;
  public isPageLoading: Boolean;
  public isLoading: Boolean;
  public showRelPolicies: Boolean;
  public documentPath: any;
  public documentName: any;
  public isInvalidFileType: Boolean;
  public userEmails: any = [];
  public sendEmail:any= {};
  public emailContent:any;
  public maxLength;
  


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  @ViewChild('content') content: ElementRef;

  constructor(
    private modalService: NgbModal,
    private libraryservice: LibraryService,
    private appservice: AppService) { }


  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.libraryservice.uploadLink, //this.manageentplanservice.UploadNewDocument(),
    renameFile: function () {
      var newDocName = ((document.getElementById("docsTitle") as HTMLInputElement).value);
      console.log("newDocName", newDocName)
      // console.log("newDocName", new Date().getTime())

      return newDocName;
    },
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 25,
    acceptedFiles: '.pdf',
    dictDefaultMessage: 'Drop pdf files here to upload',

  };

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      retrieve: true,
      //ordering: true,
      //order: ['4', 'asc']
      //order: [[0, 'desc']]
      order: [[0, 'asc']]

    }

    this.maxLength = 50;

    this.isPageLoading = true;
    //console.log(new Date().getTime(),"new Date().getTime()")
    //current date
    //     this.today = new Date();
    // this.dd = this.today.getDate();
    // this.mm = this.today.getMonth()+1; //January is 0!
    // this.yyyy = this.today.getFullYear();
    //  if(this.dd<10){
    //         this.dd='0'+this.dd
    //     } 
    //     if(this.mm<10){
    //         this.mm='0'+this.mm
    //     } 

    // this.today = this.yyyy+'-'+this.mm+'-'+this.dd;
    // document.getElementById("docLastApproved").setAttribute("max", this.today);

    this.userRole = this.appservice.getLoggedInUserRole();

    this.isFormSubmitted = false;
    //get currently logged in user
    this.username = this.appservice.getIsLoggedInUsername();
    console.log("this.username", this.username);

    this.loggedUserId = this.appservice.getLoggedInUserId();
    console.log(this.loggedUserId)

    //get list of documents
    this.libraryservice.getDocumentList().subscribe(res => {
      this.documents = res;
      console.log(this.documents);
      this.isPageLoading = false;
      this.dtTrigger.next()
    })

    //Get all area of evaluation 
    this.libraryservice.getAllAreaofEvaluation().subscribe(res => {
      this.areaOfevaluationdata = res;
    });
    //Get all policy document list
    this.libraryservice.GetDococumentStatusList().subscribe(res => {
      this.docStatusData = res;
      console.log("docStatusData:", this.docStatusData)
    });

    //Get documents by names
    this.libraryservice.getAllDocumentNames().subscribe((res: string[]) => {
      this.documentNames = res;
      console.log("this.documentNames", this.documentNames)

      //hide and show related policies dropdown
      if (res == null) {
        this.showRelPolicies = false;
      }
    });

    //Get all users 
    this.libraryservice.getUsers().subscribe((res: any) => {
      this.users = res;
      console.log("this.users", this.users)

      for (let index = 0; index < res.length; index++) {
        this.users[index].fullName = res[index].firstName + " " + res[index].surname;
      }
      console.log(this.users)
    });

    //get logged in user information
    this.libraryservice.getUserInfoById(this.loggedUserId).subscribe((res: any) => {
      console.log("user info:", res);
      this.pos = res.position;
      console.log("res.position:", this.pos);
      this.officeLevel = res.officeLevel;
      this.directorate = res.directorate;
      this.subDirectorate = res.subDirectorate;
      console.log("res.directorate:", this.directorate);
      console.log("res.subDirectorate:", this.subDirectorate);
      console.log("res.officeLevel:", this.officeLevel);
    });

  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  onOptionsSelected(value: string) {

    console.log("value", value)
    if (value === "Draft") {
      $("#docReviewDate").show();
      $("#docApproveDate").hide();
      // $("#docLastApproved").hide();
      $("#docApprovedBy").hide();

    }

    if (value === "Review") {
      $("#docReviewDate").show();
      $("#docApproveDate").hide();
      // $("#docLastApproved").hide();
      $("#docApprovedBy").hide();

    }
    if (value === "SignedOff") {
      $("#docReviewDate").hide();
      $("#docApproveDate").show();
      // $("#docLastApproved").show();
      $("#docApprovedBy").show();
    }

  }

  public SavePDF(): void {
    let doc = new jsPDF();
    doc.html(this.content.nativeElement);
    doc.save('output.pdf');
  }

  public convertToPDF() {
    html2canvas(this.content.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a3'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
      pdf.save('library.pdf'); // Generated PDF
    });
  }

  updateDocumentStatus(i) {
    console.log(this.documents[i])
    Swal.fire({
      title: 'Are you sure you want to remove this document?',
      text: 'You will not be able to undo this change',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        //Model
        this.updateStatusModel = {
          "documentId": this.documents[i].documentId
        };


        this.libraryservice.deleteDocumentLibrary(this.updateStatusModel).subscribe(res => {
          console.log("Deleted", res);

          Swal.fire({
            timer: 5000,
            title: "Confirmation",
            text: 'Document successfully removed',
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



  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  onUploadError(event: any): void {
    this.isInvalidFileType = true;
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
    this.docPath = event[1].path;
    console.log('this.docPath:', this.docPath);
    this.isInvalidFileType = false;

  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
    this.docPath = "";
    this.modalService.dismissAll();
  }

  openModal(content) {
    this.isFormSubmitted = false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch(() => {
      });



    $('#docDesc').keyup(function () {
      var maxLength = 50;
      var textlen = $(this).val().toString().length;
      $('#rchars').text(textlen);
      console.log("Limit is ", textlen);
    });


  }

  openDocumentHistoryModal(content, doc) {

    console.log("AreaOfEvaluationId " + doc.areaOfEvaluationID);
    //get list of history documents
    this.libraryservice.getDocumentHistoryList(doc.areaOfEvaluationID).subscribe(res => {
      this.documenthistory = res;
      console.log(this.documents);
      console.log(this.documenthistory)
      this.dtTrigger.next()
    })

    this.isFormSubmitted = false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch(() => {
      });

  }



  UploadNewDocument() {

    var isvalid = false;
    if (this.docsTitle && this.docNum && this.docDesc && this.contDirect && this.Docstatus) {
      isvalid = true;
    }

    //start: get cell number of the currently logged in user

    console.log(this.users, "bbb")
    console.log(this.contDirect, " this.contDirect")

    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].fullName == this.contDirect) {
        console.log(this.users[index].email, "email")
        this.userUserID = this.users[index].userId;
        console.log(this.userUserID, "this.userUserID")
        this.cellNo = this.users[index].cell;
        break;
      }
    }
    //end: get cell number of the currently logged in user

    if (this.docPath && isvalid) {

      //Store related documents
      let relDoc = [];
      for (var key in this.docRelpolicy) {
        if (this.docRelpolicy.hasOwnProperty(key)) {
          relDoc.push(this.docRelpolicy[key].documentName)
        }
      }

      Swal.fire({
        title: 'Are you sure you want to upload this document?',
        text: 'Your document will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {

          this.isLoading = true;
          //==========Initialize IsActive property==========
          this.IsActive = "Active";

          console.log(this.contDirect, 'this.contDirect')
          this.newDocs = {
            "DocumentNumber": $("#docNum").val(),
            "DocumentName": $("#docsTitle").val(),
            "DocumentDescription": $("#docDesc").val(),
            "AreaOfEvaluationId": $("#docArea").val(),
            "DocumentSavedBy": this.loggedUserId,
            "userID": this.contDirect,
            "Status": $("#status").val(),
            "ApprovedBy": this.docApprovedBy,
            "DateApproved": this.docApproveDate,
            // "DateLastAmended": this.docLastApproved,
            "DateNextReview": this.docReviewDate,
            "RelatedPolicies": relDoc.toString(),
            "documentPath": this.docPath,
            "IsActive": true

          }

          this.libraryservice.GetRoleNamebyUserId(this.contDirect).subscribe(res => {

            this.usersList = res;
            console.log("this.usersList", this.usersList.cell)
            console.log("full name", this.usersList)


          })

          console.log("this.newDocs", this.newDocs)
          this.libraryservice.saveDocumentPath(this.newDocs).subscribe(res => {
            console.log(res);

            //sms
            this.message = "Dear " + this.usersList.firstName + " " + this.usersList.surname + " your document has been uploaded.";
            console.log(this.usersList.cell, "his.usersList.cell")
            this.libraryservice.sendSMS(this.usersList.cell, this.message).subscribe(res => {
              console.log(res);
            }, err => {

              console.log(err);
              Swal.fire({
                timer: 5000,
                title: "Confirmation ",
                text: 'Unable to send sms, please try again ',
                icon: 'error'
              });
            })
            //sms 
            console.log(this.contDirect)
            //email notification
            this.libraryservice.DocumentEmail(this.contDirect).subscribe(res => {
              console.log(res);
            }, err => {
              console.log(err);
              Swal.fire({
                timer: 5000,
                title: "Confirmation ",
                text: 'Unable to send email, please try again ',
                icon: 'error'
              });
            })
            //email notification

            //Check if document is signed off
            if(this.Docstatus == "SignedOff"){
            //Get all users 
            this.libraryservice.getUsers().subscribe((res: any) => {
              this.users = res;

              console.log("this.users", this.users)
              for(let i=0; i< this.users.length; i++){
                this.userEmails.push(this.users[i].email)

              }
              console.log(this.userEmails)
              this.emailContent = "New Policy Document Uploaded";
              this.sendEmail =
              {
                "receiversList": this.userEmails,
                "subject": this.emailContent,
                "body": "string",
                "DocumentName": this.docsTitle
              }
              
              console.log('json object',this.sendEmail)

              this.libraryservice.SendBulkEmail(this.sendEmail).subscribe(res=>{
                 console.log(res)
              }, err => {
                console.log(err)
              });
            });
            }
            this.isLoading = false;
            Swal.fire({
              //timer: 5000,
              title: "Confirmation",
              text: 'Document successfully uploaded',
              icon: 'success'
            }).then(result => {

              this.modalService.dismissAll();
              if (result.value || result.isDismissed) {
                window.location.reload();
              }
            });

          }, err => {
            this.isLoading = false;
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


    this.isFormSubmitted = true;
  }


  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click();

  }



  handleFileInput(event: any) {
    if (event.target.files.length) {
      let fileName = event.target.files[0].name;

      this.uploadedDocument = <File>event.target.files[0];
      // element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.FileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
  }

  GetRoleNamebyUserId(Id) {

    this.libraryservice.GetRoleNamebyUserId(Id).subscribe(res => {
      this.fullname = res;
      console.log(this.fullname.firstName + " " + this.fullname.surname);
      this.fullname = this.fullname.firstName + " " + this.fullname.surname;
      //this.dtTrigger.next()
    })
  }

  //View model 

  viewDocument(content, doc: Document) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch(() => { });
    console.log(doc)
    console.log(doc['documentSavedBy'])
    console.log(doc['dateApproved'])
    this.documentApprovedDate = doc['dateApproved'];
    //Doc saved by
    this.libraryservice.GetRoleNamebyUserId(doc['documentSavedBy']).subscribe(res => {
      this.fullname = res;
      //console.log(this.fullname.firstName + " " + this.fullname.surname );
      this.fullname = this.fullname.firstName + " " + this.fullname.surname;
      this.documentSavedBy = this.fullname;
      //this.dtTrigger.next()
    })

    //Doc approved by
    this.libraryservice.GetRoleNamebyUserId(doc['approvedBy']).subscribe(res => {

      this.fullnames = res;
      console.log('jj', this.fullnames)
      console.log(this.fullnames.firstName + " " + this.fullnames.surname);
      this.fullnames = this.fullnames.firstName + " " + this.fullnames.surname;
      this.documentApprovedBy = this.fullnames;
      //this.dtTrigger.next()
    })



    document.getElementById('dname').setAttribute('value', doc['documentName']);
    this.documentName = doc['documentName'];
    document.getElementById('dnum').setAttribute('value', doc['documentNumber']);
    document.getElementById('description').setAttribute('value', doc['documentDescription']);
    document.getElementById('darea').setAttribute('value', doc['focusArea']);
    //document.getElementById('savedby').setAttribute('value', doc['documentSavedBy']);
    document.getElementById('cperson').setAttribute('value', doc['fullname']);
    document.getElementById('dstatus').setAttribute('value', doc['status']);
    //document.getElementById('dapprovedby').setAttribute('value', doc['approvedBy']);
    document.getElementById('dapprovdate').setAttribute('value', doc['dateApproved']);
    //document.getElementById('ddatelastapproved').setAttribute('value', doc['dateLastAmended']);
    this.dateNextReview = doc['dateNextReview'];
    console.log(this.dateNextReview, 'this.dateNextReview')
    document.getElementById('dreviewdate').setAttribute('value', doc['dateNextReview']);
    document.getElementById('drelpolicies').setAttribute('value', doc['relatedPolicies']);
    document.getElementById('fileUpload').setAttribute('value', doc['documentPath']);
    console.log(doc['documentPath'], 'Path')
    this.documentPath = doc['documentPath'];
    console.log(this.documentName)

    if (doc['approvedBy'] == null) {
      $("#apprb").hide();
    }
    if (doc['dateApproved'] == null) {
      $("#apprdate").hide();
    }
    // if (doc['dateLastAmended'] == null) {
    //   $("#lastdate").hide();
    // }
    if (doc['dateNextReview'] == null) {
      $("#rev").hide();
    }

    //hide and show
    if (doc['status'] === "Draft") {
      $("#dreviewdate").show();
      $("#dapprovdate").hide();
      // $("#docLastApproved").hide();
      $("#dapprovedby").hide();

    }

    if (doc['status'] === "Review") {
      $("#dreviewdate").show();
      $("#dapprovdate").hide();
      // $("#docLastApproved").hide();
      $("#dapprovedby").hide();

    }
    if (doc['status'] === "SignedOff") {
      $("#dreviewdate").hide();
      $("#dapprovdate").show();
      // $("#docLastApproved").show();
      $("#docApprovedBy").show();
    }

    //hide related policies if empty
    if (doc['relatedPolicies'] == null || doc['relatedPolicies'] == "" || doc['relatedPolicies'] == undefined) {
      $("#rel").hide();

    }

  }


}

    // this.isFormSubmitted = true;
    // Swal.fire({
    //   timer: 3500,
    //   title: "Unsuccessful",
    //   text: 'Your entry was unsuccessful, please try again',
    //   icon: 'error'
    // });