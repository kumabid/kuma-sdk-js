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

export interface IBridgeAdapterInterface extends Interface {
  getFunction(nameOrSignature: 'withdrawQuoteAsset'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'withdrawQuoteAsset',
    values: [AddressLike, BigNumberish, BytesLike],
  ): string;

  decodeFunctionResult(
    functionFragment: 'withdrawQuoteAsset',
    data: BytesLike,
  ): Result;
}

export interface IBridgeAdapter extends BaseContract {
  connect(runner?: ContractRunner | null): IBridgeAdapter;
  waitForDeployment(): Promise<this>;

  interface: IBridgeAdapterInterface;

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

  withdrawQuoteAsset: TypedContractMethod<
    [
      destinationWallet: AddressLike,
      quantity: BigNumberish,
      payload: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'withdrawQuoteAsset',
  ): TypedContractMethod<
    [
      destinationWallet: AddressLike,
      quantity: BigNumberish,
      payload: BytesLike,
    ],
    [void],
    'nonpayable'
  >;

  filters: {};
}
