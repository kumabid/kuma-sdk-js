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

export interface TokenWithMintAndBurnInterface extends Interface {
  getFunction(nameOrSignature: 'burn' | 'mint'): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'burn',
    values: [AddressLike, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'mint',
    values: [AddressLike, BigNumberish],
  ): string;

  decodeFunctionResult(functionFragment: 'burn', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
}

export interface TokenWithMintAndBurn extends BaseContract {
  connect(runner?: ContractRunner | null): TokenWithMintAndBurn;
  waitForDeployment(): Promise<this>;

  interface: TokenWithMintAndBurnInterface;

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

  burn: TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  mint: TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'burn',
  ): TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'mint',
  ): TypedContractMethod<
    [account: AddressLike, amount: BigNumberish],
    [void],
    'nonpayable'
  >;

  filters: {};
}
