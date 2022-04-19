import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SchoolProfilingComponent } from './school-profiling.component';
import { ColorPickerModule } from 'ngx-color-picker';

const routes: Routes = [
  {
    path: '',
    component: SchoolProfilingComponent,
    children: [
      {
        path: 'profiling',
        component: SchoolProfilingComponent
      }
    ]
  }
]



@NgModule({
  declarations: [
    SchoolProfilingComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    ColorPickerModule,
    NgbModule
  ],
  bootstrap: [SchoolProfilingComponent]
})
export class ProfilingModule { }
