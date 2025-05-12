import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnChanges {
  @Input() historicalData: any[] = [];
  @Input() predictions: any[] = [];
  @Input() timeframe: string = '1M';

  chart: any;

  ngOnChanges() {
    if (this.historicalData.length > 0) {
      this.createChart();
    }
  }

  private createChart() {
    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...this.historicalData.map(d => d.date), ...this.predictions.map(d => d.date)],
        datasets: [
          {
            label: 'Historical Price',
            data: this.historicalData.map(d => d.price),
            borderColor: '#2196f3',
            tension: 0.1
          },
          {
            label: 'Predicted Price',
            data: [...Array(this.historicalData.length).fill(null), ...this.predictions.map(d => d.predicted_price)],
            borderColor: '#4caf50',
            borderDash: [5, 5],
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
