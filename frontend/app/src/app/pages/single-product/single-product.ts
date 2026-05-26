import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Product, Api, Category } from '../../services/api';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';
import { SimilarProducts } from "../../components/similar-products/similar-products";
import { CartItem } from '../boutique/boutique';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SimilarProducts],
  templateUrl: './single-product.html',
  styleUrls: ['./single-product.scss']
})
export class SingleProduct implements OnInit, AfterViewInit, OnDestroy {
  product: Product | null = null;
  quantity: number = 1;
  addToCartForm: FormGroup;
  error: string | null = null;
  selectedImage: string = '';
  isLoading: boolean = true;
  categories: Category[] = [];
  categoryProductCounts: Record<number, number> = {};
  similarProducts: Product[] = [];

  @ViewChild('zoomContainer') zoomContainer!: ElementRef<HTMLDivElement>;

  private img!: HTMLImageElement;
  private lens!: HTMLElement;
  private result!: HTMLElement;
  private zoomLevel: number = 1.5;

  // To store event listeners so we can remove them later
  private unlistenFns: (() => void)[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private api: Api,
    private toastService: ToastrService,
    private cartService: Cart,
    private renderer: Renderer2
  ) {
    this.addToCartForm = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productSlug = params.get('slug');
      if (productSlug) {
        this.isLoading = true;
        this.api.getProductBySlug(productSlug).subscribe({
          next: (product) => {
            this.product = product;
            this.selectedImage = product.image_url || '';
            this.title.setTitle(`${product.name} - Apiculture Galai`);
            this.meta.updateTag({
              name: 'description',
              content: product.description || 'Produit apicole de qualité chez Apiculture Galai.'
            });
            this.setProductSchema(product);
            this.loadSimilarProducts();
            this.isLoading = false;
            this.cdr.detectChanges();
            setTimeout(() => this.setupZoom(), 500);
          },
          error: (err) => {
            this.error = err.status === 404 ? 'Produit non trouvé' : 'Erreur de chargement';
            this.product = null;
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      }
    });

    this.api.getCategories().subscribe(cats => {
      this.categories = cats;
      this.cdr.detectChanges();
    });

    this.loadCategoryProductCounts();

    // GSAP animations (only browser)
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.product-section', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.from('.product-img', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'power3.out', delay: 0.4 });
      gsap.from('.product-details', { opacity: 0, x: 50, duration: 1, ease: 'power3.out', delay: 0.6 });
    }

  }

