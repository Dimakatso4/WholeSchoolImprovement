import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DisputesComponent } from './disputes.component';
import { NewComponent } from './new/new.component';
import { AppealComponent } from './appeal/appeal.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { SchoolTableComponent } from './school-table/school-table.component';
import { DistrictComponent } from './district/district.component';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DataTablesModule } from 'angular-datatables';


const routes: Routes = [
  {
    path: '',
    component: DisputesComponent,
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'schools',
        component: SchoolTableComponent
      },
      {
        path: 'view',
        component: AppealComponent
      },
      {
        path: 'districts',
        component: DistrictComponent
      }
    ]
  }
]


@NgModule({
  declarations: [DisputesComponent, NewComponent, AppealComponent, ListComponent, SchoolTableComponent, DistrictComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule, 
    DataTablesModule,
    ReactiveFormsModule,
    CustomFormsModule, // Ngx-custom-validators
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask
  ]
})
export class DisputesModule { }
