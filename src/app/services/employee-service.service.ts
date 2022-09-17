import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  public items:any= [];

  constructor(
    private http: HttpClient,
  ) { }

  getEmployee(page: number, sort: string): Observable<any> {
    // const url = 'http://localhost:3000/data';
    const url = '../assets/data/employeeList.json';
    return this.http.get(url + '?page=' + page + '?sort=' + sort);
  }

  addEmployee(params: any): Observable<any> {
    const url = 'http://localhost:3000/data/posts';
    return this.http.post(url, params);
  }

  getItems() {
    return this.items;
  }

  add(employee: any) {
    this.items.push(employee);
  }
}
