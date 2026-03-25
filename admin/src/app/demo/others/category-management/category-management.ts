import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Category } from '../../../services/api';
import { gsap } from 'gsap';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './category-management.html',
  styleUrls: ['./category-management.scss'],
})
export class CategoryManagement implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  newCategory: Category = { id: 0, name: '', description: '', image_url: '' };
  editMode = false;
  editCategoryId: number | null = null;

  // Pagination
  pageIndex = 1;
  pageSize = 6;
  total = 0;

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  addCategory() {
    if (this.editMode && this.editCategoryId) {
      this.apiService.updateCategory(this.editCategoryId, this.newCategory).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    } else {
      this.apiService.addCategory(this.newCategory).subscribe(() => {
        this.resetForm();
        this.loadCategories();
      });
    }
  }
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.total / this.pageSize) }, (_, i) => i + 1);
  }
  editCategory(category: Category) {
    this.newCategory = { ...category };
    this.editMode = true;
    this.editCategoryId = category.id;
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.apiService.deleteCategory(id).subscribe(() => this.loadCategories());
    }
  }

  resetForm() {
    this.newCategory = { id: 0, name: '', description: '', image_url: '' };
    this.editMode = false;
    this.editCategoryId = null;
  }

  // Load categories + GSAP animation
  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.filteredCategories = [...categories];
      this.total = this.filteredCategories.length;
      this.pageIndex = 1;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.cdRef.detectChanges();
          const cards = document.querySelectorAll('.category-card');
          gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 });
        }, 0);
      }
    });
  }

  // Pagination change
  changePage(page: number) {
    this.pageIndex = page;
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
  }
}