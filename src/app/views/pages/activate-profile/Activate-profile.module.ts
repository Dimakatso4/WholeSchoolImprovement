import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ActivateProfileComponent} from './activate-profile.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes = [
    {
      path: '',
      component: ActivateProfileComponent
    }
  ]
  
  

@NgModule({
    declarations:[ActivateProfileComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      SweetAlert2Module,
      ReactiveFormsModule
    

    ]
  })
  export class ActivateProfileModule { }