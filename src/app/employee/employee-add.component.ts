import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../services/employee-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  public employeeList :any = [];
  public mode: string= '';
  public selectedGroup: any;

  cities = [
    {id: 1, name: 'Product lead'},
    {id: 2, name: 'Project Manager'},
    {id: 3, name: 'Programmer'},
    {id: 4, name: 'QC'},
    {id: 5, name: 'Analys'},
    {id: 6, name: 'Support'},
    {id: 7, name: 'Finance'},
    {id: 8, name: 'Programmer'},
    {id: 9, name: 'Sales'},
    {id: 10, name: 'Data Analys'}
];

  public dataEmployee: any = [];
  public formInput = this.fb.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', Validators.required],
    basicSalary: ['', Validators.required],
    status: ['', Validators.required],
    group:['', Validators.required],
    description:['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private employeeService: EmployeeServiceService, 
  ) {
    this.employeeList = [];
   }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList(){
    this.employeeList = this.employeeService.getItems();
    this.updateEmployee()
  }
  
  updateEmployee() {
    if(this.data == null){
      this.mode = 'input'
      this.formInput.patchValue({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        basicSalary: '',
        status: '',
        group: '',
        description: '',
      });
    }else {
      this.mode='edit'
      this.formInput.patchValue({
        userName: this.data.userName,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        birthDate: this.data.birthDate,
        basicSalary: this.data.basicSalary,
        status: this.data.status,
        group: this.data.group,
        description: this.data.description,
      });
    }
  }


  addData() {
    const params = {
      userName: this.formInput.controls.userName.value,
      firstName: this.formInput.controls.firstName.value,
      lastName: this.formInput.controls.lastName.value,
      email: this.formInput.controls.email.value,
      birthDate: this.formInput.controls.birthDate.value,
      basicSalary: this.formInput.controls.basicSalary.value,
      status: this.formInput.controls.status.value,
      group: this.formInput.controls.group.value,
      description: this.formInput.controls.description.value,
    }
    if(this.data == null){
      this.employeeService.addEmployee(params)
      .subscribe(
        (res:any) => {
          this.toastr.success('Data save successfully', 'Success');
          this.back();
        },
        err => {
          this.toastr.error('Error while fetching the Records', err)
        }
      );
    }else {
      this.employeeService.updateEmployee(params, this.data.id)
      .subscribe(
        (res:any) => {
          this.toastr.warning('Data update successfully', 'Success');
          this.back();
        },
        err => {
          this.toastr.error('Error while fetching the Records', err)
        }
      );
    }
  }

  back() {
    this.dialogRef.close();
  }
}
