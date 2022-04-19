import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';


import { SchoolsComponent } from './schools.component';
import { PairingComponent } from './pairing/pairing.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';

const routes: Routes = [
  {
    path: '',
    component: SchoolsComponent,
    children: [
      {
        path: '',
        redirectTo: 'pairing',
        pathMatch: 'full'
      },
      {
        path: 'pairing',
        component: PairingComponent
      },
      {
        path: 'manage-schools',
        component: ManageSchoolsComponent
      },
    ]
  }
]

@NgModule({
  declarations: [SchoolsComponent, PairingComponent, ManageSchoolsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
  ]
})
export class SchoolsModule { }