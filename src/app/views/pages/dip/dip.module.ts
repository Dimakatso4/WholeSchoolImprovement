import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DipComponent } from './dip.component';
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaptureDIPComponent } from './add-dip/add-dip.component';
import { ListDIPComponent } from './list-dip/list-dip.component';
import { CaptureDIPActionPlanComponent } from './add-action-plan/add-action-plan.component';

const routes: Routes = [
  {
    path: '',
    component: DipComponent,
    children: [
      {
        path: 'capture-dip',
        component: CaptureDIPComponent
      },
      {
        path: 'capture-dip-action-plan',
        component: CaptureDIPActionPlanComponent
      },
      {
        path: 'list-dip',
        component: ListDIPComponent
      },
      {
        path: 'download-dip',
        component: ListDIPComponent
      }
    ]
  }
]



@NgModule({
  declarations: [
    DipComponent,
    CaptureDIPComponent,
    CaptureDIPActionPlanComponent,
    ListDIPComponent
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
  bootstrap: [DipComponent]
})
export class DipModule { }
