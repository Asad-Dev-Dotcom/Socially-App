import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private service : AuthService, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (this.loginForm.invalid){
      Object.values(this.loginForm.controls).forEach((control) => control.markAllAsTouched())
      return;
    }

    this.service.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.snackBar.open('Login Successful', 'close', { duration : 3000 })
        localStorage.setItem('token', res.token)
        const token = res.token
        const data = this.service.decodeToken(token)
        this.service.setUser(data);
        this.loginForm.reset();
        this.router.navigate(['/feed']) 
      },
      error: err => {
        this.snackBar.open('Login Failed', 'close', { duration : 3000 })
      },
      complete: () => console.log('Login request completed')
    });
  }
}
