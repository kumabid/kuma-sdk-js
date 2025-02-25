import * as http from 'http';
import * as https from 'https';

import Axios from 'axios';

import { REST_API_KEY_HEADER } from '#constants';
import {
  INTERNAL_SYMBOL,
  deriveBaseURL,
  isNode,
  sanitizeSearchParams,
} from '#utils';

import type * as kuma from '#index';
import type { AnyObj } from '#types/utils';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

/**
 * Public REST API client options
 *
 * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/interfaces/RestPublicClientOptions.html)
 * @see client   {@link RestPublicClient}
 *
 * @category API Clients
 */
export interface RestPublicClientOptions {
  /**
   * - If `true`, the client will point to [Kuma Sandbox API](https;//api-docs-v1.kuma.bid/#sandbox)
   * - If not provided or `false`, will point to the Kuma Production API.
   *
   * @defaultValue
   * ```typescript
   * false
   * ```
   */
  sandbox?: boolean;
  /**
   * Optional for public clients
   *
   * - Increases rate limits when provided
   */
  apiKey?: string;

  /**
   * Override the API url
   *
   * @internal
   */
  baseURL?: string;
  /**
   * - This is for internal use only and may not work as expected if used.
   *
   * @internal
   */
  axiosConfig?: CreateAxiosDefaults;
}

/**
 * The {@link RestPublicClient} is used to make public requests to the Kuma API.  It does not require
 * any special options to access.
 *
 * - An {@link RestPublicClientOptions.apiKey apiKey} can be provided
 *   to increase rate limits.
 * - Optionally, a {@link RestPublicClientOptions.sandbox sandbox} option can
 *   be set to `true` in order to point to the Kuma Sandbox API.
 *
 * @example
 * ```typescript
 * import { RestPublicClient } from '@kumabid/kuma-sdk';
 *
 * // works without any options
 * // const publicClient = new RestPublicClient();
 *
 * const publicClient = new RestPublicClient({
 *   sandbox: true,
 *   // Optionally provide an API key to increase rate limits
 *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
 * });
 *
 * const tickers = await publicClient.getTickers('ETH-USD');
 * console.log('Tickers: ', tickers);
 * ```
 *
 * <br />
 *
 * ---
 *
 * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html)
 * @see options  {@link RestPublicClientOptions}
 *
 * @category API Clients
 * @category Kuma - Get Time
 * @category Kuma - Get Ping
 * @category Kuma - Get Exchange
 * @category Kuma - Get Gas Fees
 * @category Kuma - Get Markets
 * @category Kuma - Get Tickers
 * @category Kuma - Get Candles
 * @category Kuma - Get Trades
 * @category Kuma - Get OrderBook
 * @category Kuma - Get Liquidations
 * @category Kuma - Get Funding Rates
 */
