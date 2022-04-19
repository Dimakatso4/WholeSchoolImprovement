import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InductionComponent } from './induction.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes: Routes = [
  {
    path: '',
    component: InductionComponent
    
  }
]


@NgModule({
  declarations: [InductionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ]
})
export class InductionModule { }
