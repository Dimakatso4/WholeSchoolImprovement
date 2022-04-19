import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

// Ng-ApexCharts
import { NgApexchartsModule } from "ng-apexcharts";

// Ng2-charts
import { ChartsModule } from 'ng2-charts';

import { SEODashboardComponent } from './seo-dashboard.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
 

const routes: Routes = [
  {
    path: '',
    component: SEODashboardComponent
  }
]
@NgModule({
  declarations: [SEODashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgbCollapseModule,
    DataTablesModule,
    ChartsModule
  ],
  providers: [
    DatePipe
  ]
})
export class SEODashboardModule { }
