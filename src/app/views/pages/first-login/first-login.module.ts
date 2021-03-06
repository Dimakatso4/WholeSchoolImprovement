import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLoginComponent } from './first-login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
      path: '',
      component: FirstLoginComponent
      
    },
  ]


@NgModule({
  declarations: [FirstLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,    
  ]
})
export class FirstLoginModule { }
