import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Api, Category } from '../../services/api';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import this

@Component({
  selector: 'app-category-management',
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './category-management.html',
  styleUrls: ['./category-management.scss'],
})
export class CategoryManagement implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { id: 0, name: '', description: '' };
  editMode = false;
  editCategoryId: number | null = null;

  constructor(
    private apiService: Api, // Inject ApiService
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  // Add or update a category
  addCategory() {
    if (this.editMode && this.editCategoryId) {
      this.apiService.updateCategory(this.editCategoryId, this.newCategory).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      console.log('Adding new category:', this.newCategory)
      this.apiService.addCategory(this.newCategory).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }

  // Edit a category
  editCategory(category: Category) {
    this.newCategory = { ...category };
    this.editMode = true;
    this.editCategoryId = category.id;
  }

  // Delete a category
  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(() => this.loadCategories());
  }

  // Reset form after add/update
  resetForm() {
    this.newCategory = { id: 0, name: '', description: '' };
    this.editMode = false;
    this.editCategoryId = null;
  }

  // Load all categories from the API
  private loadCategories() {
    // Directly call the API without zone.js
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Categories loaded:', this.categories);

      if (isPlatformBrowser(this.platformId)) {
        // Apply GSAP animation after categories are loaded
        setTimeout(() => {
          // Manually trigger change detection after API call
          this.cdRef.detectChanges();

          const cards = document.querySelectorAll('.card');
          if (cards.length > 0) {
            // Apply GSAP animation
            gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
          }
        }, 0);
      }
    });
  }
}
