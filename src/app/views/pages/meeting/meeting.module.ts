import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MeetingComponent } from './meeting.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import {DataTablesModule} from 'angular-datatables';
import { DatePipe } from '@angular/common'

// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MeetingService } from "./meeting.service";
import { DeoMeetingComponent } from './deo-meeting/deo-meeting.component';
import { PeoMeetingComponent } from './peo-meeting/peo-meeting.component';
import { MeetingInvitationComponent } from './meeting-invitation/meeting-invitation.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  
  // Change this to your upload POST address:
  url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
  maxFilesize: 50,
  acceptedFiles: 'image/*,application/*'
};


const routes: Routes = [
  {
    path: '',
    component: MeetingComponent,
    children: [
      {
        path: 'new',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'meetings',
        component: MeetingsComponent
      },
      {
        path: 'edit-meeting',
        component: EditMeetingComponent
      },
      {
        path: 'create-meeting',
        component: CreateMeetingComponent
      },
      {
        path: 'deo-meeting',
        component: DeoMeetingComponent
      },
      {
        path: 'peo-meeting',
        component: PeoMeetingComponent
      },
      {
        path: 'meeting-invitation',
        component: MeetingInvitationComponent
      }
    ]
  }
]

@NgModule({
  declarations: [MeetingComponent, MeetingsComponent, EditMeetingComponent, CreateMeetingComponent, DeoMeetingComponent, PeoMeetingComponent, MeetingInvitationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    DropzoneModule, // Ngx-dropzone-wrapper
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    DatePipe
  ],
  bootstrap: [MeetingsComponent]
})
export class MeetingModule { }
