import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderbarComponent } from './Components/siderbar/siderbar.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BusPointingEventsComponent } from './Components/bus-pointing-events/bus-pointing-events.component';
import { AddEmployeeComponent } from './Components/add-employee/add-employee.component';
import { EmployeesListComponent } from './Components/employees-list/employees-list.component';
const routes:Routes=[
  {path:'EmployeesBusEvents', component:BusPointingEventsComponent},
  {path:'AddEmployee',component:AddEmployeeComponent},
  {path:'EmployeesList',component:EmployeesListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
