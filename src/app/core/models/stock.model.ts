export interface Stock {
    symbol: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
}

export interface StockPrediction {
    date: string;
    predicted_price: number;
}

export interface StockPredictions {
    [symbol: string]: {
        weekly: StockPrediction[];
        monthly: StockPrediction[];
    };
}