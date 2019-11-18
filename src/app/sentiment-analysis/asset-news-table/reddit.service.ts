import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RedditPost {
    link: string;
    numComments: number;
    score: number;
    title: string;
    createdDate: Date;
}

export interface PushiftResponse {
    data: any[];
}

@Injectable({
    providedIn: 'root'
})
export class RedditService {
    constructor(private httpClient: HttpClient) {
    }

    retrieveRedditPosts(subreddit: string, dateFrom: string, dateTo: string): Observable<RedditPost[]> {
        console.log(subreddit, dateFrom, dateTo);
        return this.httpClient
            .get(
                `http://localhost:4200/reddit/${subreddit}/${dateFrom}/${dateTo}`
            ).pipe(
                map((posts: any[]) => {
                    return posts.map(post => {
                        return {
                            createdDate: new Date(Number.parseFloat(post.createdUtc) * 1000),
                            numComments: Number.parseInt(post.num_comments, 10),
                            title: post.title,
                            score: Number.parseInt(post.score, 10),
                            link: post.full_link
                        };
                    });
                }));
    }

    retrieveAvailableSubreddits(): Observable<string[]> {
        return this.httpClient
            .get(
                `http://localhost:4200/reddit/subreddits`
            ).pipe(
                map((subs: string[]) => subs)
            );
    }

    retrieveLatestScrappedSubimssionDate(subreddit: string): Observable<Date> {
        return this.httpClient
            .get(
                `http://localhost:4200/reddit/newest/${subreddit}`
            ).pipe(
                map((post: any) =>
                    new Date(Number.parseInt(post.createdUtc, 10) * 1000)
                )
            );
    }

    scrapSubmissions(subrredit: string, date: Date, limit: number): Observable<any[]> {
        const query = `https://api.pushshift.io/reddit/submission/search?subreddit=${subrredit}&after=${date.getTime() / 1000}&sort=asc&limit=${limit}`;
        console.log(query);
        return this.httpClient
            .get(
                query
            ).pipe(
                map((response: PushiftResponse) => {
                    return response.data.map((post) => {
                        return {
                            author: post.author,
                            author_flair_css_class: post.author_flair_css_class,
                            author_flair_text: post.author_flair_text,
                            brand_safe: post.brand_safe,
                            contest_mode: post.contest_mode,
                            created_utc: post.created_utc,
                            domain: post.domain,
                            full_link: post.full_link,
                            id: post.id,
                            is_self: post.is_self,
                            link_flair_text: post.link_flair_text,
                            locked: post.locked,
                            num_comments: post.num_comments,
                            over_18: post.over_18,
                            permalink: post.permalink,
                            retrieved_on: post.retrieved_on,
                            score: post.score,
                            spoiler: post.spoiler,
                            stickied: post.stickied,
                            subreddit: post.subreddit,
                            subreddit_id: post.subreddit_id,
                            suggested_sort: post.suggested_sort,
                            thumbnail: post.thumbnail,
                            title: post.title,
                            url: post.url,
                            comments_scrapped: 0
                        };
                    });
                })
            );
    }

    saveSubmissions(data: any[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const url = 'http://localhost:4200/reddit/newposts';
        return this.httpClient.post(url, data, httpOptions).pipe();
    }
}
