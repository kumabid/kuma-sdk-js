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

export type SendParamStruct = {
  dstEid: BigNumberish;
  to: BytesLike;
  amountLD: BigNumberish;
  minAmountLD: BigNumberish;
  extraOptions: BytesLike;
  composeMsg: BytesLike;
  oftCmd: BytesLike;
};

export type SendParamStructOutput = [
  dstEid: bigint,
  to: string,
  amountLD: bigint,
  minAmountLD: bigint,
  extraOptions: string,
  composeMsg: string,
  oftCmd: string,
] & {
  dstEid: bigint;
  to: string;
  amountLD: bigint;
  minAmountLD: bigint;
  extraOptions: string;
  composeMsg: string;
  oftCmd: string;
};

export type MessagingFeeStruct = {
  nativeFee: BigNumberish;
  lzTokenFee: BigNumberish;
};

export type MessagingFeeStructOutput = [
  nativeFee: bigint,
  lzTokenFee: bigint,
] & { nativeFee: bigint; lzTokenFee: bigint };

export type MessagingReceiptStruct = {
  guid: BytesLike;
  nonce: BigNumberish;
  fee: MessagingFeeStruct;
};

export type MessagingReceiptStructOutput = [
  guid: string,
  nonce: bigint,
  fee: MessagingFeeStructOutput,
] & { guid: string; nonce: bigint; fee: MessagingFeeStructOutput };

export type OFTReceiptStruct = {
  amountSentLD: BigNumberish;
  amountReceivedLD: BigNumberish;
};

export type OFTReceiptStructOutput = [
  amountSentLD: bigint,
  amountReceivedLD: bigint,
] & { amountSentLD: bigint; amountReceivedLD: bigint };

export interface StargateV2PoolMockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'fee'
      | 'lzCompose'
      | 'quoteSend'
      | 'quoteTokenAddress'
      | 'send'
      | 'token',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'fee', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'lzCompose',
    values: [
      AddressLike,
      AddressLike,
      BytesLike,
      BytesLike,
      AddressLike,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSend',
    values: [SendParamStruct, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteTokenAddress',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'send',
    values: [SendParamStruct, MessagingFeeStruct, AddressLike],
  ): string;
  encodeFunctionData(functionFragment: 'token', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'fee', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'lzCompose', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSend', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'quoteTokenAddress',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'send', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result;
}

export interface StargateV2PoolMock extends BaseContract {
  connect(runner?: ContractRunner | null): StargateV2PoolMock;
  waitForDeployment(): Promise<this>;

  interface: StargateV2PoolMockInterface;

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

  fee: TypedContractMethod<[], [bigint], 'view'>;

  lzCompose: TypedContractMethod<
    [
      composer: AddressLike,
      _from: AddressLike,
      _guid: BytesLike,
      _message: BytesLike,
      _executor: AddressLike,
      _extraData: BytesLike,
    ],
    [void],
    'payable'
  >;

  quoteSend: TypedContractMethod<
    [arg0: SendParamStruct, arg1: boolean],
    [MessagingFeeStructOutput],
    'view'
  >;

  quoteTokenAddress: TypedContractMethod<[], [string], 'view'>;

  send: TypedContractMethod<
    [_sendParam: SendParamStruct, _fee: MessagingFeeStruct, arg2: AddressLike],
    [[MessagingReceiptStructOutput, OFTReceiptStructOutput]],
    'payable'
  >;

  token: TypedContractMethod<[], [string], 'view'>;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'fee',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'lzCompose',
  ): TypedContractMethod<
    [
      composer: AddressLike,
      _from: AddressLike,
      _guid: BytesLike,
      _message: BytesLike,
      _executor: AddressLike,
      _extraData: BytesLike,
    ],
    [void],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'quoteSend',
  ): TypedContractMethod<
    [arg0: SendParamStruct, arg1: boolean],
    [MessagingFeeStructOutput],
    'view'
  >;
  getFunction(
    nameOrSignature: 'quoteTokenAddress',
  ): TypedContractMethod<[], [string], 'view'>;
  getFunction(
    nameOrSignature: 'send',
  ): TypedContractMethod<
    [_sendParam: SendParamStruct, _fee: MessagingFeeStruct, arg2: AddressLike],
    [[MessagingReceiptStructOutput, OFTReceiptStructOutput]],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'token',
  ): TypedContractMethod<[], [string], 'view'>;

  filters: {};
}
