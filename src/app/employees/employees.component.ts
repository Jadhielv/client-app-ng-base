import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  delete(employeeID: number) {
    const ans = confirm('Do you want to delete employee with id: ' + employeeID);
    if (ans) {
      this.employeeService.deleteEmployee(employeeID).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }
}
