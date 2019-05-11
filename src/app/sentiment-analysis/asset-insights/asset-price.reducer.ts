import { StockMarketState } from './asset-price.model';
import {
    CryptoMarketActions,
    StockMarketActionTypes
} from './asset-price';

export const initialState: StockMarketState = {
    symbol: 'GOOGL',
    loading: false
};

export function assetPriceReducer(
    state: StockMarketState = initialState,
    action: CryptoMarketActions
): StockMarketState {
    switch (action.type) {
        case StockMarketActionTypes.RETRIEVE:
            return {
                ...state,
                loading: true,
                stock: null,
                error: null,
                symbol: action.payload.symbol
            };

        case StockMarketActionTypes.RETRIEVE_SUCCESS:
            return {
                ...state,
                loading: false,
                stock: action.payload.stock,
                error: null
            };

        case StockMarketActionTypes.RETRIEVE_ERROR:
            return {
                ...state,
                loading: false,
                stock: null,
                error: action.payload.error
            };

        default:
            return state;
    }
}
