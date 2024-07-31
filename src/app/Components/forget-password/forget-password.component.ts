// forget-password.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  showResetFields: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService) { }

  onSendCode(): void {
    this.userService.forgetPassword(this.email).subscribe(
      response => {
        this.showResetFields = true;
        this.successMessage = 'Reset code sent to your email!';
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Failed to send reset code. Please try again.';
        this.successMessage = '';
      }
    );
  }

  onResetPassword(): void {
    this.userService.resetPassword(this.code, this.newPassword).subscribe(
      response => {
        this.successMessage = 'Password successfully reset!';
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Failed to reset password. Please try again.';
        this.successMessage = '';
      }
    );
  }
}
