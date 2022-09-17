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
    const url = 'http://localhost:3000/employeeList';
    // const url = '../assets/data/employeeList.json';
    return this.http.get(url + '?page=' + page + '?sort=' + sort);
  }

  addEmployee(params: any): Observable<any> {
    const url = 'http://localhost:3000/employeeList/';
    return this.http.post(url, params);
  }

  updateEmployee(params: any, id: number): Observable<any> {
    const url = 'http://localhost:3000/employeeList/';
    return this.http.put(url+id, params);
  }

  deleteEmployee(id: number): Observable<any> {
    const url = 'http://localhost:3000/employeeList/'+id;
    return this.http.delete(url);
  }

  getItems() {
    return this.items;
  }

  add(employee: any) {
    this.items.push(employee);
  }
}
