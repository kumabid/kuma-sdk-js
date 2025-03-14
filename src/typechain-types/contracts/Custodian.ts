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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from 'ethers';
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from '../common';

export interface CustodianInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'assetMigrator'
      | 'exchange'
      | 'governance'
      | 'migrateAsset'
      | 'setAssetMigrator'
      | 'setExchange'
      | 'setGovernance'
      | 'withdraw',
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | 'AssetMigratorChanged'
      | 'ExchangeChanged'
      | 'GovernanceChanged',
  ): EventFragment;

  encodeFunctionData(
    functionFragment: 'assetMigrator',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'exchange', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'governance',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'migrateAsset',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAssetMigrator',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setExchange',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setGovernance',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'withdraw',
    values: [AddressLike, AddressLike, BigNumberish],
  ): string;

  decodeFunctionResult(
    functionFragment: 'assetMigrator',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'exchange', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'governance', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'migrateAsset',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setAssetMigrator',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setExchange',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'setGovernance',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;
}

export namespace AssetMigratorChangedEvent {
  export type InputTuple = [
    oldAssetMigrator: AddressLike,
    newAssetMigrator: AddressLike,
  ];
  export type OutputTuple = [
    oldAssetMigrator: string,
    newAssetMigrator: string,
  ];
  export interface OutputObject {
    oldAssetMigrator: string;
    newAssetMigrator: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExchangeChangedEvent {
  export type InputTuple = [oldExchange: AddressLike, newExchange: AddressLike];
  export type OutputTuple = [oldExchange: string, newExchange: string];
  export interface OutputObject {
    oldExchange: string;
    newExchange: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GovernanceChangedEvent {
  export type InputTuple = [
    oldGovernance: AddressLike,
    newGovernance: AddressLike,
  ];
  export type OutputTuple = [oldGovernance: string, newGovernance: string];
  export interface OutputObject {
    oldGovernance: string;
    newGovernance: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Custodian extends BaseContract {
  connect(runner?: ContractRunner | null): Custodian;
  waitForDeployment(): Promise<this>;

  interface: CustodianInterface;

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

  assetMigrator: TypedContractMethod<[], [string], 'view'>;

  exchange: TypedContractMethod<[], [string], 'view'>;

  governance: TypedContractMethod<[], [string], 'view'>;

  migrateAsset: TypedContractMethod<
    [sourceAsset: AddressLike],
    [string],
    'nonpayable'
  >;

  setAssetMigrator: TypedContractMethod<
    [newAssetMigrator: AddressLike],
    [void],
    'nonpayable'
  >;

  setExchange: TypedContractMethod<
    [newExchange: AddressLike],
    [void],
    'nonpayable'
  >;

  setGovernance: TypedContractMethod<
    [newGovernance: AddressLike],
    [void],
    'nonpayable'
  >;

  withdraw: TypedContractMethod<
    [
      wallet: AddressLike,
      asset: AddressLike,
      quantityInAssetUnits: BigNumberish,
    ],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'assetMigrator',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'exchange',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'governance',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'migrateAsset',
  ): TypedContractMethod<[sourceAsset: AddressLike], [string], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setAssetMigrator',
  ): TypedContractMethod<[newAssetMigrator: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setExchange',
  ): TypedContractMethod<[newExchange: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setGovernance',
  ): TypedContractMethod<[newGovernance: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'withdraw',
  ): TypedContractMethod<
    [
      wallet: AddressLike,
      asset: AddressLike,
      quantityInAssetUnits: BigNumberish,
    ],
    [void],
    'nonpayable'
  >;

  getEvent(
    key: 'AssetMigratorChanged',
  ): TypedContractEvent<
    AssetMigratorChangedEvent.InputTuple,
    AssetMigratorChangedEvent.OutputTuple,
    AssetMigratorChangedEvent.OutputObject
  >;
  getEvent(
    key: 'ExchangeChanged',
  ): TypedContractEvent<
    ExchangeChangedEvent.InputTuple,
    ExchangeChangedEvent.OutputTuple,
    ExchangeChangedEvent.OutputObject
  >;
  getEvent(
    key: 'GovernanceChanged',
  ): TypedContractEvent<
    GovernanceChangedEvent.InputTuple,
    GovernanceChangedEvent.OutputTuple,
    GovernanceChangedEvent.OutputObject
  >;

  filters: {
    'AssetMigratorChanged(address,address)': TypedContractEvent<
      AssetMigratorChangedEvent.InputTuple,
      AssetMigratorChangedEvent.OutputTuple,
      AssetMigratorChangedEvent.OutputObject
    >;
    AssetMigratorChanged: TypedContractEvent<
      AssetMigratorChangedEvent.InputTuple,
      AssetMigratorChangedEvent.OutputTuple,
      AssetMigratorChangedEvent.OutputObject
    >;

    'ExchangeChanged(address,address)': TypedContractEvent<
      ExchangeChangedEvent.InputTuple,
      ExchangeChangedEvent.OutputTuple,
      ExchangeChangedEvent.OutputObject
    >;
    ExchangeChanged: TypedContractEvent<
      ExchangeChangedEvent.InputTuple,
      ExchangeChangedEvent.OutputTuple,
      ExchangeChangedEvent.OutputObject
    >;

    'GovernanceChanged(address,address)': TypedContractEvent<
      GovernanceChangedEvent.InputTuple,
      GovernanceChangedEvent.OutputTuple,
      GovernanceChangedEvent.OutputObject
    >;
    GovernanceChanged: TypedContractEvent<
      GovernanceChangedEvent.InputTuple,
      GovernanceChangedEvent.OutputTuple,
      GovernanceChangedEvent.OutputObject
    >;
  };
}
