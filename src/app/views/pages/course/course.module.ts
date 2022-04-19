import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
 
  maxFilesize: 50,
  acceptedFiles: 'image/*, application/*'
};

import { CourseComponent } from './course.component'
import { ScheduleCourseComponent } from './schedule-course/schedule-course.component';
import { AssignCourseComponent } from './assign-course/assign-course.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { Roles } from 'src/app/model/role';
import { TrainingComponent } from './training/training.component';
import { DatePipe } from '@angular/common'

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: '',
        redirectTo: 'schedule-course',
        pathMatch: 'full'
      },
      {
        path: 'scheduled-training',
        component: ScheduleCourseComponent
      },
      {
        path: 'assign-training',
        component: AssignCourseComponent
      },
      {
        path: 'training',
        component: TrainingComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ScheduleCourseComponent, CourseComponent, AssignCourseComponent, TrainingComponent],
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
  bootstrap: [TrainingComponent]
})
export class CourseModule { }
