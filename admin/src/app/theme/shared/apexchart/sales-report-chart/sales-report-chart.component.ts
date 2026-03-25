// angular import
import { HttpClient } from '@angular/common/http';
import { Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
// project import

// third party
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-sales-report-chart',
  standalone: true,
  imports: [NgApexchartsModule,RouterModule],
  templateUrl: './sales-report-chart.component.html',
  styleUrl: './sales-report-chart.component.scss'
})
export class SalesReportChartComponent {
   chart = viewChild<ChartComponent>('chart'); // ✅ FIX: simplified
  chartOptions!: Partial<ApexOptions>;
  thisYearSales = 0;

  constructor(private http: HttpClient,private api:Api) {}

  ngOnInit(): void {
    this.initChart();
    this.loadData();
  }

  // ✅ Initial chart config
  initChart() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 430,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          borderRadius: 4
        }
      },
      stroke: {
        show: true,
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
          useSeriesColors: false
        },
        itemMargin: {
          horizontal: 15,
          vertical: 5
        }
      },

      // initially empty
      series: [],

      xaxis: {
        categories: [
          'Jan','Feb','Mar','Apr','May','Jun',
          'Jul','Aug','Sep','Oct','Nov','Dec'
        ],
        labels: {
          style: {
            colors: Array(12).fill('#222')
          }
        }
      },

      tooltip: {
        theme: 'light'
      },

      colors: [
        '#faad14', // pending
        '#1677ff', // processing
        '#52c41a', // shipped
        '#13c2c2', // delivered
        '#ff4d4f', // cancelled
        '#722ed1', // change_requested
        '#8c8c8c'  // back
      ],

      grid: {
        borderColor: '#f5f5f5'
      }
    };
  }

  // ✅ Load data from backend
  loadData() {
    this.api.getThisYearSales().subscribe({
      next: (res) => {
        this.thisYearSales = res?.thisYearSales ?? 0;
      },
      error: (err) => {
        console.error('Error loading this year sales:', err);
      }
    });
    this.api.getMonthlyStatus().subscribe({
      next: (res) => {
        const series = [
          { name: 'Pending', data: res?.pending ?? Array(12).fill(0) },
          { name: 'Processing', data: res?.processing ?? Array(12).fill(0) },
          { name: 'Shipped', data: res?.shipped ?? Array(12).fill(0) },
          { name: 'Delivered', data: res?.delivered ?? Array(12).fill(0) },
          { name: 'Cancelled', data: res?.cancelled ?? Array(12).fill(0) },
          { name: 'Change Requested', data: res?.change_requested ?? Array(12).fill(0) },
          { name: 'Back', data: res?.back ?? Array(12).fill(0) }
        ];

        // ✅ FIX: trigger chart update properly
        this.chartOptions = {
          ...this.chartOptions,
          series
        };

        // ✅ ensures ApexChart refresh
        this.chart()?.updateSeries(series);
      },

      error: (err) => {
        console.error('Error loading monthly status:', err);
      }
    });
  }
}