  ngAfterViewInit(): void {
    // Initial zoom setup after product loads
    if (this.product) {
      this.cdr.detectChanges();
      setTimeout(() => this.setupZoom(), 200);
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    // Clean up event listeners to prevent memory leaks
    this.unlistenFns.forEach(fn => fn());
    this.unlistenFns = [];
    this.cdr.markForCheck();
    this.cdr.detach();
  }

  private loadSimilarProducts(): void {
    if (!this.product) return;
    this.api.getProducts('', '', '').subscribe(products => {
      this.similarProducts = products
        .filter(p => p.subcategory_id === this.product?.subcategory_id || p.category_id === this.product?.category_id  && p.id !== this.product?.id)
        .slice(0, 30); // Limit to 30 similar products
      this.cdr.detectChanges();
    });
  }

  private loadCategoryProductCounts(): void {
    this.api.getProducts('', '', '').subscribe({
      next: (products) => {
        this.categoryProductCounts = products.reduce<Record<number, number>>((counts, product) => {
          const categoryId = Number(product.category_id);
          counts[categoryId] = (counts[categoryId] || 0) + 1;
          return counts;
        }, {});
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load category product counts:', err);
      }
    });
  }

  updateQuantity(value: number): void {
    if (value >= 1) {
      this.quantity = value;
      this.addToCartForm.patchValue({ quantity: this.quantity });
    }
  }

  addToCart(): void {
    if (!this.addToCartForm.valid || !this.product) return;

    const price = this.product.discounted_price && this.product.discounted_price > 0
      ? this.product.discounted_price
      : this.product.price;

    const cartItem: CartItem = {
      id: this.product.id,
      name: this.product.name,
      image: this.product.image_url || '',
      price: price,
      quantity: this.quantity,
      shipping_cost: this.product.shipping_cost || 9
    };

    if (isPlatformBrowser(this.platformId)) {
      let cartItems: CartItem[] = [];
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        cartItems = JSON.parse(stored);
        const existing = cartItems.find(item => item.id === cartItem.id);
        if (existing) {
          existing.quantity += this.quantity;
        } else {
          cartItems.push(cartItem);
          this.cartService.add();
        }
      } else {
        cartItems.push(cartItem);
        this.cartService.add();
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      this.toastService.success('Produit ajouté au panier !', 'Succès', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true
      });

      gsap.to('.btn-warning', { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
    }
  }

  selectImage(image?: string): void {
    this.selectedImage = image || this.product?.image_url || '';
    this.cdr.detectChanges();
    // Re-setup zoom after image change
    setTimeout(() => this.setupZoom(), 150);
    this.cdr.detectChanges();
  }

private setupZoom(): void {
  // Nettoyage des anciens listeners
  this.unlistenFns.forEach(fn => fn());
  this.unlistenFns = [];

  if (!this.zoomContainer?.nativeElement) {
    console.warn('zoomContainer not found');
    return;
  }

  const container = this.zoomContainer.nativeElement;
  this.img = container.querySelector('.zoom-img') as HTMLImageElement;
  this.lens = container.querySelector('.zoom-lens') as HTMLElement;
  this.result = container.querySelector('.zoom-result') as HTMLElement;

  if (!this.img || !this.lens || !this.result) {
    console.warn('Zoom elements not found:', {img: !!this.img, lens: !!this.lens, result: !!this.result});
    return;
  }

  const currentImage = this.selectedImage || this.product?.image_url || '';
  if (!currentImage) return;

  // Reset et background
  this.renderer.setStyle(this.result, 'backgroundImage', `url(${currentImage})`);
  this.renderer.setStyle(this.lens, 'backgroundImage', `url(${currentImage})`);

  // Chargement des dimensions naturelles pour un zoom précis
  const tempImg = new Image();
  tempImg.onload = () => {
    const ratioW = tempImg.naturalWidth / this.img.width;
    const ratioH = tempImg.naturalHeight / this.img.height;
    const effectiveZoom = Math.max(ratioW, ratioH) * this.zoomLevel;

    this.renderer.setStyle(this.result, 'backgroundSize', `${this.img.width * effectiveZoom}px ${this.img.height * effectiveZoom}px`);
    this.renderer.setStyle(this.lens, 'backgroundSize', `${this.img.width * effectiveZoom}px ${this.img.height * effectiveZoom}px`);
  };
  tempImg.src = currentImage;

  const imgContainer = container.querySelector('.zoom-img-container');
  if (!imgContainer) return;

  // Attache les listeners
  this.unlistenFns.push(
    this.renderer.listen(imgContainer, 'mousemove', (e: MouseEvent) => this.moveLens(e)),
    this.renderer.listen(imgContainer, 'mouseenter', () => this.showZoom()),
    this.renderer.listen(imgContainer, 'mouseleave', () => this.hideZoom()),
    this.renderer.listen(imgContainer, 'touchmove', (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) this.moveLens(e);
    })
  );
}

  private moveLens(e: MouseEvent | TouchEvent): void {
    if (!this.img) return;

    const rect = this.img.getBoundingClientRect();

    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    // Clamp lens position
    const lensHalfW = this.lens.offsetWidth / 2;
    const lensHalfH = this.lens.offsetHeight / 2;

    x = Math.max(lensHalfW, Math.min(x, this.img.offsetWidth - lensHalfW));
    y = Math.max(lensHalfH, Math.min(y, this.img.offsetHeight - lensHalfH));

    const lensX = x - lensHalfW;
    const lensY = y - lensHalfH;

    this.renderer.setStyle(this.lens, 'left', `${lensX}px`);
    this.renderer.setStyle(this.lens, 'top', `${lensY}px`);

    const bgX = lensX * this.zoomLevel;
    const bgY = lensY * this.zoomLevel;

    this.renderer.setStyle(this.result, 'backgroundPosition', `-${bgX}px -${bgY}px`);
    this.renderer.setStyle(this.lens, 'backgroundImage', `url(${this.img.src})`);
    this.renderer.setStyle(this.lens, 'backgroundSize', `${this.img.width * this.zoomLevel}px ${this.img.height * this.zoomLevel}px`);
    this.renderer.setStyle(this.lens, 'backgroundPosition', `-${bgX}px -${bgY}px`);
    console.log('Lens moved to:', lensX, lensY);
    console.log('Background position:', bgX, bgY);
  }

  private showZoom(): void {
    this.renderer.setStyle(this.lens, 'display', 'block');
    this.renderer.setStyle(this.result, 'display', 'block');
  }

  private hideZoom(): void {
    this.renderer.setStyle(this.lens, 'display', 'none');
    this.renderer.setStyle(this.result, 'display', 'none');
  }

  private setProductSchema(product: Product): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Clean old schema
    document.querySelectorAll('script[type="application/ld+json"]').forEach(s => {
      try {
        if (JSON.parse(s.textContent || '{}')['@type'] === 'Product') s.remove();
      } catch {}
    });

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description || "Produit apicole de qualité",
      "image": product.image_url,
      "brand": { "@type": "Brand", "name": "Apiculture Galai" },
      "sku": product.slug,
      "offers": {
        "@type": "Offer",
        "price": product.discounted_price || product.price,
        "priceCurrency": "TND",
        "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "url": `https://apiculture-galai.tn/product/${product.slug}`
      }
    };

    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.appendChild(script, this.renderer.createText(JSON.stringify(schema)));
    this.renderer.appendChild(document.head, script);
  }
  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/panier']);
    this.cdr.detectChanges();
  }
}
