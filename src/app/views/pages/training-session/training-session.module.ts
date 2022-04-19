import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingSessionComponent } from './training-session.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TrainingSessionComponent
    
  },
]


@NgModule({
  declarations: [TrainingSessionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainingSessionModule { }
