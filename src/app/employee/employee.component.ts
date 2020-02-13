import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employee$: Observable<Employee>;
  employeeID: number;

  constructor(private employeeService: EmployeeService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.employeeID = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employee$ = this.employeeService.getEmployee(this.employeeID);
  }
}
