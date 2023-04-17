import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: DashboardComponent,
  },
  { path: 'dashboard', pathMatch: 'prefix', component: DashboardComponent },
  { path: 'detail', pathMatch: 'prefix', component: ActivityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
