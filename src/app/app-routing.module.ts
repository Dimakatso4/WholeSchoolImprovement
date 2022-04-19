import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { Roles } from './model/role';
import { PostnewsComponent } from './postnews/postnews.component';


import { NewsfeedComponent } from './views/pages/newsfeed/newsfeed.component';

//
import { ScheduleSSEComponent } from './schedule-sse/schedule-sse.component';
//

//
import { LibraryComponent } from './views/pages/library/library.component';
//
import { DocumentLibraryComponent } from './views/pages/document-library/document-library.component'

const routes: Routes = [

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'disclaimer', loadChildren: () => import('./views/pages/profile/acknowledgement/acknowledgement.module').then(m => m.AcknowledgementModule) },
  {
    path: 'createprofile',
    loadChildren: () => import('./views/pages/profile/sgb/sgb.module').then(m => m.SgbModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/pages/homepage/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  {
    path: 'activate-profile',
    loadChildren: () => import('./views/pages/activate-profile/Activate-profile.module').then(m => m.ActivateProfileModule)
  },
  {
    path: 'Communique',
    loadChildren: () => import('./views/pages/communique/communique.module').then(m => m.CommiqueComponentModule)
  },
  {
    path: 'OLDLINK#1',
    loadChildren: () => import('./views/pages/first-login/first-login.module').then(m => m.FirstLoginModule)
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      //

      //
      { path: 'postnews', component: PostnewsComponent },
      //
      { path: 'newsfeed', component: NewsfeedComponent },
      //
      //
      { path: 'ScheduleSSE', component: ScheduleSSEComponent },
      //

      //
      { path: 'library', component: LibraryComponent },
      { path: 'document-library', component: DocumentLibraryComponent },
      //

      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'hodashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dashboard2/dashboard2.module').then(m => m.Dashboard2Module)
      },
      {
        path: 'nominations',
        loadChildren: () => import('./views/pages/nominations/nominations.module').then(m => m.NominationsModule)
      },
      {
        path: 'deodashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/deo-dashboard/deo-dashboard.module').then(m => m.DEODashboardModule)
      },
      {
        path: 'election-overview',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/seo-dashboard/seo-dashboard.module').then(m => m.SEODashboardModule)
      },
      {
        path: 'apps',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'election',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/election/election.module').then(m => m.ElectionModule)
      },
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'inauguration',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/inauguration/inauguration.module').then(m => m.InaugurationModule)
      },
      {
        path: 'induction',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/induction/induction.module').then(m => m.InductionModule)
      },
      {
        path: 'training-session',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/training-session/training-session.module').then(m => m.TrainingSessionModule)
      },
      {
        path: 'meeting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/meeting/meeting.module').then(m => m.MeetingModule)
      },
      {

        path: 'handover',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/handover/handover.module').then(m => m.HandoverModule)
      },
      {
        path: 'queries',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/queries/queries.module').then(m => m.QueriesModule)

      },
      {
        path: 'disputes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/disputes/disputes.module').then(m => m.DisputesModule)

      },
      {
        path: 'OLDmanagement-plan',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/management-plan/management-plan.module').then(m => m.ManagementPlanModule)

      },
      //

      ///
      {
        path: 'management-plan',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/management-wsi/management-wsi.module').then(m => m.ManagementWsiModule)

      },
      ///
      {
        path: 'legislative-framework',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/legislation/legislation.module').then(m => m.LegislationModule)

      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)

      },
      {
        path: 'voters-roll',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/voters-roll/voters-roll.module').then(m => m.VotersRollModule)

      },
      {
        path: 'course',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/course/course.module').then(m => m.CourseModule)

      },
      {
        path: 'schools',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/schools/schools.module').then(m => m.SchoolsModule)
      },
      {
        path: 'schoolprofiling',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/profiling/school-profiling.module').then(m => m.ProfilingModule)
      },
      {
        path: 'memo',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/memo/memo.module').then(m => m.MemoModule)
      },
      {
        path: 'sip',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/sip/sip.module').then(m => m.SipModule)
      },
      {
        path: 'dip',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dip/dip.module').then(m => m.DipModule)
      },
      {
        path: 'reports',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'sse',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/sse/sse.module').then(m => m.SseModule)
      },
      {
        path: 'reg',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/self-registration/self-registration.module').then(m => m.SelfRegistrationModule)
      },
      {
        path: 'action-plan',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/action-plan/action-plan.module').then(m => m.ActionPlanModule)
      }

      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
