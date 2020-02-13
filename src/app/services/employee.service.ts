import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  myAppUrl: string;
  myApiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Employees/';
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getEmployee(employeeID: number): Observable<Employee> {
    return this.http.get<Employee>(this.myAppUrl + this.myApiUrl + employeeID)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveEmployee(employee: any): Observable<Employee> {
    return this.http.post<Employee>(this.myAppUrl + this.myApiUrl, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateEmployee(employeeID: number, employee: any): Observable<Employee> {
    return this.http.put<Employee>(this.myAppUrl + this.myApiUrl + employeeID, JSON.stringify(employee), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteEmployee(employeeID: number): Observable<Employee> {
    return this.http.delete<Employee>(this.myAppUrl + this.myApiUrl + employeeID)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
