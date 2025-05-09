/* eslint-disable lines-between-class-members */
import * as http from 'http';
import * as https from 'https';

import Axios from 'axios';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

import { REST_API_KEY_HEADER } from '#constants';
import {
  createPrivateKeyTypedDataSigner,
  getOrderCancellationSignatureTypedData,
  getOrderSignatureTypedData,
  getWalletAssociationSignatureTypedData,
  getWithdrawalSignatureTypedData,
  getInitialMarginFractionOverrideSettingsSignatureTypedData,
} from '#signatures';
import {
  deriveBaseURL,
  isNode,
  createHmacRestRequestSignatureHeader,
  INTERNAL_SYMBOL,
  sanitizeSearchParams,
} from '#utils';

import { getEncodedWithdrawalPayloadForBridgeTarget } from '#bridge/withdraw';
import { RestPublicClient } from '#client/rest/public';
import { BridgeTarget } from '#types/enums/request';

import type * as kuma from '#index';
import type { AnyObj, Paginated } from '#types/utils';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from 'axios';

/**
 * Authenticated API client configuration options.
 *
 * @example
 * ```typescript
 * import { RestAuthenticatedClient } from '@kumabid/kuma-sdk';
 *
 * // Edit the values before for your environment
 * const authenticatedClient = new RestAuthenticatedClient({
 *   sandbox: false,
 *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
 *   apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
 *   walletPrivateKey: '0x...'
 * });
 * ```
 *
 * <br />
 *
 * ---
 *
 * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/interfaces/RestAuthenticatedClientOptions.html)
 * @see client   {@link RestAuthenticatedClient}
 *
 * @category API Clients
 */
export interface RestAuthenticatedClientOptions {
  /**
   * - Used to authenticate the requesting user making requests to the API.
   */
  apiKey: string;
  /**
   * - Used to compute HMAC signature for authenticated requests
   */
  apiSecret: string;
  /**
   * The private key for the wallet making requests to the API.
   *
   * **Note:** This should always be provided except in advanced use case scenarios.
   *
   * - When **provided**, used to create ECDSA signatures for authenticated requests automatically.
   * - When **not provided**, must provider your own {@link kuma.SignTypedData signer} to sign requests
   *   that require an ECDSA signature.
   */
  walletPrivateKey?: string;

  /**
   * - If `true`, the client will point to [Kuma Sandbox API](https;//api-docs-v1.kuma.bid/#sandbox)
   * - If not provided or `false`, will point to the Kuma Production API.
   *
   * @defaultValue false
   */
  sandbox?: boolean;

  /* Note that most items below are optional and rarely required for users. */

  /**
   * - Optionally provide a custom baseURL to use instead of the automatically
   *   derived value based on the {@link sandbox} option.
   *
   * @internal
   */
  baseURL?: string;
  /**
   * **Optionally** provide the `exchangeContractAddress` as returned by the public clients
   * {@link RestPublicClient.getExchange getExchange} response's
   * {@link kuma.KumaExchange.exchangeContractAddress exchangeContractAddress} property.
   *
   * - If not provided, this will be fetched and cached automatically from the public client before
   *   making the first request which requires it.
   *
   * @internal
   */
  exchangeContractAddress?: string;
  /**
   * Optionally provide the `chainId` as returned by the public clients
   * {@link RestPublicClient.getExchange getExchange} response's
   * {@link kuma.KumaExchange.chainId chainId} property.
   *
   * - If not provided, this will be fetched and cached automatically from the public client before
   *   making the first request which requires it.
   *
   * @internal
   */
  chainId?: number;
  /**
   * Optionally provide the `stargateBridgeAdapterContractAddress` as returned by the public clients
   * {@link RestPublicClient.getExchange getExchange} response's
   * {@link kuma.KumaExchange.stargateBridgeAdapterContractAddress stargateBridgeAdapterContractAddress}
   * property.
   *
   * - If not provided, this will be fetched and cached automatically from the public client before
   *   making the first request which requires it.
   *
   * @internal
   */
  stargateBridgeAdapterContractAddress?: string;
  /**
   * - Changing this value will likely result in a broken client, internal use only.
   *
   * @defaultValue true
   * @internal
   */
  autoCreateHmacHeader?: boolean;
  /**
   * - This is for internal use only and may not work as expected if used.
   *
   * @internal
   */
  axiosConfig?: CreateAxiosDefaults;
}

/**
 * The {@link RestAuthenticatedClient} is used to make authenticated requests to the Kuma API.  It includes
 * methods that make requests on behalf of a specific wallet such as creating and cancelling orders.
 *
 * - The client requires the following properties to automatically handle authentication
 *   of requests:
 *   - {@link RestAuthenticatedClientOptions.apiKey apiKey}
 *   - {@link RestAuthenticatedClientOptions.apiSecret apiSecret}
 *   - {@link RestAuthenticatedClientOptions.walletPrivateKey walletPrivateKey}
 * - Optionally, a {@link RestAuthenticatedClientOptions.sandbox sandbox} option can
 *   be set to `true` in order to point to the Kuma Sandbox API.
 *
 * @example
 * ```typescript
 * import { RestAuthenticatedClient } from '@kumabid/kuma-sdk';
 *
 * // Edit the values before for your environment
 * const authenticatedClient = new RestAuthenticatedClient({
 *   sandbox: false,
 *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
 *   apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
 *   walletPrivateKey: '0x...'
 * });
 * ```
 *
 * <br />
 *
 * ---
 *
 * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html)
 * @see options  {@link RestAuthenticatedClientOptions}
 *
 * @category API Clients
 * @category Kuma - Get Market Maker Rewards Epochs
 * @category Kuma - Get Wallets
 * @category Kuma - Get Positions
 * @category Kuma - Associate Wallet
 * @category Kuma - Create Order
 * @category Kuma - Cancel Order
 * @category Kuma - Get Orders
 * @category Kuma - Get Fills
 * @category Kuma - Get Payouts
 * @category Kuma - Authorize Payout
 * @category Kuma - Get Deposits
 * @category Kuma - Get Withdrawals
 * @category Kuma - Withdraw Funds
 * @category Kuma - Get Funding Payments
 * @category Kuma - Get Historical PnL
 * @category Kuma - Get WebSocket Token
 */
