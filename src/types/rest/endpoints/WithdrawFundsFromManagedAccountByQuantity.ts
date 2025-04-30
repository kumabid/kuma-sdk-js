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
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByQuantitySDK}
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByQuantity}
 */
export interface RestRequestWithdrawFundsFromManagedAccountByQuantityBase
  extends RestRequestByWallet {
  /**
   * Address of wallet associated with Managed Account from which
   * funds will be withdrawn
   */
  managerWallet: string;
  /**
   * Withdrawal amount in asset terms, fees are taken from this
   * value
   */
  quantity: string;
  /**
   * Minimum acceptable withdrawal amount in asset terms
   */
  minimumQuantity: string;
  /**
   * Maximum number of shares to burn to create withdrawal amount
   */
  maxShares: string;
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
 *   {@link RestRequestWithdrawFundsFromManagedAccountByQuantity slightly different interface},
 *   the SDK simply aids providing these parameters based on the
 *   {@link RestRequestWithdrawFundsFromManagedAccountByQuantitySDK.bridgeTarget bridgeTarget}
 *   parameter.
 *
 * @see docs    [API Documentation](https://api-docs-v1.kuma.bid/#withdraw-funds)
 * @see enum    {@link BridgeTarget}
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByQuantity}
 *
 * @category Kuma - Withdraw Funds
 */
export interface RestRequestWithdrawFundsFromManagedAccountByQuantitySDK
  extends RestRequestWithdrawFundsFromManagedAccountByQuantityBase {
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
 * - The SDK utilizes a simplified interface {@link RestRequestWithdrawFundsFromManagedAccountByQuantitySDK}
 *
 * @see docs    [API Documentation](https://api-docs-v1.kuma.bid/#withdraw-funds-from-managed-account)
 * @see related {@link RestRequestWithdrawFundsFromManagedAccountByQuantitySDK}
 *
 * @category Kuma - Withdraw Funds
 */
export interface RestRequestWithdrawFundsFromManagedAccountByQuantity
  extends RestRequestWithdrawFundsFromManagedAccountByQuantityBase {
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
 * @see parameters {@link RestRequestWithdrawFundsFromManagedAccountByQuantity}
 * @see response   {@link RestResponseWithdrawFundsFromManagedAccountByQuantity}
 * @see type       {@link KumaWithdrawal}
 *
 * @category Kuma - Withdraw Funds
 */
export type RestRequestWithdrawFundsFromManagedAccountByQuantitySigned =
  RestRequestWithSignature<RestRequestWithdrawFundsFromManagedAccountByQuantity>;

/**
 * @see type    {@link KumaWithdrawalFromManagedAccountByQuantity}
 * @see request {@link RestRequestWithdrawFundsFromManagedAccountByQuantity}
 *
 * @category Kuma - Withdraw Funds
 */
export type RestResponseWithdrawFundsFromManagedAccountByQuantity =
  KumaWithdrawalFromManagedAccount;
