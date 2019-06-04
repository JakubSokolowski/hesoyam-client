import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { RedditPost, RedditService } from '@app/sentiment-analysis/asset-news-table/reddit.service';
import { DataSource } from '@angular/cdk/collections';
import { PriceSeriesQuery } from '@app/sentiment-analysis/asset-insights/components/asset-insight-container/asset-insight-container.component';
import { MatSort } from '@angular/material/typings/sort';

export interface RedditPostQuery{
    subreddit: string;
    dateFrom: string;
    dateTo: string;
}

@Component({
    selector: 'asset-news-table',
    styleUrls: ['asset-news-table.component.css'],
    templateUrl: 'asset-news-table.component.html'
})
export class AssetNewsTableComponent implements OnInit, OnChanges {
    @Input() currentQuery: PriceSeriesQuery;
    displayedColumns: string[] = ['date', 'title', 'score', 'numComments'];
    posts: RedditPostDataSource | null;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private redditService: RedditService) {
    }

    ngOnInit() {
        this.posts = new RedditPostDataSource(
            this.redditService,
            {
                subreddit: 'Bitcoin',
                dateFrom: '1530856800',
                dateTo: '1531213200'
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentQuery) {
            this.currentQuery = changes.currentQuery.currentValue;
            this.posts = new RedditPostDataSource(
                this.redditService,
                {
                    subreddit: 'Bitcoin',
                    dateFrom: this.currentQuery.dateFromMilis.toString(),
                    dateTo: this.currentQuery.dateToMilis.toString()
                }
            );
        }
    }
}

export class RedditPostDataSource extends DataSource<any> {
    private query: RedditPostQuery;

    constructor(
        private redditService: RedditService,
        query: RedditPostQuery,
        private _paginator?: MatPaginator,
        private _sort?: MatSort
    ) {
        super();
        this.query = query;
    }

    connect(): Observable<RedditPost[]> {
        return this.redditService.retrieveRedditPosts(
            this.query.subreddit,
            this.query.dateFrom,
            this.query.dateTo
        );
    }
    disconnect(): void {

    }
}

