import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemoNotificationComponent } from './memo-notification/memo-notification.component';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common'
import { MemoComponent } from '../memo/memo.component'

// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  // Change this to your upload POST address:
  // url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',//'https://httpbin.org/post', 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
  // maxFilesize: 50,
  // acceptedFiles: 'image/*,application/*'
};

const routes: Routes = [
  {
    path: '',
    component: MemoComponent,
    children: [
      {
        path: 'new',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'election-memo',
        component: MemoNotificationComponent
      }
    ]
  }
]


@NgModule({
  declarations: [MemoComponent, MemoNotificationComponent],
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
})
export class MemoModule { }

