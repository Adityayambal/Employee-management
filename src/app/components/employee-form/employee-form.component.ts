import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';


@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  id: any;
  isEditMode = false;
  avatars = [
    'https://avatar.iran.liara.run/public',
    'https://avatar.iran.liara.run/public/boy',
    'https://avatar.iran.liara.run/public/girl',
    'https://avatar.iran.liara.run/public/boy?username=Scott',
    'https://avatar.iran.liara.run/public/girl?username=Maria',
    'https://avatar.iran.liara.run/public/#89',
    'https://avatar.iran.liara.run/public/#60'

  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required,Validators.pattern('^[6-9]\\d{9}$')]],
      designation: ['', Validators.required],
      avatar: ['']
    });
    

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEditMode = true;
      this.service.getById(this.id).subscribe(emp => this.form.patchValue(emp));
    } else {
      this.form.patchValue({ avatar: this.getRandomAvatar() });
    }
  }

  getRandomAvatar() {
    return this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  formatFieldName(field: string): string {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  onSubmit() {
    if (this.form.invalid) {
      const firstInvalidField = Object.keys(this.form.controls).find(
        key => this.form.controls[key].invalid
      );
  
      const control = this.form.get(firstInvalidField!);
  
      let message = '';
  
      if (control?.hasError('required')) {
        message = `${this.formatFieldName(firstInvalidField!)} is required.`;
      } else if (control?.hasError('email')) {
        message = `Please enter a valid email address.`;
      } else if (control?.hasError('pattern') && firstInvalidField === 'contact') {
        message = `Please enter a valid 10-digit mobile number.`;
      } else {
        message = `Invalid value for ${this.formatFieldName(firstInvalidField!)}.`;
      }
  
      this.showStatus('error', 'Validation Error', message);
      return;
    }
  

    const employee = this.form.value;

    if (this.isEditMode) {
      this.service.update(this.id, employee).subscribe(() => {
        this.showStatus('success','Update','Employee updated sucessfully!')
        this.router.navigate(['/'])
      });
    } else {
      this.service.add(employee).subscribe(() => 
        {
        this.showStatus('success','Success','Employee added sucessfully!')
        this.router.navigate(['/'])
      
      });
    }
  }

  showStatus(type:any, title: string, message: string) {
    this.dialog.open(CommonDialogComponent, {
      width: '300px',
      data: { type, title, message }
    });
  }
}
