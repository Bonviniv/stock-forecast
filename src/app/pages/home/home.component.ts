import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatInputModule, 
    MatCardModule,  // Make sure this is imported
    MatGridListModule,
    // Add any other necessary Material modules
  ],
  template: `
    <div class="container">
      <header>
        <h1>Stock Forecast</h1>
      
      
      </header>
      
      <div class="stocks-grid">
        <div class="stock-card" *ngFor="let stock of stocks" (click)="navigateToDetail(stock.symbol)">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{stock.symbol}}</mat-card-title>
              <mat-card-subtitle>{{stock.description}}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>Type: {{stock.type}}</p>
              <p>Currency: {{stock.currency}}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  stocks: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.http.get<any[]>('assets/data/stocksList.json')
      .subscribe({
        next: (data) => this.stocks = data,
        error: (error) => {
          console.error('Error loading stocks:', error);
          this.stocks = [];
        }
      });
  }

  navigateToDetail(symbol: string) {
    this.router.navigate(['/stock', symbol]).then(() => {
      window.location.reload();
    });
  }
}
