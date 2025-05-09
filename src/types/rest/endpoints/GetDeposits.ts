import type * as kuma from '#index';

/**
 * Get Deposit Request
 *
 * @see request  {@link kuma.RestAuthenticatedClient.getDeposit RestAuthenticatedClient.getDeposit}
 * @see related  {@link RestRequestGetDeposits}
 *
 * @category Kuma - Get Deposits
 */
export interface RestRequestGetDeposit extends kuma.RestRequestByWallet {
  /**
   * Single `depositId` to return
   */
  depositId: string;
}

/**
 * Get {@link KumaDeposit Deposits}
 *
 * @see typedoc  [Reference Documentation](https://sdk-js-docs-v1.kuma.bid/interfaces/RestRequestGetDeposits.html)
 * @see request  {@link kuma.RestAuthenticatedClient.getDeposits RestAuthenticatedClient.getDeposits}
 * @see related  {@link RestRequestGetDeposit}
 *
 * @category Kuma - Get Deposits
 */
export interface RestRequestGetDeposits
  extends kuma.RestRequestByWallet,
    kuma.RestRequestPaginationWithFromId {
  depositId?: undefined;
}

/**
 * An object which represents a single deposit on the exchange.
 *
 * @see request  {@link kuma.RestAuthenticatedClient.getDeposit RestAuthenticatedClient.getDeposit}
 * @see request  {@link kuma.RestAuthenticatedClient.getDeposits RestAuthenticatedClient.getDeposits}
 *
 * @category Kuma - Get Deposits
 * @category Kuma Interfaces
 */
export interface KumaDeposit {
  /**
   * Kuma-issued deposit identifier
   */
  depositId: string;
  /**
   * Asset symbol for collateral token
   */
  asset: string;
  /**
   * Deposit amount in asset terms
   */
  quantity: string;
  /**
   * Bridge and source chain of the deposit
   *
   * - Use the {@link kuma.BridgeTarget BridgeTarget} enum to narrow
   *   all possible values when needed.
   *
   * @see enum {@link kuma.BridgeTarget BridgeTarget}
   */
  bridgeSource: kuma.DepositSource;
  /**
   * Timestamp of crediting the deposited funds on the exchange
   */
  time: number;
  /**
   * Transaction id of the bridge transaction initiated by the user; also
   * queryable for bridge details on https://layerzeroscan.com/
   */
  bridgeTxId?: string;
  /**
   * Transaction id of the bridge transaction delivering funds to XCHAIN; also
   * queryable for bridge details on https://layerzeroscan.com/
   */
  forwarderTxId?: string;
  /**
   * Transaction id of the deposit transaction on XCHAIN
   */
  xchainTxId: string;
}

/**
 * Returns of a single deposit by the `depositId` provided.
 *
 * @see type    {@link KumaDeposit}
 * @see request {@link RestRequestGetDeposit}
 * @see related {@link RestResponseGetDeposits}
 * @see related {@link RestRequestGetDeposits}
 *
 * @category Kuma - Get Deposits
 */
export type RestResponseGetDeposit = KumaDeposit;

/**
 * Returns deposits according to the request parameters.
 *
 * @see type    {@link KumaDeposit}
 * @see request {@link RestRequestGetDeposits}
 * @see related {@link RestResponseGetDeposit}
 * @see related {@link RestRequestGetDeposit}
 *
 * @category Kuma - Get Deposits
 */
export type RestResponseGetDeposits = KumaDeposit[];
