import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  deleteEmployee(id: number) {
    const dialogRef = this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { type: 'pending' ,  title: 'Delete Employee',message: 'Are you sure you want to delete this employee?'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employeeService.delete(id).subscribe(() => this.fetchEmployees());
          this.showStatus('success','Deleted','Employee deleted sucessfully!')
        }
      });

  }

  showStatus(type:any, title: string, message: string) {
    this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { type, title, message }
    });
  }
}
