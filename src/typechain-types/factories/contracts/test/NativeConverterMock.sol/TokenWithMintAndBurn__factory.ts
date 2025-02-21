/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from 'ethers';
import type {
  TokenWithMintAndBurn,
  TokenWithMintAndBurnInterface,
} from '../../../../contracts/test/NativeConverterMock.sol/TokenWithMintAndBurn';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export class TokenWithMintAndBurn__factory {
  static readonly abi = _abi;
  static createInterface(): TokenWithMintAndBurnInterface {
    return new Interface(_abi) as TokenWithMintAndBurnInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null,
  ): TokenWithMintAndBurn {
    return new Contract(
      address,
      _abi,
      runner,
    ) as unknown as TokenWithMintAndBurn;
  }
}
