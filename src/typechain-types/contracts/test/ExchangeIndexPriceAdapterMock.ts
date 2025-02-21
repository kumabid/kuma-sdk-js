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
} from '../../common';

export type IndexPriceStruct = {
  baseAssetSymbol: string;
  timestampInMs: BigNumberish;
  price: BigNumberish;
};

export type IndexPriceStructOutput = [
  baseAssetSymbol: string,
  timestampInMs: bigint,
  price: bigint,
] & { baseAssetSymbol: string; timestampInMs: bigint; price: bigint };

export interface ExchangeIndexPriceAdapterMockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'indexPriceAdapter'
      | 'loadMarketsLength'
      | 'validateIndexPricePayload',
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: 'ValidatedIndexPrice'): EventFragment;

  encodeFunctionData(
    functionFragment: 'indexPriceAdapter',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'loadMarketsLength',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'validateIndexPricePayload',
    values: [BytesLike],
  ): string;

  decodeFunctionResult(
    functionFragment: 'indexPriceAdapter',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadMarketsLength',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'validateIndexPricePayload',
    data: BytesLike,
  ): Result;
}

export namespace ValidatedIndexPriceEvent {
  export type InputTuple = [indexPrice: IndexPriceStruct];
  export type OutputTuple = [indexPrice: IndexPriceStructOutput];
  export interface OutputObject {
    indexPrice: IndexPriceStructOutput;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ExchangeIndexPriceAdapterMock extends BaseContract {
  connect(runner?: ContractRunner | null): ExchangeIndexPriceAdapterMock;
  waitForDeployment(): Promise<this>;

  interface: ExchangeIndexPriceAdapterMockInterface;

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

  indexPriceAdapter: TypedContractMethod<[], [string], 'view'>;

  loadMarketsLength: TypedContractMethod<[], [bigint], 'view'>;

  validateIndexPricePayload: TypedContractMethod<
    [payload: BytesLike],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'indexPriceAdapter',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'loadMarketsLength',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'validateIndexPricePayload',
  ): TypedContractMethod<[payload: BytesLike], [void], 'nonpayable'>;

  getEvent(
    key: 'ValidatedIndexPrice',
  ): TypedContractEvent<
    ValidatedIndexPriceEvent.InputTuple,
    ValidatedIndexPriceEvent.OutputTuple,
    ValidatedIndexPriceEvent.OutputObject
  >;

  filters: {
    'ValidatedIndexPrice(tuple)': TypedContractEvent<
      ValidatedIndexPriceEvent.InputTuple,
      ValidatedIndexPriceEvent.OutputTuple,
      ValidatedIndexPriceEvent.OutputObject
    >;
    ValidatedIndexPrice: TypedContractEvent<
      ValidatedIndexPriceEvent.InputTuple,
      ValidatedIndexPriceEvent.OutputTuple,
      ValidatedIndexPriceEvent.OutputObject
    >;
  };
}
