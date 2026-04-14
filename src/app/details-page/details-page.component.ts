import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {

  property: any = {};

  constructor(private router: Router) {
    const data = localStorage.getItem('selectedProperty');
    this.property = data ? JSON.parse(data) : {};
  }

  goHome() {
  this.router.navigate(['/home']);
  }

  goDetails() {
  this.router.navigate(['/details']);
  }


  logout() {
  this.router.navigate(['']);
}
}
