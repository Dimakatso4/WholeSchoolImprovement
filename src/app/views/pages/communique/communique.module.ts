import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommuniqueComponent} from './communique.component';
const routes: Routes = [
    {
      path: '',
      component: CommuniqueComponent
    }
  ]
  
  

@NgModule({
    declarations:[CommuniqueComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule
    

    ]
  })
  export class CommiqueComponentModule { }