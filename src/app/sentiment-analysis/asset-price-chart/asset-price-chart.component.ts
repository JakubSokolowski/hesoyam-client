import 'chartjs-chart-financial/src/index';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';
import { AssetPriceChartData, BittrexService } from '@app/sentiment-analysis/asset-price-chart/bittrex.service';
import { Observable } from 'rxjs';
import { PriceSeriesQuery } from '@app/sentiment-analysis/asset-insight-container/asset-insight-container.component';

@Component({
    selector: 'anms-asset-price-chart',
    templateUrl: './asset-price-chart.component.html',
    styleUrls: ['./asset-price-chart.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AssetPriceChartComponent implements OnInit, OnChanges {
    @Input() currentQuery: PriceSeriesQuery;
    symbols: Observable<string[]>;
    public financialChartData: any[] = [{ label: 'BTCUSD', data: [] }];

    public obsChartData: Observable<AssetPriceChartData[]>;

    public financialChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day'
                },
                ticks: {
                    source: 'auto'
                }

            }]
        }
    };
    public financialChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
        }
    ];
    public financialChartLegend = true;
    public financialChartType = 'candlestick';
    public financialChartPlugins = [];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    constructor(private assetPriceService: BittrexService) {

    }

    ngOnInit() {
        this.assetPriceService.retrieveAssetPriceSeries(
            this.currentQuery.symbol,
            this.currentQuery.dateFromMilis.toString(),
            this.currentQuery.dateToMilis.toString()
        ).pipe().subscribe(series => {
            this.financialChartData = [{ label: this.currentQuery.symbol, data: series }];
        });
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentQuery) {
            this.currentQuery = changes.currentQuery.currentValue;
            console.log(this.currentQuery);
            this.assetPriceService.retrieveAssetPriceSeries(
                this.currentQuery.symbol,
                this.currentQuery.dateFromMilis.toString(),
                this.currentQuery.dateToMilis.toString()
            ).pipe().subscribe(series => {
                this.financialChartData = [{ label: this.currentQuery.symbol, data: series }];
            });
        }
    }

}
