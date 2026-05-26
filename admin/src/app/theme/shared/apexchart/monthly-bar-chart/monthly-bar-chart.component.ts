import { ChangeDetectorRef, Component, OnInit, viewChild } from '@angular/core';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-monthly-bar-chart',
  imports: [NgApexchartsModule],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrl: './monthly-bar-chart.component.scss'
})
export class MonthlyBarChartComponent implements OnInit {
  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;

  currentPeriod: 'week' | 'month' = 'week';
  isLoading = false;
  private topProductsCache: Partial<Record<'week' | 'month', any[]>> = {};

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initChart();
    this.loadTopProducts('week');
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
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();
    this.api.getTopProducts(period).subscribe({
      next: (response: any[]) => {
        this.topProductsCache[period] = response;
        this.updateChart(response);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching top products:', error);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private updateChart(products: any[]) {
    const categories = products.map(item => item.name);
    const data = products.map(item => item.total_sold);

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

  // Toggle week/month
  toggleActive(value: 'week' | 'month') {
    if (this.currentPeriod !== value) {
      this.currentPeriod = value;
      this.cdr.detectChanges();
      this.loadTopProducts(value);
    }
  }
}
