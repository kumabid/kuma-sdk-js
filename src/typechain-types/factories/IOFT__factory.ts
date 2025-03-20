/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type { IOFT, IOFTInterface } from '../IOFT';

const _abi = [
  {
    inputs: [],
    name: 'InvalidLocalDecimals',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountLD',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minAmountLD',
        type: 'uint256',
      },
    ],
    name: 'SlippageExceeded',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'guid',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'srcEid',
        type: 'uint32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'toAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountReceivedLD',
        type: 'uint256',
      },
    ],
    name: 'OFTReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'guid',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'dstEid',
        type: 'uint32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountSentLD',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountReceivedLD',
        type: 'uint256',
      },
    ],
    name: 'OFTSent',
    type: 'event',
  },
  {
    inputs: [],
    name: 'approvalRequired',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oftVersion',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
      {
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'dstEid',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'to',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'amountLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAmountLD',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraOptions',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'composeMsg',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'oftCmd',
            type: 'bytes',
          },
        ],
        internalType: 'struct SendParam',
        name: '_sendParam',
        type: 'tuple',
      },
    ],
    name: 'quoteOFT',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'minAmountLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxAmountLD',
            type: 'uint256',
          },
        ],
        internalType: 'struct OFTLimit',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'int256',
            name: 'feeAmountLD',
            type: 'int256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
        ],
        internalType: 'struct OFTFeeDetail[]',
        name: 'oftFeeDetails',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'amountSentLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountReceivedLD',
            type: 'uint256',
          },
        ],
        internalType: 'struct OFTReceipt',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'dstEid',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'to',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'amountLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAmountLD',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraOptions',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'composeMsg',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'oftCmd',
            type: 'bytes',
          },
        ],
        internalType: 'struct SendParam',
        name: '_sendParam',
        type: 'tuple',
      },
      {
        internalType: 'bool',
        name: '_payInLzToken',
        type: 'bool',
      },
    ],
    name: 'quoteSend',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nativeFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lzTokenFee',
            type: 'uint256',
          },
        ],
        internalType: 'struct MessagingFee',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint32',
            name: 'dstEid',
            type: 'uint32',
          },
          {
            internalType: 'bytes32',
            name: 'to',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'amountLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minAmountLD',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'extraOptions',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'composeMsg',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'oftCmd',
            type: 'bytes',
          },
        ],
        internalType: 'struct SendParam',
        name: '_sendParam',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nativeFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lzTokenFee',
            type: 'uint256',
          },
        ],
        internalType: 'struct MessagingFee',
        name: '_fee',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '_refundAddress',
        type: 'address',
      },
    ],
    name: 'send',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'guid',
            type: 'bytes32',
          },
          {
            internalType: 'uint64',
            name: 'nonce',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'nativeFee',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'lzTokenFee',
                type: 'uint256',
              },
            ],
            internalType: 'struct MessagingFee',
            name: 'fee',
            type: 'tuple',
          },
        ],
        internalType: 'struct MessagingReceipt',
        name: '',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'amountSentLD',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountReceivedLD',
            type: 'uint256',
          },
        ],
        internalType: 'struct OFTReceipt',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'sharedDecimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export class IOFT__factory {
  static readonly abi = _abi;
  static createInterface(): IOFTInterface {
    return new Interface(_abi) as IOFTInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IOFT {
    return new Contract(address, _abi, runner) as unknown as IOFT;
  }
}
