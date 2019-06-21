import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { MatSort } from '@angular/material';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { RedditPost, RedditService } from '@app/sentiment-analysis/asset-news-table/reddit.service';
import { DataSource } from '@angular/cdk/collections';
import { PriceSeriesQuery } from '@app/sentiment-analysis/asset-insight-container/asset-insight-container.component';
import { catchError, finalize, tap } from 'rxjs/operators';

export interface RedditPostQuery {
    subreddit: string;
    dateFrom: string;
    dateTo: string;
}

@Component({
    selector: 'asset-news-table',
    styleUrls: ['asset-news-table.component.scss'],
    templateUrl: 'asset-news-table.component.html'
})
export class AssetNewsTableComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() currentQuery: PriceSeriesQuery;
    displayedColumns: string[] = ['date', 'title', 'score', 'numComments'];
    posts: RedditPostDataSource | null;
    public dataSource = new MatTableDataSource<RedditPost>();


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private redditService: RedditService) {
    }

    ngOnInit() {
        this.loadPostsPage();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.currentQuery) {
            this.currentQuery = changes.currentQuery.currentValue;
            this.loadPostsPage();
        }
    }

    ngAfterViewInit(): void {
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    }

    onRowClicked(row) {
        console.log('Row clicked: ', row);
    }

    loadPostsPage() {
        this.redditService.retrieveRedditPosts(
            'Bitcoin',
             this.currentQuery.dateFromMilis.toString(),
             this.currentQuery.dateToMilis.toString()
        ).subscribe(res => {
            this.dataSource.data = res as RedditPost[];
        });
    }

    applyFilter(filterValue: string): void {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLocaleLowerCase();
        this.dataSource.filter = filterValue;
    }
}

export class RedditPostDataSource extends DataSource<any> {
    private query: RedditPostQuery;
    private postsSubject = new BehaviorSubject<RedditPost[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private postsCountSubject = new BehaviorSubject<Number>(0);
    public loading$ = this.loadingSubject.asObservable();
    public postsCount$ = this.postsCountSubject.asObservable();



    constructor(
        private redditService: RedditService,
        query: RedditPostQuery
    ) {
        super();
        this.query = query;
    }

    connect(): Observable<RedditPost[]> {
        return this.postsSubject.asObservable();
    }

    disconnect(): void {
        this.postsSubject.complete();
        this.loadingSubject.complete();
        this.postsCountSubject.complete();
    }

    loadPosts(filter = '', sortDirection = '', pageIndex = 0, pageSize = 0): void {
        this.loadingSubject.next(true);
        this.redditService.retrieveRedditPosts(
            this.query.subreddit,
            this.query.dateFrom,
            this.query.dateTo
        ).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(
            (posts: RedditPost[]) => {
                console.log(posts.length);
                this.postsCountSubject.next(posts.length);
                this.postsSubject.next(posts);
            }
        );
    }
}

