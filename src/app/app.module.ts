import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { TrainingComponent } from './views/pages/training/training.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
// ngx-quill
import { QuillModule } from 'ngx-quill';

//
import { NewsfeedComponent } from './views/pages/newsfeed/newsfeed.component';
import { LibraryComponent } from './views/pages/library/library.component';
//import { ManagementReviewComponent } from './management-review/management-review.component';
//import { ManagementAddComponent } from './management-add/management-add.component';
import { PostnewsComponent } from './postnews/postnews.component';
// service
import { NewsfeedService } from './views/pages/newsfeed/newsfeed.service' ;

//service
import{ScheduleService} from './schedule-sse/schedule.service';
import { DocumentLibraryComponent } from './views/pages/document-library/document-library.component';




//




@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    TrainingComponent,
    NewsfeedComponent,
    LibraryComponent,
    PostnewsComponent,
    DocumentLibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule,
    DropzoneModule,
    QuillModule.forRoot()

  ],
  providers: [
NewsfeedService,

   
    ScheduleService,
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
