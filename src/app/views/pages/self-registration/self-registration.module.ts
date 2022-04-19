import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { RouterModule, Routes } from '@angular/router';
import { SelfRegistrationComponent } from './self-registration.component';


const routes: Routes = [
  {
    path: '',
    component: SelfRegistrationComponent,
    children: [
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'manager',
        component: ManagerComponent
      }
    ]
  }
]




@NgModule({
  declarations: [
    AdminComponent,
    ManagerComponent,
    SelfRegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    AdminComponent,
    ManagerComponent

  ]
})
export class SelfRegistrationModule { }
