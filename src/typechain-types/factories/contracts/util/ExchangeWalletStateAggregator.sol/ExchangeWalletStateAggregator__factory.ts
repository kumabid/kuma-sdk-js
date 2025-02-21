/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from 'ethers';
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from 'ethers';
import type { NonPayableOverrides } from '../../../../common';
import type {
  ExchangeWalletStateAggregator,
  ExchangeWalletStateAggregatorInterface,
} from '../../../../contracts/util/ExchangeWalletStateAggregator.sol/ExchangeWalletStateAggregator';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'exchange_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'exchange',
    outputs: [
      {
        internalType: 'contract IExchangeExtended',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'wallets',
        type: 'address[]',
      },
    ],
    name: 'loadWalletStates',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'bool',
                name: 'isMigrated',
                type: 'bool',
              },
              {
                internalType: 'int64',
                name: 'balance',
                type: 'int64',
              },
              {
                internalType: 'int64',
                name: 'costBasis',
                type: 'int64',
              },
              {
                internalType: 'uint64',
                name: 'lastUpdateTimestampInMs',
                type: 'uint64',
              },
            ],
            internalType: 'struct Balance[]',
            name: 'balances',
            type: 'tuple[]',
          },
          {
            internalType: 'uint64',
            name: 'pendingDepositQuantity',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'bool',
                name: 'exists',
                type: 'bool',
              },
              {
                internalType: 'uint64',
                name: 'effectiveBlockTimestamp',
                type: 'uint64',
              },
              {
                internalType:
                  'enum WalletExitAcquisitionDeleveragePriceStrategy',
                name: 'deleveragePriceStrategy',
                type: 'uint8',
              },
            ],
            internalType: 'struct WalletExit',
            name: 'walletExit',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint64',
                name: 'timestampInMs',
                type: 'uint64',
              },
              {
                internalType: 'uint256',
                name: 'effectiveBlockTimestamp',
                type: 'uint256',
              },
            ],
            internalType: 'struct NonceInvalidation',
            name: 'nonceInvalidation',
            type: 'tuple',
          },
        ],
        internalType: 'struct WalletState[]',
        name: 'walletStates',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x60a0346100e757601f61118938819003918201601f19168301916001600160401b038311848410176100ec578084926020946040528339810103126100e757516001600160a01b038116908181036100e7573b156100a25760805260405161108690816101038239608051818181607d015281816101c8015281816102a6015281816105d40152818161068b015281816107360152818161088f01526109720152f35b60405162461bcd60e51b815260206004820152601860248201527f496e76616c69642045786368616e6765206164647265737300000000000000006044820152606490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe6080604052600436101561001257600080fd5b60003560e01c806315b463ad146100a65763d2f7265a1461003257600080fd5b346100a15760007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100a157602060405173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b600080fd5b346100a15760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100a15760043567ffffffffffffffff81116100a157366023820112156100a157806004013561010081610f59565b9161010e6040519384610f18565b8183526024602084019260051b820101903682116100a157602401915b818310610e7b578380517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe061017861016283610f59565b926101706040519485610f18565b808452610f59565b0160005b818110610e195750506040517f0d1c46eb00000000000000000000000000000000000000000000000000000000815260208160048173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa90811561054e57600091610de7575b5061020381610f59565b926102116040519485610f18565b8184527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe061023e83610f59565b0160005b818110610dd657505060005b8260ff8216101561055a57604051907f2bfd5f5900000000000000000000000000000000000000000000000000000000825260ff8116600483015260008260248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa91821561054e57600092610306575b5060406103019201516102ed60ff831688610fc7565b526102fb60ff821687610fc7565b50610f71565b61024e565b3d9250826000823e6103188382610f18565b60208184810103126100a15780519267ffffffffffffffff84116100a1576101a084830182840103126100a1576040519061035282610efc565b61035d858401610f82565b825261036d602086850101610f82565b6020830152604085840101519067ffffffffffffffff82116100a157808401601f83888701010112156100a1578186850101519067ffffffffffffffff821161051f576040516103e560207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8601160182610f18565b828152818601602084868b8a01010101116100a1576104327fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff409360e0956020808501918c8b010101610f8f565b6040850152610445606088870101610fb2565b6060850152610458608088870101610fb2565b608085015261046b60a088870101610fb2565b60a08501528685019085010301126100a1576103019360409261051161018085519361049685610efc565b60c0936104a68583830101610fb2565b86526104b660e083830101610fb2565b60208701526104ca61010083830101610fb2565b888701526104dd61012083830101610fb2565b60608701526104f161014083830101610fb2565b608087015261050561016083830101610fb2565b60a08701520101610fb2565b8183015282015292506102d7565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040513d6000823e3d90fd5b5090916000915b8051831015610c535773ffffffffffffffffffffffffffffffffffffffff6105898483610fc7565b5116604051907f6dc0e8d9000000000000000000000000000000000000000000000000000000008252600482015260208160248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa90811561054e57600091610c19575b5067ffffffffffffffff602061061b8686610fc7565b51019116905273ffffffffffffffffffffffffffffffffffffffff6106408483610fc7565b5116604051907f3cfaad02000000000000000000000000000000000000000000000000000000008252600482015260408160248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa90811561054e57600091610bc7575b5060606106c98585610fc7565b51015273ffffffffffffffffffffffffffffffffffffffff6106eb8483610fc7565b5116604051907f4e40a215000000000000000000000000000000000000000000000000000000008252600482015260608160248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa90811561054e57600091610b5c575b5060406107748585610fc7565b5101526001840184116109e25761078d60018501610f59565b61079a6040519182610f18565b6001850181527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe06107cd60018701610f59565b0160005b818110610b295750506107e48484610fc7565b5152610876602073ffffffffffffffffffffffffffffffffffffffff61080a8685610fc7565b51166040519061081982610ee0565b600382527f55534400000000000000000000000000000000000000000000000000000000008383015260405193849283927fdd7c4fe300000000000000000000000000000000000000000000000000000000845260048401610fe9565b038173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa90811561054e57600091610aef575b506108cb8484610fc7565b5151805115610ac057602080910151019060070b905260005b8460ff82161015610a8e5761095990608073ffffffffffffffffffffffffffffffffffffffff6109148786610fc7565b511661092360ff84168a610fc7565b519060405194859283927fdaa3629200000000000000000000000000000000000000000000000000000000845260048401610fe9565b038173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa91821561054e57600092610a11575b506109ae8585610fc7565b515191600160ff8316019060ff82116109e2576109dd9360ff6102fb9316916109d78383610fc7565b52610fc7565b6108e4565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9091506080813d608011610a86575b81610a2d60809383610f18565b810103126100a157610a7a606060405192610a4784610ea8565b610a5081610f82565b8452610a5e60208201610fdb565b6020850152610a6f60408201610fdb565b604085015201610fb2565b606082015290876109a3565b3d9150610a20565b50917fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109e25760010191610561565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90506020813d602011610b21575b81610b0a60209383610f18565b810103126100a157610b1b90610fdb565b866108c0565b3d9150610afd565b602090604051610b3881610ea8565b600081526000838201526000604082015260006060820152828286010152016107d1565b90506060813d606011610bbf575b81610b7760609383610f18565b810103126100a1576040805191610b8d83610ec4565b610b9681610f82565b8352610ba460208201610fb2565b6020840152015160038110156100a157604082015286610767565b3d9150610b6a565b90506040813d604011610c11575b81610be260409383610f18565b810103126100a157602060405191610bf983610ee0565b610c0281610fb2565b835201516020820152866106bc565b3d9150610bd5565b90506020813d602011610c4b575b81610c3460209383610f18565b810103126100a157610c4590610fb2565b86610605565b3d9150610c27565b5060405160208101916020825280518093526040820192602060408260051b85010192019060005b818110610c885784840385f35b9091927fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc085820301865283519060e0810182519060e083528151809152602061010084019201906000905b808210610d8c5750505067ffffffffffffffff6020840151166020830152604083015190815115156040840152604067ffffffffffffffff60208401511692606093848601520151926003841015610d5d5760c0602080959460019782966080860152015167ffffffffffffffff81511660a0850152015191015295019601910194919094610c7b565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b90919260206080600192865180511515825283810151600790810b858401526040820151900b604083015267ffffffffffffffff6060809201511690820152019401920190610cd3565b806060602080938901015201610242565b90506020813d602011610e11575b81610e0260209383610f18565b810103126100a15751836101f9565b3d9150610df5565b602090604051610e2881610ea8565b6060808252600084830152604051610e3f81610ec4565b6000815260008582015260006040820152604083015260405190610e6282610ee0565b600082526000858301528201528282860101520161017c565b823573ffffffffffffffffffffffffffffffffffffffff811681036100a15781526020928301920161012b565b6080810190811067ffffffffffffffff82111761051f57604052565b6060810190811067ffffffffffffffff82111761051f57604052565b6040810190811067ffffffffffffffff82111761051f57604052565b60e0810190811067ffffffffffffffff82111761051f57604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761051f57604052565b67ffffffffffffffff811161051f5760051b60200190565b60ff1660ff81146109e25760010190565b519081151582036100a157565b60005b838110610fa25750506000910152565b8181015183820152602001610f92565b519067ffffffffffffffff821682036100a157565b8051821015610ac05760209160051b010190565b51908160070b82036100a157565b90601f60609373ffffffffffffffffffffffffffffffffffffffff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe093168452604060208501526110498151809281604088015260208888019101610f8f565b011601019056fea26469706673582212206cf8ca69ee2fa2c74f1d9b810b213dec6dd7d3afdac5127381dd197003baabde64736f6c63430008120033';

type ExchangeWalletStateAggregatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ExchangeWalletStateAggregatorConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ExchangeWalletStateAggregator__factory extends ContractFactory {
  constructor(...args: ExchangeWalletStateAggregatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    exchange_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(exchange_, overrides || {});
  }
  override deploy(
    exchange_: AddressLike,
    overrides?: NonPayableOverrides & { from?: string },
  ) {
    return super.deploy(exchange_, overrides || {}) as Promise<
      ExchangeWalletStateAggregator & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null,
  ): ExchangeWalletStateAggregator__factory {
    return super.connect(runner) as ExchangeWalletStateAggregator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ExchangeWalletStateAggregatorInterface {
    return new Interface(_abi) as ExchangeWalletStateAggregatorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): ExchangeWalletStateAggregator {
    return new Contract(
      address,
      _abi,
      runner,
    ) as unknown as ExchangeWalletStateAggregator;
  }
}
