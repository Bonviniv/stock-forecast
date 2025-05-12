import { Injectable } from '@angular/core';
import { Stock } from '../models/stock.model';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private readonly CACHE_KEY = 'recent_stocks';
    private readonly MAX_CACHE_SIZE = 3;

    getRecentStocks(): Stock[] {
        const cached = localStorage.getItem(this.CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    }

    addRecentStock(stock: Stock) {
        let recentStocks = this.getRecentStocks();
        recentStocks = recentStocks.filter(s => s.symbol !== stock.symbol);
        recentStocks.unshift(stock);
        
        if (recentStocks.length > this.MAX_CACHE_SIZE) {
            recentStocks = recentStocks.slice(0, this.MAX_CACHE_SIZE);
        }

        localStorage.setItem(this.CACHE_KEY, JSON.stringify(recentStocks));
    }
}