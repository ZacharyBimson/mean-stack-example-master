import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employee: Employee = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  department: '',
  position: '',
  salary: 0,
  country: ''
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) {}

  saveEmployee(): void {
    const data: Employee = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      phoneNumber: this.employee.phoneNumber,
      department: this.employee.department,
      position: this.employee.position,
      salary: this.employee.salary,
      country: this.employee.country
    };

    this.employeeService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      department: '',
      position: '',
      salary: 0,
      country: ''
    };
  }
}
