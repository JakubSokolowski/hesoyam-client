import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';
import { environment } from '@env/environment';

import { SentimentAnalysisRoutingModule } from './sentiment-analysis-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container/stock-market-container.component';
import { AssetPriceChartComponent } from '@app/sentiment-analysis/asset-price-chart/asset-price-chart.component';
import { AssetInsightContainerComponent } from '@app/sentiment-analysis/asset-insight-container/asset-insight-container.component';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { BittrexService } from '@app/sentiment-analysis/asset-price-chart/bittrex.service';
import { DataScrapperComponent } from './authenticated/data-scrapper.component';
import { ExamplesEffects } from './examples.effects';
import { ChartsModule } from 'ng2-charts';
import {AssetNewsTableComponent} from '@app/sentiment-analysis/asset-news-table/asset-news-table.component';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import {MatTableModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

@NgModule({
    imports: [
        SharedModule,
        SentimentAnalysisRoutingModule,
        ChartsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDatepickerModule,
        MatSelectModule,

        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        EffectsModule.forFeature([
            ExamplesEffects,
            StockMarketEffects,
        ])
    ],
    declarations: [
        ExamplesComponent,
        StockMarketContainerComponent,
        AssetPriceChartComponent,
        AssetInsightContainerComponent,
        AssetNewsTableComponent,
        DataScrapperComponent,
    ],
    providers: [StockMarketService, BittrexService]
})
export class SentimentAnalysisModule {
    constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(
        http,
        `${environment.i18nPrefix}/assets/i18n/examples/`,
        '.json'
    );
}
