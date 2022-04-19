import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibraryComponent } from './library.component';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';
// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";
import { BrowserModule } from '@angular/platform-browser'

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  // url: 'https://sgbserviceapi-dev.azurewebsites.net/api/Upload/Document',
  // url:  'https://localhost:5001/api/Upload/Document', 
  // maxFilesize: 50,
  // acceptedFiles: 'image/*, application/*'
};


const routes: Routes = [
  {
    path: '',
    component: LibraryComponent
  }
]
@NgModule({
  // declarations: [LibraryComponent],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,    
    DropzoneModule, // Ngx-dropzone-wrapper
    ChartsModule,
    NgSelectModule, // Ng-select
    DataTablesModule,
    CustomFormsModule, // Ngx-custom-validators,
    BrowserModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class LibraryModule { }
