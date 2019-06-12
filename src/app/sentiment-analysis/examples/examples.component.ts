import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { State as BaseExamplesState } from '../examples.state';

interface State extends BaseSettingsState, BaseExamplesState {}

@Component({
    selector: 'anms-examples',
    templateUrl: './examples.component.html',
    styleUrls: ['./examples.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
    isAuthenticated$: Observable<boolean>;

    examples = [
        { link: 'asset-insights', label: 'anms.examples.menu.stocks' },
        { link: 'authenticated', label: 'anms.examples.menu.auth', auth: true }
    ];



    constructor(private store: Store<State>) {}

    ngOnInit(): void {
        this.isAuthenticated$ = this.store.pipe(
            select(selectAuth),
            map(auth => auth.isAuthenticated)
        );
    }
}