export class RestAuthenticatedClient {
  /**
   * When creating an authenticated client, a {@link kuma.RestPublicClient RestPublicClient} is automatically
   * created and can be used based on the config given for this client.
   *
   * - Can be utilized to fetch public data instead of creating both clients.
   * - Used when fetching the {@link kuma.KumaExchange.exchangeContractAddress exchangeContractAddress}
   *   and {@link kuma.KumaExchange.chainId chainId} properties from the public client's
   *   {@link RestPublicClient.getExchange getExchange} method.
   *
   * @example
   * ```typescript
   * import { RestAuthenticatedClient } from '@kumabid/kuma-sdk';
   *
   * // Edit the values before for your environment
   * const client = new RestAuthenticatedClient({
   *   sandbox: true,
   *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
   *   apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
   *   walletPrivateKey: '0x...'
   * });
   *
   * const wallets = await client.getWallets();
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see client {@link kuma.RestPublicClient RestPublicClient}
   *
   * @category Accessors
   */
  readonly public: kuma.RestPublicClient;

  #exchange: null | kuma.KumaExchange = null;
  #exchangeProm: null | Promise<kuma.KumaExchange> = null;

  readonly #signer: undefined | kuma.SignTypedData = undefined;

  readonly #apiSecret: string;

  readonly #axiosConfig: RestAuthenticatedClientOptions['axiosConfig'];

  readonly axios: AxiosInstance;

