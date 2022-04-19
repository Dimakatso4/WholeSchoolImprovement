import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoveringBodyQueriesComponent } from './govering-body-queries/govering-body-queries.component';
import { DistrictElectoralofficerQueriesComponent } from './district-electoralofficer-queries/district-electoralofficer-queries.component';
import { Routes, RouterModule } from '@angular/router'
import { QueriesComponent } from './queries.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: QueriesComponent,
    children: [
      {
        path: 'governing-body',
        component: GoveringBodyQueriesComponent
      },
      {
        path: 'district-electoral-officer',
        component: DistrictElectoralofficerQueriesComponent
      }
    ]
  },
]


@NgModule({
  declarations: [GoveringBodyQueriesComponent, DistrictElectoralofficerQueriesComponent,QueriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule, // Ngx-custom-validators
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask
  ]
})
export class QueriesModule { }
