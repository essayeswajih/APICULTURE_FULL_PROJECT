import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api, Order, OrderStatus } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-client-order-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './client-order-view.html',
  styleUrls: ['./client-order-view.scss']
})
export class ClientOrderView implements OnInit {
  order: Order | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  constructor(
    private apiService: Api,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const orderCode = params['ordercode'];
      if (orderCode) {
        this.loadOrder(orderCode);
      }
    });
  }

  private loadOrder(orderCode: string) {
    this.apiService.getOrderByCode(orderCode).subscribe({
      next: (order) => {
        this.order = order;
        this.error = null;
        this.isLoading = false;
        this.cdRef.detectChanges();

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            const card = document.querySelector('.card');
            if (card) {
              gsap.from(card, { opacity: 0, y: 20, duration: 0.5 });
            }
          }, 0);
        }
      },
      error: (err) => {
        this.error = 'Order not found or invalid order code';
        this.order = null;
        this.cdRef.detectChanges();
      }
    });
  }
}