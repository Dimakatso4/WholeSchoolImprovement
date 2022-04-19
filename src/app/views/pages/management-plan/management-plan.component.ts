import { Conditional } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ManagementPlanService } from './management-plan.service';
import { AppService } from 'src/app/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { cssNumber } from 'jquery';

@Component({
  selector: 'app-management-plan',
  templateUrl: './management-plan.component.html',
  styleUrls: ['./management-plan.component.scss']
})
export class ManagementPlanComponent implements OnInit {

  newDocs: any = {};
  docsTitle = "";
  public docPath = "";

  uploadedDocument: File = null;
  public noDocuments;
  public documents;
  selectRow;

  public districtCode = "";
  public emisNumber = "";
  public districtName;
  public schoolName;
  public districts;
  public schools;
  public isFormSubmitted: Boolean;
  public userRole: any;
  public documentRemoved;
  public schoolCount = 0;
  public userName;
  public NameSurname;
  public district;
  public FileName = "";

  public isDEOUploaded: Boolean;
  public isHOUploaded: Boolean;
  public dataLoading: Boolean;
  public headOfficeUsers: Boolean;

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(
    private modalService: NgbModal,
    private manageentplanservice: ManagementPlanService,
    private appservice: AppService
  ) { }


  public config: DropzoneConfigInterface = {
    clickable: true,
    autoProcessQueue: false,
    url: this.manageentplanservice.uploadLink,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 50,
    acceptedFiles: 'image/*, application/*'
  };

  ngOnInit(): void {
    this.userRole = this.appservice.getLoggedInUserRole();
    this.dataLoading = true;
    this.headOfficeUsers = false;
    this.districtCode = this.appservice.getLoggedInDistrictCode();

    this.manageentplanservice.getDocumentByType(2).subscribe(res => {
      console.log(res);
      this.documents = res;
      if (this.documents.length == 0) {
        this.noDocuments = true;
        this.isHOUploaded = false;
      }
      this.isDEOUploaded = false;
      this.isHOUploaded = false;

      for (let x = 0; x < this.documents.length; x++) {

        if (this.userRole == "DEO" && this.documents[x].districtCode == this.appservice.getLoggedInDistrictCode()) {
          this.isDEOUploaded = true;

        }
        // console.log(this.documents[x].districtCode + " " + this.appservice.getLoggedInDistrictCode())

        if (this.userRole == "HO" && !this.documents[x].districtCode || this.userRole == "HO" && this.documents[x].districtCode == 'undefined' || this.userRole == "HO" && this.documents[x].districtCode == 'null') {
          this.isHOUploaded = true;
        }

      }

      this.dataLoading = false;
    }, err => {
      console.log(err);
      this.noDocuments = false;
    })
    this.userName = this.appservice.getIsLoggedInUsername();


    if (this.userRole == "DEO") {
      this.manageentplanservice.getDistrictByCode(this.appservice.getLoggedInDistrictCode()).subscribe((district: any) => {

        this.districtName = district.districtName;
        this.districtCode = this.appservice.getLoggedInDistrictCode();
      }, err => {
        console.log(err);
      })
    }

    
    
    // this.manageentplanservice.getAllDistricts().subscribe(district => {
    //   this.districts = district;

    //   if (this.userRole == "HO") {
    //     console.log("Head Office View")
    //   } else if (this.userRole == "PRINCIPAL" || this.userRole == "SGB" || this.userRole == "SEO") {
    //     console.log("School level view");
    //     // this.manageentplanservice.getSchoolsByDistrict(this.appservice.getLoggedInDistrictCode()).subscribe(res => {
    //     //   this.schools = res;
    //     //   this.districtCode = this.appservice.getLoggedInDistrictCode();
    //     //   this.emisNumber = this.appservice.getLoggedInEmisCode();
    //     //   // userRole == 'DEO' || userRole == 'MONITOR' || userRole == 'OBSERVER' || userRole == 'PRINCIPAL' || userRole == 'SEO' || userRole == 'SGB'
    //     // }, err => {
    //     //   console.log(err);

    //     // })

    //   } else if (this.userRole == "DEO" || this.userRole == "MONITOR" || this.userRole == "OBSERVER") {
    //     console.log("District level View");
    //     // this.districtCode = this.appservice.getLoggedInDistrictCode();
    //     // this.manageentplanservice.getSchoolsByDistrict(this.districtCode).subscribe(res => {
    //     //   this.schools = res;
    //     //   // userRole == 'DEO' || userRole == 'MONITOR' || userRole == 'OBSERVER' || userRole == 'PRINCIPAL' || userRole == 'SEO' || userRole == 'SGB'
    //     // }, err => {
    //     //   console.log(err);

    //     // })

    //   }
    // }, err => {
    //   console.log(err);
    // })

    if(this.userRole == "HO" || this.userRole == "PEO" || this.userRole == "PEM") {
      this.headOfficeUsers = true;
    }


    this.isFormSubmitted = false;
    this.documentRemoved = false;
    // console.log(this.isDEOUploaded)
    // console.log(this.isHOUploaded)
  }

  getSchools(code) {
    this.emisNumber = "";
    this.schoolCount = 0
    this.manageentplanservice.getSchoolsByDistrict(code).subscribe(res => {

      this.schools = res;
      this.schoolCount = this.schools.length;
    }, err => {
      console.log(err);
    })

    this.manageentplanservice.getDistrictByCode(code).subscribe((res: any) => {
      this.districtName = res.districtName;
    }, err => {
      console.log(err);
    })

  }

