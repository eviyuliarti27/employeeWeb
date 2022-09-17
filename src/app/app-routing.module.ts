import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeAddComponent } from './employee/employee-add.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee-add', component: EmployeeAddComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
