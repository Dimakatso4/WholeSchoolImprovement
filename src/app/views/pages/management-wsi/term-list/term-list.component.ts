import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ManagementWsiService} from '../management-wsi.service';
import * as moment from 'moment';



@Component({
  selector: 'app-term-list',
  templateUrl: './term-list.component.html',
  styleUrls: ['./term-list.component.scss']
})
export class TermListComponent implements OnInit {  //Create FormGroup
   
  userForm: FormGroup;
  isFormSubmitted: Boolean;
  public termEnd:any
  public termStart:any
  public term1: any
  
  public term1Start: any
  public term1End: any
  public term2Start: any
  public term2End: any
  public term3Start: any
  public term3End: any
  public term4Start: any
  public term4End: any
  public  termID:any
  lis=[]
  li:any;
  public isPageLoading: Boolean;
  todayDate = new Date().toISOString().replace(/T.*$/, '');
  
  constructor(private modalService: NgbModal,public formBuilder: FormBuilder,private router: Router,private managementwsiservice: ManagementWsiService) { }

  ngOnInit(): void {
    this.isPageLoading = true;
    this.userForm = this.formBuilder.group({
      term1Start: ['',Validators.required],
      term1End: ['',Validators.required],
      term2Start: ['',Validators.required],
      term2End:['',Validators.required],
      term3Start: ['',Validators.required],
      term3End: ['',Validators.required],
      term4Start: ['',Validators.required],
      term4End: ['',Validators.required],
      termID:['']
     



    })  
    this.isFormSubmitted=false; 
    
    this.managementwsiservice.getSchoolTerm().subscribe(data =>{
  
      this.li=data;
      this.lis=this.li;
      this.isPageLoading =false;
      
    })
    

  }
  //create modal
  openEditModel2(content,id){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
  }).catch((res) => { });
  this.managementwsiservice.schooltermById(id).subscribe(data =>{
    console.log(data);
    this.termID=id;
    //console.log(this.termID);
    this.term1Start=moment(data[0].term1Start).format('YYYY-MM-DD');
    this.term1End=moment(data[0].term1End).format('YYYY-MM-DD');
    this.term2Start=moment(data[0].term2Start).format('YYYY-MM-DD');
    this.term2End=moment(data[0].term2End).format('YYYY-MM-DD');
    this.term3Start=moment(data[0].term3Start).format('YYYY-MM-DD');
    this.term3End=moment(data[0].term3End).format('YYYY-MM-DD');
    this.term4Start=moment(data[0].term4Start).format('YYYY-MM-DD');
    this.term4End=moment(data[0].term4End).format('YYYY-MM-DD');

  


  })

}

openEditModel1(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log("Modal closed" + result);
}).catch((res) => { });

}
  get  Form(){
    return this.userForm.controls;
  }
  
///Function to disable date term1
getToday(): string {
  return new Date().toISOString().split('T')[0] 
}
getday(): string {
   
this.term1Start=this.term1Start;
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.term1Start
}
///Function to disable date term2
dayTerm2Start(): string {
  this.term1End=this.term1End;
  // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.term1End
}
dayTerm2End(): string {
   
this.term2Start=this.term2Start;
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.term2Start
}
///Function to disable date term3
dayTerm3Start(): string {
  this.term2End=this.term2End;
  // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.term2End
}
dayTerm3End(): string {
   
this.term3Start=this.term3Start;
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.term3Start
}
///Function to disable date term4
dayTerm4Start(): string {
  this.term3End=this.term3End;
  // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.term3End
}
dayTerm4End(): string {
   
this.term4Start=this.term4Start;
// this.minDate=new this.minDate().toISOString().split('T')[0] 
return this.term4Start
}


  
  onSubmit(){
    if(this.userForm.valid)
  {  
    
      


  let data ={
    
    "termID": 0,
    "term1Start":this.term1Start,
    "term1End":this.term1End,
    "term2Start":this.term2Start,
    "term2End":this.term2End,
    "term3Start":this.term3Start,
    "term3End":this.term3End,
    "term4Start":this.term4Start,
    "term4End":this.term4End
  
}
Swal.fire({
  title: 'Are you sure you want to Create  New Term',
  text: 'A New Term will be added',
  icon: 'question',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No'

}).
  then((result) => {
    if (result.value) {
      //nompumeleo

 
      this.managementwsiservice.createTerm(data).subscribe(res => {
        console.log(res);
        console.log("sucess");
      });
      ///Nompumelelo


      Swal.fire({
        timer: 5000,
        confirmButtonText: 'Ok',
        cancelButtonText: 'No',
        title: "Successful",
        text: 'A  New Term Will Be Created',

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
  
updateModal(){
  if(this.userForm.valid)
{  
  

let data ={
  
  "termID": 0,
  "term1Start":this.term1Start,
  "term1End":this.term1End,
  "term2Start":this.term2Start,
  "term2End":this.term2End,
  "term3Start":this.term3Start,
  "term3End":this.term3End,
  "term4Start":this.term4Start,
  "term4End":this.term4End

}
Swal.fire({
title: 'Are you sure you want to Update this Term',
text: 'A Term will be Updated',
icon: 'question',
showCancelButton: true,
confirmButtonText: 'Yes',
cancelButtonText: 'No'

}).
then((result) => {
  if (result.value) {
    //nompumeleo


    this.managementwsiservice.updateSchoolTermbyId(data).subscribe(res => {
      console.log(res);
      console.log("sucess");
    });
    ///Nompumelelo


    Swal.fire({
      timer: 5000,
      confirmButtonText: 'Ok',
      cancelButtonText: 'No',
      title: "Successful",
      text: 'A   Term Will Be Updated',

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
Cancel(){
  this.userForm.reset();
  this.isFormSubmitted = false;

  this.modalService.dismissAll();
 
    this.userForm.controls["term1Start"].setValue("");
    this.userForm.controls["term1End"].setValue("");
    this.userForm.controls["term2Start"].setValue("");
    this.userForm.controls["term2End"].setValue("");
    this.userForm.controls["term3Start"].setValue("");
    this.userForm.controls["term3End"].setValue("");
    this.userForm.controls["term4Start"].setValue("");
    this.userForm.controls["term4End"].setValue("");
 ;
}
} 
    
   
   
  


