import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockPredictions } from '../models/stock.model';

@Injectable({
    providedIn: 'root'
})
export class PredictionService {
    constructor(private http: HttpClient) {}

    getPredictions(): Observable<StockPredictions> {
        return this.http.get<StockPredictions>('assets/data/previsoes.json');
    }

    getPredictionForStock(symbol: string, predictions: StockPredictions) {
        return predictions[symbol];
    }
}