  #config: {
    baseURL: string;
    sandbox: boolean;
    autoCreateHmacHeader: boolean;
  } & Partial<
    Pick<
      kuma.KumaExchange,
      | 'stargateBridgeAdapterContractAddress'
      | 'exchangeContractAddress'
      | 'chainId'
    >
  >;

  /**
   * Gets the current configured options for the client.
   *
   * - The `baseURL` is automatically derived from the {@link sandbox} option during construction
   *   unless a custom `baseURL` is given.
   * - The `sandbox` will either default to `false` unless provided in the client constructor.
   * - Both `exchangeContractAddress` and `chainId` use the provided values during construction
   *   or are automatically fetched from the {@link public} client.
   *
   * @category Accessors
   *
   * @internal
   */
  public get config() {
    return Object.freeze({
      ...this.#config,
    });
  }

  /**
   * The {@link RestAuthenticatedClient} is used to make authenticated requests to the Kuma API.  It includes
   * methods that make requests on behalf of a specific wallet such as creating and cancelling orders.
   *
   * - The client requires the following properties to automatically handle authentication
   *   of requests:
   *   - {@link RestAuthenticatedClientOptions.apiKey apiKey}
   *   - {@link RestAuthenticatedClientOptions.apiSecret apiSecret}
   *   - {@link RestAuthenticatedClientOptions.walletPrivateKey walletPrivateKey}
   * - Optionally, a {@link RestAuthenticatedClientOptions.sandbox sandbox} option can
   *   be set to `true` in order to point to the Kuma Sandbox API.
   *
   * @example
   * ```typescript
   * import { RestAuthenticatedClient } from '@kumabid/kuma-sdk';
   *
   * // Edit the values before for your environment
   * const client = new RestAuthenticatedClient({
   *   sandbox: true,
   *   apiKey: '1f7c4f52-4af7-4e1b-aa94-94fac8d931aa',
   *   apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
   *   walletPrivateKey: '0x...'
   * });
   *
   * const wallets = await client.getWallets();
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/WebSocketClient.html)
   * @see options {@link RestAuthenticatedClientOptions}
   *
   * @category Constructor
   */
  public constructor(options: RestAuthenticatedClientOptions) {
    const {
      sandbox = false,
      exchangeContractAddress,
      chainId,
      stargateBridgeAdapterContractAddress,
      autoCreateHmacHeader = true,
    } = options;

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

    this.#config = {
      baseURL,
      sandbox,
      stargateBridgeAdapterContractAddress,
      exchangeContractAddress,
      chainId,
      autoCreateHmacHeader,
    };

    this.public = new RestPublicClient({
      apiKey: options.apiKey,
      baseURL,
      sandbox,
    });

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
        ...(options.axiosConfig?.headers ?? {
          [REST_API_KEY_HEADER]: options.apiKey,
        }),
      },
    });

    this.#apiSecret = options.apiSecret;

    if (options.walletPrivateKey) {
      this.#signer = createPrivateKeyTypedDataSigner(options.walletPrivateKey);
    }

    this.axios = Axios.create(this.#axiosConfig);

    if (options.axiosConfig?.headers) {
      Object.assign(
        this.axios.defaults.headers.common,
        options.axiosConfig.headers,
      );
    }
  }

  /**
   * <br />
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - HTTP Request:      `GET /v1/marketMakerRewardsV1/epoch`
   * > - Endpoint Security: [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - API Key Scope:     [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * <br />
   *
   * <details>
   *  <summary><span style="font-size:1.4em;font-weight:bold;">About Overloads</span></summary>
   *    <p>
   *      This method has two overloads to provide type-safe responses:
   *      <ul>
   *      <li>
   *        Calling this method with a {@link kuma.RestRequestGetMarketMakerRewardsEpochWithWallet.wallet wallet}
   *        parameter returns {@link kuma.MarketMakerRewardsEpochDetailedWithWallet MarketMakerRewardsEpochDetailedWithWallet}
   *      </li>
   *      <li>
   *        Calling this method without a {@link kuma.RestRequestGetMarketMakerRewardsEpochWithWallet.wallet wallet}
   *        parameter returns {@link kuma.MarketMakerRewardsEpochDetailedWithoutWallet MarketMakerRewardsEpochDetailedWithoutWallet}
   *      </li>
   *    </ul>
   * </p>
   * </details>
   * <br />
   *
   * <br />
   *
   * <h3>Overload 1: With Wallet</h3>
   *
   * <p>The Get Epoch endpoint provides detailed information about
   * epoch configuration as well as wallet epoch performance.</p>
   *
   * > When **providing** a wallet address, the resulting response will
   * > be {@link kuma.MarketMakerRewardsEpochDetailedWithWallet MarketMakerRewardsEpochDetailedWithWallet}
   */
  public async getMarketMakerRewardsEpoch(
    params: kuma.RestRequestGetMarketMakerRewardsEpochWithWallet,
  ): Promise<kuma.MarketMakerRewardsEpochDetailedWithWallet>;
  /**
   * <h3>Overload 2: Without Wallet</h3>
   *
   * > When **not** providing a {@link kuma.RestRequestGetMarketMakerRewardsEpochWithWallet.wallet wallet},
   * > the resulting response will be {@link kuma.MarketMakerRewardsEpochDetailedWithoutWallet MarketMakerRewardsEpochDetailedWithoutWallet}
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getMarketMakerRewardsEpoch)
   * @see request   {@link kuma.RestRequestGetMarketMakerRewardsEpoch RestRequestGetMarketMakerRewardsEpoch}
   * @see response  {@link kuma.RestResponseGetMarketMakerRewardsEpoch RestResponseGetMarketMakerRewardsEpoch}
   * @see type      {@link kuma.KumaMarketMakerRewardsEpoch KumaMarketMakerRewardsEpoch}
   * @see related   {@link getMarketMakerRewardsEpochs this.getMarketMakerRewardsEpochs}
   *
   * @category Rewards & Payouts
   */
  public async getMarketMakerRewardsEpoch(
    params: kuma.RestRequestGetMarketMakerRewardsEpochWithoutWallet,
  ): Promise<kuma.MarketMakerRewardsEpochDetailedWithoutWallet>;
  public async getMarketMakerRewardsEpoch<
    R extends kuma.RestRequestGetMarketMakerRewardsEpoch,
  >(params: R) {
    return this.get<kuma.RestResponseGetMarketMakerRewardsEpoch<R>>(
      '/marketMakerRewardsV1/epoch',
      params,
    );
  }

  /**
   * The Get Epochs endpoint provides a list of the defined
   * market maker rewards epochs.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - HTTP Request:      `GET /v1/marketMakerRewardsV1/epochs`
   * > - Endpoint Security: [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - API Key Scope:     [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * ---
   *
   * @see typedoc   [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getMarketMakerRewardsEpochs)
   * @see request   {@link kuma.RestRequestGetMarketMakerRewardsEpochs RestRequestGetMarketMakerRewardsEpochs}
   * @see response  {@link kuma.RestResponseGetMarketMakerRewardsEpochs RestResponseGetMarketMakerRewardsEpochs}
   * @see type      {@link kuma.KumaMarketMakerRewardsEpochSummary KumaMarketMakerRewardsEpochSummary}
   * @see related   {@link getMarketMakerRewardsEpoch client.getMarketMakerRewardsEpoch}
   *
   * @category Rewards & Payouts
   */
  public async getMarketMakerRewardsEpochs(
    params: kuma.RestRequestGetMarketMakerRewardsEpochs = {},
  ) {
    return this.get<kuma.RestResponseGetMarketMakerRewardsEpochs>(
      '/marketMakerRewardsV1/epochs',
      params,
    );
  }

  /**
   * Associates a wallet with an API account, allowing access to private data such as fills.
   * Associating a wallet with an API account is often the first step in interacting with private
   * read endpoints.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `POST /v1/wallets`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns the {@link kuma.KumaWallet KumaWallet} which was associated by the request.
   *
   * ---
   *
   * @example
   * ```typescript
   * const wallet = await client.associateWallet({
   *   nonce: uuidv1(),
   *   wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   * });
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#associateWallet)
   * @see request  {@link kuma.RestRequestAssociateWallet RestRequestAssociateWallet}
   * @see response {@link kuma.RestResponseAssociateWallet RestResponseAssociateWallet}
   * @see type     {@link kuma.KumaWallet KumaWallet}
   *
   * @category Wallets & Positions
   */
  public async associateWallet(
    params: kuma.RestRequestAssociateWallet,
    signer: undefined | kuma.SignTypedData = this.#signer,
  ) {
    ensureSigner(signer);

    const { chainId, exchangeContractAddress } =
      await this.getContractAndChainId();

    return this.post<kuma.RestResponseAssociateWallet>('/wallets', {
      parameters: params,
      signature: await signer(
        ...getWalletAssociationSignatureTypedData(
          params,
          exchangeContractAddress,
          chainId,
          this.#config.sandbox,
        ),
      ),
    });
  }

  /**
   * Returns information about the wallets associated with the API account.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/wallets`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   *  - An array of {@link kuma.KumaWallet KumaWallet} objects representing all associated wallets.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getWallets)
   * @see request  {@link kuma.RestRequestGetWallets RestRequestGetWallets}
   * @see response {@link kuma.RestResponseGetWallets RestResponseGetWallets}
   * @see type     {@link kuma.KumaWallet KumaWallet}
   *
   * @category Wallets & Positions
   */
  public async getWallets(params: kuma.RestRequestGetWallets) {
    return this.get<kuma.RestResponseGetWallets>('/wallets', params);
  }

  /**
   * Get Positions
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/positions`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   *  - An array of {@link kuma.KumaPosition KumaPosition} objects representing all matching positions based
   *    on your requested params.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getPositions)
   * @see request  {@link kuma.RestRequestGetPositions RestRequestGetPositions}
   * @see response {@link kuma.RestResponseGetPositions RestResponseGetPositions}
   * @see type     {@link kuma.KumaPosition KumaPosition}
   *
   * @category Wallets & Positions
   */
  public async getPositions(params: kuma.RestRequestGetPositions) {
    return this.get<kuma.RestResponseGetPositions>('/positions', params);
  }

  /**
   * Create and submit an order to the matching engine.
   *
   * - It is recommended to use the {@link kuma.OrderType OrderType} enum when creating
   *   your requests. This provides inline documentation and ensures accuracy of the values.
   * - Check out the {@link kuma.RestRequestOrder RestRequestOrder} type for an overview
   *   of the various parameters needed for different order types.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `POST /v1/orders`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityTrade)
   * > - **API Key Scope:**        [Trade](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   *  - Returns the {@link kuma.KumaOrder KumaOrder} which was created by the request.
   *
   * ---
   *
   * @example
   * ```typescript
   * import { OrderType, OrderSide } from '@kumabid/kuma-sdk';
   *
   * try {
   *   const order = await client.createOrder({
   *     // always use the enum and define it first so that
   *     // the type of this params object change to the
   *     // appropriate interface with completion hints in IDE!
   *     type: OrderType.market,
   *     // this object is now narrowed to
   *     // interface: RestRequestOrderTypeMarket
   *     side: OrderSide.buy,
   *     nonce: uuidv1(),
   *     wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *     market: 'ETH-USD',
   *     quantity: '10.00000000'
   *   });
   * } catch(e) {
   *   // order placement failed with an unexpected error
   *   // you may use isAxiosError(e) for stronger typing here if desired
   *   if (e.response?.data?.code === 'INSUFFICIENT_FUNDS') {
   *      // handle insufficient funds errors
   *      console.log('Insufficient funds to create order');
   *   }
   * }
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#createOrder)
   * @see request  {@link kuma.RestRequestOrder RestRequestOrder}
   * @see response {@link kuma.RestResponseGetOrder RestResponseGetOrder}
   * @see type     {@link kuma.KumaOrder KumaOrder}
   *
   * @category Orders
   */
  public async createOrder<T extends kuma.OrderType>(
    params: kuma.RestRequestOrder & { type: T },
    signer: undefined | kuma.SignTypedData = this.#signer,
  ) {
    ensureSigner(signer);

    const { chainId, exchangeContractAddress } =
      await this.getContractAndChainId();

    return this.post<kuma.RestResponseGetOrder>('/orders', {
      parameters: params,
      signature: await signer(
        ...getOrderSignatureTypedData(
          params,
          exchangeContractAddress,
          chainId,
          this.#config.sandbox,
        ),
      ),
    });
  }

  /**
   * Cancel multiple matching orders using one of the following methods:
   *
   * - By {@link kuma.RestRequestCancelOrdersByWallet.wallet wallet} (params: {@link kuma.RestRequestCancelOrdersByWallet RestRequestCancelOrdersByWallet})
   * - By {@link kuma.RestRequestCancelOrdersByMarket.wallet wallet} & {@link kuma.RestRequestCancelOrdersByMarket.market market} (params: {@link kuma.RestRequestCancelOrdersByMarket RestRequestCancelOrdersByMarket})
   * - By {@link kuma.RestRequestCancelOrdersByMarket.wallet wallet} & {@link kuma.RestRequestCancelOrdersByOrderIds.orderIds orderIds} (params: {@link kuma.RestRequestCancelOrdersByOrderIds RestRequestCancelOrdersByOrderIds})
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `DELETE /v1/orders`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Trade](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns an array of cancelled orders matching {@link kuma.KumaCanceledOrder KumaCanceledOrder}
   *
   * ---
   *
   * @example
   * ```typescript
   * const allOrders = client.cancelOrders({
   *   nonce: uuidv1(),
   *   wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   * });
   *
   * const ordersForMarket = client.cancelOrders({
   *   nonce: uuidv1(),
   *   wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *   market: 'ETH-USD'
   * });
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#cancelOrders)
   * @see request  {@link kuma.RestRequestCancelOrders RestRequestCancelOrders}
   * @see response {@link kuma.RestResponseCancelOrders RestResponseCancelOrders}
   * @see type     {@link kuma.KumaCanceledOrder KumaCanceledOrder}
   * @see related  {@link cancelOrder client.cancelOrder}
   *
   * @category Orders
   */
  public async cancelOrders(
    params: kuma.RestRequestCancelOrders,
    signer: kuma.SignTypedData | undefined = this.#signer,
  ) {
    return this.makeCancelOrdersRequest('/orders', params, signer);
  }

  private async makeCancelOrdersRequest(
    endpoint: string,
    params: kuma.RestRequestCancelOrders,
    signer: kuma.SignTypedData | undefined = this.#signer,
  ) {
    ensureSigner(signer);

    const { chainId, exchangeContractAddress } =
      await this.getContractAndChainId();

    return this.delete<kuma.RestResponseCancelOrders>(endpoint, {
      parameters: params,
      signature: await signer(
        ...getOrderCancellationSignatureTypedData(
          params,
          exchangeContractAddress,
          chainId,
          this.#config.sandbox,
        ),
      ),
    });
  }

  /**
   * Returns an order matching your {@link kuma.RestRequestGetOrder.orderId orderId} request parameter.
   *
   * - Can be an order's {@link kuma.KumaOrder.orderId orderId}
   * - To get an order by its {@link kuma.KumaOrder.clientOrderId clientOrderId},
   *   you should prefix the value with `client:`.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/orders`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getOrder)
   * @see request  {@link kuma.RestRequestGetOrder RestRequestGetOrder}
   * @see response {@link kuma.RestResponseGetOrder RestResponseGetOrder}
   * @see type     {@link kuma.KumaOrder KumaOrder}
   * @see related  {@link getOrders client.getOrders}
   *
   * @category Orders
   */
  public async getOrder(params: kuma.RestRequestGetOrder) {
    return this.get<kuma.RestResponseGetOrder>('/orders', params);
  }

  /**
   * Returns information about open and past {@link kuma.KumaOrder orders}.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/orders`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getOrders)
   * @see request  {@link kuma.RestRequestGetOrders RestRequestGetOrders}
   * @see response {@link kuma.RestResponseGetOrders RestResponseGetOrders}
   * @see type     {@link kuma.KumaOrder KumaOrder}
   * @see related  {@link getOrder client.getOrder}
   *
   * @category Orders
   */
  public async getOrders(params: kuma.RestRequestGetOrders) {
    return this.get<kuma.RestResponseGetOrders>('/orders', params);
  }

  /**
   * Get a single fill from the API by your requests {@link kuma.RestRequestGetFill.fillId fillId}
   * parameter.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/fills`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getFill)
   * @see request  {@link kuma.RestRequestGetFill RestRequestGetFill}
   * @see response {@link kuma.RestResponseGetFill RestResponseGetFill}
   * @see type     {@link kuma.KumaFill KumaFill}
   * @see related  {@link getFills client.getFills}
   *
   * @category Fills & Historical
   */
  public async getFill(params: kuma.RestRequestGetFill) {
    return this.get<kuma.RestResponseGetFill>('/fills', params);
  }

  /**
   * Get an array of {@link KumaFill} objects matching your request parameters.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/fills`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getFills)
   * @see request  {@link kuma.RestRequestGetFills RestRequestGetFills}
   * @see response {@link kuma.RestResponseGetFills RestResponseGetFills}
   * @see type     {@link kuma.KumaFill KumaFill}
   * @see related  {@link getFill client.getFill}
   *
   * @category Fills & Historical
   */
  public async getFills(params: kuma.RestRequestGetFills) {
    return this.get<kuma.RestResponseGetFills>('/fills', params);
  }

  /**
   * Returns information about a payout program and the requested wallets earned/paid amounts for
   * the program.
   *
   * - Includes the data required to authorize a payout using the `distribute`
   *   function of the escrow contract.
   * - Throws an error if the {@link kuma.KumaPayoutProgram.quantityOwed quantityOwed}
   *   is `0`
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `POST /v1/payouts`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @example
   * ```typescript
   * import { PayoutProgram } from '@kumabid/kuma-sdk';
   *
   * // create client
   *
   * await client.authorizePayout({
   *  wallet: '0x...',
   *  nonce: uuidv1(),
   *  // use the PayoutProgram enum for inline auto completion
   *  program: PayoutProgram.tradingRewardsV2
   * });
   * ```
   *
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#authorizePayout)
   * @see request  {@link kuma.RestRequestAuthorizePayout RestRequestAuthorizePayout}
   * @see response {@link kuma.RestResponseAuthorizePayout RestResponseAuthorizePayout}
   * @see type     {@link kuma.KumaPayoutProgramAuthorization KumaPayoutProgramAuthorization}
   *
   * @category Rewards & Payouts
   */
  public async authorizePayout(params: kuma.RestRequestAuthorizePayout) {
    return this.post<kuma.RestResponseAuthorizePayout>('/payouts', params);
  }

  /**
   * Returns information about a payout program and the requested wallets
   * earned/paid amounts for the program.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**       `GET /v1/payouts`
   * > - **Endpoint Security:**  [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**      [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**         `None`
   * ---
   *
   * @example
   * ```typescript
   * import { PayoutProgram } from '@kumabid/kuma-sdk';
   *
   * // create client
   *
   * await client.getPayouts({
   *  wallet: '0x...',
   *  nonce: uuidv1(),
   *  // use the PayoutProgram enum for inline auto completion
   *  program: PayoutProgram.tradingRewardsV2
   * });
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getPayouts)
   * @see request  {@link kuma.RestRequestGetPayouts RestRequestGetPayouts}
   * @see response {@link kuma.RestResponseGetPayouts RestResponseGetPayouts}
   * @see type     {@link kuma.KumaPayoutProgram KumaPayoutProgram}
   *
   * @category Rewards & Payouts
   */
  public async getPayouts(params: kuma.RestRequestGetPayouts) {
    return this.get<kuma.RestResponseGetPayouts>('/payouts', params);
  }

  /**
   * Returns information about deposits made by a wallet.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/deposits`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns a single {@link kuma.KumaDeposit KumaDeposit} object matching your parameters.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getDeposit)
   * @see request  {@link kuma.RestRequestGetDeposit RestRequestGetDeposit}
   * @see response {@link kuma.RestResponseGetDeposit RestResponseGetDeposit}
   * @see type     {@link kuma.KumaDeposit KumaDeposit}
   * @see related  {@link getDeposits client.getDeposits}
   *
   * @category Deposits & Withdrawals
   */
  public async getDeposit(params: kuma.RestRequestGetDeposit) {
    return this.get<kuma.RestResponseGetDeposit>('/deposits', params);
  }

  /**
   * Returns information about deposits made by a wallet.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/deposits`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @returns
   * - Returns an array of {@link kuma.KumaDeposit KumaDeposit} objects matching your parameters.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getDeposits)
   * @see request  {@link kuma.RestRequestGetDeposits RestRequestGetDeposits}
   * @see response {@link kuma.RestResponseGetDeposits RestResponseGetDeposits}
   * @see type     {@link kuma.KumaDeposit KumaDeposit}
   * @see related  {@link getDeposit client.getDeposit}
   *
   * @category Deposits & Withdrawals
   */
  public async getDeposits(params: kuma.RestRequestGetDeposits) {
    return this.get<kuma.RestResponseGetDeposits>('/deposits', params);
  }

  /**
   * A convenience method that helps capture the appropriate value for the
   * {@link withdraw} method's {@link kuma.RestRequestWithdrawFundsBase.maximumGasFee maximumGasFee}
   * parameter.
   *
   * - Calls `publicClient.getGasFees` and adds the defined `maximumSlippagePercent` to it.
   * - User should then confirm the value is acceptable before calling {@link withdraw} method.
   * - If gas were `0.05000000` and `maximumSlippagePercent` is `0.10000000` (10%) then result would be `0.05500000`
   * - The value is represented in USD.
   *
   * ---
   *
   * @returns
   * - A value indicating the max gas fee that should be allowed (in USD) based on the
   *   core gas fee with your `maximumSlippagePercent` added.  This value should always
   *   be validated by your application before calling {@link withdraw} method with this
   *   as your {@link kuma.RestRequestWithdrawFundsBase.maximumGasFee maximumGasFee}
   *   parameter.
   *
   * ---
   *
   * @example
   * ```typescript
   * // returns the max gas fee in USD you will accept for a withdrawal
   * const maximumGasFee = await client.calculateWithdrawalMaximumGasFee({
   *  bridgeTarget: BridgeTarget.STARGATE_ETHEREUM,
   *  // 10% slippage alllowed (default)
   *  maximumSlippagePercent: '0.10000000'
   * });
   *
   * // never pay more than $1 USD in gas fees to withdrawal
   * if (Number(maximumGasFee) >= 1) {
   *  throw new Error('Too Much Gas cost to Withdraw! ${maximumGasFee} USD >= 1 USD!');
   * }
   *
   * const withdrawal = await client.withdraw({
   *   nonce: uuidv1(),
   *   wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *   quantity: '100.00000000',
   *   maximumGasFee,
   *   bridgeTarget: BridgeTarget.STARGATE_ETHEREUM
   * });
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc   [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#calculateWithdrawalMaximumGasFee)
   * @see related {@link withdraw client.withdraw}
   */
  public async calculateWithdrawalMaximumGasFee({
    bridgeTarget,
    maximumSlippagePercent,
  }: {
    /**
     * The bridge target for the withdrawal of funds.
     *
     * - Utilize the {@link BridgeTarget} enum for convenience and
     *   auto-completion.
     * - Automatically calculates the {@link bridgeAdapterAddress} &
     *   {@link bridgeAdapterPayload} parameters for the targeted network.
     *
     * @see enum {@link BridgeTarget}
     */
    bridgeTarget: kuma.BridgeTarget;
    /**
     *  Maximum slippage percent in pips percent format (ex `0.10000000` for 10%)
     *
     * @example
     * ```typescript
     * // 10%
     * '0.10000000'
     * ```
     */
    maximumSlippagePercent: string;
  }) {
    const maximumSlippagePercentBN = BigNumber(maximumSlippagePercent);

    if (maximumSlippagePercentBN.gt(1) || maximumSlippagePercentBN.lt(0)) {
      throw new Error(
        `maximumSlippagePercent must be a value between 0 and 1. Value of ${maximumSlippagePercent} was provided`,
      );
    }

    const gasFees = await this.public.getGasFees();
    const fees = gasFees.withdrawal[bridgeTarget];

    if (!fees) {
      // in testnet we only define xchain so need this - mainnet should have all of them.
      throw new Error(
        `Could not estimate withdrawal maximumGasFee for ${bridgeTarget} as the "gasFees" endpoint does not provide the gas fee for the target.`,
      );
    }

    const slippage = BigNumber(fees).multipliedBy(maximumSlippagePercent);

    return BigNumber(fees).plus(slippage).toFixed(8, BigNumber.ROUND_DOWN);
  }

  /**
   * Withdraw funds from the exchange.
   *
   * - Unlike deposits, withdrawals are initiated via this REST API endpoint.
   * - Once the withdrawal is validated, Kuma automatically dispatches the
   *   resulting transaction to send funds to the wallet.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `POST /v1/withdrawals`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Withdraw](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns an {@link kuma.KumaWithdrawal KumaWithdrawal} object providing the details of the
   *   withdrawal.
   *
   * ---
   *
   * @example
   * ```typescript
   * // returns the max gas fee in USD you will accept for a withdrawal
   * const maximumGasFee = await client.calculateWithdrawalMaximumGasFee({
   *  bridgeTarget: BridgeTarget.STARGATE_ETHEREUM,
   *  // 10% slippage alllowed (default)
   *  maximumSlippagePercent: '0.10000000'
   * });
   *
   * // never pay more than $1 USD in gas fees to withdrawal
   * if (Number(maximumGasFee) >= 1) {
   *  throw new Error('Too Much Gas cost to Withdraw! ${maximumGasFee} USD >= 1 USD!');
   * }
   *
   * const withdrawal = await client.withdraw({
   *   nonce: uuidv1(),
   *   wallet: '0xA71C4aeeAabBBB8D2910F41C2ca3964b81F7310d',
   *   quantity: '100.00000000',
   *   maximumGasFee,
   *   bridgeTarget: BridgeTarget.STARGATE_ETHEREUM
   * });
   * ```
   *
   * <br />
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#withdraw)
   * @see request  {@link kuma.RestRequestWithdrawFunds RestRequestWithdrawFunds}
   * @see response {@link kuma.RestResponseWithdrawFunds RestResponseWithdrawFunds}
   * @see type     {@link kuma.KumaWithdrawal KumaWithdrawal}
   * @see related  {@link calculateWithdrawalMaximumGasFee}
   *
   * @category Deposits & Withdrawals
   */
  public async withdraw(
    $params: kuma.RestRequestWithdrawFundsSDK | kuma.RestRequestWithdrawFunds,
    signer: undefined | kuma.SignTypedData = this.#signer,
  ) {
    ensureSigner(signer);

    const {
      chainId,
      exchangeContractAddress,
      stargateBridgeAdapterContractAddress,
    } = await this.getContractAndChainId();

    let params: kuma.RestRequestWithdrawFunds;

    if ($params.bridgeTarget) {
      const { bridgeTarget, ...rest } = $params;

      params = {
        ...rest,
        bridgeAdapterAddress:
          bridgeTarget === BridgeTarget.XCHAIN_XCHAIN ?
            ethers.ZeroAddress
          : stargateBridgeAdapterContractAddress,
        bridgeAdapterPayload:
          bridgeTarget === BridgeTarget.XCHAIN_XCHAIN ?
            '0x'
          : getEncodedWithdrawalPayloadForBridgeTarget(
              bridgeTarget,
              this.#config.sandbox,
            ),
      };
    } else {
      params = $params;
    }

    return this.post<kuma.RestResponseWithdrawFunds>('/withdrawals', {
      parameters: params,
      signature: await signer(
        ...getWithdrawalSignatureTypedData(
          params,
          exchangeContractAddress,
          chainId,
          this.#config.sandbox,
        ),
      ),
    });
  }

  /**
   * Returns information about a single withdrawal matching the request.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/withdrawals`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns an {@link kuma.KumaWithdrawal KumaWithdrawal} object matching your request.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getWithdrawal)
   * @see request  {@link kuma.RestRequestGetWithdrawal RestRequestGetWithdrawal}
   * @see response {@link kuma.RestResponseGetWithdrawal RestResponseGetWithdrawal}
   * @see type     {@link kuma.KumaWithdrawal KumaWithdrawal}
   * @see related  {@link getWithdrawals client.getWithdrawals}
   *
   * @category Deposits & Withdrawals
   */
  public async getWithdrawal(params: kuma.RestRequestGetWithdrawal) {
    return this.get<kuma.RestResponseGetWithdrawal>('/withdrawals', params);
  }

  /**
   * Returns information about withdrawals to a wallet.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/withdrawals`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit},
   * > {@link kuma.RestRequestPaginationWithFromId.fromId fromId}
   * ---
   *
   * @returns
   * - Returns an array of {@link kuma.KumaWithdrawal KumaWithdrawal} objects matching your request.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getWithdrawals)
   * @see request  {@link kuma.RestRequestGetWithdrawals RestRequestGetWithdrawals}
   * @see response {@link kuma.RestResponseGetWithdrawals RestResponseGetWithdrawals}
   * @see type     {@link kuma.KumaWithdrawal KumaWithdrawal}
   * @see related  {@link getWithdrawal client.getWithdrawal}
   *
   * @category Deposits & Withdrawals
   */
  public async getWithdrawals(params: kuma.RestRequestGetWithdrawals) {
    return this.get<kuma.RestResponseGetWithdrawals>('/withdrawals', params);
  }

  /**
   * Get Funding Payments for wallet matching {@link kuma.KumaFundingPayment KumaFundingPayment}
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/fundingPayments`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getFundingPayments)
   * @see request  {@link kuma.RestRequestGetFundingPayments RestRequestGetFundingPayments}
   * @see response {@link kuma.RestResponseGetFundingPayments RestResponseGetFundingPayments}
   * @see type     {@link kuma.KumaFundingPayment KumaFundingPayment}
   *
   * @category Fills & Historical
   */
  public async getFundingPayments<R = kuma.RestResponseGetFundingPayments>(
    params: kuma.RestRequestGetFundingPayments,
  ) {
    return this.get<R>('/fundingPayments', params);
  }

  /**
   * Override minimum Initial Margin Fraction for wallet for a market
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `POST /v1/initialMarginFractionOverride`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityTrade)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * ---
   *
   * @returns
   * - Returns an {@link kuma.KumaInitialMarginFractionOverride KumaInitialMarginFractionOverride}
   *   object providing the details of the new  setting.

   *
   * @category Wallets & Positions
   */
  public async setInitialMarginFractionOverride<
    R = kuma.RestResponseSetInitialMarginFractionOverride,
  >(
    params: kuma.RestRequestSetInitialMarginFractionOverride,
    signer: kuma.SignTypedData | undefined = this.#signer,
  ) {
    ensureSigner(signer);

    const { chainId, exchangeContractAddress } =
      await this.getContractAndChainId();

    return this.post<R>('/initialMarginFractionOverride', {
      parameters: params,
      signature: await signer(
        ...getInitialMarginFractionOverrideSettingsSignatureTypedData(
          params,
          exchangeContractAddress,
          chainId,
          this.#config.sandbox,
        ),
      ),
    });
  }

  /**
   * Get Initial Margin Fraction overrides for wallet for a market or all markets
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/initialMarginFractionOverride`
   * > - **Endpoint Security:**    [Trade](https://api-docs-v1.kuma.bid/#endpointSecurityTrade)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * ---
   *
   * @returns
   * - Returns an {@link kuma.KumaInitialMarginFractionOverride KumaInitialMarginFractionOverride}
   *   object providing the details of the setting.

   *
   * @category Wallets & Positions
   */
  public async getInitialMarginFractionOverride<
    R = kuma.RestResponseGetInitialMarginFractionOverride,
  >(params: kuma.RestRequestGetInitialMarginFractionOverride) {
    return this.get<R>('/initialMarginFractionOverride', params);
  }

  /**
   * Get Historical PnL for the wallet / market matching {@link kuma.KumaHistoricalProfitLoss KumaHistoricalProfitLoss}
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/historicalPnL`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**
   * > {@link kuma.RestRequestPaginationWithFromId.start start},
   * > {@link kuma.RestRequestPaginationWithFromId.end end},
   * > {@link kuma.RestRequestPaginationWithFromId.limit limit}
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getHistoricalPnL)
   * @see request  {@link kuma.RestRequestGetHistoricalPnL RestRequestGetHistoricalPnL}
   * @see response {@link kuma.RestResponseGetHistoricalPnL RestResponseGetHistoricalPnL}
   * @see type     {@link kuma.KumaHistoricalProfitLoss KumaHistoricalProfitLoss}
   *
   * @category Fills & Historical
   */
  public async getHistoricalPnL(params: kuma.RestRequestGetHistoricalPnL) {
    return this.get<kuma.RestResponseGetHistoricalPnL>(
      '/historicalPnL',
      params,
    );
  }

  /**
   * Returns a single-use authentication token as a string for access
   * to {@link kuma.SubscriptionNameAuthenticated authenticated subscriptions}
   * in the WebSocket API.
   *
   * ---
   * **Endpoint Parameters**
   *
   * > - **HTTP Request:**         `GET /v1/wsToken`
   * > - **Endpoint Security:**    [User Data](https://api-docs-v1.kuma.bid/#endpointSecurityUserData)
   * > - **API Key Scope:**        [Read](https://api-docs-v1.kuma.bid/#api-keys)
   * > - **Pagination:**           `None`
   * ---
   *
   * @returns
   * - Returns the {@link kuma.KumaWebSocketToken.token KumaWebSocketToken.token} string
   *   directly which you can use to authenticate with the WebSocket server.
   *
   * ---
   *
   * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/classes/RestAuthenticatedClient.html#getWsToken)
   * @see request  {@link kuma.RestRequestGetAuthenticationToken RestRequestGetAuthenticationToken}
   * @see response {@link kuma.RestResponseGetAuthenticationToken RestResponseGetAuthenticationToken}
   *
   * @category WebSocket
   */
  public async getWsToken(params: kuma.RestRequestGetAuthenticationToken) {
    if (!params.nonce || !params.wallet) {
      throw new Error('Invalid request, nonce and wallet are required');
    }

    return (
      await this.get<kuma.RestResponseGetAuthenticationToken>(
        '/wsToken',
        params,
      )
    ).token;
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
    /**
     * Requires the public IDs (`orderIds`) of the stop loss orders' parent
     * orders. Do not provide the public IDs of the stop loss orders themselves.
     */
    cancelConditionalStopLossOrders: async (
      params: kuma.RestRequestCancelOrders,
      signer: kuma.SignTypedData | undefined = this.#signer,
    ) => {
      return this.makeCancelOrdersRequest(
        '/internal/orders/conditionalStopLossOrders',
        params,
        signer,
      );
    },

    /**
     * Requires the public IDs (`orderIds`) of the take profit orders' parent
     * orders. Do not provide the public IDs of the take profit orders themselves.
     */
    cancelConditionalTakeProfitOrders: async (
      params: kuma.RestRequestCancelOrders,
      signer: kuma.SignTypedData | undefined = this.#signer,
    ) => {
      return this.makeCancelOrdersRequest(
        '/internal/orders/conditionalTakeProfitOrders',
        params,
        signer,
      );
    },

    getFundingPayments: async (
      ...[params, ...args]: Parameters<
        RestAuthenticatedClient['getFundingPayments']
      >
    ) => {
      const result = await this.getFundingPayments<
        Paginated<kuma.RestResponseGetFundingPayments>
      >(
        {
          ...params,
          page: Math.max(typeof params.page === 'number' ? params.page : 1, 1),
        },
        ...args,
      );

      return result;
    },

    placeConditionalTpSlOrder: async <
      T extends
        | typeof kuma.OrderType.takeProfitMarket
        | typeof kuma.OrderType.stopLossMarket,
    >(
      takeProfitOrStopLossOrder: kuma.RestRequestOrder & { type: T },
      conditionalParentOrderId: string,
      signer: undefined | kuma.SignTypedData = this.#signer,
    ): Promise<kuma.RestResponseGetOrder & { type: T }> => {
      ensureSigner(signer);

      const { chainId, exchangeContractAddress } =
        await this.getContractAndChainId();

      return this.post<kuma.RestResponseGetOrder & { type: T }>(
        '/internal/orders/conditionalTpSlOrders',
        {
          order: {
            parameters: takeProfitOrStopLossOrder,
            signature: await signer(
              ...getOrderSignatureTypedData(
                takeProfitOrStopLossOrder,
                exchangeContractAddress,
                chainId,
                this.#config.sandbox,
              ),
            ),
          },
          conditionalParentOrderPublicId: conditionalParentOrderId,
        } satisfies {
          order: kuma.RestRequestCreateOrderSigned;
          conditionalParentOrderPublicId: string;
        },
      );
    },

    placeOrderWithConditionalTpSlOrders: async <T extends kuma.OrderType>(
      params: {
        order: kuma.RestRequestOrder & { type: T };
        conditionalTakeProfitOrder?: kuma.RestRequestOrder & {
          type: typeof kuma.OrderType.takeProfitMarket;
        };
        conditionalStopLossOrder?: kuma.RestRequestOrder & {
          type: typeof kuma.OrderType.stopLossMarket;
        };
      },
      signer: undefined | kuma.SignTypedData = this.#signer,
    ): Promise<{
      order: kuma.RestResponseGetOrder & { type: T };
      conditionalTakeProfitOrder?: kuma.RestResponseGetOrder & {
        type: typeof kuma.OrderType.takeProfitMarket;
      };
      conditionalStopLossOrder?: kuma.RestResponseGetOrder & {
        type: typeof kuma.OrderType.stopLossMarket;
      };
    }> => {
      ensureSigner(signer);

      const { chainId, exchangeContractAddress } =
        await this.getContractAndChainId();

      const signOrder = (order: kuma.RestRequestOrder): Promise<string> =>
        signer(
          ...getOrderSignatureTypedData(
            order,
            exchangeContractAddress,
            chainId,
            this.#config.sandbox,
          ),
        );

      return this.post<{
        order: kuma.RestResponseGetOrder & { type: T };
        conditionalTakeProfitOrder?: kuma.RestResponseGetOrder & {
          type: typeof kuma.OrderType.takeProfitMarket;
        };
        conditionalStopLossOrder?: kuma.RestResponseGetOrder & {
          type: typeof kuma.OrderType.stopLossMarket;
        };
      }>('/internal/orders/orderWithConditionalTpSlOrders', {
        order: {
          parameters: params.order,
          signature: await signOrder(params.order),
        },
        conditionalTakeProfitOrder:
          params.conditionalTakeProfitOrder ?
            {
              parameters: params.conditionalTakeProfitOrder,
              signature: await signOrder(params.conditionalTakeProfitOrder),
            }
          : undefined,
        conditionalStopLossOrder:
          params.conditionalStopLossOrder ?
            {
              parameters: params.conditionalStopLossOrder,
              signature: await signOrder(params.conditionalStopLossOrder),
            }
          : undefined,
      } satisfies {
        order: kuma.RestRequestCreateOrderSigned;
        conditionalTakeProfitOrder?: kuma.RestRequestCreateOrderSigned;
        conditionalStopLossOrder?: kuma.RestRequestCreateOrderSigned;
      });
    },
  } as const);

  // Internal methods exposed for advanced usage

  protected async getContractAndChainId() {
    let {
      chainId,
      exchangeContractAddress,
      stargateBridgeAdapterContractAddress,
    } = this.#config;

    if (
      !chainId ||
      !exchangeContractAddress ||
      !stargateBridgeAdapterContractAddress
    ) {
      if (this.#exchangeProm) {
        // if we already requested the exchange details, wait for the promise to resolve
        return this.#exchangeProm;
      }

      this.#exchangeProm = this.public.getExchange();
      this.#exchange = await this.#exchangeProm;

      if (
        this.#exchange.chainId &&
        this.#exchange.exchangeContractAddress &&
        this.#exchange.stargateBridgeAdapterContractAddress
      ) {
        this.#config.chainId ??= this.#exchange.chainId;
        chainId ??= this.#config.chainId;

        this.#config.exchangeContractAddress ??=
          this.#exchange.exchangeContractAddress;
        exchangeContractAddress ??= this.#config.exchangeContractAddress;

        this.#config.stargateBridgeAdapterContractAddress ??=
          this.#exchange.stargateBridgeAdapterContractAddress;
        stargateBridgeAdapterContractAddress ??=
          this.#config.stargateBridgeAdapterContractAddress;
      }
    }

    if (
      !chainId ||
      !exchangeContractAddress ||
      !stargateBridgeAdapterContractAddress
    ) {
      throw new Error(
        `Could not determine chainId (${typeof chainId}) or exchangeContractAddress (${typeof exchangeContractAddress}) or stargateBridgeAdapterContractAddress (${typeof stargateBridgeAdapterContractAddress})`,
      );
    }

    return {
      chainId,
      exchangeContractAddress,
      stargateBridgeAdapterContractAddress,
    } as const;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  protected async get<R>(
    endpoint: string,
    params: AnyObj | undefined = undefined,
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'params'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'GET',
        params: sanitizeSearchParams(params),
      })
    ).data;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  protected async post<R>(
    endpoint: string,
    data: AnyObj = {},
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'data'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'POST',
        data,
      })
    ).data;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  protected async delete<R>(
    endpoint: string,
    data: AnyObj = {},
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'data'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'DELETE',
        data,
      })
    ).data;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  protected async put<R>(
    endpoint: string,
    data: AnyObj = {},
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'data'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'PUT',
        data,
      })
    ).data;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  protected async patch<R>(
    endpoint: string,
    data: AnyObj = {},
    axiosConfig: Omit<
      Partial<AxiosRequestConfig>,
      'method' | 'url' | 'data'
    > = {},
  ) {
    return (
      await this.request<R>(endpoint, {
        ...axiosConfig,
        method: 'PATCH',
        data,
      })
    ).data;
  }

  /**
   * - Internal Use and may change or break without notice
   *
   * @internal
   * @hidden
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected request<R = any>(
    endpoint: string,
    config: Partial<AxiosRequestConfig> &
      (
        | { method: 'GET' }
        | {
            method: Exclude<AxiosRequestConfig['method'], 'GET' | 'get'>;
            data: { [key: string]: unknown };
          }
      ),
    createHmacSignatureHeader = this.#config.autoCreateHmacHeader,
  ) {
    const request: Omit<AxiosRequestConfig, 'headers'> & {
      headers: Record<string, unknown> & AxiosRequestConfig['headers'];
    } = {
      ...config,
      headers: config.headers ?? {},
      url: endpoint,
    };

    if (createHmacSignatureHeader) {
      const paramsSerialized =
        config.method === 'GET' ?
          new URLSearchParams(config.params ?? {}).toString()
        : JSON.stringify(config.data);

      Object.assign(
        request.headers,
        createHmacRestRequestSignatureHeader(paramsSerialized, this.#apiSecret),
      );
    }

    return this.axios<R>(request);
  }
}

/**
 * @internal
 *
 * Ensures that {@link signer} is provided either by constructor definition
 * or manually dependent on the use-case.
 *
 * - SDK use case by end-user should always be provided via constructor
 *   definition so the manual define case is for internal purposes only.
 */
function ensureSigner(
  signer: kuma.SignTypedData | undefined,
): asserts signer is kuma.SignTypedData {
  if (!signer) {
    throw new Error(
      'A "signer" function is required but was not provided during RestAuthenticatedClient constructor or when calling the method',
    );
  }
}
