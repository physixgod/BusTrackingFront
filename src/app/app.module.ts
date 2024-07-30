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



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SiderbarComponent,
    NavbarComponent,
    BusPointingEventsComponent,
    AddEmployeeComponent,
    EmployeesListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
