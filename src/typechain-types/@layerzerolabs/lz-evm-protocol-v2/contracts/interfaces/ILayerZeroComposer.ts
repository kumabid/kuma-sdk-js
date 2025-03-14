/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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
} from '../../../../common';

export interface ILayerZeroComposerInterface extends Interface {
  getFunction(nameOrSignature: 'lzCompose'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'lzCompose',
    values: [AddressLike, BytesLike, BytesLike, AddressLike, BytesLike],
  ): string;

  decodeFunctionResult(functionFragment: 'lzCompose', data: BytesLike): Result;
}

export interface ILayerZeroComposer extends BaseContract {
  connect(runner?: ContractRunner | null): ILayerZeroComposer;
  waitForDeployment(): Promise<this>;

  interface: ILayerZeroComposerInterface;

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

  lzCompose: TypedContractMethod<
    [
      _from: AddressLike,
      _guid: BytesLike,
      _message: BytesLike,
      _executor: AddressLike,
      _extraData: BytesLike,
    ],
    [void],
    'payable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'lzCompose',
  ): TypedContractMethod<
    [
      _from: AddressLike,
      _guid: BytesLike,
      _message: BytesLike,
      _executor: AddressLike,
      _extraData: BytesLike,
    ],
    [void],
    'payable'
  >;

  filters: {};
}
