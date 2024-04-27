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

export type AssetDistributionStruct = {
  nonce: BigNumberish;
  parentNonce: BigNumberish;
  walletAddress: AddressLike;
  assetAddress: AddressLike;
  quantity: BigNumberish;
  exchangeSignature: BytesLike;
};

export type AssetDistributionStructOutput = [
  nonce: bigint,
  parentNonce: bigint,
  walletAddress: string,
  assetAddress: string,
  quantity: bigint,
  exchangeSignature: string,
] & {
  nonce: bigint;
  parentNonce: bigint;
  walletAddress: string;
  assetAddress: string;
  quantity: bigint;
  exchangeSignature: string;
};

export interface EarningsEscrowInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'adminWallet'
      | 'assetAddress'
      | 'distribute'
      | 'exchangeWallet'
      | 'lastNonce'
      | 'loadLastNonce'
      | 'loadTotalDistributed'
      | 'ownerWallet'
      | 'removeAdmin'
      | 'removeExchange'
      | 'removeOwner'
      | 'setAdmin'
      | 'setExchange'
      | 'setOwner'
      | 'totalDistributed'
      | 'withdrawEscrow',
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | 'AssetsDistributed'
      | 'EscrowWithdrawn'
      | 'ExchangeChanged'
      | 'NativeAssetEscrowed',
  ): EventFragment;

  encodeFunctionData(
    functionFragment: 'adminWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'assetAddress',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'distribute',
    values: [AssetDistributionStruct],
  ): string;
  encodeFunctionData(
    functionFragment: 'exchangeWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'lastNonce',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadLastNonce',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadTotalDistributed',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'ownerWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'removeAdmin',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'removeExchange',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'removeOwner',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'setAdmin',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setExchange',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setOwner',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'totalDistributed',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'withdrawEscrow',
    values: [BigNumberish],
  ): string;

  decodeFunctionResult(
    functionFragment: 'adminWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'assetAddress',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'distribute', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'exchangeWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'lastNonce', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'loadLastNonce',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadTotalDistributed',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'ownerWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'removeAdmin',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'removeExchange',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'removeOwner',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'setAdmin', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setExchange',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'setOwner', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'totalDistributed',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'withdrawEscrow',
    data: BytesLike,
  ): Result;
}

