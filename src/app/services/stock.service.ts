import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface StockCache {
  [key: string]: {
    data: StockData;
    timestamp: number;
  };
}

interface StockData {
  current: number;
  hourly: { timestamp: number; price: number; }[];
  daily: { timestamp: number; price: number; }[];
  monthly: { timestamp: number; price: number; }[];  // Add this line
}

interface YahooFinanceResponse {
  chart: {
    result: [{
      meta: { regularMarketPrice: number };
      timestamp: number[];
      indicators: {
        quote: [{
          close: number[];
        }];
      };
    }];
  };
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: HttpClient) {}

  getStockData(symbol: string): Observable<StockData> {
    return this.http.get<any>(`/assets/data/stocksData/${symbol}.json`).pipe(
      map(response => {
        const dailyData = response.daily_last_1y.map((entry: any) => ({
          timestamp: new Date(entry.Date).getTime() / 1000,
          price: entry.Close
        }));

        const monthlyData = response.monthly_10y_to_1y.map((entry: any) => ({
          timestamp: new Date(entry.Date).getTime() / 1000,
          price: entry.Close
        }));

        return {
          current: dailyData[dailyData.length - 1]?.price || 0,
          daily: dailyData,
          monthly: monthlyData,
          hourly: dailyData.slice(-24)
        };
      })
    );
  }
  
  

  // Remove updateCache method since we're reading from local files
}