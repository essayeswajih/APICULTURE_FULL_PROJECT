import { Component, OnInit, viewChild } from '@angular/core';
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

  constructor(private api: Api) {}

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
    this.api.getTopProducts(period).subscribe({
      next: (response: any[]) => {
        // map backend fields to chart
        const categories = response.map(item => item.name);       // product names
        const data = response.map(item => item.total_sold);       // quantities sold

        // update chart options (force re-render)
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
      },
      error: (error) => {
        console.error('Error fetching top products:', error);
      }
    });
  }

  // Toggle week/month
  toggleActive(value: 'week' | 'month') {
    if (this.currentPeriod !== value) {
      this.currentPeriod = value;
      this.loadTopProducts(value);
    }
  }
}