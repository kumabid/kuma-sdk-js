/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  FunctionFragment,
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
} from '../../common';

export interface WalletInMaintenanceAcquisitionDeleveragingInterface
  extends Interface {
  getEvent(
    nameOrSignatureOrTopic: 'DeleveragedInMaintenanceAcquisition',
  ): EventFragment;
}

export namespace DeleveragedInMaintenanceAcquisitionEvent {
  export type InputTuple = [
    baseAssetSymbol: string,
    counterpartyWallet: AddressLike,
    liquidatingWallet: AddressLike,
    liquidationBaseQuantity: BigNumberish,
    liquidationQuoteQuantity: BigNumberish,
  ];
  export type OutputTuple = [
    baseAssetSymbol: string,
    counterpartyWallet: string,
    liquidatingWallet: string,
    liquidationBaseQuantity: bigint,
    liquidationQuoteQuantity: bigint,
  ];
  export interface OutputObject {
    baseAssetSymbol: string;
    counterpartyWallet: string;
    liquidatingWallet: string;
    liquidationBaseQuantity: bigint;
    liquidationQuoteQuantity: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface WalletInMaintenanceAcquisitionDeleveraging
  extends BaseContract {
  connect(
    runner?: ContractRunner | null,
  ): WalletInMaintenanceAcquisitionDeleveraging;
  waitForDeployment(): Promise<this>;

  interface: WalletInMaintenanceAcquisitionDeleveragingInterface;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment,
  ): T;

  getEvent(
    key: 'DeleveragedInMaintenanceAcquisition',
  ): TypedContractEvent<
    DeleveragedInMaintenanceAcquisitionEvent.InputTuple,
    DeleveragedInMaintenanceAcquisitionEvent.OutputTuple,
    DeleveragedInMaintenanceAcquisitionEvent.OutputObject
  >;

  filters: {
    'DeleveragedInMaintenanceAcquisition(string,address,address,uint64,uint64)': TypedContractEvent<
      DeleveragedInMaintenanceAcquisitionEvent.InputTuple,
      DeleveragedInMaintenanceAcquisitionEvent.OutputTuple,
      DeleveragedInMaintenanceAcquisitionEvent.OutputObject
    >;
    DeleveragedInMaintenanceAcquisition: TypedContractEvent<
      DeleveragedInMaintenanceAcquisitionEvent.InputTuple,
      DeleveragedInMaintenanceAcquisitionEvent.OutputTuple,
      DeleveragedInMaintenanceAcquisitionEvent.OutputObject
    >;
  };
}
