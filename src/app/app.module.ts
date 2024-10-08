import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './Components/footer/footer.component';
import { SiderbarComponent } from './Components/siderbar/siderbar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BusPointingEventsComponent } from './Components/bus-pointing-events/bus-pointing-events.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { FormsModule } from '@angular/forms';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
import { EmployeeProfileComponent } from './Components/employee-profile/employee-profile.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { EmployeeMapViewComponent } from './Components/employee-map-view/employee-map-view.component';
import { AddEmployeesExcelComponent } from './Components/add-employees-excel/add-employees-excel.component';
import { EmployeeHistoryComponent } from './Components/employee-history/employee-history.component';
import { DayMonthPipe } from './day-month.pipe';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { SignalRService } from './Services/signalR.service';
import { DriverComponent } from './Components/driver/driver.component';
import { BusComponentComponent } from './Components/bus-component/bus-component.component';
import { BusDetailsComponent } from './Components/bus-details/bus-details.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SiderbarComponent,
    NavbarComponent,
    BusPointingEventsComponent,
    AddEmployeeComponent,
    EmployeesListComponent,
    EmployeeProfileComponent,
    LoginComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    ForgetPasswordComponent,
    EmployeeMapViewComponent,
    AddEmployeesExcelComponent,
    EmployeeHistoryComponent,
    DayMonthPipe,
    AddUserComponent,
    DriverComponent,
    BusComponentComponent,
    BusDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
