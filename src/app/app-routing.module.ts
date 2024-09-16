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
import { AuthGuard } from './auth.guard';
import { EmployeeMapViewComponent } from './Components/employee-map-view/employee-map-view.component';
import { AddEmployeesExcelComponent } from './Components/add-employees-excel/add-employees-excel.component';
import { EmployeeHistoryComponent } from './Components/employee-history/employee-history.component';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { DriverComponent } from './Components/driver/driver.component';
import { BusComponentComponent } from './Components/bus-component/bus-component.component';
import { BusDetailsComponent } from './Components/bus-details/bus-details.component';

const routes: Routes = [
  {
    path: '',
    component:AuthLayoutComponent,
    children:[
    { path: 'login', component: LoginComponent },
    {path:'forgetpassword',component:ForgetPasswordComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' } 
  ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'EmployeesBusEvents', component: BusPointingEventsComponent, canActivate: [AuthGuard] },
      { path: 'AddEmployee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'EmployeesList', component: EmployeesListComponent, canActivate: [AuthGuard] },
      { path: 'EmployeeProfile', component: EmployeeProfileComponent, canActivate: [AuthGuard] },
      { path: 'Mapview', component: EmployeeMapViewComponent, canActivate: [AuthGuard] },
      { path: 'AddEmployeeExcel',component:AddEmployeesExcelComponent,canActivate:[AuthGuard]},
      { path: 'EmployeeHistory',component:EmployeeHistoryComponent,canActivate:[AuthGuard]},
      { path: 'AddUser',component:AddUserComponent,canActivate:[AuthGuard]},
      { path: 'AddDriver',component:DriverComponent,canActivate:[AuthGuard]},
      { path: 'Bus',component:BusComponentComponent,canActivate:[AuthGuard]} ,
      { path: 'BusDetails' ,component:BusDetailsComponent,canActivate:[AuthGuard]}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
