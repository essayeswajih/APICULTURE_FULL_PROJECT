import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { Api, Product } from '../../services/api';
import { HttpClientModule } from '@angular/common/http';
import { CartItem } from '../boutique/boutique';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';

let ScrollTrigger: any;
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then(module => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, AfterViewInit {

  products: Product[] = [];
  productChunks: Product[][] = []; // Grouped products for carousel items

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: Api,
    private RouterS: Router, // Inject Router for navigation
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    private toastService: ToastrService,
    private cartService: Cart // Inject Cart service
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

async ngAfterViewInit(): Promise<void> {
  if (isPlatformBrowser(this.platformId)) {
    const module = await import('gsap/ScrollTrigger');
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // ✅ FIX: Delay until DOM is truly ready
    setTimeout(() => {
      this.moveBee();
      this.moveBee1();
      this.fromLeftAnnimation('.c1');
      this.fromLeftAnnimation('.c2');
      this.fromLeftAnnimation('.c3');
      this.fromLeftAnnimation('.c4');
      this.fromLeftAnnimation('.c5');

      console.log("ScrollTrigger.refresh() called");
      ScrollTrigger.refresh();
    }, 300); // ⏱️ Increased delay to ensure elements are painted
  }
}

  private loadProducts(): void {
    this.apiService.getProducts("","").subscribe({
      next: (products) => {
        this.products = products;
        const isMobile = isPlatformBrowser(this.platformId) && window.innerWidth <= 767;
        const chunkSize = isMobile ? 1 : 4;
        this.productChunks = this.chunkArray(products, chunkSize);
        this.cdRef.detectChanges(); // Trigger change detection after updating data
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length > 0) {
              gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
            }
          }, 0);
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.cdRef.detectChanges(); // Trigger change detection on error to update UI
      }
    });
  }

  // Utility to group products into chunks for carousel
  private chunkArray(array: Product[], size: number): Product[][] {
    const chunks: Product[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  moveBee() {
    const moveBeeRandomly = () => {
      gsap.to('#bee', {
        x: 'random(200, 100vw)',
        y: 'random(5, 300vh)',
        duration: 4 + Math.random() * 4,
        ease: 'sine.inOut',
        onComplete: moveBeeRandomly,
      });
    };

    moveBeeRandomly();

    gsap.to('#bee', {
      scrollTrigger: {
        trigger: '#beeBox',
        start: 'top 10%',
        end: 'bottom 90%',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const speed = self.progress * 100;
          gsap.to('#bee', { duration: speed });
        },
      },
    });
  }
  
  fromLeftAnnimation(id:string): void {
    gsap.fromTo(id,
      { x: '-100%' },
      {
        x: '0%',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: id,
          start: 'top 80%',
          //end: 'top 50%',
          toggleActions: 'play none none reverse', // slides in on scroll down, out on scroll up reset or reverse
          markers:false,
        }
      });
  }
  moveBee1() {
    const moveBeeRandomly = () => {
      gsap.to('#bee1', {
        x: 'random(80vh, -200)',
        y: 'random(30vh, 300vh)',
        duration: 4 + Math.random() * 4,
        ease: 'sine.inOut',
        onComplete: moveBeeRandomly,
      });
    };

    moveBeeRandomly();

    gsap.to('#bee1', {
      scrollTrigger: {
        trigger: '#beeBox1',
        start: 'top 10%',
        end: 'bottom 90%',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          const speed = self.progress * 100;
          gsap.to('#bee1', { duration: speed });
        },
      },
    });
  }
      // Add product to cart
    addToCart(product: Product): void {
      if (isPlatformBrowser(this.platformId)) {
        // Retrieve existing cart items from localStorage
        const storedCart = localStorage.getItem('cartItems');
        let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
  
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
          // Increment quantity if item exists
          existingItem.quantity += 1;
        } else {
          // Add new item to cart
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
            this.toastService.success('Produit Ajouter Au Panier', 'Success', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          });
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Update cart item count in Cart service
        
        this.cdRef.detectChanges();
      }
    }
      goToProduct(id:number): void {
    // Navigate to the product details page
    this.RouterS.navigate(['/product', id]);
  }
}