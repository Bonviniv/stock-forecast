import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_KEY = 'd0g9o4hr01qhao4saq7gd0g9o4hr01qhao4saq80'; // Replace with your actual API key
    private readonly BASE_URL = 'https://finnhub.io/api/v1';

    constructor(private http: HttpClient) {}

    getStockQuote(symbol: string): Observable<any> {
        return this.http.get(`${this.BASE_URL}/quote`, {
            params: {
                symbol: symbol,
                token: this.API_KEY
            }
        });
    }

    getStockCandles(symbol: string, resolution: string, from: number, to: number): Observable<any> {
        return this.http.get(`${this.BASE_URL}/stock/candle`, {
            params: {
                symbol: symbol,
                resolution: resolution,
                from: from.toString(),
                to: to.toString(),
                token: this.API_KEY
            }
        });
    }
}