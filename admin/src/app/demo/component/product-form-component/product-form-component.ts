import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { Product, Category, SubCategory } from '../../../services/api';  // ← adjust path if needed

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule
  ],
  templateUrl: './product-form-component.html',
  styleUrls: ['./product-form-component.scss']
})
export class ProductFormComponent implements OnChanges {

  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    discounted_price: 0,  // New field for discounted price
    image_url: 'https://api.apiculturegalai.tn/uploads/',           // New field for image URL
    image2_url: '',          // New field for secondary image URL
    image3_url: '',          // New field for tertiary image URL
    image4_url: '',          // New field for quaternary image URL
    promo: false,            // New field for promotional status
    buzzent: '',             // New field for buzz or marketing text
    rating: 5,               // New field for average rating
    num_ratings: 10,           // New field for number of ratings
    shipping_cost: 9.0,        // New field for shipping cost
    subcategory_id: 0,        // New field for subcategory ID
  };

  @Input() categories: Category[] = [];
  @Input() subcategories: SubCategory[] = [];
  @Input() editMode: boolean = false;

  // mohamed: show only subcategories of selected category.
  filteredSubcategories: SubCategory[] = [];

  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  submitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] || changes['subcategories']) {
      this.updateFilteredSubcategories();
    }
  }

  // mohamed: update subcategory options by category selection.
  onCategoryChange(categoryId: number): void {
    // mohamed: coerce to number because nz-select can emit string values.
    this.product.category_id = Number(categoryId);
    this.product.subcategory_id = 0;
    this.updateFilteredSubcategories();
  }

  private updateFilteredSubcategories(): void {
    // mohamed: normalize category id to match numeric subcategory.category_id.
    const categoryId = Number(this.product.category_id);
    this.filteredSubcategories = categoryId
      ? this.subcategories.filter(sub => Number(sub.category_id) === categoryId)
      : [];
  }

  onSubmit() {
    this.submitted = true;

    // Basic required check (you can expand this)
    if (!this.product.name || !this.product.price || !this.product.stock_quantity || !this.product.category_id) {
      return;
    }

    this.save.emit(this.product);
  }

  onCancel() {
    this.cancel.emit();
  }
}