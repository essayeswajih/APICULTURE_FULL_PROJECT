// angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// project import
import { Api } from 'src/app/services/api';

// third party
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

type StatusKey = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'change_requested' | 'back';

@Component({
  selector: 'app-analytics-chart',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './analytics-chart.component.html',
  styleUrl: './analytics-chart.component.scss'
})
export class AnalyticsChartComponent implements OnInit {
  // public props
  chartOptions!: Partial<ApexOptions>;
  reportItems = [
    { label: 'Delivered orders', value: '0', detail: '0% fulfillment', class: 'text-success' },
    { label: 'Open orders', value: '0', detail: 'Pending, processing, shipped', class: 'text-primary' }
  ];
  isLoading = true;

  private readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  private readonly statusLabels: Record<StatusKey, string> = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    change_requested: 'Change requested',
    back: 'Returned'
  };

  //  constructor
  constructor(private api: Api) {
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 340,
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      dataLabels: { enabled: false },
      colors: ['#52c41a', '#1677ff', '#ffb814'],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      grid: {
        strokeDashArray: 4,
        borderColor: '#f5f5f5'
      },
      series: [
        {
          name: 'Delivered',
          data: []
        },
        {
          name: 'Open',
          data: []
        },
        {
          name: 'Issues',
          data: []
        }
      ],
      xaxis: {
        categories: this.months,
        labels: {
          style: {
            colors: Array(12).fill('#222')
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        labels: {
          formatter: (value) => Math.round(value).toString()
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (value) => `${Math.round(value)} orders`
        }
      }
    };
  }

  ngOnInit() {
    this.api.getMonthlyStatus().subscribe({
      next: (statusByMonth) => {
        this.updateReport(statusByMonth);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading analytics report', error);
        this.isLoading = false;
      }
    });
  }

  private updateReport(statusByMonth: Partial<Record<StatusKey, number[]>>) {
    const delivered = this.normalizeSeries(statusByMonth.delivered);
    const open = this.sumSeries([
      this.normalizeSeries(statusByMonth.pending),
      this.normalizeSeries(statusByMonth.processing),
      this.normalizeSeries(statusByMonth.shipped),
      this.normalizeSeries(statusByMonth.change_requested)
    ]);
    const issues = this.sumSeries([
      this.normalizeSeries(statusByMonth.cancelled),
      this.normalizeSeries(statusByMonth.back)
    ]);

    const deliveredTotal = this.total(delivered);
    const openTotal = this.total(open);
    const issuesTotal = this.total(issues);
    const orderTotal = deliveredTotal + openTotal + issuesTotal;
    const fulfillmentRate = orderTotal ? Math.round((deliveredTotal / orderTotal) * 100) : 0;
    const mostActiveStatus = this.getMostActiveStatus(statusByMonth);

    this.reportItems = [
      {
        label: 'Delivered orders',
        value: deliveredTotal.toLocaleString(),
        detail: `${fulfillmentRate}% fulfillment`,
        class: 'text-success'
      },
      {
        label: 'Open orders',
        value: openTotal.toLocaleString(),
        detail: mostActiveStatus ? `Most active: ${mostActiveStatus}` : 'Pending, processing, shipped',
        class: 'text-primary'
      }
    ];

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        { name: 'Delivered', data: delivered },
        { name: 'Open', data: open },
        { name: 'Issues', data: issues }
      ]
    };
  }

  private normalizeSeries(series?: number[]) {
    return Array.from({ length: 12 }, (_, index) => Number(series?.[index] || 0));
  }

  private sumSeries(seriesList: number[][]) {
    return Array.from({ length: 12 }, (_, index) => seriesList.reduce((sum, series) => sum + series[index], 0));
  }

  private total(series: number[]) {
    return series.reduce((sum, value) => sum + value, 0);
  }

  private getMostActiveStatus(statusByMonth: Partial<Record<StatusKey, number[]>>) {
    const totals = Object.entries(statusByMonth).map(([status, series]) => ({
      status: status as StatusKey,
      total: this.total(this.normalizeSeries(series))
    }));
    const mostActive = totals.sort((a, b) => b.total - a.total)[0];

    return mostActive?.total ? this.statusLabels[mostActive.status] : '';
  }
}
