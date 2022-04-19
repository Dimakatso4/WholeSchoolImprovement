import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsfeedComponent } from './newsfeed.component';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// ngx-quill
import { QuillModule } from 'ngx-quill';
//import {app.module} 

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'newsfeed',
        component: NewsfeedComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    NewsfeedComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    QuillModule.forRoot()
  ]
})
export class NewsfeednewsModule { }
  