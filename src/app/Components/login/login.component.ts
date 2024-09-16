import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginRequest = {
    login: '',
    password: '',
  };
  errorMessage: string | null = null;
  showPassword: boolean = false; // Initialize showPassword to false

  constructor(private userService: UserService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Toggle the visibility
  }

  onSubmit() {
    if (this.loginRequest.login && this.loginRequest.password) {
      this.userService.login(this.loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.errorMessage = null;
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['EmployeesBusEvents']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Username or Password Incorrect';
        },
      });
    }
  }
}