export class RestPublicClient {
  /**
   * The {@link RestPublicClient} is used to make public requests to the Kuma API.  It does not require
   * any special options to access.
   *
   * - An {@link RestPublicClientOptions.apiKey apiKey} can be provided
   *   to increase rate limits.
   * - Optionally, a {@link RestPublicClientOptions.sandbox sandbox} option can
   *   be set to `true` in order to point to the Kuma Sandbox API.
   *
   * @param options
   *  Options for configuring the RestPublicClient
   *
   * @example
   * ```typescript
   * import { RestPublicClient } from '@kumabid/kuma-sdk';
   *
   * // works without any options
   * // const publicClient = new RestPublicClient();
   *
   * const publicClient = new RestPublicClient({
   *   sandbox: true,
   *   // Optionally provide an API key to increase rate limits
   *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
   * });
   *
   * const tickers = await publicClient.getTickers('ETH-USD');
   * console.log('Tickers: ', tickers);
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html)
   * @see options  {@link RestPublicClientOptions}
   *
   * @category Constructor
   */
  public constructor(options: RestPublicClientOptions = {}) {
    const { sandbox = false } = options;

    const baseURL = deriveBaseURL({
      sandbox,
      api: 'rest',
      overrideBaseURL: options.baseURL ?? options.axiosConfig?.baseURL,
    });

    if (!baseURL) {
      throw new Error(
        `Invalid configuration, baseURL could not be derived (sandbox? ${String(
          sandbox,
        )})`,
      );
    }

    this.#axiosConfig = Object.freeze({
      paramsSerializer(params) {
        return sanitizeSearchParams(params ?? {}).toString();
      },
      ...(isNode ?
        {
          httpAgent:
            options.axiosConfig?.httpAgent ??
            new http.Agent({ keepAlive: true }),
          httpsAgent:
            options.axiosConfig?.httpsAgent ??
            new https.Agent({ keepAlive: true }),
        }
      : {}),
      ...(options.axiosConfig ?? {}),
      baseURL,
      headers: {
        ...(options.apiKey ?
          {
            [REST_API_KEY_HEADER]: options.apiKey,
          }
        : {}),
        ...(options.axiosConfig?.headers ?? {}),
      },
    });

    this.axios = Axios.create(this.#axiosConfig);
  }

  #realtime = false;

  /**
   * Tests connectivity to the REST API
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/ping`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#ping)
   * @see response {@link kuma.RestResponseGetPing RestResponseGetPing}
   *
   * @category Utility
   */
  public async ping() {
    return this.get<kuma.RestResponseGetPing>('/ping');
  }

  /**
   * Returns the current server time
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/time`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getServerTime)
   * @see response {@link kuma.RestResponseGetTime RestResponseGetTime}
   *
   * @returns An object with the current server time in `UTC`
   *
   * @category Utility
   */
  public async getServerTime() {
    return this.get<kuma.RestResponseGetTime>('/time');
  }

  /**
   * Returns basic information about the exchange.
   *
   * - Some of the returned parmeters can be used to configure contract calls
   *   required for other methods.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/exchange`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @returns
   * > An object matching {@link kuma.KumaExchange KumaExchange} providing properties relating
   * to the exchange.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getExchange)
   * @see response {@link kuma.RestResponseGetExchange RestResponseGetExchange}
   *
   * @category Exchange Data
   */
  public async getExchange() {
    return this.get<kuma.RestResponseGetExchange>('/exchange');
  }

  /**
   * Returns estimated gas fees by bridge and target chain
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/gasFees`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getGasFees)
   * @see response {@link kuma.RestResponseGetGasFees RestResponseGetGasFees}
   * @see type     {@link kuma.KumaGasFees KumaGasFees}
   *
   * @category Exchange Data
   */
  public async getGasFees() {
    return this.get<kuma.RestResponseGetGasFees>('/gasFees');
  }

  /**
   * Returns information about the currently listed markets
   *
   * - Optionally filter for a specific market by providing a `market` request
   *   parameter.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/markets`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getMarkets)
   * @see request  {@link kuma.RestRequestGetMarkets RestRequestGetMarkets}
   * @see response {@link kuma.RestResponseGetMarkets RestResponseGetMarkets}
   * @see type     {@link kuma.KumaMarket KumaMarket}
   *
   * @category Exchange Data
   */
  public async getMarkets(params?: kuma.RestRequestGetMarkets) {
    return this.get<kuma.RestResponseGetMarkets>('/markets', params);
  }

  // Market Data Endpoints

  /**
   * Returns market statistics for the trailing 24-hour period
   *
   * - **TIP:** Automatic ticker updates are avilable via the WebSocket API tickers subscription,
   *   which is both faster and more efficient than polling this endpoint!
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/tickers`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getTickers)
   * @see request  {@link kuma.RestRequestGetTickers RestRequestGetTickers}
   * @see response {@link kuma.RestResponseGetTickers RestResponseGetTickers}
   * @see type     {@link kuma.KumaTicker KumaTicker}
   *
   * @category Exchange Data
   */
  public async getTickers(params?: kuma.RestRequestGetTickers) {
    return this.get<kuma.RestResponseGetTickers>('/tickers', params);
  }

  /**
   * Returns candle (OHLCV) data for a market
   *
   * - For autocompletion and inline documentation, use the {@link kuma.CandleInterval CandleInterval} enum
   *   when specifying the `interval` property (see example)
   * - **TIP:** Automatic candle updates are avilable via the WebSocket API candles subscription,
   *   which is both faster and more efficient than polling this endpoint!
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/candles`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPagination.start start},
   * > {@link kuma.RestRequestPagination.end end},
   * > {@link kuma.RestRequestPagination.limit limit}
   * ---
   *
   * @example
   * ```typescript
   * import { RestPublicClient, CandleInterval } from '@kumabid/kuma-sdk';
   *
   * const client = new RestPublicClient();
   *
   * const candles = await client.getCandles({
   *  market: 'ETH-USD',
   *  interval: CandleInterval.ONE_MINUTE
   * })
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getCandles)
   * @see request  {@link kuma.RestRequestGetCandles RestRequestGetCandles}
   * @see response {@link kuma.RestResponseGetCandles RestResponseGetCandles}
   * @see type     {@link kuma.KumaCandle KumaCandle}
   *
   * @category Exchange Data
   */
  public async getCandles(params: kuma.RestRequestGetCandles) {
    return this.get<kuma.RestResponseGetCandles>('/candles', params);
  }

  /**
   * Returns trade data for a market. In this documentation, "trades" refers to public information about trades, whereas "fills" refers to detailed non-public information about trades resulting from orders placed by the API account.
   *
   * - **TIP:** Automatic trades updates are available via the WebSocket API trades subscription,
   *   which is both faster and more efficient than polling this endpoint!
   * - **TIP:** There is also a call on the authenticated client {@link kuma.RestAuthenticatedClient.getFills RestAuthenticatedClient.getFills}
   *   which includes the {@link kuma.KumaFill KumaFill} properties, if required.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/trades`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getTrades)
   * @see request  {@link kuma.RestRequestGetTrades RestRequestGetTrades}
   * @see response {@link kuma.RestResponseGetTrades RestResponseGetTrades}
   * @see type     {@link kuma.KumaTrade KumaTrade}
   * @see related  {@link kuma.RestAuthenticatedClient.getFills RestAuthenticatedClient.getFills}
   *
   * @category Exchange Data
   */
  public async getTrades(params: kuma.RestRequestGetTrades) {
    return this.get<kuma.RestResponseGetTrades>('/trades', params);
  }

  /**
   * Returns a level-1 order book of a market.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/orderbook`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPagination.limit limit},
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getOrderBookLevel1)
   * @see request  {@link kuma.RestRequestGetOrderBookLevel1 RestRequestGetOrderBookLevel1}
   * @see response {@link kuma.RestResponseGetOrderBookLevel1 RestResponseGetOrderBookLevel1}
   * @see related  {@link getOrderBookLevel2 client.getOrderBookLevel2}
   *
   * @category Exchange Data
   */
  public async getOrderBookLevel1(params: kuma.RestRequestGetOrderBookLevel1) {
    return this.get<kuma.RestResponseGetOrderBookLevel1>('/orderbook', {
      ...params,
      level: 1,
    } satisfies kuma.RestRequestGetOrderBookLevel1);
  }

  /**
   * Get current order book price levels for a market
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/orderbook`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPagination.limit limit},
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getOrderBookLevel2)
   * @see request  {@link kuma.RestRequestGetOrderBookLevel2 RestRequestGetOrderBookLevel2}
   * @see response {@link kuma.RestResponseGetOrderBookLevel2 RestResponseGetOrderBookLevel2}
   * @see related  {@link getOrderBookLevel1 client.getOrderBookLevel1}
   *
   * @category Exchange Data
   */
  public async getOrderBookLevel2(params: kuma.RestRequestGetOrderBookLevel2) {
    return this.get<kuma.RestResponseGetOrderBookLevel2>('/orderbook', {
      ...params,
      level: 2,
    } satisfies kuma.RestRequestGetOrderBookLevel2);
  }

  /**
   * Get liquidations for a market
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/liquidations`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getLiquidations)
   * @see request  {@link kuma.RestRequestGetLiquidations RestRequestGetLiquidations}
   * @see response {@link kuma.RestResponseGetLiquidations RestResponseGetLiquidations}
   * @see type     {@link kuma.KumaLiquidation KumaLiquidation}
   *
   * @category Exchange Data
   */
  public async getLiquidations(params: kuma.RestRequestGetLiquidations) {
    return this.get<kuma.RestResponseGetLiquidations>('/liquidations', params);
  }

  /**
   * Get Funding Rates
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request**:      `GET /v1/fundingRates`
   * > - **Endpoint Security:** [Public](https://api-docs-v1.kuma.bid/#endpointSecurityPublic)
   * > - **API Key Scope:**     [None](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestPublicClient.html#getFundingRates)
   * @see request  {@link kuma.RestRequestGetFundingRates RestRequestGetFundingRates}
   * @see response {@link kuma.RestResponseGetFundingRates RestResponseGetFundingRates}
   * @see type     {@link kuma.KumaFundingRate KumaFundingRate}
   *
   * @category Exchange Data
   */
  public async getFundingRates(params: kuma.RestRequestGetFundingRates) {
    return this.get<kuma.RestResponseGetFundingRates>('/fundingRates', params);
  }

  /**
   * - All requests within the internal symbol are undocumented internal methods which may change or be removed without notice.
   * - API handling of the parameters used within these methods is likely to change without notice without changes to the SDK to match.
   * - These methods or parameters may require additional permissions to use and result in errors or blocking of your request if used.
   * - If you need to use these methods for your use case, please contact support to discuss your requirements before using them.
   *
   * @internal
   */
  public readonly [INTERNAL_SYMBOL] = Object.freeze({
    realtime: () => {
      this.#realtime = true;
    },
  } as const);

  // Internal methods exposed for advanced usage.

  protected async get<R, O extends AnyObj | URLSearchParams = {}>(
    endpoint: string,
    params?: O | undefined,
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'params'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'GET',
        url: endpoint,
        params: new URLSearchParams(params),
      })
    ).data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected request<R = any>(
    endpoint: string,
    config: Partial<AxiosRequestConfig> & { method: 'GET' },
  ) {
    const request = {
      ...config,
      headers: config.headers ?? {},
      url: endpoint,
    } satisfies AxiosRequestConfig;

    if (this.#realtime && !request.headers['KUMA-Web-Client']) {
      request.headers['KUMA-Web-Client'] = 'realtime-sdk';
    }

    return this.axios<R>(request);
  }

  readonly axios: AxiosInstance;

  readonly #axiosConfig: RestPublicClientOptions['axiosConfig'] & {};
}

const EXCHANGE_RESPONSE_CACHE_DURATION_MS = 300_000;

let cachedExchangeResponse: kuma.RestResponseGetExchange | undefined;
let exchangeResponseCachedAt = 0;

export async function getExchangeAddressAndChainFromApi(
  opts?: RestPublicClientOptions,
) {
  const client = new RestPublicClient(opts);
  const now = Date.now();

  const cachedValueIsStale =
    now - exchangeResponseCachedAt > EXCHANGE_RESPONSE_CACHE_DURATION_MS;

  const exchange =
    !cachedExchangeResponse || cachedValueIsStale ?
      await client.getExchange()
    : cachedExchangeResponse;

  cachedExchangeResponse = exchange;
  exchangeResponseCachedAt =
    cachedValueIsStale ? now : exchangeResponseCachedAt;

  return [exchange, client] as const;
}
