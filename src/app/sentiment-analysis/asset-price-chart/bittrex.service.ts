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

interface DateRange {
    from: number;
    to: number;
}

export interface AssetPriceChartData {
    label: string;
    data: AssetPrice[];
}


@Injectable()
export class BittrexService {
    constructor(private httpClient: HttpClient) {}

    retrieveAssetPriceSeries(symbol: string, dateFrom: string, dateTo: string): Observable<AssetPrice[]> {
        console.log(symbol, dateFrom, dateTo);
        return this.httpClient
        .get(
        `http://localhost:4200/bittrex/${symbol}/${dateFrom}/${dateTo}`
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

    retrieveAssetPriceSeriesAsChartData(symbol: string, dateFrom: string, dateTo: string): Observable<AssetPriceChartData[]> {
        console.log(symbol, dateFrom, dateTo);
        return this.retrieveAssetPriceSeries(symbol, dateFrom, dateTo).pipe(
            map((series: AssetPrice[]) => {
                return [{
                    label: symbol,
                    data: series
                }]
            })
        )
    }

    retrieveAvailableAssetSymbols(): Observable<string[]> {
        return this.httpClient
            .get(
                `http://localhost:8081/bittrex/symbols`
            ).pipe(
                map((symbols: string[]) => {
                    return symbols;
                })
            );
    }

    retrieveAssetStartDate(symbol: string): Observable<Date> {
        return this.httpClient
            .get(
                `http://localhost:4200/bittrex/startDate/${symbol}`
            ).pipe(
                map((unixTimestamp: number) => {
                    return new Date(unixTimestamp * 1000);
                })
            );
    }
    retrieveAssetEndDate(symbol: string): Observable<Date> {
        return this.httpClient
            .get(
                `http://localhost:4200/bittrex/endDate/${symbol}`
            ).pipe(
                map((unixTimestamp: number) => {
                    return new Date(unixTimestamp * 1000);
                })
            );
    }
}