export namespace AssetsDistributedEvent {
  export type InputTuple = [
    wallet: AddressLike,
    quantity: BigNumberish,
    totalQuantity: BigNumberish,
    nonce: BigNumberish,
  ];
  export type OutputTuple = [
    wallet: string,
    quantity: bigint,
    totalQuantity: bigint,
    nonce: bigint,
  ];
  export interface OutputObject {
    wallet: string;
    quantity: bigint;
    totalQuantity: bigint;
    nonce: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EscrowWithdrawnEvent {
  export type InputTuple = [
    quantity: BigNumberish,
    newEscrowBalance: BigNumberish,
  ];
  export type OutputTuple = [quantity: bigint, newEscrowBalance: bigint];
  export interface OutputObject {
    quantity: bigint;
    newEscrowBalance: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExchangeChangedEvent {
  export type InputTuple = [previousValue: AddressLike, newValue: AddressLike];
  export type OutputTuple = [previousValue: string, newValue: string];
  export interface OutputObject {
    previousValue: string;
    newValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NativeAssetEscrowedEvent {
  export type InputTuple = [from: AddressLike, quantity: BigNumberish];
  export type OutputTuple = [from: string, quantity: bigint];
  export interface OutputObject {
    from: string;
    quantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface EarningsEscrow extends BaseContract {
  connect(runner?: ContractRunner | null): EarningsEscrow;
  waitForDeployment(): Promise<this>;

  interface: EarningsEscrowInterface;

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

  adminWallet: TypedContractMethod<[], [string], 'view'>;

  assetAddress: TypedContractMethod<[], [string], 'view'>;

  distribute: TypedContractMethod<
    [distribution: AssetDistributionStruct],
    [void],
    'nonpayable'
  >;

  exchangeWallet: TypedContractMethod<[], [string], 'view'>;

  lastNonce: TypedContractMethod<[arg0: AddressLike], [bigint], 'view'>;

  loadLastNonce: TypedContractMethod<[wallet: AddressLike], [bigint], 'view'>;

  loadTotalDistributed: TypedContractMethod<
    [wallet: AddressLike],
    [bigint],
    'view'
  >;

  ownerWallet: TypedContractMethod<[], [string], 'view'>;

  removeAdmin: TypedContractMethod<[], [void], 'nonpayable'>;

  removeExchange: TypedContractMethod<[], [void], 'nonpayable'>;

  removeOwner: TypedContractMethod<[], [void], 'nonpayable'>;

  setAdmin: TypedContractMethod<[newAdmin: AddressLike], [void], 'nonpayable'>;

  setExchange: TypedContractMethod<
    [newExchangeWallet: AddressLike],
    [void],
    'nonpayable'
  >;

  setOwner: TypedContractMethod<[newOwner: AddressLike], [void], 'nonpayable'>;

  totalDistributed: TypedContractMethod<[arg0: AddressLike], [bigint], 'view'>;

  withdrawEscrow: TypedContractMethod<
    [quantity: BigNumberish],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'adminWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'assetAddress',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'distribute',
  ): TypedContractMethod<
    [distribution: AssetDistributionStruct],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'exchangeWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'lastNonce',
  ): TypedContractMethod<[arg0: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'loadLastNonce',
  ): TypedContractMethod<[wallet: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'loadTotalDistributed',
  ): TypedContractMethod<[wallet: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'ownerWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'removeAdmin',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'removeExchange',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'removeOwner',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setAdmin',
  ): TypedContractMethod<[newAdmin: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setExchange',
  ): TypedContractMethod<
    [newExchangeWallet: AddressLike],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'setOwner',
  ): TypedContractMethod<[newOwner: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'totalDistributed',
  ): TypedContractMethod<[arg0: AddressLike], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'withdrawEscrow',
  ): TypedContractMethod<[quantity: BigNumberish], [void], 'nonpayable'>;

  getEvent(
    key: 'AssetsDistributed',
  ): TypedContractEvent<
    AssetsDistributedEvent.InputTuple,
    AssetsDistributedEvent.OutputTuple,
    AssetsDistributedEvent.OutputObject
  >;
  getEvent(
    key: 'EscrowWithdrawn',
  ): TypedContractEvent<
    EscrowWithdrawnEvent.InputTuple,
    EscrowWithdrawnEvent.OutputTuple,
    EscrowWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: 'ExchangeChanged',
  ): TypedContractEvent<
    ExchangeChangedEvent.InputTuple,
    ExchangeChangedEvent.OutputTuple,
    ExchangeChangedEvent.OutputObject
  >;
  getEvent(
    key: 'NativeAssetEscrowed',
  ): TypedContractEvent<
    NativeAssetEscrowedEvent.InputTuple,
    NativeAssetEscrowedEvent.OutputTuple,
    NativeAssetEscrowedEvent.OutputObject
  >;

  filters: {
    'AssetsDistributed(address,uint256,uint256,uint128)': TypedContractEvent<
      AssetsDistributedEvent.InputTuple,
      AssetsDistributedEvent.OutputTuple,
      AssetsDistributedEvent.OutputObject
    >;
    AssetsDistributed: TypedContractEvent<
      AssetsDistributedEvent.InputTuple,
      AssetsDistributedEvent.OutputTuple,
      AssetsDistributedEvent.OutputObject
    >;

    'EscrowWithdrawn(uint256,uint256)': TypedContractEvent<
      EscrowWithdrawnEvent.InputTuple,
      EscrowWithdrawnEvent.OutputTuple,
      EscrowWithdrawnEvent.OutputObject
    >;
    EscrowWithdrawn: TypedContractEvent<
      EscrowWithdrawnEvent.InputTuple,
      EscrowWithdrawnEvent.OutputTuple,
      EscrowWithdrawnEvent.OutputObject
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

    'NativeAssetEscrowed(address,uint256)': TypedContractEvent<
      NativeAssetEscrowedEvent.InputTuple,
      NativeAssetEscrowedEvent.OutputTuple,
      NativeAssetEscrowedEvent.OutputObject
    >;
    NativeAssetEscrowed: TypedContractEvent<
      NativeAssetEscrowedEvent.InputTuple,
      NativeAssetEscrowedEvent.OutputTuple,
      NativeAssetEscrowedEvent.OutputObject
    >;
  };
}
