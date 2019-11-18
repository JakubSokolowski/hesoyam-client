import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { PushiftResponse, RedditService } from '@app/sentiment-analysis/asset-news-table/reddit.service';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'anms-authenticated',
    templateUrl: './data-scrapper.component.html',
    styleUrls: ['./data-scrapper.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class DataScrapperComponent implements OnInit, OnDestroy {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    subreddits$: Observable<String[]>;
    scrapSubscription: any;
    latestScrappedSubmissionDate: Observable<Date>;
    date: Date;
    currentSubreddit = 'Bitcoin';
    posts: Observable<any[]>;
    anyPostsLeftToScrap = true;
    scrappedPostsNum = 0;

    isScrappingOngoing = false;

    constructor(private redditService: RedditService, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.subreddits$ = this.redditService.retrieveAvailableSubreddits();
        this.latestScrappedSubmissionDate = this.redditService.retrieveLatestScrappedSubimssionDate(this.currentSubreddit);
        this.subreddits$.pipe(take(1)).subscribe(console.log);
        this.latestScrappedSubmissionDate.pipe(take(1)).subscribe(console.log);
        this.latestScrappedSubmissionDate.pipe(take(1)).subscribe(val => {
            this.date = val;
        });
        this.onStart();
    }

    canStartScrapping(): boolean {
        return (!!this.currentSubreddit && !!this.latestScrappedSubmissionDate);
    }

    onStart() {
        const source = interval(2000);
        this.scrapSubscription = source.subscribe(() => this.executeScrapStep());
    }

    executeScrapStep() {
        const limit = 10;
        if (!!this.date && this.anyPostsLeftToScrap && this.isScrappingOngoing) {
            console.log('Scrap start')
            this.posts = this.redditService.scrapSubmissions(this.currentSubreddit, this.date, limit);
            this.posts.pipe(take(1)).subscribe((scrappedPosts) => {
                if ( scrappedPosts.length < limit) {
                    console.log('limit reached');
                    this.anyPostsLeftToScrap = false;
                    this.isScrappingOngoing = false;
                }
                this.date = new Date(scrappedPosts[scrappedPosts.length - 1].created_utc * 1000);
                console.log(this.date.toISOString());
                console.log(scrappedPosts[0]);
                this.redditService.saveSubmissions(scrappedPosts).pipe().subscribe(console.log);
                this.scrappedPostsNum += scrappedPosts.length;
                console.log(this.scrappedPostsNum);
                this.ref.markForCheck();
            })
        } else {
            console.log('Cannot scrap')
        }
    }
    toggleScrapping() {
        this.isScrappingOngoing = this.isScrappingOngoing ? false : true;
    }

    ngOnDestroy(): void {
    }


}
