import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Order } from '../../../services/api';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

interface CustomerSummary {
  key: string;
  displayName: string;
  email: string;
  telephone: string;
  location: string;
  orders: Order[];
  orderCount: number;
  totalPaid: number;
  lastOrderDate: string;
  firstOrderDate: string;
}

type CustomerSortField = 'lastOrderDate' | 'totalPaid' | 'orderCount';
type CustomerSortDirection = 'ascend' | 'descend';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzEmptyModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    NzSpinModule,
    NzStatisticModule,
    NzTableModule,
    NzTagModule,
    NzTooltipModule
  ],
  templateUrl: './customer-management.html',
  styleUrls: ['./customer-management.scss']
})
export class CustomerManagement implements OnInit {
  orders: Order[] = [];
  customers: CustomerSummary[] = [];
  filteredCustomers: CustomerSummary[] = [];

  searchTerm = '';
  nameFilter = '';
  emailFilter = '';
  sortField: CustomerSortField = 'lastOrderDate';
  sortDirection: CustomerSortDirection = 'descend';
  loading = false;
  errorMessage = '';

  selectedCustomer: CustomerSummary | null = null;
  selectedOrder: Order | null = null;
  historyVisible = false;
  detailVisible = false;

  pageIndex = 1;
  pageSize = 10;

  constructor(
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  get ordersRevenue(): number {
    return this.orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  }

  get averageCustomerValue(): number {
    return this.customers.length ? this.ordersRevenue / this.customers.length : 0;
  }

  get historyTitle(): string {
    return this.selectedCustomer ? `${this.selectedCustomer.displayName} order history` : 'Order history';
  }

  get orderDetailTitle(): string {
    return this.selectedOrder ? `Order #${this.selectedOrder.code}` : 'Order details';
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.apiService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders || [];
        this.customers = this.groupOrdersByCustomer(this.orders);
        this.applyFiltersAndSort();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to load customers.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter(): void {
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(resetPage = true): void {
    const term = this.searchTerm.trim().toLowerCase();
    const name = this.nameFilter.trim().toLowerCase();
    const email = this.emailFilter.trim().toLowerCase();

    const customers = this.customers.filter((customer) => {
      const matchesSearch = !term || (() => {
        const text = [
          customer.displayName,
          customer.email,
          customer.telephone,
          customer.location,
          customer.key
        ].join(' ').toLowerCase();

        return text.includes(term);
      })();
      const matchesName = !name || customer.displayName.toLowerCase().includes(name);
      const matchesEmail = !email || customer.email.toLowerCase().includes(email);

      return matchesSearch && matchesName && matchesEmail;
    });

    this.filteredCustomers = this.sortCustomers(customers);

    if (resetPage) {
      this.pageIndex = 1;
    }
  }

  updateSort(field: CustomerSortField, direction: CustomerSortDirection): void {
    this.sortField = field;
    this.sortDirection = direction;
    this.applyFiltersAndSort();
  }

  updateColumnSort(field: CustomerSortField, direction: string | null): void {
    if (direction !== 'ascend' && direction !== 'descend') {
      return;
    }

    this.updateSort(field, direction);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.nameFilter = '';
    this.emailFilter = '';
    this.applyFiltersAndSort();
  }

  sortByOrders = (a: CustomerSummary, b: CustomerSummary): number => a.orderCount - b.orderCount;

  sortByTotalPaid = (a: CustomerSummary, b: CustomerSummary): number => a.totalPaid - b.totalPaid;

  sortByLastOrder = (a: CustomerSummary, b: CustomerSummary): number =>
    new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime();

  openHistory(customer: CustomerSummary): void {
    this.selectedCustomer = customer;
    this.historyVisible = true;
  }

  closeHistory(): void {
    this.historyVisible = false;
  }

  openOrderDetail(order: Order): void {
    this.selectedOrder = order;
    this.detailVisible = true;
  }

  closeOrderDetail(): void {
    this.detailVisible = false;
  }

  trackCustomer(_: number, customer: CustomerSummary): string {
    return customer.key;
  }

  trackOrder(_: number, order: Order): number {
    return order.id;
  }

  trackItem(index: number): number {
    return index;
  }

  calculateShippingCost(order: Order | null): number {
    if (!order || !order.items || order.items.length === 0 || order.total_amount >= 250) {
      return 0;
    }

    return Math.max(...order.items.map((item) => item.shipping_cost || 9));
  }

  getItemsSubtotal(order: Order | null): number {
    if (!order || !order.items) {
      return 0;
    }

    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getAverageOrderValue(customer: CustomerSummary | null): number {
    if (!customer || customer.orderCount === 0) {
      return 0;
    }

    return customer.totalPaid / customer.orderCount;
  }

  getStatusColor(status: string | undefined): string {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'blue';
      case 'cancelled':
      case 'back':
        return 'error';
      case 'change_requested':
        return 'warning';
      default:
        return 'default';
    }
  }

  private groupOrdersByCustomer(orders: Order[]): CustomerSummary[] {
    const customerMap = new Map<string, Order[]>();

    orders.forEach((order) => {
      const key = this.getCustomerKey(order);
      const existing = customerMap.get(key) || [];
      existing.push(order);
      customerMap.set(key, existing);
    });

    return Array.from(customerMap.entries())
      .map(([key, customerOrders]) => this.createCustomerSummary(key, customerOrders))
      .sort((a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime());
  }

  private createCustomerSummary(key: string, customerOrders: Order[]): CustomerSummary {
    const sortedOrders = [...customerOrders].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const latestOrder = sortedOrders[0];
    const oldestOrder = sortedOrders[sortedOrders.length - 1];

    return {
      key,
      displayName: latestOrder?.username || 'Unknown customer',
      email: latestOrder?.email || '',
      telephone: latestOrder?.telephone || '',
      location: latestOrder?.location || '',
      orders: sortedOrders,
      orderCount: sortedOrders.length,
      totalPaid: sortedOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0),
      lastOrderDate: latestOrder?.created_at || '',
      firstOrderDate: oldestOrder?.created_at || ''
    };
  }

  private getCustomerKey(order: Order): string {
    const email = (order.email || '').trim().toLowerCase();
    if (email) {
      return `email:${email}`;
    }

    const phone = (order.telephone || '').replace(/\D/g, '');
    if (phone) {
      return `phone:${phone}`;
    }

    return `order:${order.id}`;
  }

  private sortCustomers(customers: CustomerSummary[]): CustomerSummary[] {
    const direction = this.sortDirection === 'ascend' ? 1 : -1;

    return [...customers].sort((a, b) => {
      let comparison = 0;

      if (this.sortField === 'lastOrderDate') {
        comparison = new Date(a.lastOrderDate).getTime() - new Date(b.lastOrderDate).getTime();
      }

      if (this.sortField === 'totalPaid') {
        comparison = a.totalPaid - b.totalPaid;
      }

      if (this.sortField === 'orderCount') {
        comparison = a.orderCount - b.orderCount;
      }

      if (comparison === 0) {
        comparison = a.displayName.localeCompare(b.displayName);
      }

      return comparison * direction;
    });
  }
}
