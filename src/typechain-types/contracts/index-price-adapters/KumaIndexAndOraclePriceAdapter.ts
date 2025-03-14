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

export interface KumaIndexAndOraclePriceAdapterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'EIP_712_TYPE_HASH_INDEX_PRICE'
      | 'activator'
      | 'adminWallet'
      | 'exchange'
      | 'exchangeDomainSeparator'
      | 'indexPriceServiceWallets'
      | 'latestIndexPriceByBaseAssetSymbol'
      | 'loadPriceForBaseAssetSymbol'
      | 'ownerWallet'
      | 'removeAdmin'
      | 'removeOwner'
      | 'setActive'
      | 'setAdmin'
      | 'setOwner'
      | 'validateIndexPricePayload'
      | 'validateInitialIndexPricePayloadAdmin',
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'EIP_712_TYPE_HASH_INDEX_PRICE',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'activator', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'adminWallet',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'exchange', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'exchangeDomainSeparator',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'indexPriceServiceWallets',
    values: [BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'latestIndexPriceByBaseAssetSymbol',
    values: [string],
  ): string;
  encodeFunctionData(
    functionFragment: 'loadPriceForBaseAssetSymbol',
    values: [string],
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
    functionFragment: 'removeOwner',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'setActive',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAdmin',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'setOwner',
    values: [AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'validateIndexPricePayload',
    values: [BytesLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'validateInitialIndexPricePayloadAdmin',
    values: [BytesLike],
  ): string;

  decodeFunctionResult(
    functionFragment: 'EIP_712_TYPE_HASH_INDEX_PRICE',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'activator', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'adminWallet',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'exchange', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'exchangeDomainSeparator',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'indexPriceServiceWallets',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'latestIndexPriceByBaseAssetSymbol',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'loadPriceForBaseAssetSymbol',
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
    functionFragment: 'removeOwner',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'setActive', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAdmin', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setOwner', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'validateIndexPricePayload',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'validateInitialIndexPricePayloadAdmin',
    data: BytesLike,
  ): Result;
}

export interface KumaIndexAndOraclePriceAdapter extends BaseContract {
  connect(runner?: ContractRunner | null): KumaIndexAndOraclePriceAdapter;
  waitForDeployment(): Promise<this>;

  interface: KumaIndexAndOraclePriceAdapterInterface;

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

  EIP_712_TYPE_HASH_INDEX_PRICE: TypedContractMethod<[], [string], 'view'>;

  activator: TypedContractMethod<[], [string], 'view'>;

  adminWallet: TypedContractMethod<[], [string], 'view'>;

  exchange: TypedContractMethod<[], [string], 'view'>;

  exchangeDomainSeparator: TypedContractMethod<[], [string], 'view'>;

  indexPriceServiceWallets: TypedContractMethod<
    [arg0: BigNumberish],
    [string],
    'view'
  >;

  latestIndexPriceByBaseAssetSymbol: TypedContractMethod<
    [arg0: string],
    [
      [string, bigint, bigint] & {
        baseAssetSymbol: string;
        timestampInMs: bigint;
        price: bigint;
      },
    ],
    'view'
  >;

  loadPriceForBaseAssetSymbol: TypedContractMethod<
    [baseAssetSymbol: string],
    [bigint],
    'view'
  >;

  ownerWallet: TypedContractMethod<[], [string], 'view'>;

  removeAdmin: TypedContractMethod<[], [void], 'nonpayable'>;

  removeOwner: TypedContractMethod<[], [void], 'nonpayable'>;

  setActive: TypedContractMethod<
    [exchange_: AddressLike],
    [void],
    'nonpayable'
  >;

  setAdmin: TypedContractMethod<[newAdmin: AddressLike], [void], 'nonpayable'>;

  setOwner: TypedContractMethod<[newOwner: AddressLike], [void], 'nonpayable'>;

  validateIndexPricePayload: TypedContractMethod<
    [payload: BytesLike],
    [IndexPriceStructOutput],
    'nonpayable'
  >;

  validateInitialIndexPricePayloadAdmin: TypedContractMethod<
    [payload: BytesLike],
    [void],
    'nonpayable'
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'EIP_712_TYPE_HASH_INDEX_PRICE',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'activator',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'adminWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'exchange',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'exchangeDomainSeparator',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'indexPriceServiceWallets',
  ): TypedContractMethod<[arg0: BigNumberish], [string], 'view'>;
  getFunction(
    nameOrSignature: 'latestIndexPriceByBaseAssetSymbol',
  ): TypedContractMethod<
    [arg0: string],
    [
      [string, bigint, bigint] & {
        baseAssetSymbol: string;
        timestampInMs: bigint;
        price: bigint;
      },
    ],
    'view'
  >;
  getFunction(
    nameOrSignature: 'loadPriceForBaseAssetSymbol',
  ): TypedContractMethod<[baseAssetSymbol: string], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'ownerWallet',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'removeAdmin',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'removeOwner',
  ): TypedContractMethod<[], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setActive',
  ): TypedContractMethod<[exchange_: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setAdmin',
  ): TypedContractMethod<[newAdmin: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'setOwner',
  ): TypedContractMethod<[newOwner: AddressLike], [void], 'nonpayable'>;
  getFunction(
    nameOrSignature: 'validateIndexPricePayload',
  ): TypedContractMethod<
    [payload: BytesLike],
    [IndexPriceStructOutput],
    'nonpayable'
  >;
  getFunction(
    nameOrSignature: 'validateInitialIndexPricePayloadAdmin',
  ): TypedContractMethod<[payload: BytesLike], [void], 'nonpayable'>;

  filters: {};
}
