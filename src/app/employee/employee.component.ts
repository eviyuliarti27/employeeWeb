import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfrimDialogComponent } from '../confrim-dialog/confrim-dialog.component';
import { EmployeeServiceService } from '../services/employee-service.service';
import { EmployeeAddComponent } from './employee-add.component';
import { ToastrService } from 'ngx-toastr';
import { DetailEmployeeComponent } from '../detail-employee/detail-employee.component';

export interface employeeElement {
  position: number;
  userName: string,
  firstName:string,
  lastName:string,
  email:string,
  birthDate:Date;
  basicSalary:number;
  status:string,
  group:string;
  description:Date;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  public dataEmployee: any = [];
  public searchData: any = [];
  public page: number = 1;
  public total: number = 0;

 
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private employeeService: EmployeeServiceService, 
  ) { 
  }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList(){
    const sort: string = 'asc';
    this.employeeService.getEmployee(this.page, sort)
    .subscribe(
      (res:any) => {
        this.dataEmployee = res;
        this.searchData = res
        this.total = res.length;
      },
      err => {
        this.toastr.error('Error while fetching the Records')
      }
    );
  }

  addData() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "600px"
    let dialogRef = this.dialog.open(EmployeeAddComponent, dialogConfig);  

    dialogRef.afterClosed().subscribe(
      (res:any) => {
        this.toastr.success('Data save successfully', 'Success');
        this.getEmployeeList();
      },
    )
  }

  edit(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = value
    dialogConfig.width = "600px"
    dialogConfig.autoFocus = true;
    this.dialog.open(EmployeeAddComponent, dialogConfig);
  }

  detail(value:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = value
    dialogConfig.width = "700px"
    dialogConfig.autoFocus = true;
    this.dialog.open(DetailEmployeeComponent, dialogConfig);
  }

  delete(value:any){
    const confirmDialog = this.dialog.open(ConfrimDialogComponent, {
      data: {
        title: 'Confirm Remove Employee',
        message: 'Are you sure, you want to remove an employee: ' + value.firstName +  ' ' + value.lastName
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.employeeService.deleteEmployee(value.id)
        .subscribe(
          (res:any) => {
            this.toastr.error('Delete successfull');
            this.getEmployeeList()
          },
          err => {
            this.toastr.error('Error while fetching the Records', err)
          }
        );
      }
    });
  }

  search(filterValue:string) {
    let filterValueLower = filterValue.toLowerCase();
    
    if(filterValue !== '' ) {
        this.dataEmployee= this.searchData.filter((employee:any) => employee.firstName.includes(filterValueLower));
      } else {
        this.getEmployeeList()
      }
 }

  pageChangeEvent(event: number){
    this.page = event;
    this.getEmployeeList();
  }
}
