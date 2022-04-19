import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ManagementPlanService } from './management-plan.service'
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  // url: 'https://sgbserviceapi-dev.azurewebsites.net/api/Upload/Document',
  // url:  'https://localhost:5001/api/Upload/Document', 
  // maxFilesize: 50,
  // acceptedFiles: 'image/*, application/*'
};


import { ManagementPlanComponent } from './management-plan.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementPlanComponent
  }
]
@NgModule({
  declarations: [ManagementPlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,    
    DropzoneModule, // Ngx-dropzone-wrapper
    ChartsModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class ManagementPlanModule { }
