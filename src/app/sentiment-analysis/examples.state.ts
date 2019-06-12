import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';

export const FEATURE_NAME = 'examples';
export const selectExamples = createFeatureSelector<State, ExamplesState>(
    FEATURE_NAME
);
export const reducers: ActionReducerMap<ExamplesState> = {
    stocks: stockMarketReducer,
};

export interface ExamplesState {
    stocks: StockMarketState;
}

export interface State extends AppState {
    examples: ExamplesState;
}
