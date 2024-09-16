import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: User = new User();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  addEmployee(): void {
    this.userService.register(this.user).subscribe({
      next: (response) => {
        this.successMessage = 'User added successfully!';
        this.errorMessage = '';
        console.log('User added successfully', response);
        this.router.navigate(['/AddUser']); 
      },
      error: (error) => {
        this.errorMessage = 'There was an error adding the User';
        this.successMessage = '';
        console.error('There was an error adding the User', error);
      }
    });
  }
}
