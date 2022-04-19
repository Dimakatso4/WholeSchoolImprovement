import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ScheduleService} from "./schedule.service";
import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';

@Component({
  selector: 'app-schedule-sse',
  templateUrl: './schedule-sse.component.html',
  styleUrls: ['./schedule-sse.component.scss']
})
export class ScheduleSSEComponent implements OnInit {
  requiredForm: FormGroup;
  public district:any
  public School: any
  public startDate: any;
  public endDate: any;
  constructor(private scheduleservice: ScheduleService , private fb: FormBuilder) {  this.myForm(); }
  myForm() {
    this.requiredForm = this.fb.group({
     district: ['', Validators.required ],
     School: ['', Validators.required ]
   
    
    });

  }
  create(){
    console.log(this.district)
    console.log(this.School)
   
let data ={
  
    "sseid": 0,
    "district":this.district,
    "school":this.School,
    "startDate":"2021-10-06T09:15:20.122Z",
    "endDate":"2021-10-06T09:15:20.122Z"
  

}
  }

  ngOnInit():void{
  }
}
