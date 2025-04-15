import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './components/record/record.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsListingComponent } from './components/students-listing/students-listing.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'record',
    component: RecordComponent,
  },
  {
    path: 'students-listing',
    component: StudentsListingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
