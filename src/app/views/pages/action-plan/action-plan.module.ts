import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ActionPlanComponent } from "./action-plan.component";
import { KpiListComponent } from "./kpi-list/kpi-list.component";
import { IntervateKpiComponent } from './intervate-kpi/intervate-kpi.component';
import { IntervationComponent } from './intervation/intervation.component';
import { IntervationListComponent } from './intervation-list/intervation-list.component';
import { ActionPlanReviewComponent } from './action-plan-review/action-plan-review.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DataTablesModule } from 'angular-datatables';


const routes: Routes = [
    {
      path: '',
      component: ActionPlanComponent,
      children: [
        {
          path: 'action-plan',
          redirectTo: 'action-plan',
          pathMatch: 'full'
        },
        {
          path: 'kpi-list',
          component: KpiListComponent
        },
        {
          path: 'intervate-kpi',
          component: IntervateKpiComponent
        },
        {
          path: 'intervation',
          component: IntervationComponent
        },
        {
          path: 'intervation-list',
          component: IntervationListComponent
        },
        {
          path: 'action-plan-review',
          component: ActionPlanReviewComponent
        },
        {
          path: 'school-list',
          component: SchoolListComponent
        },
      ]
    }
  
  ]
  
  @NgModule({
    declarations: [ActionPlanComponent, IntervateKpiComponent, IntervationComponent, IntervationListComponent, ActionPlanReviewComponent, SchoolListComponent, KpiListComponent],
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
    ]
  })
  export class ActionPlanModule { }