  openLgModal(content) {
    this.isFormSubmitted = false;
    this.FileName = "";
    this.docsTitle = "";
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
    this.docPath = event[1].path;
    var index = this.docPath.lastIndexOf("/");
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi;
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;

  }

  onUploadComplete(event: any): void {
    console.log(event);
    // this.docPath = event[1].path;
    // var index = this.docPath.lastIndexOf("/");
    // var rawTitle = this.docPath.substr(index + 1)
    // var re = /%20/gi;
    // var newTitle = rawTitle.replace(re, " ");
    // this.docsTitle = newTitle;

  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
    this.docPath = "";
    this.modalService.dismissAll()
  }


  viewDocument(content, i) {
    this.isFormSubmitted = false;
    this.documentRemoved = false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

    this.selectRow = this.documents[i];
    console.log(this.selectRow);

    this.manageentplanservice.getUserById(this.documents[i].uploadedBy).subscribe((res: any) => {
      console.log(res);
      this.NameSurname = res.firstname + " " + res.surname;
    }, err => {
      console.log(err)
      this.NameSurname = "";
    })

    if (this.documents[i].districtName == null) {
      this.district = "";
    } else {
      this.district = this.documents[i].districtName;
    }

    // if (this.documents[i].schoolName == null) {
    //   this.schoolName = "";
    // } else {
    //   this.schoolName = this.documents[i].schoolName;
    // }

    this.docsTitle = this.documents[i].title;
    this.docPath = this.documents[i].documentPath;

  }

  UploadNewDocument() {

    if (this.FileName) {

      Swal.fire({
        title: 'Are you sure you want to upload this document?',
        text: 'Your management plan will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {


          const documentInfo = new FormData();
          let title = "";

          if (this.docsTitle) {
            title = this.docsTitle;
          } else {
            title = this.FileName;
          }

          documentInfo.append('file', this.uploadedDocument, title);
          this.manageentplanservice.uploadDocument(documentInfo).subscribe((path: any) => {
            console.log(path);

            this.newDocs = {
              "id": 0,
              "title": title,
              "documentTypeId": 2,
              "documentPath": path.path,
              "uploadedBy": this.appservice.getLoggedInUserId(),
              "districtCode": this.appservice.getLoggedInDistrictCode(),
              "districtName": this.districtName,
              "emisCode": this.appservice.getLoggedInEmisCode(),
              "schoolName": this.schoolName
            }

            console.log(this.newDocs)
            this.manageentplanservice.saveDocumentPath(this.newDocs).subscribe(res => {
              console.log(res);
              Swal.fire({
                timer: 5000,
                title: "Confirmation",
                text: 'Management plan successfully uploaded',
                icon: 'success'
              }).then(result => {
                this.modalService.dismissAll();
                if (result.value || result.isDismissed) {
                  this.modalService.dismissAll();
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
          }, err => {
            console.log(err);
            Swal.fire({
              timer: 5000,
              title: "Unsuccessful",
              text: 'Unable to save document, please try again',
              icon: 'error'
            });
          })



        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })
    }

    this.isFormSubmitted = true;
  }

  updateDocument() {

    if (this.FileName) {

      Swal.fire({
        title: 'Are you sure you want to save your entry?',
        text: 'Your management plan will be saved',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {


          const documentInfo = new FormData();
          let title = "";

          if (this.docsTitle) {
            title = this.docsTitle;
          } else {
            title = this.FileName;
          }
          documentInfo.append('file', this.uploadedDocument, title);

          this.manageentplanservice.uploadDocument(documentInfo).subscribe((path: any) => {
            console.log(path);

            let DocInfo = {
              "id": this.selectRow.id,
              "title": title,
              "documentTypeId": 2,
              "documentPath": path.path,
              "uploadedBy": this.appservice.getLoggedInUserId(),
              "uploadedDate": new Date().toISOString()
              // "districtCode": this.selectRow.districtCode,
              // "districtName": this.selectRow.districtName
              // "emisCode": this.selectRow.emisCode
              // "schoolName": this.selectRow.schoolName
            }

            console.log(JSON.stringify(DocInfo))
            this.manageentplanservice.updateDocumentPath(DocInfo).subscribe(res => {
              console.log(res);
              Swal.fire({
                timer: 5000,
                title: "Confirmation",
                text: 'Management plan successfully updated',
                icon: 'success'
              }).then(result => {
                this.modalService.dismissAll();
                if (result.value || result.isDismissed) {
                  this.modalService.dismissAll();
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

          }, err => {
            console.log(err);
            Swal.fire({
              timer: 5000,
              title: "Unsuccessful",
              text: 'Unable to save document, please try again',
              icon: 'error'
            });
          })



        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your entry was not save',
            'error'
          )
        }
      })
    }

    this.isFormSubmitted = true;
  }

  removeDocument() {
    this.docPath = "";
    this.documentRemoved = false;

    Swal.fire({
      title: 'Are you sure you want to remove this document?',
      text: 'You will be required to upload a new document',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.documentRemoved = true;
        this.FileName = "";
        this.docsTitle = "";
      }
    })

    // this.isFormSubmitted = true;
  }

  getschoolName() {
    this.manageentplanservice.getSchoolByEmisNumber(this.emisNumber).subscribe((res: any) => {
      this.schoolName = res[0].institutionName;
      console.log(this.schoolName);
    }, err => {
      console.log(err);
    })
  }

  
  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click()

  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;

      this.uploadedDocument = <File>event.target.files[0];
      element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.FileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
  }

}
