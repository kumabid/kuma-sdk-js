import type { RestPublicClientOptions } from '../client/rest';
import type { WebSocketClientOptions } from '../client/webSocket';

/**
 * @typedef {Object} BestAvailablePriceLevels
 * @property {bigint} baseReceived - actual quantity received, in base units at the best available buy price
 * @property {bigint} bestAvailableBuyPrice - best available price for buy orders of the minimum size
 * @property {bigint} bestAvailableSellPrice - best available price for sell orders of the minimum size
 * @property {bigint} quoteReceived - actual quantity received, in quote units at the best available sell price
 */
export type BestAvailablePriceLevels = {
  baseReceived: bigint;
  bestAvailableBuyPrice: bigint;
  bestAvailableSellPrice: bigint;
  quoteReceived: bigint;
};

/**
 * @typedef {Object} L1OrderBook
 * @property {number} sequence
 * @property {OrderBookLevelL1} asks
 * @property {OrderBookLevelL1} bids
 * @property {PoolReserveQuantities | null} pool
 */
export type L1OrderBook = {
  sequence: number;
  asks: OrderBookLevelL1;
  bids: OrderBookLevelL1;
  pool: PoolReserveQuantities | null;
};

/**
 * @typedef {Object} L2OrderBook
 * @property {number} sequence
 * @property {OrderBookLevelL2[]} asks
 * @property {OrderBookLevelL2[]} bids
 * @property {PoolReserveQuantities | null} pool
 */
export type L2OrderBook = {
  sequence: number;
  asks: OrderBookLevelL2[];
  bids: OrderBookLevelL2[];
  pool: null | PoolReserveQuantities;
};

/**
 * @typedef {Object} OrderBookFeeRates
 * @property {string} idexFeeRate
 * @property {string} poolFeeRate
 * @property {string} takerMinimumInNativeAsset
 */
export type OrderBookFeeRates = {
  idexFeeRate: string;
  poolFeeRate: string;
  takerMinimumInNativeAsset: string;
};

/**
 * @typedef {Object} OrderBookLevelType
 */
export type OrderBookLevelType = 'limit' | 'pool';

/**
 * @typedef {Object} OrderBookLevelL1
 * @property {bigint} price
 * @property {bigint} size
 * @property {number} numOrders
 */
export type OrderBookLevelL1 = {
  price: bigint;
  size: bigint;
  numOrders: number;
};

/**
 * @typedef {Object} OrderBookLevelL2
 * @property {bigint} price
 * @property {bigint} size
 * @property {number} numOrders
 * @property {OrderBookLevelType} type
 */
export type OrderBookLevelL2 = OrderBookLevelL1 & {
  type: OrderBookLevelType;
};

/**
 * @typedef {Object} PoolReserveQuantities
 * @property {bigint} baseReserveQuantity
 * @property {bigint} quoteReserveQuantity
 */
export type PoolReserveQuantities = {
  baseReserveQuantity: bigint;
  quoteReserveQuantity: bigint;
};

/**
 * @typedef {Object} PriceLevelQuantities
 * @property {bigint} grossBase
 * @property {bigint} grossQuote
 */
export type PriceLevelQuantities = { grossBase: bigint; grossQuote: bigint };

/**
 * Orderbook Client Options
 *
 * @typedef {Object} OrderBookRealTimeClientOptions
 * @property {boolean} [sandbox]
 * @property {string} [restApiUrl] - Override the API url for REST requests
 * @property {string} [webSocketApiUrl] - Override the API url for REST requests
 * @property {string} [apiKey] - Increases rate limits if provided
 * @property {MultiverseChain} [multiverseChain]
 * @property {number} [connectTimeout] - Connection timeout for websocket (default 5000)
 */
export type OrderBookRealTimeClientOptions = Omit<
  Omit<
    RestPublicClientOptions &
      WebSocketClientOptions & {
        restApiUrl?: string;
        webSocketApiUrl?: string;
      },
    'baseURL'
  >,
  'shouldReconnectAutomatically'
>;

export type SyntheticL2OrderBook = Omit<L2OrderBook, 'sequence'>;
