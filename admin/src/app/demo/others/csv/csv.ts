import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
  constructor(private cdr: ChangeDetectorRef) {}
  step = 1;
  rawData: any[] = [];
  selectedFileName = '';
  isUploading = false;
  isAnalyzing = false;
  uploadReady = false;
  uploadError = '';

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

  // Upload CSV/XLSX and prepare for analysis
  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.isUploading = false;
    this.isAnalyzing = false;
    this.uploadReady = false;
    this.uploadError = '';
    this.rawData = [];
    this.selectedFileName = file.name;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          this.rawData = result.data || [];
          this.isUploading = false;
          this.uploadReady = this.rawData.length > 0;
          if (!this.uploadReady) {
            this.uploadError = 'No rows found in the file.';
          }
        },
        error: () => {
          this.isUploading = false;
          this.uploadError = 'Failed to read CSV file.';
        }
      });
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        this.rawData = XLSX.utils.sheet_to_json(sheet) as any[];

        this.isUploading = false;
        this.uploadReady = this.rawData.length > 0;
        if (!this.uploadReady) {
          this.uploadError = 'No rows found in the file.';
        }
      };
      reader.onerror = () => {
        this.isUploading = false;
        this.uploadError = 'Failed to read Excel file.';
      };
      reader.readAsArrayBuffer(file);
    } else {
      this.isUploading = false;
      this.uploadError = 'Unsupported file format. Use CSV or Excel.';
    }
  }

analyze() {
  if (!this.rawData.length) return;

  this.isAnalyzing = true;
  this.uploadError = '';

  setTimeout(() => {
    this.processData();
    this.step = 2;
    this.isAnalyzing = false;
    this.cdr.detectChanges();
  }, 50);
}
  excelDateToJSDate(serial: number): string {
    const utc_days  = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;                                        
    const date_info = new Date(utc_value * 1000);

    return date_info.toLocaleString(); // or format it yourself
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
      const price = parseFloat((row['PRIX'] || '0').toString().replace(',', '.')) /1000 || 0;
      const status = (row['Etat'] || row['ETAT'] || row['DERN. ANOMALIE'] || '').toString().toLowerCase();
      let date = row['DATE'] || row['DATE ENLEV.'] || row['DATE LIV'] || row['DATE PICK'] ||'N/A';
      if (typeof date === 'number') {
        date = this.excelDateToJSDate(date);
      } else if (date) {
        date = date;
      }
      
      // Product: Use DESIGNATION first, then PRODUIT as fallback
let products = row['DESIGNATION'] || row['PRODUIT'] || '';

      if (typeof products === 'string' && products.trim().length > 0) {
        let text = products.toLowerCase().trim();

        // Booster Bee fix
        text = text.replace(/booster bee(\d+)/gi, 'booster bee x$1');
        text = text.replace(/(\d+)booster bee/gi, '$1 booster bee');

        // Normalize separators
        text = text.replace(/,|\s+et\s+|\s+&\s+|\s*;\s*/g, '+');
        text = text.replace(/\(\s*x?\s*(\d+)\s*\)/gi, ' x$1 ');

        const items = text.split('+').map(i => i.trim()).filter(Boolean);

        items.forEach(item => {
          let qty = 1;
          let name = item;

          // Quantity extraction
          const qtyPatterns = [
            /^(\d+)\s*x?\s+(.+)$/i,
            /^(.+?)\s+x(\d+)$/i,
            /^(.+?)\s+\(x?\s*(\d+)\s*\)$/i,
            /^(.+?)\s+(\d+)\s*$/i
          ];

          for (const pattern of qtyPatterns) {
            const match = item.match(pattern);
            if (match) {
              qty = parseInt(match[1] || match[2], 10);
              name = (match[1] ? match[2] : match[1]) || item;
              break;
            }
          }

          // === BETTER CLEANING (Fixed for d'entrée) ===
          name = name
            .replace(/\d+\s*dt/gi, '')           // remove prices
            .replace(/\(.*?\)/g, '') 
            .replace(/\s+/g, ' ')                // normalize spaces
            .trim();

          // Decode HTML entities
          name = name.replace(/&#39;/g, "'")
                     .replace(/&quot;/g, '"')
                     .replace(/&amp;/g, '&');

          if (name.length > 2) {
            // Strong normalization for common products
            let finalName = name;

            if (name.includes('booster bee')) finalName = 'booster bee';
            else if (name.includes('porte d')) finalName = 'porte d\'entrée';
            else if (name.includes('grille')) finalName = 'grille à reine';
            else if (name.includes('combinaison')) finalName = 'combinaison';
            else if (name.includes('lève cadre') || name.includes('leve cadre')) finalName = 'lève-cadre';
            else if (name.includes('enfumoir')) finalName = 'enfumoir';

            productSales[finalName] = (productSales[finalName] || 0) + qty;
          }
        });
      }

      const gov = row['GOUVERNORAT'] || row['VILLE'] || 'N/A';
      const agence = row['AGENCE'] || 'N/A';


      total += price;
      if (status.includes('livr')) delivered++;

      // Revenue by Date
      revenueByDate[date] = (revenueByDate[date] || 0) + price;

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

    this.recentOrders = this.rawData.slice(0, this.rawData.length -1).map((row: any, i: number) => {
      const phoneMatch = row['CLIENT']?.toString().match(/\d+/) || [''];
      let rawDate = row['DATE'] || row['DATE ENLEV.'] || row['DATE LIV'] || row['DATE PICK'] ||'N/A';
      if (typeof rawDate === 'number') {
        rawDate = this.excelDateToJSDate(rawDate);
      } else if (rawDate) {
        rawDate = rawDate;
      }
      return {
        id: i + 1,
        date: rawDate,
        client: row['CLIENT'] || '',
        city: row['VILLE'] || '',
        phone: phoneMatch[0],
        status: row['Etat'] || row['ETAT'] || row['DERN. ANOMALIE'] || 'N/A',
        statusClass: this.getStatusClass(row['Etat'] || row['ETAT'] || row['DERN. ANOMALIE']),
        total: parseFloat((row['PRIX'] || '0').toString().replace(',', '.')) /1000 || 0
      };
    });
    this.cdr.detectChanges();
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
      .slice(3, 20);

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
        categories: topProducts.map(([name]) => {
          let clean = name.replace(/&#39;/g, "'")
                          .replace(/&quot;/g, '"').replace("'", "'")
          return clean.length > 25 ? clean.substring(0, 22) + '...' : clean;
        }),
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
    this.selectedFileName = '';
    this.isUploading = false;
    this.isAnalyzing = false;
    this.uploadReady = false;
    this.uploadError = '';
    this.cdr.detectChanges();
  }
}