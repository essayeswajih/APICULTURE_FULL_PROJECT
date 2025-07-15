import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api, Category } from '../services/api'; // Your service to fetch categories

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer implements OnInit {
  isDropdownOpen = false;

  // Define categories for the footer dropdown
  categories: Category[] = [];

  constructor(
    private apiService: Api,  // Inject the API service to get categories
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef for manual change detection
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  // Method to load categories dynamically
  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Footer categories loaded:', this.categories);

      // If we're in the browser environment, apply change detection
      if (isPlatformBrowser(this.platformId)) {
        this.cdRef.detectChanges(); // Trigger change detection manually
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
