import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public registerForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { 
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
   if(this.registerForm.controls.username.value == 'member' && this.registerForm.controls.password.value == 'rahasia'){
    this.router.navigateByUrl('/dashboard');
   } else {
    this.toastr.error('Username and password is wrong')
    this.router.navigateByUrl('/login');
   }
  }
}
