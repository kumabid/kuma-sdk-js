import type {
  RestRequestByWallet,
  KumaWithdrawalFromManagedAccount,
  BridgeTarget,
} from '#index';
import type { RestRequestWithSignature } from '#types/utils';

/**
 * <div>
 * [[include:base.md]]
 * </div>
 *
 * @category Base Types
 *
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountBySharesSDK}
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByShares}
 */
export interface RestRequestWithdrawFundsFromManagedAccountBySharesBase
  extends RestRequestByWallet {
  /**
   * Address of wallet associated with Managed Account from which
   * funds will be withdrawn
   */
  managerWallet: string;
  /**
   * Exact number of shares to burn
   */
  shares: string;
  /**
   * Minimum acceptable withdrawal amount in asset terms
   */
  minimumQuantity: string;
  /**
   * Maximum acceptable fee that can be deducted from withdrawn
   * quantity in asset terms
   */
  maximumGasFee: string;
  /**
   * Address of Managed Account contract
   */
  managedAccount: string;
  /**
   * ABI-encoded parameters to supply specific Managed Account contract`
   */
  managedAccountPayload: string;
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
  bridgeTarget?: BridgeTarget;
  /**
   * Address of cross-chain bridge adapter contract to withdraw
   * funds to. If zero, withdraws directly to wallet
   *
   * - This is automatically calculated when using the SDK by instead
   *   providing {@link bridgeTarget} and leaving {@link bridgeAdapterPayload}
   *   and {@link bridgeAdapterAddress} undefined.
   */
  bridgeAdapterAddress?: string;
  /**
   * If {@link bridgeAdapterAddress} is non-zero this should be the
   * ABI-encoded arguments for the specific adapter
   *
   * - This is automatically calculated when using the SDK by instead
   *   providing {@link bridgeTarget} and leaving {@link bridgeAdapterPayload}
   *   and {@link bridgeAdapterAddress} undefined.
   */
  bridgeAdapterPayload?: string;
}

/**
 * Request a withdrawal for a given wallet.
 *
 * - Note that the API utilizes a
 *   {@link RestRequestWithdrawFundsFromManagedAccountByShares slightly different interface},
 *   the SDK simply aids providing these parameters based on the
 *   {@link RestRequestWithdrawFundsFromManagedAccountBySharesSDK.bridgeTarget bridgeTarget}
 *   parameter.
 *
 * @see docs    [API Documentation](https://api-docs-v1.kuma.bid/#withdraw-funds)
 * @see enum    {@link BridgeTarget}
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByShares}
 *
 * @category Kuma - Withdraw Funds
 */
export interface RestRequestWithdrawFundsFromManagedAccountBySharesSDK
  extends RestRequestWithdrawFundsFromManagedAccountBySharesBase {
  /**
   * @inheritDoc
   */
  bridgeTarget: BridgeTarget;
  /**
   * @inheritDoc
   *
   * @remarks
   *
   * - Do not provide if {@link bridgeTarget} parameter is given as it will
   *   be automatically calculated.
   *
   * @hidden
   */
  bridgeAdapterAddress?: undefined;
  /**
   * @inheritDoc
   *
   * @remarks
   *
   * - Do not provide if {@link bridgeTarget} parameter is given as it will
   *   be automatically calculated.
   *
   * @hidden
   */
  bridgeAdapterPayload?: undefined;
}

/**
 * API parameters for conducting a withdrawal.
 *
 * - The SDK utilizes a simplified interface {@link RestRequestWithdrawFundsFromManagedAccountBySharesSDK}
 *
 * @see docs    [API Documentation](https://api-docs-v1.kuma.bid/#withdraw-funds-from-managed-account)
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountBySharesSDK}
 *
 * @category Kuma - Withdraw Funds
 */
export interface RestRequestWithdrawFundsFromManagedAccountByShares
  extends RestRequestWithdrawFundsFromManagedAccountBySharesBase {
  /**
   * @remarks
   *
   * - Do not provide if {@link bridgeAdapterAddress} and {@link bridgeAdapterPayload} are
   *   defined as auto-calculation will not be necessary
   *
   * @internal
   */
  bridgeTarget?: undefined;
  /**
   * @inheritDoc
   */
  bridgeAdapterAddress: string;
  /**
   * @inheritDoc
   */
  bridgeAdapterPayload: string;
}

/**
 * The raw request body for the `POST /v1/withdrawals` endpoint
 * including `signature` and the body in `parameters`.
 *
 * @see parameters {@link RestRequestWithdrawFundsFromManagedAccountByShares}
 * @see response   {@link RestResponseWithdrawFundsFromManagedAccountByShares}
 * @see type       {@link KumaWithdrawal}
 *
 * @category Kuma - Withdraw Funds
 */
export type RestRequestWithdrawFundsFromManagedAccountBySharesSigned =
  RestRequestWithSignature<RestRequestWithdrawFundsFromManagedAccountByShares>;

/**
 * @see type    {@link KumaWithdrawalFromManagedAccountByShares}
 * @see request {@link RestRequestWithdrawFundsFromManagedAccountByShares}
 *
 * @category Kuma - Withdraw Funds
 */
export type RestResponseWithdrawFundsFromManagedAccountByShares =
  KumaWithdrawalFromManagedAccount;
