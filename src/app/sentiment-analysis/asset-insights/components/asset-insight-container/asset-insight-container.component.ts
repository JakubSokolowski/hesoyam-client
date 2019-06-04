import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { selectStockMarket } from '../../asset-price.selectors';
import { ActionStockMarketRetrieve } from '../../asset-price';
import { StockMarketState } from '../../asset-price.model';
import { State } from '../../../examples.state';
import { BittrexService } from '@app/sentiment-analysis/asset-price-chart/bittrex.service';


export interface PriceSeriesQuery {
    symbol: string;
    dateFromMilis: number;
    dateToMilis: number;
}



@Component({
    selector: 'anms-stock-market',
    templateUrl: './asset-insight-container.component.html',
    styleUrls: ['./asset-insight-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetInsightContainerComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    stocks$: Observable<StockMarketState>;
    symbols$: Observable<string[]>;
    currentSymbol = 'BTCUSD';

    maxDate: Observable<Date>;
    public assetPriceQuery: PriceSeriesQuery = {
        symbol: 'BTCUSD',
        dateFromMilis: 1530856800,
        dateToMilis: 1531213200
    };

    currentToDate: Date = new Date(1531213200 * 1000);
    currentFromDate: Date = new Date(1530856800 * 1000);
    minDate: Observable<Date>;


    constructor(public store: Store<State>, private bittrexService: BittrexService) {}

    ngOnInit() {
        this.stocks$ = this.store.pipe(select(selectStockMarket));
        this.symbols$ = this.bittrexService.retrieveAvailableAssetSymbols();
        this.minDate = this.bittrexService.retrieveAssetStartDate(this.currentSymbol);
        this.maxDate = this.bittrexService.retrieveAssetEndDate(this.currentSymbol);
        this.stocks$
            .pipe(take(1))
            .subscribe(stocks => this.onSymbolChange(stocks.symbol));
    }

    onSymbolChange(symbol: string) {
        this.store.dispatch(new ActionStockMarketRetrieve({ symbol }));
    }

    onUpdateAssetDataClick() {
        this.assetPriceQuery = {
            symbol: this.currentSymbol,
            dateFromMilis: this.currentFromDate.getTime() / 1000,
            dateToMilis: this.currentToDate.getTime() / 1000
        };
    }


}
