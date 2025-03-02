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
} from '../../../../../common';

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

export type OFTLimitStruct = {
  minAmountLD: BigNumberish;
  maxAmountLD: BigNumberish;
};

export type OFTLimitStructOutput = [
  minAmountLD: bigint,
  maxAmountLD: bigint,
] & { minAmountLD: bigint; maxAmountLD: bigint };

export type OFTFeeDetailStruct = {
  feeAmountLD: BigNumberish;
  description: string;
};

export type OFTFeeDetailStructOutput = [
  feeAmountLD: bigint,
  description: string,
] & { feeAmountLD: bigint; description: string };

export type OFTReceiptStruct = {
  amountSentLD: BigNumberish;
  amountReceivedLD: BigNumberish;
};

export type OFTReceiptStructOutput = [
  amountSentLD: bigint,
  amountReceivedLD: bigint,
] & { amountSentLD: bigint; amountReceivedLD: bigint };

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

export interface IOFTInterface extends Interface {
  getFunction(
    nameOrSignature:
      | 'approvalRequired'
      | 'oftVersion'
      | 'quoteOFT'
      | 'quoteSend'
      | 'send'
      | 'sharedDecimals'
      | 'token',
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: 'OFTReceived' | 'OFTSent'): EventFragment;

  encodeFunctionData(
    functionFragment: 'approvalRequired',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'oftVersion',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteOFT',
    values: [SendParamStruct],
  ): string;
  encodeFunctionData(
    functionFragment: 'quoteSend',
    values: [SendParamStruct, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: 'send',
    values: [SendParamStruct, MessagingFeeStruct, AddressLike],
  ): string;
  encodeFunctionData(
    functionFragment: 'sharedDecimals',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'token', values?: undefined): string;

  decodeFunctionResult(
    functionFragment: 'approvalRequired',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'oftVersion', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteOFT', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'quoteSend', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'send', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'sharedDecimals',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result;
}

export namespace OFTReceivedEvent {
  export type InputTuple = [
    guid: BytesLike,
    srcEid: BigNumberish,
    toAddress: AddressLike,
    amountReceivedLD: BigNumberish,
  ];
  export type OutputTuple = [
    guid: string,
    srcEid: bigint,
    toAddress: string,
    amountReceivedLD: bigint,
  ];
  export interface OutputObject {
    guid: string;
    srcEid: bigint;
    toAddress: string;
    amountReceivedLD: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OFTSentEvent {
  export type InputTuple = [
    guid: BytesLike,
    dstEid: BigNumberish,
    fromAddress: AddressLike,
    amountSentLD: BigNumberish,
    amountReceivedLD: BigNumberish,
  ];
  export type OutputTuple = [
    guid: string,
    dstEid: bigint,
    fromAddress: string,
    amountSentLD: bigint,
    amountReceivedLD: bigint,
  ];
  export interface OutputObject {
    guid: string;
    dstEid: bigint;
    fromAddress: string;
    amountSentLD: bigint;
    amountReceivedLD: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IOFT extends BaseContract {
  connect(runner?: ContractRunner | null): IOFT;
  waitForDeployment(): Promise<this>;

  interface: IOFTInterface;

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

  approvalRequired: TypedContractMethod<[], [boolean], 'view'>;

  oftVersion: TypedContractMethod<
    [],
    [[string, bigint] & { interfaceId: string; version: bigint }],
    'view'
  >;

  quoteOFT: TypedContractMethod<
    [_sendParam: SendParamStruct],
    [
      [
        OFTLimitStructOutput,
        OFTFeeDetailStructOutput[],
        OFTReceiptStructOutput,
      ] & { oftFeeDetails: OFTFeeDetailStructOutput[] },
    ],
    'view'
  >;

  quoteSend: TypedContractMethod<
    [_sendParam: SendParamStruct, _payInLzToken: boolean],
    [MessagingFeeStructOutput],
    'view'
  >;

  send: TypedContractMethod<
    [
      _sendParam: SendParamStruct,
      _fee: MessagingFeeStruct,
      _refundAddress: AddressLike,
    ],
    [[MessagingReceiptStructOutput, OFTReceiptStructOutput]],
    'payable'
  >;

  sharedDecimals: TypedContractMethod<[], [bigint], 'view'>;

  token: TypedContractMethod<[], [string], 'view'>;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getFunction(
    nameOrSignature: 'approvalRequired',
  ): TypedContractMethod<[], [boolean], 'view'>;
  getFunction(
    nameOrSignature: 'oftVersion',
  ): TypedContractMethod<
    [],
    [[string, bigint] & { interfaceId: string; version: bigint }],
    'view'
  >;
  getFunction(
    nameOrSignature: 'quoteOFT',
  ): TypedContractMethod<
    [_sendParam: SendParamStruct],
    [
      [
        OFTLimitStructOutput,
        OFTFeeDetailStructOutput[],
        OFTReceiptStructOutput,
      ] & { oftFeeDetails: OFTFeeDetailStructOutput[] },
    ],
    'view'
  >;
  getFunction(
    nameOrSignature: 'quoteSend',
  ): TypedContractMethod<
    [_sendParam: SendParamStruct, _payInLzToken: boolean],
    [MessagingFeeStructOutput],
    'view'
  >;
  getFunction(
    nameOrSignature: 'send',
  ): TypedContractMethod<
    [
      _sendParam: SendParamStruct,
      _fee: MessagingFeeStruct,
      _refundAddress: AddressLike,
    ],
    [[MessagingReceiptStructOutput, OFTReceiptStructOutput]],
    'payable'
  >;
  getFunction(
    nameOrSignature: 'sharedDecimals',
  ): TypedContractMethod<[], [bigint], 'view'>;
  getFunction(
    nameOrSignature: 'token',
  ): TypedContractMethod<[], [string], 'view'>;

  getEvent(
    key: 'OFTReceived',
  ): TypedContractEvent<
    OFTReceivedEvent.InputTuple,
    OFTReceivedEvent.OutputTuple,
    OFTReceivedEvent.OutputObject
  >;
  getEvent(
    key: 'OFTSent',
  ): TypedContractEvent<
    OFTSentEvent.InputTuple,
    OFTSentEvent.OutputTuple,
    OFTSentEvent.OutputObject
  >;

  filters: {
    'OFTReceived(bytes32,uint32,address,uint256)': TypedContractEvent<
      OFTReceivedEvent.InputTuple,
      OFTReceivedEvent.OutputTuple,
      OFTReceivedEvent.OutputObject
    >;
    OFTReceived: TypedContractEvent<
      OFTReceivedEvent.InputTuple,
      OFTReceivedEvent.OutputTuple,
      OFTReceivedEvent.OutputObject
    >;

    'OFTSent(bytes32,uint32,address,uint256,uint256)': TypedContractEvent<
      OFTSentEvent.InputTuple,
      OFTSentEvent.OutputTuple,
      OFTSentEvent.OutputObject
    >;
    OFTSent: TypedContractEvent<
      OFTSentEvent.InputTuple,
      OFTSentEvent.OutputTuple,
      OFTSentEvent.OutputObject
    >;
  };
}
