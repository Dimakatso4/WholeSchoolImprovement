import { CommonModule } from "@angular/common";

import { NgbModule, NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagementWsiComponent } from './management-wsi.component';
import { DataTablesModule } from 'angular-datatables';
import { TermListComponent } from './term-list/term-list.component';
import { AddManagementComponent } from './add-management/add-management.component';
import { ReviewManagementComponent } from './review-management/review-management.component';
import { ManagementPlanHOComponent } from './management-plan-ho/management-plan-ho.component';

import { ManagementUserComponent } from './management-user/management-user.component';
import { CalenderComponent } from './calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DistrictComponent } from './district/district.component';
import { SchoolComponent } from './school/school.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { DistrictManagementPlanComponent } from './district-management-plan/district-management-plan.component';
import { PipPlanComponent } from './pip-plan/pip-plan.component';
import { DipComponent } from './dip/dip.component';
import { PIPReportComponent } from './pip-report/pip-report.component';
import { PIPReviewComponent } from './pip-review/pip-review.component';
import { NgModule } from "@angular/core";

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin

])

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

};


const routes: Routes = [
  {
    path: '',
    component: ManagementWsiComponent,
    children: [
      {
        path: 'management-plan',
        redirectTo: 'management-plan',
        pathMatch: 'full'
      },
      {
        path: 'term-list',
        component: TermListComponent
      },
      {
        path: 'Add-anagement',
        component: AddManagementComponent

      },
      {
        path: 'review-management',
        component: ReviewManagementComponent
      },
      {
        path: 'HO',
        component: ManagementPlanHOComponent
      },
     
      {
        path: 'end-user',
        component: ManagementUserComponent
      },
      {
        path: 'calender',
        component: CalenderComponent

        },
        {
          path:'District-Management',
          component:DistrictManagementPlanComponent  
        },
     
        {
          path: 'review-dip',
          component: DistrictComponent
  
        },
        {
          path: 'school',
          component: SchoolComponent
        },
        {
          path: 'Dip-Plan',
          component: PipPlanComponent
        },
        {
          path: 'DIP',
          component: DipComponent
        },
        {
          path: 'pip-reports',
          component: PIPReportComponent 
        },
        {
          path: 'pip-reports-review',
          component: PIPReviewComponent 
        },
       
      ]
    }
  
  ]

  @NgModule({
    declarations: [ManagementWsiComponent,TermListComponent, AddManagementComponent, ReviewManagementComponent,ManagementPlanHOComponent,ManagementUserComponent,CalenderComponent, DistrictManagementPlanComponent, PipPlanComponent, DipComponent, PIPReportComponent, PIPReviewComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule,
      FullCalendarModule,
      NgSelectModule,
      NgbAccordionModule,
      DropzoneModule
     
    
    ]
  })



@NgModule({
  declarations: [
    DistrictComponent,
    SchoolComponent, ManagementWsiComponent, TermListComponent, AddManagementComponent, ReviewManagementComponent, ManagementPlanHOComponent, ManagementUserComponent,  CalenderComponent, DistrictManagementPlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FullCalendarModule,
    NgSelectModule,
    NgbAccordionModule
   
  ], providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    NgbActiveModal
  ]
})
export class ManagementWsiModule { }
