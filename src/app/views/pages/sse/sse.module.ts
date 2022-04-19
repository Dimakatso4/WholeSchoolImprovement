import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddKpiComponent } from './add-kpi/add-kpi.component';
import { SseComponent } from './sse.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SseToolComponent } from './sse-tool/sse-tool.component';
import { CaptureSSEComponent } from './add-sse/add-sse.component';
import { ListSSEComponent } from './list-sse/list-sse.component';
import { SSEDistrictComponent } from './district/sse-district.component';
import { SSESchoolComponent } from './school/sse-school.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DataTablesModule } from 'angular-datatables';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {

};



const routes: Routes = [
  {
    path: '',
    component: SseComponent,
    children: [
      {
        path: 'capture-sse',
        component: CaptureSSEComponent
      },
      {
        path: 'list-sse',
        component: ListSSEComponent
      },
      {
        path: 'download-sse',
        component: AddKpiComponent
      },
      {
        path: 'district',
        component: SSEDistrictComponent
      },
      {
        path: 'school',
        component: SSESchoolComponent
      },
      {
        path: 'sse-tool',
        component: SseToolComponent
      }
    ]
  }
]



@NgModule({
  declarations: [
    SseComponent,
    AddKpiComponent,
    CaptureSSEComponent,
    ListSSEComponent,
    SseToolComponent,
    SSEDistrictComponent,
    SSESchoolComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgSelectModule,
    DataTablesModule,
    DropzoneModule,
    CustomFormsModule,
    NgbModule
  ],
  bootstrap: [SseComponent],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DROPZONE_CONFIG//DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
    NgbActiveModal
  ]
})
export class SseModule { }
