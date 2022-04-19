import { Component, OnInit, ViewChild } from '@angular/core';
import { LegislationService } from './legislation.service';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-legislation',
  templateUrl: './legislation.component.html',
  styleUrls: ['./legislation.component.scss']
})
export class LegislationComponent implements OnInit {

  public noDocuments;
  public documents;
  public userRole;

  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: Boolean;
  public docPath = "";
  uploadedDocument: File = null;


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(
    private modalService: NgbModal,
    private legislationservice: LegislationService,
    private appservice: AppService) { }


  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.legislationservice.uploadLink, //this.manageentplanservice.UploadNewDocument(),
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
    this.legislationservice.getDocumentByType(3).subscribe(res => {
      console.log(res);
      this.documents = res;
      if (this.documents.length == 0) {
        this.noDocuments = true;
      }

    }, err => {
      console.log(err);
      this.noDocuments = false;
    })

    this.isFormSubmitted = false;
  }

  removeDocument(i) {
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

        this.legislationservice.deleteDocument(this.documents[i].id).subscribe(res => {
          console.log(res);

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
      catch((res) => {
      });

  }

  UploadNewDocument() {


    if (this.FileName) {

      Swal.fire({
        title: 'Are you sure you want to upload this document?',
        text: 'Your document will be saved',
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
          this.legislationservice.uploadDocument(documentInfo).subscribe((path: any) => {
            console.log(path);
            this.newDocs = {
              "id": 0,
              "title": title,
              "documentTypeId": 3,
              "documentPath": path.path,
              "uploadedBy": this.appservice.getLoggedInUserId()
              // "districtCode": this.districtCode,
              // "districtName": this.districtName,
              // "emisCode": this.emisNumber,
              // "schoolName": this.schoolName
            }


            this.legislationservice.saveDocumentPath(this.newDocs).subscribe(res => {
              console.log(res);


              Swal.fire({
                timer: 5000,
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
          });


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
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;

      this.uploadedDocument = <File>event.target.files[0];
      element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.FileName = fileName.substring(0, fileName.lastIndexOf("."));
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