import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Add this import
import { Router } from '@angular/router';  // Make sure this import exists

interface Stock {
  symbol: string;
  displaySymbol: string;
  description: string;
  type: string;
  currency: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatInputModule, 
    MatCardModule, 
    MatGridListModule,
    HttpClientModule,
    RouterModule  // Add this
  ],
  template: `
    <router-outlet></router-outlet>
    <div class="container">
      <header>
        <h1>Stock Forecast</h1>
      </header>
      <div class="search-container">
        <div class="search-box">
          <input type="text" 
            placeholder="Search stocks..."
            (input)="filterStocks($event)">
          <span class="material-icons">search</span>
        </div>
      </div>
      <div class="stocks-grid">
        <div class="stock-card" *ngFor="let stock of filteredStocks" (click)="navigateToDetail(stock.symbol)">
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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.http.get<Stock[]>('assets/data/stocksList.json')
      .subscribe({
        next: (data) => {
          this.stocks = data;
          this.filteredStocks = data;
        },
        error: (error) => {
          console.error('Error loading stocks:', error);
          this.stocks = [];
          this.filteredStocks = [];
        }
      });
  }

  // Update the filter method
  filterStocks(event: Event) {
    let searchText = (event.target as HTMLInputElement).value;
    console.log('Search text:', searchText);
    searchText = searchText.toLowerCase();
    this.filteredStocks = this.stocks.filter(stock => {
      const matchSymbol = stock.symbol.toLowerCase().includes(searchText);
      const matchDescription = stock.description.toLowerCase().includes(searchText);
      console.log(`Filtering ${stock.symbol}: Symbol match: ${matchSymbol}, Description match: ${matchDescription}`);
      return matchSymbol || matchDescription;
    });
    console.log('Filtered stocks count:', this.filteredStocks.length);
  }

  navigateToDetail(symbol: string) {
    this.router.navigate(['/stock', symbol]);
  }
}
