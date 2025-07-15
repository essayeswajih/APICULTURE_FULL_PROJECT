import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Api, Order, OrderStatus } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-management.html',
  styleUrls: ['./order-management.scss']
})
export class OrderManagement implements OnInit {
  orders: Order[] = [];
  orderStatuses = Object.values(OrderStatus);

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  updateOrderStatus(id: number, status: OrderStatus) {
    this.apiService.updateOrderStatus(id, status).subscribe(() => {
      this.loadOrders();
    });
  }

  deleteOrder(id: number) {
    this.apiService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  private loadOrders() {
    this.apiService.getOrders().subscribe(orders => {
      this.orders = orders;

      // Trigger change detection after loading orders
      this.cdRef.detectChanges();

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const cards = document.querySelectorAll('.card');
          if (cards.length > 0) {
            gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
          }
        }, 0);
      }
    });
  }
}
