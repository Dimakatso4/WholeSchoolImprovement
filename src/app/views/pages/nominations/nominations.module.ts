import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominationsComponent } from './nominations.component';
import { NominateComponent } from './nominate/nominate.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { ParentDecisionComponent } from './parent-decision/parent-decision.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: NominationsComponent,
    children: [
      {
        path: 'nominate',
        redirectTo: 'nominate',
        pathMatch: 'full'
      },
      {
        path: 'nominate',
        component: NominateComponent
      },
      {
        path: 'countdown',
        component: CountdownComponent
      },
      {
        path: 'parent-decision',
        component: ParentDecisionComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    NominationsComponent,
    CountdownComponent,
    NominateComponent,
    ParentDecisionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    DataTablesModule
  ]
})
export class NominationsModule { }
