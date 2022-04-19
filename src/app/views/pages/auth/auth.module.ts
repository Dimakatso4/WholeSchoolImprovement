import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ConfirmresetComponent } from './confirmreset/confirmreset.component';
import { ParentLoginComponent } from './parent-login/parent-login.component';
import { ParentSchoolComponent } from './parent-school/parent-school.component'
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'userlogin',
        component: UserLoginComponent
      },
      {
        path: 'forgot',
        component: PasswordresetComponent
      },
      {
        path: 'reset',
        component: ConfirmresetComponent
      },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent
      },
      {
        path: 'parent-login',
        component: ParentLoginComponent
      },
      {
        path: 'parent-school',
        component: ParentSchoolComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    AuthComponent, 
    VerifyOtpComponent, 
    UserLoginComponent, 
    ParentLoginComponent,
    PasswordresetComponent, 
    ParentSchoolComponent,
    ConfirmresetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomFormsModule, // Ngx-custom-validators
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
  ]
})
export class AuthModule { }
