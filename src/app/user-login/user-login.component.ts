import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Adjust path if needed

@Component({
  standalone: true,
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.required, this.mustBeJudeEmail]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('password')?.valueChanges.subscribe((value: string) => {
      if (value === 'Odi123') {
        this.loginError = '';
      }
    });
  }

  // mustContain195(control: AbstractControl): ValidationErrors | null {
  //   const email = control.value || '';
  //   return email.includes('195') ? null : { mustContain195: true };
  // }

  mustBeJudeEmail(control: AbstractControl): ValidationErrors | null {
  const email = control.value?.trim();
  return email === 'jude4@gmail.com'
    ? null
    : { mustBeJudeEmail: true };
}

  // onLogin(): void {
  //   const password = this.loginForm.get('password')?.value;

  //   if (this.loginForm.valid && password !== 'Odi123') {
  //     this.loginError = 'Invalid credentials';
  //     return;
  //   }

  //   if (this.loginForm.valid) {
  //     this.loginError = '';
  //     this.authService.login(); // Replace with real login logic
  //     this.router.navigate(['/dashboard/listing']); // Adjust route as needed
  //   } else {
  //     this.loginError = 'Please fill all required fields correctly';
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

  onLogin(): void {
  const password = this.loginForm.get('password')?.value;

  if (this.loginForm.valid && password !== 'user123') {
    this.loginError = 'Invalid credentials';
    return;
  }

  if (this.loginForm.valid) {
    this.loginError = '';
    this.authService.login();

    // ✅ GO TO HOME AFTER LOGIN
    this.router.navigate(['/home']);
  } else {
    this.loginError = 'Please fill all required fields correctly';
    this.loginForm.markAllAsTouched();
  }
}

 togglePassword() {
  this.showPassword = !this.showPassword;
}
}
