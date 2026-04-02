import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { NgApexchartsModule, ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-csv',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './csv.html',
  styleUrl: './csv.scss',
})
export class CSV {
  step = 1;
  rawData: any[] = [];

  // KPIs
  totalRevenue = 0;
  totalOrders = 0;
  deliveredOrders = 0;
  avgOrderValue = 0;

  // Table
  recentOrders: any[] = [];

  // Charts
  revenueChart!: Partial<ApexOptions>;
  productChart!: Partial<ApexOptions>;
  gouvernoratChart!: Partial<ApexOptions>;
  agenceChart!: Partial<ApexOptions>;

  // 📂 Upload CSV/XLSX
  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          this.rawData = result.data;
          this.processData();
          this.step = 2;
        }
      });
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        this.rawData = XLSX.utils.sheet_to_json(sheet);

        this.processData();
        this.step = 2;
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('❌ Unsupported file format. Use CSV or Excel.');
    }
  }

  // 🧠 Process Data + Build Charts
  processData() {
    let total = 0;
    let delivered = 0;

    const revenueByDate: Record<string, number> = {};
    const productSales: Record<string, number> = {};
    const gouvernoratCount: Record<string, number> = {};
    const agenceCount: Record<string, number> = {};

    this.rawData.forEach((row: any) => {
      // Parse values with fallbacks
      const price = parseFloat(row['PRIX']) || 0;
      const status = (row['Etat'] || row['DERN. ANOMALIE'] || '').toString().toLowerCase();
      const date = row['DATE'] || row['DATE ENLEV.'] || row['DATE LIV/RET'] || 'N/A';
      
      // Product: Use DESIGNATION first, then PRODUIT as fallback
      let product = row['DESIGNATION'] || row['PRODUIT'] || 'Unknown Product';
      if (typeof product === 'string') {
        product = product.trim();
      }

      const gov = row['GOUVERNORAT'] || 'N/A';
      const agence = row['AGENCE'] || 'N/A';

      // Quantity: use 'qt' if exists, otherwise count 1 per row
      const qty = parseInt(row['qt'] || row['QT'] || '1', 10) || 1;

      total += price;
      if (status.includes('livr')) delivered++;

      // Revenue by Date
      revenueByDate[date] = (revenueByDate[date] || 0) + price;

      // Product Sales (Top Products)
      productSales[product] = (productSales[product] || 0) + qty;

      // Gouvernorat & Agence
      gouvernoratCount[gov] = (gouvernoratCount[gov] || 0) + 1;
      agenceCount[agence] = (agenceCount[agence] || 0) + 1;
    });

    // Calculate KPIs
    this.totalRevenue = total;
    this.totalOrders = this.rawData.length;
    this.deliveredOrders = delivered;
    this.avgOrderValue = this.totalOrders ? total / this.totalOrders : 0;

    // Build Charts
    this.buildCharts(revenueByDate, productSales, gouvernoratCount, agenceCount);

    // Prepare Recent Orders (limit to 20 for performance)
    this.recentOrders = this.rawData.slice(0, 20).map((row: any, i: number) => {
      const phoneMatch = row['CLIENT']?.toString().match(/\d+/) || [''];
      return {
        id: i + 1,
        date: row['DATE'] || row['DATE ENLEV.'] || '',
        client: row['CLIENT'] || '',
        city: row['VILLE'] || '',
        phone: phoneMatch[0],
        status: row['Etat'] || row['DERN. ANOMALIE'] || 'N/A',
        statusClass: this.getStatusClass(row['Etat'] || row['DERN. ANOMALIE']),
        total: row['PRIX'] || 0
      };
    });
  }

  // 📊 Build ApexCharts
  buildCharts(
    revenue: Record<string, number>,
    products: Record<string, number>,
    gov: Record<string, number>,
    agence: Record<string, number>
  ) {
    
    // Revenue by Date (Line Chart)
    this.revenueChart = {
      chart: { type: 'line', height: 300, toolbar: { show: false } },
      series: [{ name: 'Revenue (DT)', data: Object.values(revenue) }],
      xaxis: { 
        categories: Object.keys(revenue),
        labels: { rotate: -45, style: { fontSize: '12px' } }
      },
      stroke: { curve: 'smooth' },
      title: { text: 'Revenue by Date', align: 'center' }
    };

    // 🏆 Top 5 Products (Bar Chart) - FIXED
    const topProducts = Object.entries(products)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    this.productChart = {
      chart: { 
        type: 'bar', 
        height: 320,
        toolbar: { show: false }
      },
      series: [{ 
        name: 'Quantity Sold', 
        data: topProducts.map(([, qty]) => qty) 
      }],
      xaxis: { 
        categories: topProducts.map(([name]) => 
          name.length > 28 ? name.substring(0, 25) + '...' : name
        ),
        labels: { 
          rotate: -45, 
          style: { fontSize: '11px' } 
        }
      },
      colors: ['#00E396'],
      title: { 
        text: 'Top 5 Products', 
        align: 'center' 
      }
    };

    // Gouvernorat (Pie Chart)
    this.gouvernoratChart = {
      chart: { type: 'pie', height: 300 },
      series: Object.values(gov),
      labels: Object.keys(gov),
      title: { text: 'Orders by Gouvernorat', align: 'center' }
    };

    // Agence (Donut Chart)
    this.agenceChart = {
      chart: { type: 'donut', height: 300 },
      series: Object.values(agence),
      labels: Object.keys(agence),
      title: { text: 'Orders by Agence', align: 'center' }
    };
  }

  // Status Badge Color
  getStatusClass(status: string): string {
    if (!status) return 'bg-secondary';
    const s = status.toLowerCase();
    if (s.includes('livr')) return 'bg-success';
    if (s.includes('annul') || s.includes('pas de réponse') || s.includes('adresse incorrect')) 
      return 'bg-danger';
    return 'bg-warning';
  }

  reset() {
    this.step = 1;
    this.rawData = [];
    this.recentOrders = [];
    // Optionally reset charts and KPIs too
    this.totalRevenue = 0;
    this.totalOrders = 0;
    this.deliveredOrders = 0;
    this.avgOrderValue = 0;
  }
}