import { Component, OnInit, ElementRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import {ManagementWsiService} from '../management-wsi.service';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  public term1Start: any
  public term1End: any
  public term2Start: any
  public term2End: any
  public term3Start: any
  public term3End: any
  public term4Start: any
  public term4End: any
  public start:any
  public end:any
  public activityName :any
  public  startDate :any
  public  endDate: any
  public districtCode:any
  public calenderData=[]
  public userinfo:any
  public districtName:any
  lis=[]
  li:any;
  events: object;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this.lis)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
 currentEvents: EventApi[] = [];
 //currentEvents:lis[] =[];
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

 handleEvents(events: EventApi[]) {
  this.currentEvents = events;
 }

  //handleEvents(list:lis[])
   //{this.lis =list}

  constructor(private managementwsiservice: ManagementWsiService,
    private userservice: UsersService, 
    private appservice: AppService,) { }

ngOnInit(){

  this.userinfo=this.appservice.getLoggedInUserId();
     console.log(this.userinfo);
     this.userservice.getUserId(this.userinfo).subscribe((data:any)=>{
      this.districtCode =data.districtCode;
      this.districtName=data.districtName;
      console.log( "Current user info",this.districtName ,  this.districtCode)
     })
  setTimeout(() => {
this.managementwsiservice.getSchoolTerm().subscribe(data =>{
  
  this.li=data;
  this.lis=[];
  console.warn(data);
  for (let index = 0; index < this.li.length; index++) {
    const element = this.li[index];
   let Term1Data = {
      title:"Term1",
      start:this.li[index].term1Start,
      end:this.li[index].term1End,
      backgroundColor:'mustard',
      borderColor: '#727cf5'
      

    }
    this.calenderData.push(Term1Data)

    let Term2Data = {
      title:"Term2",
      start:this.li[index].term2Start,
      end:this.li[index].term2End,
      backgroundColor:'#ffd131d',
      borderColor: '#727cf5'

    }
    this.calenderData.push(Term2Data)
    let Term3Data = {
      title:"Term3",
      start:this.li[index].term3Start,
      end:this.li[index].term3End,
      backgroundColor:'#99a3a3',
      borderColor: '#727cf5'

    }
    this.calenderData.push(Term3Data)
    let Term4Data = {
      title:"Term4",
      start:this.li[index].term4Start,
      end:this.li[index].term4End,
      backgroundColor:  '#f6931d',
      borderColor: '#fbbc06'

    }
    this.calenderData.push(Term4Data)

  }

},err=>{
  console.log(err)
})

  },
   2000); 
////
setTimeout(() => {
  this.managementwsiservice.ManagementListView().subscribe(res =>{
    this.li=res;
  this.lis=[];

 
  console.log(this.li);
  console.warn(res);
  for (let index = 0; index < this.li.length; index++) {
    const element = this.li[index];
   let activity = {
      title:this.li[index].activityName,
      start:this.li[index].startDate,
      end:this.li[index].endDate,
      backgroundColor:'#f6931d',
      borderColor: '#fbbc06'
    }
    this.calenderData.push(activity)

   
   

  }

  
},err=>{
  console.log(err)
})

},
2000); 
//////
/*setTimeout(() => {
  this.managementwsiservice.GetAllSubDistrict(this.districtCode).subscribe(res =>{
    this.li=res;
    console.warn(res);
  this.lis=[];

  this.lis = this.lis.filter(function (res) {

    return res.status = "Plan Published" ;

  });
  console.log(this.lis);

  for (let index = 0; index < this.li.length; index++) {
    const element = this.li[index];
   let subActivity = {
      title:this.li[index].subActivity,
      start:this.li[index].subStartDate,
      end:this.li[index].subEndDate,
      backgroundColor:'primary',
      borderColor: '#fbbc06'
      

    }
    this.calenderData.push(subActivity,)

   
   

  }

  
},err=>{
  console.log(err)
})

},
2000); */
setTimeout(() => {
  this.calendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
   weekends: true,
    editable: true,
    displayEventTime: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    lazyFetching: true,
    nowIndicator: true,
    events: this.calenderData
   
  };
}, 3000);


}
handleDateClick(arg) {
  alert('date click! ' + JSON.stringify(arg))
 }


}
