import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { NewComponent } from './new/new.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DataTablesModule } from 'angular-datatables';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

  url: 'https://sgbelectionapi-dev.azurewebsites.net/api/Upload/Document',
 
  maxFilesize: 50,
  acceptedFiles: 'image/*, application/*'
};



const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'new-user',
        component: NewComponent,

      }
    ]
  }

]


@NgModule({
  declarations: [UsersComponent, NewComponent, EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule, // Ngx-custom-validators
    NgSelectModule, // Ng-select
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    DataTablesModule,
    DropzoneModule // Ngx-dropzone-wrapper

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, 
    NgbActiveModal
  ]
})
export class UsersModule { }
