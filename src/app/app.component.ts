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
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  // Remove all component logic from here as it should be in HomeComponent
}
