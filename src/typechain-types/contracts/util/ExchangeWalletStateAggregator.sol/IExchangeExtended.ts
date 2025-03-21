/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from '../../../common';

export type BalanceStruct = {
  isMigrated: boolean;
  balance: BigNumberish;
  costBasis: BigNumberish;
  lastUpdateTimestampInMs: BigNumberish;
};

export type BalanceStructOutput = [
  isMigrated: boolean,
  balance: bigint,
  costBasis: bigint,
  lastUpdateTimestampInMs: bigint,
] & {
  isMigrated: boolean;
  balance: bigint;
  costBasis: bigint;
  lastUpdateTimestampInMs: bigint;
};

export type NonceInvalidationStruct = {
  timestampInMs: BigNumberish;
  effectiveBlockTimestamp: BigNumberish;
};

export type NonceInvalidationStructOutput = [
  timestampInMs: bigint,
  effectiveBlockTimestamp: bigint,
] & { timestampInMs: bigint; effectiveBlockTimestamp: bigint };

export type OverridableMarketFieldsStruct = {
  initialMarginFraction: BigNumberish;
  maintenanceMarginFraction: BigNumberish;
  incrementalInitialMarginFraction: BigNumberish;
  baselinePositionSize: BigNumberish;
  incrementalPositionSize: BigNumberish;
  maximumPositionSize: BigNumberish;
  minimumPositionSize: BigNumberish;
};

export type OverridableMarketFieldsStructOutput = [
  initialMarginFraction: bigint,
  maintenanceMarginFraction: bigint,
  incrementalInitialMarginFraction: bigint,
  baselinePositionSize: bigint,
  incrementalPositionSize: bigint,
  maximumPositionSize: bigint,
  minimumPositionSize: bigint,
] & {
  initialMarginFraction: bigint;
  maintenanceMarginFraction: bigint;
  incrementalInitialMarginFraction: bigint;
  baselinePositionSize: bigint;
  incrementalPositionSize: bigint;
  maximumPositionSize: bigint;
  minimumPositionSize: bigint;
};

export type MarketStruct = {
  exists: boolean;
  isActive: boolean;
  baseAssetSymbol: string;
  indexPriceAtDeactivation: BigNumberish;
  lastIndexPrice: BigNumberish;
  lastIndexPriceTimestampInMs: BigNumberish;
  overridableFields: OverridableMarketFieldsStruct;
};

export type MarketStructOutput = [
  exists: boolean,
  isActive: boolean,
  baseAssetSymbol: string,
  indexPriceAtDeactivation: bigint,
  lastIndexPrice: bigint,
  lastIndexPriceTimestampInMs: bigint,
  overridableFields: OverridableMarketFieldsStructOutput,
] & {
  exists: boolean;
  isActive: boolean;
  baseAssetSymbol: string;
  indexPriceAtDeactivation: bigint;
  lastIndexPrice: bigint;
  lastIndexPriceTimestampInMs: bigint;
  overridableFields: OverridableMarketFieldsStructOutput;
};

export type WalletExitStruct = {
  exists: boolean;
  effectiveBlockTimestamp: BigNumberish;
  deleveragePriceStrategy: BigNumberish;
};

export type WalletExitStructOutput = [
  exists: boolean,
  effectiveBlockTimestamp: bigint,
  deleveragePriceStrategy: bigint,
] & {
  exists: boolean;
  effectiveBlockTimestamp: bigint;
  deleveragePriceStrategy: bigint;
};

