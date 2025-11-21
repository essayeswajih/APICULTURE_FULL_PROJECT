import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Api, Product } from '../services/api';
import { CartItem } from '../pages/boutique/boutique';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../services/cart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturedProducts {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: Api,
    private RouterS: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
    private cartService: Cart
  ) {}
  
  @Input() products: Product[] = [];
  swiperConfig = {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.products-carousel-next',
      prevEl: '.products-carousel-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    }
  };
  addToCart(product: Product): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cartItems');
      let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image_url ?? null,
          price: product.price,
          quantity: 1
        };
        cartItems.push(cartItem);
        this.cartService.add();
      }

      this.toastService.success('Produit ajouté au panier', 'Succès', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
      });

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cdRef.detectChanges();
    }
  }
    goToProduct(id: number): void {
    this.RouterS.navigate(['/product', id]);
  }

  /*products = [
    {
      name: "Greek Style Plain Yogurt",
      img: "/assets/images/product-thumb-10.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Pure Squeezed No Pulp Orange Juice",
      img: "/assets/images/product-thumb-11.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Fresh Oranges",
      img: "/assets/images/product-thumb-12.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Gourmet Dark Chocolate Bars",
      img: "/assets/images/product-thumb-13.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    }
  ];*/
}