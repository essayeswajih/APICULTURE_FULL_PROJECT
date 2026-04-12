import { Component, OnInit, viewChild } from '@angular/core';
import { NgApexchartsModule, ChartComponent, ApexOptions } from 'ng-apexcharts';
import { Api } from 'src/app/services/api';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-income-overview-chart',
  standalone: true,
  imports: [CardComponent, NgApexchartsModule],
  templateUrl: './income-overview-chart.component.html',
  styleUrl: './income-overview-chart.component.scss'
})
export class IncomeOverviewChartComponent implements OnInit {

  chart = viewChild.required<ChartComponent>('chart');
  chartOptions!: Partial<ApexOptions>;
  totalIncome: string = '0 DT';

  constructor(private Api: Api) {}

  ngOnInit() {
    this.initChart();
    this.loadWeeklyIncome();
  }

  // ✅ Init chart (empty data first)
  initChart() {
    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 365,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 4
        }
      },
      dataLabels: { enabled: false },
      series: [
        {
          data: [] // 🔥 empty, will be filled from API
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: ['#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c']
          }
        }
      },
      yaxis: { show: false },
      colors: ['#5cdbd3'],
      grid: { show: false },
      tooltip: { theme: 'light' }
    };
  }

  // ✅ Load data from FastAPI
  loadWeeklyIncome() {
    this.Api.getWeeklyIncome().subscribe({
      next: (res: any) => {
        // update chart
        this.chartOptions.series = [
          {
            data: res.series
          }
        ];

        // update total
        this.totalIncome = `${Number(res.total).toLocaleString()} DT`;
      },
      error: (err) => {
        console.error('Error loading weekly income', err);
      }
    });
  }
}