export interface IExchangeExtendedInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'custodian'
      | 'deposit'
      | 'depositIndex'
      | 'dispatcherWallet'
      | 'insuranceFundWallet'
      | 'loadBalanceBySymbol'
      | 'loadBalanceStructBySymbol'
      | 'loadBaseAssetSymbolsWithOpenPositionsByWallet'
      | 'loadLastNonceInvalidationForWallet'
      | 'loadMarket'
      | 'loadMarketsLength'
      | 'loadOutstandingWalletFunding'
      | 'pendingDepositQuantityByWallet'
      | 'setBridgeAdapters'
      | 'setIndexPriceAdapters'
      | 'setInsuranceFundWallet'
      | 'setMarketOverrides'
      | 'setOraclePriceAdapter'
      | 'walletExits',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'custodian', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'deposit',
    values: [BigNumberish, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'depositIndex',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'dispatcherWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'insuranceFundWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'loadBalanceBySymbol',
    values: [AddressLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadBalanceStructBySymbol',
    values: [AddressLike, string],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadBaseAssetSymbolsWithOpenPositionsByWallet',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadLastNonceInvalidationForWallet',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadMarket',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadMarketsLength',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'loadOutstandingWalletFunding',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'pendingDepositQuantityByWallet',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setBridgeAdapters',
    values: [AddressLike[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'setIndexPriceAdapters',
    values: [AddressLike[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'setInsuranceFundWallet',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setMarketOverrides',
    values: [string, OverridableMarketFieldsStruct, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setOraclePriceAdapter',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'walletExits',
    values: [AddressLike],
  ): string;

  decodeFunctionResult(functionFragment: 'custodian', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'deposit', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'depositIndex',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'dispatcherWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'insuranceFundWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadBalanceBySymbol',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadBalanceStructBySymbol',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadBaseAssetSymbolsWithOpenPositionsByWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadLastNonceInvalidationForWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'loadMarket', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'loadMarketsLength',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadOutstandingWalletFunding',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'pendingDepositQuantityByWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setBridgeAdapters',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setIndexPriceAdapters',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setInsuranceFundWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setMarketOverrides',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setOraclePriceAdapter',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'walletExits',
    data: BytesLike,
  ): Result;
}

export interface IExchangeExtended extends BaseContract {
  connect(runner?: ContractRunner | null): IExchangeExtended;
  waitForDeployment(): Promise<this>;

  interface: IExchangeExtendedInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>,
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent,
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent,
  ): Promise<this>;

  custodian: TypedContractMethod<[], [string], 'view'>;

  deposit: TypedContractMethod<
    [quantityInAssetUnits: BigNumberish, destinationWallet: AddressLike],
    [void],
    'nonpayable'
  >;

  depositIndex: TypedContractMethod<[], [bigint], 'view'>;

  dispatcherWallet: TypedContractMethod<[], [string], 'view'>;

  insuranceFundWallet: TypedContractMethod<[], [string], 'view'>;

  loadBalanceBySymbol: TypedContractMethod<
    [wallet: AddressLike, assetSymbol: string],
    [bigint],
    'view'
  >;

  loadBalanceStructBySymbol: TypedContractMethod<
    [wallet: AddressLike, assetSymbol: string],
    [BalanceStructOutput],
    'view'
  >;

  loadBaseAssetSymbolsWithOpenPositionsByWallet: TypedContractMethod<
    [wallet: AddressLike],
    [string[]],
    'view'
  >;

  loadLastNonceInvalidationForWallet: TypedContractMethod<
    [wallet: AddressLike],
    [NonceInvalidationStructOutput],
    'view'
  >;

  loadMarket: TypedContractMethod<
    [index: BigNumberish],
    [MarketStructOutput],
    'view'
  >;

  loadMarketsLength: TypedContractMethod<[], [bigint], 'view'>;

  loadOutstandingWalletFunding: TypedContractMethod<
    [wallet: AddressLike],
    [bigint],
    'view'
  >;

  pendingDepositQuantityByWallet: TypedContractMethod<
    [wallet: AddressLike],
    [bigint],
    'view'
  >;

  setBridgeAdapters: TypedContractMethod<
    [newBridgeAdapters: AddressLike[]],
    [void],
    'nonpayable'
  >;

  setIndexPriceAdapters: TypedContractMethod<
    [newIndexPriceAdapters: AddressLike[]],
    [void],
    'nonpayable'
  >;

  setInsuranceFundWallet: TypedContractMethod<
    [newInsuranceFundWallet: AddressLike],
    [void],
    'nonpayable'
  >;

  setMarketOverrides: TypedContractMethod<
    [
      baseAssetSymbol: string,
      overridableFields: OverridableMarketFieldsStruct,
      wallet: AddressLike,
    ],
    [void],
    'nonpayable'
  >;

  setOraclePriceAdapter: TypedContractMethod<
    [newOraclePriceAdapter: AddressLike],
    [void],
    'nonpayable'
  >;

  walletExits: TypedContractMethod<
    [wallet: AddressLike],
    [WalletExitStructOutput],
    'view'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'custodian',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'deposit',
  ): TypedContractMethod<
    [quantityInAssetUnits: BigNumberish, destinationWallet: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'depositIndex',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'dispatcherWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'insuranceFundWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'loadBalanceBySymbol',
  ): TypedContractMethod<
    [wallet: AddressLike, assetSymbol: string],
    [bigint],
    'view'
  >;
  getFunction(
    nameOrSignature: 'loadBalanceStructBySymbol',
  ): TypedContractMethod<
    [wallet: AddressLike, assetSymbol: string],
    [BalanceStructOutput],
    'view'
  >;
  getFunction(
    nameOrSignature: 'loadBaseAssetSymbolsWithOpenPositionsByWallet',
  ): TypedContractMethod<[wallet: AddressLike], [string[]], 'view'>;
  getFunction(
    nameOrSignature: 'loadLastNonceInvalidationForWallet',
  ): TypedContractMethod<
    [wallet: AddressLike],
    [NonceInvalidationStructOutput],
    'view'
  >;
  getFunction(
    nameOrSignature: 'loadMarket',
  ): TypedContractMethod<[index: BigNumberish], [MarketStructOutput], 'view'>;
  getFunction(
    nameOrSignature: 'loadMarketsLength',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'loadOutstandingWalletFunding',
  ): TypedContractMethod<[wallet: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'pendingDepositQuantityByWallet',
  ): TypedContractMethod<[wallet: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'setBridgeAdapters',
  ): TypedContractMethod<
    [newBridgeAdapters: AddressLike[]],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'setIndexPriceAdapters',
  ): TypedContractMethod<
    [newIndexPriceAdapters: AddressLike[]],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'setInsuranceFundWallet',
  ): TypedContractMethod<
    [newInsuranceFundWallet: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'setMarketOverrides',
  ): TypedContractMethod<
    [
      baseAssetSymbol: string,
      overridableFields: OverridableMarketFieldsStruct,
      wallet: AddressLike,
    ],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'setOraclePriceAdapter',
  ): TypedContractMethod<
    [newOraclePriceAdapter: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'walletExits',
  ): TypedContractMethod<
    [wallet: AddressLike],
    [WalletExitStructOutput],
    'view'
  >;

  filters: {};
}
