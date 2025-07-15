import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api'; // Import the CategoryService
import type { Category } from '../services/api'; // Import the Category type (adjust path if needed)

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  categories: Category[] = []; // Initialize categories as an empty array with explicit type

  constructor(
    private categoryService: Api, // Inject the service
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef to trigger change detection
  ) {}

  ngOnInit() {
    // Call the API to load categories when the component is initialized
    this.loadCategories();
  }

  loadCategories() {
    // Fetch categories from the backend API
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories; // Set the categories to the fetched data

      // Manually trigger change detection after the categories are updated
      this.cdRef.detectChanges();
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.isDropdownOpen = false; // Close dropdown when mobile menu closes
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
