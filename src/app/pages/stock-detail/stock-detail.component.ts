import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSlideToggleModule, NgChartsModule],
  template: `
    <div class="container">
      <header>
        <h1>{{ stockSymbol }}</h1>
        <button mat-button (click)="goBack()">
          <span class="material-icons">arrow_back</span>
          Back
        </button>
      </header>

      <div class="chart-container">
        <div class="chart-controls">
          <mat-slide-toggle>AI Prediction</mat-slide-toggle>
        </div>
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          [type]="'line'">
        </canvas>
        <div class="time-controls">
          <button mat-button 
            [style.background-color]="activeTimeWindow === 'week' ? 'rgba(187, 134, 252, 0.1)' : ''"
            (click)="changeTimeWindow('week')">This Week</button>
          <button mat-button 
            [style.background-color]="activeTimeWindow === 'month' ? 'rgba(187, 134, 252, 0.1)' : ''"
            (click)="changeTimeWindow('month')">This Month</button>
          <button mat-button 
            [style.background-color]="activeTimeWindow === 'year' ? 'rgba(187, 134, 252, 0.1)' : ''"
            (click)="changeTimeWindow('year')">This Year</button>
          <button mat-button 
            [style.background-color]="activeTimeWindow === 'decade' ? 'rgba(187, 134, 252, 0.1)' : ''"
            (click)="changeTimeWindow('decade')">Last 10 Years</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {
  stockSymbol: string = '';
  activeTimeWindow: 'week' | 'month' | 'year' | 'decade' = 'week';
  private currentUrl: string = '';
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Stock Price',
      fill: false,
      tension: 0.1,
      borderColor: 'rgba(187, 134, 252, 1)',
      backgroundColor: 'rgba(187, 134, 252, 0.3)'
    }]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService
  ) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event.constructor.name === "NavigationEnd") {
        const newUrl = this.router.url;
        if (this.currentUrl !== newUrl) {
          setTimeout(() => {
            window.location.reload();
          }, 10);
        }
        this.currentUrl = newUrl;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.stockSymbol = this.route.snapshot.paramMap.get('symbol') || '';
    this.loadStockData('week');
  }

  goBack() {
    this.router.navigate(['/']);
  }

  changeTimeWindow(period: 'week' | 'month' | 'year' | 'decade') {
    this.activeTimeWindow = period;  // Add this line
    this.loadStockData(period);
  }

  private loadStockData(period: 'week' | 'month' | 'year' | 'decade') {
    this.stockService.getStockData(this.stockSymbol).subscribe({
      next: (data) => {
        let chartData: { timestamp: number; price: number; }[];
        
        switch (period) {
          case 'week':
            chartData = data.daily.slice(-7);
            break;
          case 'month':
            chartData = data.daily.slice(-30);
            break;
          case 'year':
            chartData = data.daily.slice(-365);
            console.log('Year View Monthly Values:');
            this.logMonthlyValues(chartData);
            break;
          case 'decade':
            // Use monthly data for decade view
            chartData = data.monthly;
            console.log('Decade View Monthly Values:');
            this.logMonthlyValues(chartData);
            break;
        }
    
        this.chartData = {
          labels: chartData.map(d => {
            const date = new Date(d.timestamp * 1000);
            if (period === 'decade') {
              return date.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' });
            } else if (period === 'week' || period === 'month' || period === 'year') {
              return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' });
            }
            return date.toLocaleString();
          }),
          datasets: [{
            data: chartData.map(d => d.price),
            label: this.stockSymbol,
            fill: false,
            tension: 0.1,
            borderColor: 'rgba(187, 134, 252, 1)',
            backgroundColor: 'rgba(187, 134, 252, 0.3)'
          }]
        };
      },
      error: (error) => {
        console.error('Error fetching stock data:', error);
      }
    });
  }

  // Add this new method to the component class
  private logMonthlyValues(data: { timestamp: number; price: number; }[]) {
    const monthlyData = new Map<string, number>();
    
    data.forEach(item => {
      const date = new Date(item.timestamp * 1000);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      monthlyData.set(monthYear, item.price);
    });

    monthlyData.forEach((price, monthYear) => {
      console.log(`${monthYear}: $${price.toFixed(2)}`);
    });
  }
}
