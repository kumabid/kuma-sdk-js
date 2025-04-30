import type {
  RestRequestPaginationWithFromId,
  RestRequestByWallet,
  BridgeTarget,
  ChainTransactionStatus,
} from '#index';

/**
 * Get a single {@link KumaWithdrawalFromManagedAccount}
 *
 * @see response {@link RestResponseGetWithdrawalFromManagedAccount}
 * @see type     {@link KumaWithdrawal}
 *
 * @category Kuma - Get Withdrawals
 */
export interface RestRequestGetWithdrawalFromManagedAccount
  extends RestRequestByWallet {
  /**
   * Single `withdrawalId` to return
   */
  withdrawalId: string;
}

/**
 *  GET an array of {@link KumaWithdrawal}
 *
 * @see response {@link RestResponseGetWithdrawalsFromManagedAccount}
 * @see type     {@link KumaWithdrawal}
 *
 * @category Kuma - Get Withdrawals
 */
export interface RestRequestGetWithdrawalsFromManagedAccount
  extends RestRequestByWallet,
    RestRequestPaginationWithFromId {
  /**
   * @defaultValue 50
   */
  limit?: number;
  /**
   * Only valid with {@link RestRequestGetWithdrawalFromManagedAccount}
   */
  withdrawalId?: undefined;
}

/**
 * @see request {@link RestRequestGetWithdrawalsFromManagedAccount}
 * @see response {@link RestResponseGetWithdrawalsFromManagedAccount}
 * @see request {@link RestRequestGetWithdrawalFromManagedAccount}
 * @see response {@link RestResponseGetWithdrawalFromManagedAccount}
 *
 * @category Kuma - Get Withdrawals
 * @category Kuma - Withdraw Funds
 * @category Kuma Interfaces
 */
export interface KumaWithdrawalFromManagedAccount {
  /** Exchange-assigned withdrawal identifier */
  withdrawalId: string;
  /** Asset symbol */
  asset: string;
  /**
   * Address of Managed Account contract
   */
  managedAccount: string;
  /**
   * Address of wallet associated with Managed Account from which
   * funds will be withdrawn
   */
  managerWallet: string;
  /**
   * **Gross** quantity of the withdrawal
   */
  quantity: string;
  /**
   * The gas fee paid for the withdrawal.
   */
  gas: string;
  /** Bridge and target chain of the withdrawal */
  bridgeTarget: BridgeTarget;
  /** Timestamp of withdrawal API request */
  time: number;
  /**
   * Transaction id of the withdrawal transaction on XCHAIN or null if not yet
   * assigned; also queryable for bridge details on https://layerzeroscan.com/
   */
  xchainTxId: string | null;
  /**
   * Status of the withdrawal transaction on XCHAIN
   *
   * @see enum {@link ChainTransactionStatus}
   */
  xchainTxStatus: ChainTransactionStatus;
}

/**
 * @see type {@link KumaWithdrawalFromManagedAccount}
 * @see request {@link RestRequestGetWithdrawalFromManagedAccount}
 * @see related {@link RestResponseGetWithdrawalsFromManagedAccount}
 *
 * @category Kuma - Get Withdrawals
 */
export type RestResponseGetWithdrawalFromManagedAccount =
  KumaWithdrawalFromManagedAccount;

/**
 * @see type {@link KumaWithdrawalFromManagedAccount}
 * @see request {@link RestRequestGetWithdrawalsFromManagedAccount}
 * @see related {@link RestResponseGetWithdrawalFromManagedAccount}
 *
 * @category Kuma - Get Withdrawals
 */
export type RestResponseGetWithdrawalsFromManagedAccount =
  KumaWithdrawalFromManagedAccount[];
