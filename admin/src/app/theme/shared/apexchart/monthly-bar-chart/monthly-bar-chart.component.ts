import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, viewChild } from '@angular/core';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-monthly-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrl: './monthly-bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthlyBarChartComponent implements OnInit, AfterViewInit {
  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;

  currentPeriod: 'week' | 'month' = 'week';
  isLoading = false;
  private isChartReady = false;
  private topProductsCache: Partial<Record<'week' | 'month', any[]>> = {};

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initChart();
  }

  ngAfterViewInit() {
    this.isChartReady = true;
    setTimeout(() => this.loadTopProducts(this.currentPeriod));
  }

  // Initialize chart config
  initChart() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 450,
        toolbar: { show: false },
        background: 'transparent'
      },
      dataLabels: { enabled: false },
      colors: ['#1677ff'],
      series: [
        {
          name: 'Sales',
          data: []
        }
      ],
      xaxis: {
        categories: []
      },
      grid: {
        borderColor: '#f5f5f5'
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      }
    };
  }

  // Load top products from backend
  loadTopProducts(period: 'week' | 'month') {
    const cachedProducts = this.topProductsCache[period];
    if (cachedProducts) {
      this.updateChart(cachedProducts);
      this.refreshChart();
      return;
    }

    this.isLoading = true;
    this.cdr.markForCheck();
    this.api.getTopProducts(period).subscribe({
      next: (response: any[]) => {
        this.topProductsCache[period] = response;
        this.updateChart(response);
        this.isLoading = false;
        this.refreshChart();
      },
      error: (error) => {
        console.error('Error fetching top products:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private updateChart(products: any[]) {
    const categories = products.map(item => item.name || `Product #${item.product_id}`);
    const data = products.map(item => Number(item.total_sold || 0));

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: 'Sales',
          data
        }
      ],
      xaxis: {
        categories
      }
    };
  }

  private refreshChart() {
    this.cdr.detectChanges();

    if (!this.isChartReady) {
      return;
    }

    setTimeout(() => {
      const chart = this.chart();
      chart.updateOptions({ xaxis: this.chartOptions.xaxis }, false, true);
      chart.updateSeries(this.chartOptions.series as any, true);
      this.cdr.markForCheck();
    });
  }

  // Toggle week/month
  toggleActive(value: 'week' | 'month') {
    if (this.currentPeriod !== value) {
      this.currentPeriod = value;
      this.cdr.markForCheck();
      this.loadTopProducts(value);
    }
  }
}
