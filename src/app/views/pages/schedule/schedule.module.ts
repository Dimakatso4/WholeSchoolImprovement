import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new/new.component';
// import { ResultsComponent } from './results/results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleComponent } from './schedule.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { Roles } from 'src/app/model/role';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
// import { CaptureElectionComponent } from './capture-election/capture-election.component';
import { ViewComponent } from './view/view.component';
import { ScheduledElectionsComponent } from './scheduled-elections/scheduled-elections.component';

// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// Ngx-chips
import { TagInputModule } from 'ngx-chips';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
// import { MonitoringToolComponent } from './monitoring-tool/monitoring-tool.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://sgbserviceapi-dev.azurewebsites.net/api/Upload/Document',
  maxFilesize: 500,
  acceptedFiles: 'image/*, application/*'
};



const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: NewComponent

      },
      {
        path: 'election',
        component: ViewComponent

      },
      {
        path: 'scheduled-elections',
        component: ScheduledElectionsComponent

      }

    ]
  }
]

@NgModule({
  declarations: [
    NewComponent,
    ViewComponent,
    ScheduleComponent,
    ScheduledElectionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    ChartsModule,
    DropzoneModule, // Ngx-dropzone-wrapper
    NgSelectModule, // Ng-select
    TagInputModule, // Ngx-chips
    DataTablesModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {}
    })
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    DatePipe
  ]
})
export class ScheduleModule { }
