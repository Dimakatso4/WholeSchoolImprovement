import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InaugurationComponent } from './inauguration.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: InaugurationComponent
    
  },
]

@NgModule({
  declarations: [InaugurationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InaugurationModule { }
