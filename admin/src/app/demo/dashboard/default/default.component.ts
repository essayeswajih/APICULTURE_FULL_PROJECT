// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import tableData from 'src/fake-data/default-data.json';

import { MonthlyBarChartComponent } from 'src/app/theme/shared/apexchart/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from 'src/app/theme/shared/apexchart/income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from 'src/app/theme/shared/apexchart/analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from 'src/app/theme/shared/apexchart/sales-report-chart/sales-report-chart.component';

// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Api, Order } from 'src/app/services/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    CardComponent,
    IconDirective,
    MonthlyBarChartComponent,
    IncomeOverviewChartComponent,
    AnalyticsChartComponent,
    SalesReportChartComponent,
    RouterModule
],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  private iconService = inject(IconService);

  // constructor
  constructor(private api: Api) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }
  ngOnInit() {
    this.loadRecentOrders();
  }
  loadRecentOrders() {
    this.api.getAnalytics().subscribe((data) => {
      this.AnalyticEcommerce = data;
    });
    this.api.getRecentOrders(3).subscribe((data) => {
      this.recentOrder = data;
    });
  }
  recentOrder: Order[] = [];

  AnalyticEcommerce = [];

  getStatusClass(status: string) {
    switch (status) {
      case 'delivered':
        return 'text-success bg-light-success';
      case 'cancelled':
      case 'back':
        return 'text-danger bg-light-danger';
      case 'shipped':
      case 'processing':
        return 'text-primary bg-light-primary';
      default:
        return 'text-warning bg-light-warning';
    }
  }

  getStatusIcon(status: string) {
    if (status === 'delivered') {
      return 'gift';
    }

    if (status === 'cancelled' || status === 'back') {
      return 'setting';
    }

    return 'message';
  }

  formatStatus(status: string) {
    return status.replace(/_/g, ' ');
  }
}
