import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private service : AuthService, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(10),
          this.firstLetterCapitalValidator,
          this.noNumbersValidator,
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          this.passwordComplexityValidator,
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // ===============================   Validators   ===============================

  firstLetterCapitalValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    return value[0] === value[0].toUpperCase()
      ? null
      : { firstLetterNotCapital: true };
  }

  noNumbersValidator(control: AbstractControl) {
    return /\d/.test(control.value) ? { containsNumber: true } : null;
  }

  passwordComplexityValidator(control: AbstractControl) {
    const value = control.value || '';
    const errors: any = {};
    if (value.length < 8) errors.minLength = true;
    if (!/[A-Z]/.test(value)) errors.uppercase = true;
    if (!/[a-z]/.test(value)) errors.lowercase = true;
    if (!/\d/.test(value)) errors.number = true;
    if (!/[!@#$%^&*]/.test(value)) errors.special = true;
    return Object.keys(errors).length > 0 ? errors : null;
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  submit() {
    if (this.form.invalid) {

      Object.values(this.form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }

    this.service.signup(this.form.value).subscribe({
      next: (res: any) => {
        // alert(res.message);
        this.snackBar.open('Signup Successful', 'close', { duration : 3000 })
        this.router.navigate(['/feed'])
      },
      error: err => this.snackBar.open('Signup Failed', 'close', { duration : 3000 })
    });

    this.form.reset();
  }
}
