import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ListReportsComponent } from './list-reports/list-reports.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
     
      {
        path: 'dashboard',
        component: ListReportsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ReportsComponent,
    ListReportsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    NgbModule
  ]
})
export class ReportsModule { }
