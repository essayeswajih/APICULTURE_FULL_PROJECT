import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Order, VipCard } from '../../../services/api';

import { IconService } from '@ant-design/icons-angular';
import {
  CreditCardOutline,
  DownloadOutline,
  HistoryOutline,
  PrinterOutline,
  ReloadOutline,
  SafetyCertificateOutline,
  StopOutline
} from '@ant-design/icons-angular/icons';
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
  vipCard?: VipCard;
}

interface BarcodeSegment {
  bar: boolean;
  width: number;
}

type CustomerSortField = 'lastOrderDate' | 'totalPaid' | 'orderCount';
type CustomerSortDirection = 'ascend' | 'descend';

const CODE_39_PATTERNS: Record<string, string> = {
  '0': 'nnnwwnwnn',
  '1': 'wnnwnnnnw',
  '2': 'nnwwnnnnw',
  '3': 'wnwwnnnnn',
  '4': 'nnnwwnnnw',
  '5': 'wnnwwnnnn',
  '6': 'nnwwwnnnn',
  '7': 'nnnwnnwnw',
  '8': 'wnnwnnwnn',
  '9': 'nnwwnnwnn',
  A: 'wnnnnwnnw',
  B: 'nnwnnwnnw',
  C: 'wnwnnwnnn',
  D: 'nnnnwwnnw',
  E: 'wnnnwwnnn',
  F: 'nnwnwwnnn',
  G: 'nnnnnwwnw',
  H: 'wnnnnwwnn',
  I: 'nnwnnwwnn',
  J: 'nnnnwwwnn',
  K: 'wnnnnnnww',
  L: 'nnwnnnnww',
  M: 'wnwnnnnwn',
  N: 'nnnnwnnww',
  O: 'wnnnwnnwn',
  P: 'nnwnwnnwn',
  Q: 'nnnnnnwww',
  R: 'wnnnnnwwn',
  S: 'nnwnnnwwn',
  T: 'nnnnwnwwn',
  U: 'wwnnnnnnw',
  V: 'nwwnnnnnw',
  W: 'wwwnnnnnn',
  X: 'nwnnwnnnw',
  Y: 'wwnnwnnnn',
  Z: 'nwwnwnnnn',
  '-': 'nwnnnnwnw',
  '.': 'wwnnnnwnn',
  ' ': 'nwwnnnwnn',
  '*': 'nwnnwnwnn'
};

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
  private iconService = inject(IconService);
  @ViewChild('vipCardExport') private vipCardExport?: ElementRef<HTMLElement>;

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
  selectedVipCustomer: CustomerSummary | null = null;
  historyVisible = false;
  detailVisible = false;
  vipVisible = false;
  vipActionLoading = false;

  pageIndex = 1;
  pageSize = 10;
  readonly vipThreshold = 1000;
  private vipCards: Record<string, VipCard> = {};

  constructor(
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {
    this.iconService.addIcon(
      ...[
        CreditCardOutline,
        DownloadOutline,
        HistoryOutline,
        PrinterOutline,
        ReloadOutline,
        SafetyCertificateOutline,
        StopOutline
      ]
    );
  }

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

  get vipTitle(): string {
    return this.selectedVipCustomer ? `${this.selectedVipCustomer.displayName} VIP card` : 'VIP card';
  }

  get selectedVipCard(): VipCard | undefined {
    return this.selectedVipCustomer?.vipCard;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.apiService.getVipCards().subscribe({
      next: (cards) => {
        this.vipCards = (cards || []).reduce<Record<string, VipCard>>((acc, card) => {
          acc[card.customer_key] = card;
          return acc;
        }, {});
        this.loadOrdersForCustomers();
      },
      error: () => {
        this.vipCards = {};
        this.loadOrdersForCustomers();
      }
    });
  }

  private loadOrdersForCustomers(): void {
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

  openVipCard(customer: CustomerSummary): void {
    this.selectedVipCustomer = customer;
    this.vipVisible = true;
  }

  closeVipCard(): void {
    this.vipVisible = false;
  }

  approveVipCard(): void {
    if (!this.selectedVipCustomer || !this.isVipEligible(this.selectedVipCustomer)) {
      return;
    }

    this.vipActionLoading = true;
    this.apiService.approveVipCard({
      customer_key: this.selectedVipCustomer.key,
      customer_name: this.selectedVipCustomer.displayName,
      email: this.selectedVipCustomer.email || null,
      telephone: this.selectedVipCustomer.telephone || null
    }).subscribe({
      next: (card) => {
        this.vipCards[this.selectedVipCustomer!.key] = card;
        this.updateCustomerVipCard(this.selectedVipCustomer!.key, card);
        this.vipActionLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to approve VIP card.';
        this.vipActionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  revokeVipCard(): void {
    if (!this.selectedVipCustomer?.vipCard) {
      return;
    }

    const customerKey = this.selectedVipCustomer.key;
    const code = this.selectedVipCustomer.vipCard.code;
    this.vipActionLoading = true;
    this.apiService.revokeVipCard(code).subscribe({
      next: () => {
        delete this.vipCards[customerKey];
        this.updateCustomerVipCard(customerKey);
        this.vipActionLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Unable to revoke VIP card.';
        this.vipActionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  downloadVipCardImage(): void {
    const cardElement = this.vipCardExport?.nativeElement;

    if (!cardElement || !this.selectedVipCustomer) {
      return;
    }

    this.renderElementToPng(cardElement)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${this.getVipExportName()}.png`;
        link.click();
      })
      .catch(() => {
        this.errorMessage = 'Unable to export this VIP card as an image.';
        this.cdr.detectChanges();
      });
  }

  printVipCard(): void {
    const cardElement = this.vipCardExport?.nativeElement;

    if (!cardElement) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=960,height=720');

    if (!printWindow) {
      this.errorMessage = 'Please allow popups to print this VIP card.';
      return;
    }

    const clonedCard = cardElement.cloneNode(true) as HTMLElement;
    this.inlineComputedStyles(cardElement, clonedCard);

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>${this.escapeHtml(this.vipTitle)}</title>
          <style>
            * { box-sizing: border-box; }
            body {
              min-height: 100vh;
              margin: 0;
              padding: 24px;
              display: grid;
              place-items: center;
              background: #ffffff;
            }
            @page { size: A4 portrait; margin: 14mm; }
            @media print {
              body { min-height: auto; padding: 0; }
            }
          </style>
        </head>
        <body>${clonedCard.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => {
      printWindow.print();
    }, 300);
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

  isVipEligible(customer: CustomerSummary | null): boolean {
    return Boolean(customer && customer.totalPaid > this.vipThreshold);
  }

  getVipProgress(customer: CustomerSummary | null): number {
    if (!customer) {
      return 0;
    }

    return Math.min(100, Math.round((customer.totalPaid / this.vipThreshold) * 100));
  }

  getVipMissingAmount(customer: CustomerSummary | null): number {
    if (!customer || this.isVipEligible(customer)) {
      return 0;
    }

    return this.vipThreshold - customer.totalPaid;
  }

  getBarcodeSegments(code: string | undefined): BarcodeSegment[] {
    if (!code) {
      return [];
    }

    const normalizedCode = `*${code.toUpperCase().replace(/[^A-Z0-9-. ]/g, '')}*`;
    const segments: BarcodeSegment[] = [];

    normalizedCode.split('').forEach((character, characterIndex) => {
      const pattern = CODE_39_PATTERNS[character] || CODE_39_PATTERNS['0'];

      pattern.split('').forEach((widthKey, index) => {
        segments.push({
          bar: index % 2 === 0,
          width: widthKey === 'w' ? 3 : 1
        });
      });

      if (characterIndex < normalizedCode.length - 1) {
        segments.push({ bar: false, width: 1 });
      }
    });

    return segments;
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

  private renderElementToPng(element: HTMLElement): Promise<string> {
    const rect = element.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    const clone = element.cloneNode(true) as HTMLElement;

    this.inlineComputedStyles(element, clone);
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    clone.style.width = `${width}px`;
    clone.style.height = `${height}px`;
    clone.style.margin = '0';

    const serialized = new XMLSerializer().serializeToString(clone);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">${serialized}</foreignObject>
      </svg>
    `;
    const svgUrl = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const scale = Math.max(2, window.devicePixelRatio || 1);

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * scale;
        canvas.height = height * scale;

        const context = canvas.getContext('2d');
        if (!context) {
          URL.revokeObjectURL(svgUrl);
          reject(new Error('Canvas context unavailable'));
          return;
        }

        context.scale(scale, scale);
        context.drawImage(image, 0, 0, width, height);
        URL.revokeObjectURL(svgUrl);
        resolve(canvas.toDataURL('image/png'));
      };

      image.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        reject(new Error('VIP card image render failed'));
      };

      image.src = svgUrl;
    });
  }

  private inlineComputedStyles(source: Element, target: Element): void {
    if (target instanceof HTMLElement) {
      const computed = window.getComputedStyle(source);
      target.style.cssText = Array.from(computed)
        .map((property) => `${property}:${computed.getPropertyValue(property)};`)
        .join('');
    }

    Array.from(source.children).forEach((sourceChild, index) => {
      const targetChild = target.children.item(index);

      if (targetChild) {
        this.inlineComputedStyles(sourceChild, targetChild);
      }
    });
  }

  private getVipExportName(): string {
    const name = this.selectedVipCustomer?.displayName || 'vip-card';
    const code = this.selectedVipCard?.code || 'pending';

    return `${name}-${code}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private escapeHtml(value: string): string {
    const container = document.createElement('div');
    container.innerText = value;
    return container.innerHTML;
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
      firstOrderDate: oldestOrder?.created_at || '',
      vipCard: this.vipCards[key]
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

  private updateCustomerVipCard(key: string, card?: VipCard): void {
    const applyCard = (customer: CustomerSummary): CustomerSummary =>
      customer.key === key ? { ...customer, vipCard: card } : customer;

    this.customers = this.customers.map(applyCard);
    this.filteredCustomers = this.filteredCustomers.map(applyCard);
    this.selectedVipCustomer = this.selectedVipCustomer ? applyCard(this.selectedVipCustomer) : null;
  }

}
