import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { Roles } from 'src/app/model/role';
import {DataTablesModule} from 'angular-datatables';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HandoverComponent } from './handover.component';
import { NewComponent } from './new/new.component';
import { UploadComponent } from './upload/upload.component';
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
 
  maxFilesize: 50,
  acceptedFiles: 'image/*, application/*'
};

const routes: Routes = [
  {
    path: '',
    component: HandoverComponent,
    children: [
      {
        path: '',  
        pathMatch: 'full',
        component: HandoverComponent,
        canActivate: [AuthGuard],
        data: {
          userRoles: [
            // Roles.SEO,
            // Roles.DEO,
            // Roles.PEO,
            // Roles.PEM,
            // Roles.OFFICE_BEARERS,
            // Roles.OBSERVER,
            // Roles.PRINCIPAL
          ]
        }
      },
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [NewComponent, ListComponent, HandoverComponent, UploadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,// Ngx-dropzone-wrapper
    DataTablesModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, NgbActiveModal
  ],
  bootstrap: [HandoverComponent]
})
export class HandoverModule { }
