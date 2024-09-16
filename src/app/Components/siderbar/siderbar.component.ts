import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Remove the login status from local storage
    localStorage.removeItem('isLoggedIn');
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
