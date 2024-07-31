import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderbarComponent } from './Components/siderbar/siderbar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BusPointingEventsComponent } from './Components/bus-pointing-events/bus-pointing-events.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
import { EmployeeProfileComponent } from './Components/employee-profile/employee-profile.component';
import { LoginComponent } from './Components/login/login.component';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
const routes: Routes = [
  {
    path: '',
    component:AuthLayoutComponent,
    children:[
    { path: 'login', component: LoginComponent },
    {path:'forgetpassword',component:ForgetPasswordComponent}
  ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'EmployeesBusEvents', component: BusPointingEventsComponent },
      { path: 'AddEmployee', component: AddEmployeeComponent },
      { path: 'EmployeesList', component: EmployeesListComponent },
      { path: 'EmployeeProfile', component: EmployeeProfileComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
