import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Stock } from './asset-price.model';


@Injectable()
export class AssetPriceService {
    constructor(private httpClient: HttpClient) {}

    retrieveStock(symbol: string): Observable<Stock> {
        return this.httpClient
            .get(
                `https://api.iextrading.com/1.0/stock/${symbol}/quote`
            )
            .pipe(
                map((stock: any) => ({
                    symbol: stock.symbol,
                    exchange: stock.primaryExchange,
                    last: stock.latestPrice,
                    ccy: 'USD',
                    change: stock.close,
                    changePositive: stock.change.toString().indexOf('+') === 0,
                    changeNegative: stock.change.toString().indexOf('-') === 0,
                    changePercent: stock.changePercent.toFixed(2)
                }))
            );
    }
}
