import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import 'chartjs-chart-financial/src/index';
import { DateTime } from 'luxon';
import { ChartOptions } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';
import { AssetPriceService } from '@app/sentiment-analysis/asset-price-chart/asset-price.service';
import { Observable, Subscription } from 'rxjs';
import { max, min } from 'rxjs/operators';

@Component({
  selector: 'anms-asset-price-chart',
  templateUrl: './asset-price-chart.component.html',
  styleUrls: ['./asset-price-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetPriceChartComponent implements OnInit {
    barCount = 60;
    initialDateStr = '01 Apr 2017 00:00 Z';

    priceSeries: Observable<any[]>;

    public financialChartData: any[] = [{
        label: 'TST',
         data: []
    }];
    public financialChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };
    public financialChartColors: Color[] = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public financialChartLegend = true;
    public financialChartType = 'candlestick';
    public financialChartPlugins = [];

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    constructor(private assetPriceService: AssetPriceService) {

    }

    ngOnInit() {
        this.assetPriceService.retrieveAssetPriceSeries(
            'BTCUSD',
            '1526054103',
            '1526256000'
        ).subscribe( series => {
            this.financialChartData = [{label: 'BTC', data: series}];
        });
    }

    randomNumber(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    randomBar(date: DateTime, lastClose: number) {
        const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
        const close = this.randomNumber(open * 0.95, open * 1.05);
        const high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
        const low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
        return {
          t: date.valueOf(),
          o: open,
          h: high,
          l: low,
          c: close
        };
    }

    getRandomData(dateStr: string, count: number) {
        let date = DateTime.fromRFC2822(dateStr);
        const data = [this.randomBar(date, 30)];
        while (data.length < count) {
            date = date.plus({ hours: 1 });
            data.push(this.randomBar(date, data[data.length - 1].c));
        }
        return data;
    }

    update() {
        // candlestick vs ohlc
        this.financialChartType = this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';
    }

}
