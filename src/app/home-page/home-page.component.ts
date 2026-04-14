import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PropertyService } from '../Services/property.service';
import { Property } from '../Interfaces/property.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  properties: Property[] = [];
  filteredProperties: Property[] = [];
  searchText: string = '';

  showLogoutModal = false;
  // showLogoutModal = false;/

  constructor(
    private router: Router,
    private authService: AuthService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.properties = this.propertyService.getProperties();
    this.filteredProperties = this.properties;
  }

  filterProperties() {
    const search = this.searchText.toLowerCase();

    this.filteredProperties = this.properties.filter(property =>
      property.title?.toLowerCase().includes(search) ||
      property.state?.toLowerCase().includes(search) ||
      property.country?.toLowerCase().includes(search)
    );
  }

  viewDetails(property: any) {
    localStorage.setItem('selectedProperty', JSON.stringify(property));
    this.router.navigate(['/details']);
  }

 

  goHome() {
    this.router.navigate(['/home']);
  }

  goDetails() {
    this.router.navigate(['/details']);
  }


  confirmLogout() {
    this.authService.logout();
    this.router.navigate(['']);
    this.showLogoutModal = false;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

   logout() {
  this.router.navigate(['']);
}
}
