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
  } as const,
} as const;

export const StargateV2ConfigByLayerZeroEndpointId = {
  mainnet: {
    [StargateV2Config.mainnet[StargateV2Target.STARGATE_BERACHAIN]
      .layerZeroEndpointId]:
      StargateV2Config.mainnet[StargateV2Target.STARGATE_BERACHAIN],
  },
  testnet: {
    [StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN]
      .layerZeroEndpointId]:
      StargateV2Config.testnet[StargateV2Target.STARGATE_BERACHAIN],
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
