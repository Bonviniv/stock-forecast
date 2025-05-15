import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Change this from AppComponent to HomeComponent
  { path: 'stock/:symbol', component: StockDetailComponent }
];
