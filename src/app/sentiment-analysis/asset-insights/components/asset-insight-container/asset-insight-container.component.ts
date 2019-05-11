import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { selectStockMarket } from '../../asset-price.selectors';
import { ActionStockMarketRetrieve } from '../../asset-price';
import { StockMarketState } from '../../asset-price.model';
import { State } from '../../../examples.state';

@Component({
    selector: 'anms-stock-market',
    templateUrl: './asset-insight-container.component.html',
    styleUrls: ['./asset-insight-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetInsightContainerComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    stocks$: Observable<StockMarketState>;

    constructor(public store: Store<State>) {}

    ngOnInit() {
        this.stocks$ = this.store.pipe(select(selectStockMarket));
        this.stocks$
            .pipe(take(1))
            .subscribe(stocks => this.onSymbolChange(stocks.symbol));
    }

    onSymbolChange(symbol: string) {
        this.store.dispatch(new ActionStockMarketRetrieve({ symbol }));
    }
}
