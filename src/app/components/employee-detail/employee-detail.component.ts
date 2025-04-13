import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: false,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee:any;

  constructor(private route: ActivatedRoute, private service: EmployeeService) {}

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    // this.service.getById(id).subscribe(emp => this.employee = emp);
    this.employee = this.service.getById(id)
  }
}
