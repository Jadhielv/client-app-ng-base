import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';


const routes: Routes = [
  { path: '', component: EmployeesComponent, pathMatch: 'full' },
  { path: 'employee/:id', component: EmployeeComponent },
  { path: 'add', component: EmployeeAddEditComponent },
  { path: 'employee/edit/:id', component: EmployeeAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
