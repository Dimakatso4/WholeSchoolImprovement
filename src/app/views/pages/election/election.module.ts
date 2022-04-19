import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ElectionComponent } from './election.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { Roles } from 'src/app/model/role';
import { DatePipe } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';



import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { CaptureElectionComponent } from './capture-election/capture-election.component';
import { ViewComponent } from './view/view.component';
import { SchoolTableComponent } from './school-table/school-table.component';
import { DistrictComponent } from './district/district.component';
import { MonitoryViewComponent } from './monitory-view/monitory-view.component';
import { ConfirmMonitoringToolComponent } from './confirm-monitoring-tool/confirm-monitoring-tool.component';
import { DEODailyReportComponent } from './deo-daily-report/deo-daily-report.component';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MonitoringToolComponent } from './monitoring-tool/monitoring-tool.component';
import { ObserverFormComponent } from './observer-form/observer-form.component';
import { DistrictOfficerReportingComponent } from './district-officer-reporting/district-officer-reporting.component';
import { WeeklyDeoReportComponent } from './weekly-deo-report/weekly-deo-report.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProvincialOfficerReportingComponent } from './provincial-officer-reporting/provincial-officer-reporting.component';
import { WeeklyPeoReportComponent } from './weekly-peo-report/weekly-peo-report.component';
import { VotingComponent } from './voting/voting.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
  maxFilesize: 500,
  acceptedFiles: 'image/*, application/*'
};



const routes: Routes = [
  {
    path: '',
    component: ElectionComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'results',
        pathMatch: 'full'
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'capture-election',
        component: CaptureElectionComponent
      },
      {
        path: 'new',
        component: NewComponent

      },
      {
        path: 'view',
        component: ViewComponent

      },
      {
        path: 'district-weekly-report',
        component: DistrictOfficerReportingComponent

      },
      {
        path: 'schools',
        component: SchoolTableComponent

      },
      {
        path: 'monitoring-tool',
        component: MonitoringToolComponent

      },
      {
        path: 'complete-observer-form',
        component: ObserverFormComponent

      },
      {
        path: 'weekly-deo-report',
        component: WeeklyDeoReportComponent

      },
      {
        path: 'monitor-view',
        component: MonitoryViewComponent

      },
      {
        path: 'confirm-monitoring-tool',
        component: ConfirmMonitoringToolComponent

      },
      {
        path: 'districts',
        component: DistrictComponent

      },
      {
        path: 'daily-report',
        component: DEODailyReportComponent

      },
      {
        path: 'province-weekly-report',
        component: ProvincialOfficerReportingComponent

      },
      {
        path: 'weekly-peo-report',
        component: WeeklyPeoReportComponent

      },
      {
        path: 'voting',
        component: VotingComponent

      }
    ]
  }
]

@NgModule({
  declarations: [NotificationsComponent, DEODailyReportComponent, MonitoryViewComponent, ConfirmMonitoringToolComponent, SchoolTableComponent, DistrictComponent, ViewComponent, NewComponent, ResultsComponent, ElectionComponent, CaptureElectionComponent, MonitoringToolComponent, ObserverFormComponent, DistrictOfficerReportingComponent, WeeklyDeoReportComponent, ProvincialOfficerReportingComponent, WeeklyPeoReportComponent, VotingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ChartsModule,
    DropzoneModule, // Ngx-dropzone-wrapper
    CustomFormsModule, // Ngx-custom-validators
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    DataTablesModule

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    DatePipe
  ]
})
export class ElectionModule { }
