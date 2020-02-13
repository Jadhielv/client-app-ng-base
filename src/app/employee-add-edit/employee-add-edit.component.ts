import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formFirstName: string;
  formLastName: string;
  formCountry: string;
  formEmail: string;
  formState: string;
  formCity: string;
  formStreet: string;
  formZipCode: string;
  formUserName: string;
  employeeID: number;
  errorMessage: any;
  existingEmployee: Employee;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formFirstName = 'firstName';
    this.formLastName = 'lastName';
    this.formCountry = 'country';
    this.formEmail = 'email';
    this.formState = 'state';
    this.formCity = 'city';
    this.formStreet = 'street';
    this.formZipCode = 'zipCode';
    this.formUserName = 'userName';

    if (this.avRoute.snapshot.params[idParam]) {
      this.employeeID = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        employeeID: 0,
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        country: ['', [Validators.required]],
        email: ['', [Validators.required]],
        state: '',
        city: '',
        street: '',
        zipCode: '',
        userName: ['', [Validators.required]]
      });
  }

  ngOnInit() {
    if (this.employeeID > 0) {
      this.actionType = 'Edit';
      this.employeeService.getEmployee(this.employeeID)
        .subscribe(data => (
          this.existingEmployee = data,
          this.form.controls[this.formFirstName].setValue(data.firstName),
          this.form.controls[this.formLastName].setValue(data.lastName),
          this.form.controls[this.formCountry].setValue(data.country),
          this.form.controls[this.formEmail].setValue(data.email),
          this.form.controls[this.formState].setValue(data.state),
          this.form.controls[this.formCity].setValue(data.city),
          this.form.controls[this.formStreet].setValue(data.street),
          this.form.controls[this.formZipCode].setValue(data.zipCode),
          this.form.controls[this.formUserName].setValue(data.userName)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      const employee: Employee = {
        createdAt: new Date(),
        ipAddress: '',
        firstName: this.form.get(this.formFirstName).value,
        lastName: this.form.get(this.formLastName).value,
        country: this.form.get(this.formCountry).value,
        email: this.form.get(this.formEmail).value,
        state: this.form.get(this.formState).value,
        city: this.form.get(this.formCity).value,
        street: this.form.get(this.formStreet).value,
        zipCode: this.form.get(this.formZipCode).value,
        userName: this.form.get(this.formUserName).value
      };

      this.employeeService.saveEmployee(employee)
        .subscribe((data) => {
          this.router.navigate(['/employee', data.employeeID]);
        });
    }

    if (this.actionType === 'Edit') {
      const employee: Employee = {
        employeeID: this.existingEmployee.employeeID,
        createdAt: this.existingEmployee.createdAt,
        ipAddress: this.existingEmployee.ipAddress,
        firstName: this.form.get(this.formFirstName).value,
        lastName: this.form.get(this.formLastName).value,
        country: this.form.get(this.formCountry).value,
        email: this.form.get(this.formEmail).value,
        state: this.form.get(this.formState).value,
        city: this.form.get(this.formCity).value,
        street: this.form.get(this.formStreet).value,
        zipCode: this.form.get(this.formZipCode).value,
        userName: this.form.get(this.formUserName).value
      };
      this.employeeService.updateEmployee(employee.employeeID, employee)
        .subscribe((data) => {
          this.goToDetails();
        });
    }
  }

  goToDetails() {
    this.router.navigate(['/']);
  }

  cancel() {
    this.goToDetails();
  }

  get firstName() { return this.form.get(this.formFirstName); }
  get lastName() { return this.form.get(this.formLastName); }
  get country() { return this.form.get(this.formCountry); }
  get email() { return this.form.get(this.formEmail); }
  get state() { return this.form.get(this.formState); }
  get city() { return this.form.get(this.formCity); }
  get street() { return this.form.get(this.formStreet); }
  get zipCode() { return this.form.get(this.formZipCode); }
  get userName() { return this.form.get(this.formUserName); }
}
