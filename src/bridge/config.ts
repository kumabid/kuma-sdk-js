import {
  BridgeTarget,
  NativeToken,
  StargateV2Target,
} from '#types/enums/request';

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
      nativeToken: NativeToken.ETH,
      evmChainId: 94524,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#xchain
      layerZeroEndpointId: 30291,
      // KumaOFTUSDC
      stargateOFTAddress: '0xD56768A659D4c7e2a0a18b6D96F1f74Ce3566b97',
      tokenDecimals: 6,
      usdcAddress: '0xD56768A659D4c7e2a0a18b6D96F1f74Ce3566b97',
    },
    [StargateV2Target.STARGATE_BERACHAIN]: {
      target: StargateV2Target.STARGATE_BERACHAIN,
      nativeToken: NativeToken.BERA,
      evmChainId: 80094,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#bera
      layerZeroEndpointId: 30362,
      // KumaOFTAdapterUSDC
      stargateOFTAddress: '0x7145855835924a9dFa80f42749E1FF96Eed26BC1',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#bera
      tokenDecimals: 6,
      usdcAddress: '0x549943e04f40284185054145c6E4e9568C1D3241',
    },
    [StargateV2Target.STARGATE_ARBITRUM]: {
      target: StargateV2Target.STARGATE_ARBITRUM,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#arbitrum
      evmChainId: 42161,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/mainnet-contracts#arbitrum
      layerZeroEndpointId: 30110,
      stargateOFTAddress: '0xe8CDF27AcD73a434D661C84887215F7598e7d0d3',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#arbitrum
      tokenDecimals: 6,
      usdcAddress: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    },
    [StargateV2Target.STARGATE_AURORA]: {
      target: StargateV2Target.STARGATE_AURORA,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#aurora
      evmChainId: 1313161554,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#aurora
      layerZeroEndpointId: 30211,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#aurora
      stargateOFTAddress: '0x81F6138153d473E8c5EcebD3DC8Cd4903506B075',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#aurora
      tokenDecimals: 6,
      usdcAddress: '0x368ebb46aca6b8d0787c96b2b20bd3cc3f2c45f7',
    },
    [StargateV2Target.STARGATE_BASE]: {
      target: StargateV2Target.STARGATE_BASE,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#base
      evmChainId: 8453,
      layerZeroEndpointId: 30184,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#base
      stargateOFTAddress: '0x27a16dc786820B16E5c9028b75B99F6f604b5d26',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#base
      tokenDecimals: 6,
      usdcAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    },
    [StargateV2Target.STARGATE_ETHEREUM]: {
      target: StargateV2Target.STARGATE_ETHEREUM,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#ethereum
      evmChainId: 1,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/mainnet-contracts#ethereum
      layerZeroEndpointId: 30101,
      stargateOFTAddress: '0xc026395860Db2d07ee33e05fE50ed7bD583189C7',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#ethereum
      tokenDecimals: 6,
      usdcAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    },
    [StargateV2Target.STARGATE_OPTIMISM]: {
      target: StargateV2Target.STARGATE_OPTIMISM,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#optimism
      evmChainId: 10,
      layerZeroEndpointId: 30111,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#optimism
      stargateOFTAddress: '0xcE8CcA271Ebc0533920C83d39F417ED6A0abB7D0',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#optimism
      tokenDecimals: 6,
      usdcAddress: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    },
    [StargateV2Target.STARGATE_RARI]: {
      target: StargateV2Target.STARGATE_RARI,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#rarible
      evmChainId: 1380012617,
      layerZeroEndpointId: 30235,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#rari
      stargateOFTAddress: '0x875bee36739e7Ce6b60E056451c556a88c59b086',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#rari-chain
      tokenDecimals: 6,
      usdcAddress: '0xFbDa5F676cB37624f28265A144A48B0d6e87d3b6',
    },
    [StargateV2Target.STARGATE_SCROLL]: {
      target: StargateV2Target.STARGATE_SCROLL,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#scroll
      evmChainId: 534352,
      layerZeroEndpointId: 30214,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#scroll
      stargateOFTAddress: '0x3Fc69CC4A842838bCDC9499178740226062b14E4',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#scroll
      tokenDecimals: 6,
      usdcAddress: '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4',
    },
    [StargateV2Target.STARGATE_TAIKO]: {
      target: StargateV2Target.STARGATE_TAIKO,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#taiko
      evmChainId: 167000,
      layerZeroEndpointId: 30290,
      // https://stargateprotocol.gitbook.io/stargate/v/v2-developer-docs/technical-reference/mainnet-contracts#taiko
      stargateOFTAddress: '0x77C71633C34C3784ede189d74223122422492a0f',
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/v2-supported-networks-and-assets#taiko
      tokenDecimals: 6,
      usdcAddress: '0x19e26B0638bf63aa9fa4d14c6baF8D52eBE86C5C',
    },
  } as const,
  testnet: {
    [StargateV2Target.XCHAIN_XCHAIN]: {
      target: StargateV2Target.XCHAIN_XCHAIN,
      nativeToken: NativeToken.ETH,
      isSupported: true,
      evmChainId: 64002,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#xchain-testnet
      layerZeroEndpointId: 40282,
      // KumaOFTUSDC
      stargateOFTAddress: '0x54a04EfABCBd81A0488E4a9Ad22264E04A48329B',
      tokenDecimals: 6,
      usdcAddress: '0x54a04EfABCBd81A0488E4a9Ad22264E04A48329B',
    },
    [StargateV2Target.STARGATE_BERACHAIN]: {
      target: StargateV2Target.STARGATE_BERACHAIN,
      // TODO There is currently no testnet for Berachain so we are using
      // Sepolia as a substitute for testing purposes
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#sepolia
      evmChainId: 11155111,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/testnet-contracts#sepolia
      layerZeroEndpointId: 40161,
      // KumaOFTAdapterUSDC
      stargateOFTAddress: '0x21F1caDDBED3Cd50e6B30644459BFB80c367076c',
      tokenDecimals: 6,
      usdcAddress: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    },
    [StargateV2Target.STARGATE_ARBITRUM]: {
      target: StargateV2Target.STARGATE_ARBITRUM,
      nativeToken: NativeToken.ETH,
      // https://docs.layerzero.network/v2/developers/evm/technical-reference/deployed-contracts#arbitrum-sepolia
      evmChainId: 421614,
      // https://stargateprotocol.gitbook.io/stargate/v2-developer-docs/technical-reference/testnet-contracts#arbitrum-sepolia-testnet
      layerZeroEndpointId: 40231,
      stargateOFTAddress: '0x543BdA7c6cA4384FE90B1F5929bb851F52888983',
      tokenDecimals: 6,
      usdcAddress: '0x3253a335E7bFfB4790Aa4C25C4250d206E9b9773',
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
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_AURORA]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_AURORA],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_BASE]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_BASE],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_ETHEREUM]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_ETHEREUM],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_OPTIMISM]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_OPTIMISM],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_RARI]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_RARI],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_SCROLL]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_SCROLL],
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_TAIKO]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_TAIKO],
  },
  testnet: {
    [StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN],
    [StargateV2Config.testnet[StargateV2Target.STARGATE_ARBITRUM]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_ARBITRUM],
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
