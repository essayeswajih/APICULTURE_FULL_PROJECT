import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Category, SubCategory } from '../../../services/api';
import { gsap } from 'gsap';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-subcategory-management',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './sub-category-management.html',
  styleUrls: ['./sub-category-management.scss'],
})
export class SubCategoryManagement implements OnInit {
  categories: Category[] = [];
  subcategories: SubCategory[] = [];
  newSubCategory: SubCategory = { id: 0, name: '', description: '', category_id: null as any };
  editMode = false;
  editSubCategoryId: number | null = null;

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
    this.loadSubCategories();
  }

  addSubCategory() {
    if (!this.newSubCategory.category_id) {
      alert('Please select a parent category');
      return;
    }

    if (this.editMode && this.editSubCategoryId) {
      this.apiService.updateSubCategory(this.editSubCategoryId, this.newSubCategory).subscribe(() => {
        this.resetForm();
        this.loadSubCategories();
      });
    } else {
      this.apiService.addSubCategory(this.newSubCategory).subscribe(() => {
        this.resetForm();
        this.loadSubCategories();
      });
    }
  }

  editSubCategory(sub: SubCategory) {
    this.newSubCategory = { ...sub };
    this.editMode = true;
    this.editSubCategoryId = sub.id;
  }

  deleteSubCategory(id: number) {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      this.apiService.deleteSubCategory(id).subscribe(() => this.loadSubCategories());
    }
  }

  resetForm() {
    this.newSubCategory = { id: 0, name: '', description: '', category_id: null as any };
    this.editMode = false;
    this.editSubCategoryId = null;
  }

  // Load parent categories
  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.cdRef.markForCheck();
    });
  }

  // Load subcategories + GSAP animation
  loadSubCategories() {
    this.apiService.getSubCategories().subscribe((subs) => {
      this.subcategories = subs;
      this.total = subs.length;
      this.pageIndex = 1;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          this.cdRef.detectChanges();
          const cards = document.querySelectorAll('.subcategory-card');
          gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 });
        }, 0);
      }
    });
  }

  // Pagination
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.total / this.pageSize) }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.pageIndex = page;
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
  }

  // Helper
  getCategoryName(category_id: number): string {
    const cat = this.categories.find((c) => c.id === category_id);
    return cat ? cat.name : 'N/A';
  }
}