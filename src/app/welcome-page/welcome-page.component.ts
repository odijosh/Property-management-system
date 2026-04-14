import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  showDropdown = false;
  selectedRole = '';

  constructor(private router: Router) {}

  ngOnInit() {
  document.body.classList.add('welcome-page');
}

ngOnDestroy() {
  document.body.classList.remove('welcome-page');
}

  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }

  // onRoleSelect() {
  //   if (this.selectedRole === 'tenant') {
  //     this.router.navigate(['/user']);
  //   }

  //   if (this.selectedRole === 'landlord') {
  //     this.router.navigate(['/login']);
  //   }
  // }

 toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}

  selectRole(role: string) {
    if (role === 'tenant') {
      this.router.navigate(['/user']);
    }

    if (role === 'landlord') {
      this.router.navigate(['/login']);
    }

    this.showDropdown = false;
  }
}
