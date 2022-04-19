import { Component, OnDestroy,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MeetingService } from "../meeting.service";
import { AppService } from 'src/app/app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnDestroy, OnInit {

  public data: any;
  public obj:any=[];
  public obj2:any=[];
  public userRole = this.appservice.getLoggedInUserRole();
  public dtOptions: DataTables.Settings = {};
  public emisCode = this.appservice.getLoggedInEmisCode();
  public districtCode = this.appservice.getLoggedInDistrictCode();
    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router, private http: HttpClient, private meetingService: MeetingService, private appservice:AppService) { }
  
  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        searching: true,
        ordering:  true
      };
      
     if(this.userRole == "DEO"){  
      this.meetingService.getMeetingByDistrict(this.districtCode).subscribe((res: any) => {
        this.data = res;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
     }else if(this.userRole == "SEO"){
      this.meetingService.getMeetingBySchool(this.emisCode).subscribe((res: any) => {
        this.data = res;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
      });
     }else if(this.userRole == "HO" || this.userRole == "PEO"){
        this.meetingService.getAllMeetings().subscribe((res: any) => {
          this.data = res;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
        });
      }else{
        this.meetingService.getAllMeetings().subscribe((res: any) => {
          this.data = res;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
      });
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  createMeeting(){
    this.router.navigate(['/meeting/create-meeting',]);
  }

  editMeeting(e){
    console.log(JSON.stringify(e));
    localStorage.setItem('editRecord',JSON.stringify(e));
    this.router.navigate(['/meeting/edit-meeting']);
  }
  
}
