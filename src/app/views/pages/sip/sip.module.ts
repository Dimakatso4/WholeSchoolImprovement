import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SipComponent } from './sip.component';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaptureSIPComponent } from './add-sip/add-sip.component';
import { ListSIPComponent } from './list-sip/list-sip.component';
import { DistrictComponent } from './district/district.component';
import { SchoolComponent } from './school/school.component';
import { CaptureSIPActionPlanComponent } from './add-action-plan/add-action-plan.component';
import { ListDistrictSIPComponent } from './district-sip/district-sip.component';

const routes: Routes = [
  {
    path: '',
    component: SipComponent,
    children: [
      {
        path: 'capture-sip',
        component: CaptureSIPComponent
      },
      {
        path: 'capture-sip-action-plan',
        component: CaptureSIPActionPlanComponent
      },
      {
        path: 'list-sip',
        component: ListSIPComponent
      },
      {
        path: 'download-sip',
        component: ListSIPComponent
      },
      {
        path: 'district',
        component: DistrictComponent

      },
      {
        path: 'school',
        component: SchoolComponent
      },
      {
        path: 'district-sip',
        component: ListDistrictSIPComponent
      }
    ]
  }
]



@NgModule({
  declarations: [
    DistrictComponent,
    SchoolComponent,
    SipComponent,
    CaptureSIPComponent,
    CaptureSIPActionPlanComponent,
    ListSIPComponent,
    ListDistrictSIPComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    NgbModule
  ],
  bootstrap: [SipComponent]
})
export class SipModule { }
