import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetPrice } from '@app/sentiment/asset-insights/asset-price-chart/models';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';

interface AssetPrice {
  o: number,
  h: number,
  l: number,
  c: number,
  t: any
}
@Injectable()
export class AssetPriceService {
    constructor(private httpClient: HttpClient) {}

    retrieveAssetPriceSeries(symbol: string, dateFrom: string, dateTo: string): Observable<AssetPrice[]> {
        console.log(symbol, dateFrom, dateTo);
        return this.httpClient
        .get(
        `http://localhost:8080/bittrex/${symbol}/${dateFrom}/${dateTo}`
        ).pipe(
            map((priceSeries: any[]) => {
                return priceSeries.map(price => {
                    return {
                        t: DateTime.fromMillis(Number.parseFloat(price.date) * 1000).toRFC2822().valueOf(),
                        o: Number.parseFloat(price.open),
                        h: Number.parseFloat(price.high),
                        l: Number.parseFloat(price.low),
                        c: Number.parseFloat(price.close)
                    }
                });
        }))
    }
}
