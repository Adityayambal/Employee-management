import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private employees: Employee[] = [];
  private idCounter = 1;

  avatars = [
    'https://avatar.iran.liara.run/public',
    'https://avatar.iran.liara.run/public/boy',
    'https://avatar.iran.liara.run/public/girl',
    'https://avatar.iran.liara.run/public/boy?username=Scott',
    'https://avatar.iran.liara.run/public/girl?username=Maria',
    'https://avatar.iran.liara.run/public/#89',
    'https://avatar.iran.liara.run/public/#60'
  ];

  constructor() {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees);
      const maxId = this.employees.reduce((max, emp) => Math.max(max, emp.id), 0);
      this.idCounter = maxId + 1;
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  getAll(): Employee[] {
    return this.employees;
  }

  getById(id: number) {
    return this.employees.find(e => e.id === Number(id));
  }

  add(emp: any) {
    const newEmp: Employee = {
      ...emp,
      id: this.idCounter++,
      avatar: this.getRandomAvatar()
    };
    this.employees.push(newEmp);
    this.saveToLocalStorage();
  }

  update(id: number, empData: any) {
    const index = this.employees.findIndex(e => e.id === Number(id));
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...empData };
      this.saveToLocalStorage();
    }
  }

  delete(id: number) {
    this.employees = this.employees.filter(e => e.id !== Number(id));
    this.saveToLocalStorage();
  }

  private getRandomAvatar() {
    return this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  // private baseUrl = '';

  // constructor(private http: HttpClient) {
  //   const isLocalhost = window.location.hostname === 'localhost';
  //   this.baseUrl = isLocalhost ? 'http://localhost:3000/employees' : 'https://Employee-management.vercel.app/api/employees';
  // }

  // getAll(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.baseUrl);
  // }

  // getById(id: any): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  // }

  // add(employee: Employee): Observable<Employee> {
  //   return this.http.post<Employee>(this.baseUrl, employee);
  // }

  // update(id: any, employee: Employee): Observable<Employee> {
  //   return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee);
  // }

  // delete(id: any): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
