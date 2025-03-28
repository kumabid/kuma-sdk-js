import { StargateV2Target, BridgeTarget } from '#types/enums/request';

export const StargateV2BridgeTargetsArray = Object.values(BridgeTarget);
export const StargateV2TargetsArray = Object.values(StargateV2Target);

/**
 * TODO_IKON - These configs need to be completed in some areas and should be confirmed as valid
 *
 * @see [evmChainId](https://gist.github.com/melwong/c30eb1e21eda17549996a609c35dafb3#file-list-of-chain-ids-for-metamask-csv)
 *
 * @category Stargate
 */
export const StargateV2Config = {
  settings: {
    swapSourceGasLimit: 450_000,
    swapDestinationGasLimit: 350_000,
    localBridgeTarget: StargateV2Target.XCHAIN_XCHAIN,
  },
  // better way to handle the kuma config as it doesnt have a
  // BridgeTarget assignment?
  mainnet: {
    [StargateV2Target.XCHAIN_XCHAIN]: {
      target: StargateV2Target.XCHAIN_XCHAIN,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      evmChainId: 94524,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#xchain
      layerZeroEndpointId: 30291,
      // KumaOFTUSDC
      stargateOFTAddress: '0xD56768A659D4c7e2a0a18b6D96F1f74Ce3566b97',
      tokenDecimals: 6,
    },
    [StargateV2Target.STARGATE_BERACHAIN]: {
      target: StargateV2Target.STARGATE_BERACHAIN,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      evmChainId: 80094,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#bera
      layerZeroEndpointId: 30362,
      // KumaOFTAdapterUSDC
      stargateOFTAddress: '0x7145855835924a9dFa80f42749E1FF96Eed26BC1',
      // TODO Not yet in LZ docs
      tokenDecimals: 6,
      usdcAddress: '0x549943e04f40284185054145c6E4e9568C1D3241',
    },
    [StargateV2Target.STARGATE_ARBITRUM]: {
      target: StargateV2Target.STARGATE_ARBITRUM,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#arbitrum
      evmChainId: 42161,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/mainnet-contracts#arbitrum
      layerZeroEndpointId: 30110,
      stargateOFTAddress: '0xe8CDF27AcD73a434D661C84887215F7598e7d0d3',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#arbitrum
      tokenDecimals: 6,
      usdcAddress: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    },
    [StargateV2Target.STARGATE_ETHEREUM]: {
      target: StargateV2Target.STARGATE_ETHEREUM,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#ethereum
      evmChainId: 1,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/mainnet-contracts#ethereum
      layerZeroEndpointId: 30101,
      stargateOFTAddress: '0xc026395860Db2d07ee33e05fE50ed7bD583189C7',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#ethereum
      tokenDecimals: 6,
      usdcAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
  } as const,
  testnet: {
    [StargateV2Target.XCHAIN_XCHAIN]: {
      target: StargateV2Target.XCHAIN_XCHAIN,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      evmChainId: 64002,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#xchain-testnet
      layerZeroEndpointId: 40282,
      // KumaOFTUSDC
      stargateOFTAddress: '0x54a04EfABCBd81A0488E4a9Ad22264E04A48329B',
      tokenDecimals: 6,
    },
    [StargateV2Target.STARGATE_BERACHAIN]: {
      target: StargateV2Target.STARGATE_BERACHAIN,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      evmChainId: 80000,
      // TODO Not yet in LZ docs
      layerZeroEndpointId: 40346,
      // KumaOFTAdapterUSDC
      stargateOFTAddress: '0xb1487b8C46e68e15ed3B01cC5AA4A1E6aFEfd6d4',
      tokenDecimals: 6,
      usdcAddress: '0x015fd589F4f1A33ce4487E12714e1B15129c9329',
    },
    [StargateV2Target.STARGATE_ARBITRUM]: {
      target: StargateV2Target.STARGATE_ARBITRUM,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#arbitrum-sepolia
      evmChainId: 421614,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/testnet-contracts#arbitrum-sepolia-testnet
      layerZeroEndpointId: 40231,
      stargateOFTAddress: '0x3253a335E7bFfB4790Aa4C25C4250d206E9b9773',
      tokenDecimals: 6,
      usdcAddress: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    },
    [StargateV2Target.STARGATE_ETHEREUM]: {
      target: StargateV2Target.STARGATE_ETHEREUM,
      isSupported: true,
      get isBridgeTarget() {
        return isValidBridgeTarget(this.target);
      },
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#sepolia
      evmChainId: 11155111,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/testnet-contracts#sepolia
      layerZeroEndpointId: 40161,
      stargateOFTAddress: '0x4985b8fcEA3659FD801a5b857dA1D00e985863F0',
      tokenDecimals: 6,
      usdcAddress: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    },
  } as const,
} as const;

export const StargateV2ConfigByLayerZeroEndpointId = {
  mainnet: {
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_BERACHAIN]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_BERACHAIN],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_ARBITRUM]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_ARBITRUM],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_ETHEREUM]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_ETHEREUM],
  },
  testnet: {
    [StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN],
    [StargateV2Config.testnet[StargateV2Target.STARGATE_ARBITRUM]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_ARBITRUM],
    [StargateV2Config.testnet[StargateV2Target.STARGATE_ETHEREUM]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_ETHEREUM],
  },
};

/**
 * A type guard that checks if the given value is a valid {@link StargateV2Target} value.
 *
 * - This will not validate that the value is a {@link BridgeTarget} as that is  a subset of
 *   {@link StargateV2Target}, use {@link isValidBridgeTarget} for that.
 *
 * @internal
 */

export function isValidStargateV2Target(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): value is StargateV2Target {
  return value && StargateV2TargetsArray.includes(value as StargateV2Target);
}

/**
 * A type guard that checks if the given value is a valid {@link BridgeTarget} (which will also
 * mean it is a valid {@link StargateV2Target})
 *
 * - You can also use {@link isValidStargateV2Target} to check if the value is a {@link StargateV2Target}
 *
 * @internal
 */
export function isValidBridgeTarget(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): value is BridgeTarget {
  return value && StargateV2BridgeTargetsArray.includes(value as BridgeTarget);
}
