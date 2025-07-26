import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CartItem } from '../boutique/boutique';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product, Api } from '../../services/api';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './single-product.html',
  styleUrls: ['./single-product.scss']
})
export class SingleProduct implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  addToCartForm: FormGroup;
  error: string | null = null;
  selectedImage: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private api: Api, // Inject Api service
    private toastService: ToastrService, // Inject ToastrService for notifications
    private cartService: Cart // Inject Cart service
  ) {
    // Initialize reactive form for adding to cart
    this.addToCartForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Fetch product data based on route param
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.api.getProductById(productId).subscribe({
          next: (product) => {
            this.product = product;
            this.error = null;
            // Set SEO meta tags
            this.title.setTitle(`${product.name} - Apiculture Galai`);
            this.selectedImage= product.image_url || "";
            this.meta.updateTag({
              name: 'description',
              content: `${product.description || 'Produit apicole de qualité'} - Découvrez nos produits apicoles de qualité chez Apiculture Galai.`
            });
            this.cdr.detectChanges(); // Ensure UI updates
          },
          error: (err) => {
            this.error = err.message || 'Failed to load product';
            this.product = null;
            if (err.status === 404) {
              this.error = 'Product not found';
            }
            this.cdr.detectChanges();
          }
        });
      }
    });

    // GSAP animations
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.product-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.product-img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4
      });
      gsap.from('.product-details', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });
    }
  }

  // Update quantity
  updateQuantity(value: number): void {
    if (value >= 1 && this.product && value <= this.product.stock_quantity) {
      this.quantity = value;
      this.addToCartForm.patchValue({ quantity: this.quantity });
      this.cdr.detectChanges();
    }
  }

  // Add product to cart
  addToCart(): void {
    if (this.addToCartForm.valid && this.product) {
      const cartItem: CartItem = {
        id: this.product.id,
        name: this.product.name,
        image: this.product.image_url || '',
        price: this.product.price,
        quantity: this.quantity
      };

      if (isPlatformBrowser(this.platformId)) {
        let cartItems: CartItem[] = [];
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
          cartItems = JSON.parse(storedCart);
          const existingItem = cartItems.find(item => item.id === cartItem.id);
          if (existingItem) {
            existingItem.quantity += this.quantity;
          } else {
            cartItems.push(cartItem);
            this.cartService.add();
          }
        } else {
          cartItems.push(cartItem);
          
        }
         this.toastService.success('Produit Ajouter Au Panier', 'Success', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }

      // GSAP animation for feedback
      if (isPlatformBrowser(this.platformId)) {
        gsap.to('.btn-warning', {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        });
      }
    }
  }
  selectImage(image?: string): void {
    this.selectedImage = image ?? ""; // Update main image
    this.cdr.detectChanges(); // Ensure UI updates
  }
}