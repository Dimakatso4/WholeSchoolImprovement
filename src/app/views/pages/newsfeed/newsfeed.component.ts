import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NewsfeedService } from './newsfeed.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {Quill} from 'quill'
import { QuillEditorComponent } from 'ngx-quill/lib/quill-editor.component';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  @ViewChild('quill') quill: QuillEditorComponent;

  constructor(private fb: FormBuilder,
    private newsfeednewsservice: NewsfeedService,
    private appService: AppService,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,) { }

  public dropdown: any;
  public requiredForm: FormGroup;
  public dateGenerated: any;
  public startDate: any;
  public endDate: any;
  public title: any;
  public author: any;
  public message: String;
  public newsFeedType: any;
  public newsFeedImages: any;
  public newsFeedID: any;
  public uploadedFileName: any;
  public isFormSubmitted: boolean;
  public newsFeedTypeCategory: String;
  public show: boolean;
  public isFormCreatedSubmitted: Boolean;
  public remainingText = 0;
  currentRole;
  public data: any;

  public docPath = "";
  public readMore: boolean;
  public ItemId: any;
  deleteNewsModel: any = {};

  public storeAll: any;
  uploadedDocument: File = null;
  titleModel = 'I have more than 10 characters'
  public currentText: any = '';
  public charsLeft: any = 10;
  public userId: any;
  public pos: any;
  public officeLevel: any;
  public isPageLoading:Boolean;


  changed() {
    // alert(this.message.length)
    // this.charsLeft = 10 - this.message.length;

    //lindokuhle code
    var remaining;
    // alert(remaining);
    if ((<HTMLInputElement>document.getElementById("message")).value.length <= 10) {
      remaining = 10 - (<HTMLInputElement>document.getElementById("message")).value.length;
      (<HTMLInputElement>document.getElementById("discussCommentsRemainingChars")).innerHTML = + remaining.toString() + " characters remaining ";
    } else {
      (<HTMLInputElement>document.getElementById("discussCommentsRemainingChars")).innerHTML = " 0 characters remaining ";
    }
    //lindokuhle code
    if (this.charsLeft == 0) {
      Swal.fire({ title: '', text: 'You have exceeded characters limit', icon: null, confirmButtonText: 'Close' })
      // Swal.fire({
      //   title: 'Exceeded characters limit',
      //   text: '',
      //   icon: 'question',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes',
      //   cancelButtonText: 'No'
      // })
    }
  }

  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.newsfeednewsservice.uploadLink,

    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 25,
    acceptedFiles: '.jpg , .jpeg, .png, .jfif , .pjpeg , .pjp, .pdf, .xlsx, .avi, .wmv, .ppt'
  };
  // public currentRole = this.appservice.getLoggedInUserRole();

  ngOnInit(): void {
    this.isPageLoading =true;
    //disable quill editor
    
    this.currentRole = this.appService.getIsLoggedInRoleID();
    console.log(this.currentRole);
    //Get logged in userID
    this.userId = this.appService.getLoggedInUserId()
    console.log(this.userId)
    //get logged in user information
    this.newsfeednewsservice.getUserById(this.userId).subscribe((res: any) => {
      console.log("user info:", res);
      this.pos = res.position;
      console.log("res.position:", this.pos);
      this.officeLevel = res.officeLevel
      console.log("res.officeLevel:", this.officeLevel);
    });

    this.requiredForm = this.fb.group({
      newsFeedID: [''],
      dateGenerated: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      message: ['', Validators.required],
      newsFeedType: ['', Validators.required],
      newsFeedImages: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.isFormSubmitted = false;
    this.newsfeednewsservice.getDropDown().subscribe((res: any) => {
      this.dropdown = res;
    });
    this.newsfeednewsservice.getAllNewsfeed().subscribe((res: any) => {
      this.storeAll = res;
      console.log("112", this.storeAll);
      this.isPageLoading = false;
    });

    if (this.currentRole == 3) {
      this.show = true;
    }
    else {
      this.show = false;
    }
    this.readMore = true;
  }

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        //  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        //  [{ 'direction': 'rtl' }],                         // text direction

        //  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'align': [] }],

        //  ['clean'],                                         // remove formatting button

        //  ['link'],
        ['link', 'image', 'video']
      ]
    },
  }
  get Form() {
    return this.requiredForm.controls;
  }

  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event) => {
    // console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }


  onUploadError(event: any): void {

    console.log('onUploadError:', event);

  }

  onUploadSuccess(event: any): void {

    console.log('onUploadSuccess:', event);

    this.docPath = event[1].path;

    console.log('this.docPath:', this.docPath);
    this.newsFeedImages = this.docPath;
  }

  DeleteItem(ItemId) {
    console.log(ItemId);
    this.ItemId = ItemId;

    Swal.fire({
      title: 'Are you sure you want to delete this item?',
      text: 'An item will be deleted',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).
      then((result) => {
        if (result.value) {
          this.deleteNewsModel = {
            "newsFeedID": this.ItemId
          }
          this.newsfeednewsservice.deleteNewsFeed(this.deleteNewsModel).subscribe(res => {
            console.log(res)
            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'This item has been successfully deleted',
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

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      this.uploadedDocument = <File>event.target.files[0];
      element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.uploadedFileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
  }
  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click()

  }
  submitData() {

    /*  if (!this.newsFeedTypeCategory) {
        alert("Newsfeed type is required");
        return;
      }
  */

    let dataNewsFeed = {
      newsFeedID: this.newsFeedID,
      dateGenerated: this.dateGenerated,
      title: this.title,
      author: this.author,
      message: this.message,
      newsFeedType: this.newsFeedType,
      newsFeedImages: this.newsFeedImages,
      startDate: this.startDate,
      endDate: this.endDate
    }
    this.newsfeednewsservice.createNewsFeedNews(dataNewsFeed).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
    this.isFormCreatedSubmitted = true;
    dataNewsFeed = null;


    Swal.fire({
      title: 'Successful',
      text: 'Details Captured ',
      icon: 'success'
    }).then(result => {
      window.location.reload();
    });
    this.resetFormValues();
  }

  //
  getFormValidationErrors() {

    // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.requiredForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.requiredForm.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }

  logDispute() {
    this.getFormValidationErrors();
    if (this.requiredForm.valid) {
      let dataNewsFeed = {
        newsFeedID: this.newsFeedID,
        dateGenerated: this.dateGenerated,
        title: this.title,
        author: this.author,
        message: this.message,
        newsFeedType: this.newsFeedType,
        newsFeedImages: this.newsFeedImages,
        startDate: this.startDate,
        endDate: this.endDate
      };
      console.log(dataNewsFeed);
      Swal.fire({
        title: 'Are you sure you want to Add New NewsFeed',
        text: 'A NewsFeed will be added',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.newsfeednewsservice.createNewsFeedNews(dataNewsFeed).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'A  NewsFeed Posted',

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
    } else if (this.requiredForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }

  //edit news feed
  editNewsFeed() {
    this.getFormValidationErrors();
    if (this.requiredForm.valid) {
      let dataNewsFeed = {
        newsFeedID: this.newsFeedID,
        dateGenerated: this.dateGenerated,
        title: this.title,
        author: this.author,
        message: this.message,
        newsFeedType: this.newsFeedType,
        newsFeedImages: this.newsFeedImages,
        startDate: this.startDate,
        endDate: this.endDate
      };
      console.log(dataNewsFeed);
      Swal.fire({
        title: 'Are you sure you want to edit this item?',
        text: 'A news feed will be modified',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'

      }).
        then((result) => {
          if (result.value) {
            //nompumeleo

            this.newsfeednewsservice.updateNewsFeed(dataNewsFeed).subscribe(res => {
              console.log(res);
              console.log("sucess");
            });
            ///Nompumelelo


            Swal.fire({
              timer: 5000,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
              title: "Successful",
              text: 'News feed modified',

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
    } else if (this.requiredForm.invalid) {
      console.log("user not created")
    }
    this.isFormSubmitted = true;
  }
  //edit news feed 


  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  getday(): string {

    this.startDate = this.startDate
    // this.minDate=new this.minDate().toISOString().split('T')[0] 
    return this.startDate
  }


  selectNewsfeedType(event) {
    const selected = event.target.value;
    var val = 0;
    if (selected === "Latest News") {
      val = 1;
    } else if (selected === "Notices") {
      val = 2;
    } else if (selected === "Activities") {
      val = 3;
    }
    console.log("newsfeedtype====", val);
    this.newsFeedType = val;
  }

  //getNewsFeedType
  getNewsFeedByTypeId(event) {
    const selected = event.target.value;
    this.newsfeednewsservice.getNewsfeedByTypeId(selected).subscribe((res: any) => {
      this.storeAll = res;
      console.log("news feed selected:", this.storeAll);
    });


  }
  resetFormValues() {
    (<HTMLInputElement>document.getElementById("message")).value = null;
    (<HTMLInputElement>document.getElementById("author")).value = null;
    (<HTMLInputElement>document.getElementById("tittle")).value = null;
    (<HTMLInputElement>document.getElementById("selectType")).value = null;
  }

  back() {
    this.readMore = true;
  }

  openAcknowledgementForm(content): void {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
      this.author = " ";
      this.message = " ";
      this.title = " ";
      this.startDate = " ";
      this.endDate = " ";
      this.newsFeedType = " ";
      this.newsFeedImages = " ";
      this.dateGenerated = " ";
    }).catch((res) => { });

  }

  openEditModal(content, card) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
      // this.activateValidation = false;
    }).catch((res) => { });
    console.log("card", card)
    this.author = card.author;
    this.message = card.message;
    this.title = card.title;
    this.startDate = moment(card.startDate).format('YYYY-MM-DD');
    this.endDate = moment(card.endDate).format('YYYY-MM-DD');
    console.log(this.startDate)
    console.log(this.endDate)
    this.newsFeedID = card.newsFeedID;
    this.newsFeedType = card.newsFeedType;
    this.newsFeedImages = card.newsFeedImages;
    this.dateGenerated = card.dateGenerated





  }



  modalReadMore(content, card): void {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);

    }).catch((res) => { });
    console.log("card testing", card);
    this.author = card.author;
    this.message = card.message;
    this.title = card.title;
    this.startDate = card.startDate;
    this.endDate = card.endDate;
    this.newsFeedID = card.newsFeedID;
    this.newsFeedType = card.newsFeedType;
    this.newsFeedImages = card.newsFeedImages;
    this.dateGenerated = card.dateGenerated

    
  }

  modalReadMoreDoc(content, card): void {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);

    }).catch((res) => { });
    console.log("card testing", card);
    this.author = card.author;
    this.message = card.message;
    console.log("card.message", card.message)
    this.title = card.title;
    this.startDate = card.startDate;
    this.endDate = card.endDate;
    this.newsFeedID = card.newsFeedID;
    this.newsFeedType = card.newsFeedType;
    this.newsFeedImages = card.newsFeedImages;
    this.dateGenerated = card.dateGenerated;

    this.quill.setDisabledState(true)
    
  }

  resetDropzoneUploads(): void {

    if (this.directiveRef) {

      this.directiveRef.reset();

    }

    this.docPath = "";


    this.modalService.dismissAll();

    this.requiredForm.controls["newsFeedType"].setValue("");
    this.requiredForm.controls["author"].setValue("");
    this.requiredForm.controls["startDate"].setValue("");
    this.requiredForm.controls["endDate"].setValue("");
    this.requiredForm.controls["message"].setValue("");
    this.requiredForm.controls["title"].setValue("");

  }



  calculateDiscussCommentsRemainingChars() {
    var remaining;
    alert(remaining);
    if ((<HTMLInputElement>document.getElementById("comments")).value.length <= 200) {
      remaining = 200 - (<HTMLInputElement>document.getElementById("comments")).value.length;
      (<HTMLInputElement>document.getElementById("discussCommentsRemainingChars")).innerHTML = + remaining.toString() + " characters remaining ";
    } else {
      (<HTMLInputElement>document.getElementById("discussCommentsRemainingChars")).innerHTML = " 0 characters remaining ";
    }
  }

  ismaxlength_discussComments(obj) {
    var mlength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : ""
    if (obj.getAttribute && obj.value.length > mlength)
      obj.value = obj.value.substring(0, mlength)
  }
  clearComments() {
    $("#comments").val("");
  }
  valueChange(value) {

    this.remainingText = 500 - value.length;
  }

  //test
  CountDownCharac(message) {
    var max = 5;

    var characterCount = message.length(),
      current = $('#current'),
      maximum = $('#maximum'),
      theCount = $('#the-count')
    current.text(characterCount)


  }

  _returnHtmlFromRichText(richText) {
    if (richText === undefined || richText === null || richText.nodeType !== 'document') {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText);
  }

  public countCharacters(message) {
    const myTextArea = document.getElementById('message');
    const remainingCharsText = document.getElementById('my-textarea-remaining-chars');
    const MAX_CHARS = 300;
    console.log('got input!')
    const remaining = MAX_CHARS - message.length
    const color = remaining < MAX_CHARS * 0.1 ? 'red' : 'null';
    remainingCharsText.textContent = `${remaining} characters remaining `;


  }

  getLimit(message) {
    let isinvalid = false;

    if (message) {
      if (message.length > 300) {
        isinvalid = true;
      }
    }

    return isinvalid;
  }


  //disable quill editor
  enable(enabled: boolean=false){

  }

}
