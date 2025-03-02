import type * as kuma from '#index';

/**
 * Request parameters required to retrieve a single {@link KumaFill}.
 *
 * @see related {@link RestRequestGetFills}
 * @see type    {@link KumaFill}
 *
 * @category Kuma - Get Fills
 */
export interface RestRequestGetFill extends kuma.RestRequestByWallet {
  /**
   * The `fillId` of the fill to retrieve.
   *
   * - This property being **included** will cause the api to return a single {@link KumaFill}
   */
  readonly fillId: string;
}

/**
 * Request parameters required to get a list of matching {@link KumaFill} items.
 *
 * @see related {@link RestRequestGetFill}
 * @see type    {@link KumaFill}
 *
 * @category Kuma - Get Fills
 */
export interface RestRequestGetFills
  extends kuma.RestRequestByWallet,
    kuma.RestRequestByMarketOptional,
    kuma.RestRequestPaginationWithFromId {}

/**
 * @category Kuma - Get Fills
 * @category Kuma Interfaces
 *
 * @see request {@link RestRequestGetFill}
 * @see request {@link RestRequestGetFills}
 * @see related {@link KumaOrderFill}
 */
export interface KumaFill {
  /**
   * Exchange-assigned order identifier, omitted for liquidations
   */
  orderId?: string;
  /**
   * Client-provided ID of order, if present
   */
  clientOrderId?: string;
  /**
   * Base-quote pair e.g. 'ETH-USD'
   */
  market: string;
  /**
   * Orders side, `buy` or `sell`
   *
   * @see enum {@link kuma.OrderSide OrderSide}
   */
  side: kuma.OrderSide;

  /**
   * Internal ID of fill
   */
  fillId: string;
  /**
   * Executed price of fill in quote terms
   */
  price: string;
  /**
   * Executed quantity of fill in base terms
   */
  quantity: string;
  /**
   * Executed quantity of trade in quote terms
   */
  quoteQuantity: string;
  /**
   * Realized PnL
   * - PnL only from the fill’s closure, not for the position overall
   * - Does not include fees.
   */
  realizedPnL: string;
  /**
   * Fill timestamp
   */
  time: number;
  /**
   * Maker side of the fill, `buy` or `sell`
   *
   * - omitted for `liquidation` actions
   *
   * @see enum {@link kuma.OrderSide OrderSide}
   */
  makerSide?: kuma.OrderSide;
  /**
   * Fill sequence number
   *
   * - omitted for liquidation actions
   */
  sequence?: number;
  /**
   * Fee amount collected on the fill in quote terms
   *
   * - may be negative due to promotions
   * - omitted for some liquidation actions
   */
  fee?: string;
  /**
   * Whether the fill increases or decreases the notional value of the position, open or close
   *
   * @see enum {@link kuma.FillAction FillAction}
   */
  action: kuma.FillAction;
  /**
   * Resulting position side
   *
   * @see enum {@link kuma.PositionSide PositionSide}
   */
  position: kuma.PositionSide;
  /**
   * Index price of the market at transaction time, for internal use
   */
  indexPrice?: string;
  /**
   * Whether the fill is the maker or taker in the trade from the perspective of the requesting API account,
   * `maker` or `taker`
   *
   * - omitted for liquidation actions
   *
   * @see enum {@link kuma.LiquidityProvider LiquidityProvider}
   */
  liquidity?: kuma.LiquidityProvider;
  /**
   * Fill `type`
   *
   * @see enum {@link kuma.FillType FillType}
   */
  type: kuma.FillType;
  /**
   * Transaction id of the trade settlement transaction or `null` if not yet assigned
   */
  txId: string | null;
  /**
   * Status of the trade settlement transaction
   *
   * @see enum {@link kuma.ChainTransactionStatus ChainTransactionStatus}
   */
  txStatus: kuma.ChainTransactionStatus;

  /**
   * When `true`, the order is a liquidation acquisition only fill.
   */
  isLiquidationAcquisition?: true | undefined;
}

/**
 * - Same as {@link KumaFill} but without the following properties:
 *   - {@link KumaFill.market market}
 *   - {@link KumaFill.orderId orderId}
 *   - {@link KumaFill.clientOrderId clientOrderId}
 *   - {@link KumaFill.side side}
 *   - {@link KumaFill.isLiquidationAcquisition isLiquidationAcquisition}
 * - The omitted properties can instead be found on the order object itself.
 *
 * @category Kuma - Get Orders
 * @category Kuma Interfaces
 *
 * @see related {@link KumaFill}
 */

export interface KumaOrderFill
  extends Omit<
    KumaFill,
    'market' | 'orderId' | 'clientOrderId' | 'side' | 'isLiquidationAcquisition'
  > {}

/**
 * @category Kuma - Get Fills
 *
 * @see request {@link RestRequestGetFill}
 * @see type    {@link KumaFill}
 */
export type RestResponseGetFill = KumaFill;

/**
 * @category Kuma - Get Fills
 *
 * @see request {@link RestRequestGetFills}
 * @see type    {@link KumaFill}
 */
export type RestResponseGetFills = KumaFill[];
