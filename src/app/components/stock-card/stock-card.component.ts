import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from '../../core/models/stock.model';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent {
  @Input() stock!: Stock;

  constructor(private router: Router) {}

  onCardClick() {
    this.router.navigate(['/stock', this.stock.symbol]);
  }
}
