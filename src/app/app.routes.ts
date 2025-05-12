import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'stock/:symbol', component: StockDetailComponent }
];
