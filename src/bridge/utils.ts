import { ethers } from 'ethers';

import {
  StargateV2Config,
  StargateV2ConfigByLayerZeroEndpointId,
} from './config';

import type {
  DecodedStargateV2Payload,
  EncodedStargateV2Payload,
} from '#types/bridge';
import type { StargateV2Target } from '#types/enums/request';

export const StargateV2MainnetLayerZeroEndpointIds = Object.values(
  StargateV2ConfigByLayerZeroEndpointId.mainnet,
).map((value) => {
  return value.layerZeroEndpointId;
});

export type StargateV2LayerZeroEndpointIdsMainnet =
  (typeof StargateV2MainnetLayerZeroEndpointIds)[number];

export function isStargateV2MainnetLayerZeroEndpointId(
  layerZeroEndpointId: number,
): layerZeroEndpointId is StargateV2LayerZeroEndpointIdsMainnet {
  return StargateV2MainnetLayerZeroEndpointIds.includes(
    layerZeroEndpointId as StargateV2LayerZeroEndpointIdsMainnet,
  );
}

export const StargateV2TestnetLayerZeroEndpointIds = Object.values(
  StargateV2ConfigByLayerZeroEndpointId.testnet,
).map((value) => {
  return value.layerZeroEndpointId;
});

export type StargateV2LayerZeroEndpointIdsTestnet =
  (typeof StargateV2TestnetLayerZeroEndpointIds)[number];

export function isStargateV2TestnetLayerZeroEndpointId(
  layerZeroEndpointId: number,
): layerZeroEndpointId is StargateV2LayerZeroEndpointIdsTestnet {
  return StargateV2TestnetLayerZeroEndpointIds.includes(
    layerZeroEndpointId as StargateV2LayerZeroEndpointIdsTestnet,
  );
}

/**
 * Get a stargate config with strict typing to allow narrowing on the
 * `config.supported` boolean
 *
 * @example
 * ```typescript
 * const config = getStargateTargetConfig(StargateTarget.STARGATE_ARBITRUM, true);
 * ```
 */
export function getStargateV2TargetConfig<
  T extends StargateV2Target,
  S extends true | false,
>(stargateTarget: T, sandbox: S) {
  const targetConfig =
    sandbox ?
      StargateV2Config.testnet[stargateTarget]
    : StargateV2Config.mainnet[stargateTarget];
  if (!targetConfig) {
    throw new Error(
      `No config found for ${stargateTarget} ${sandbox ? 'testnet' : 'mainnet'}`,
    );
  }

  return targetConfig;
}

export function stargateV2TargetForLayerZeroEndpointId(
  layerZeroEndpointId: number,
  sandbox: boolean,
) {
  if (sandbox && isStargateV2TestnetLayerZeroEndpointId(layerZeroEndpointId)) {
    return StargateV2ConfigByLayerZeroEndpointId.testnet[layerZeroEndpointId]
      .target;
  }
  if (!sandbox && isStargateV2MainnetLayerZeroEndpointId(layerZeroEndpointId)) {
    return StargateV2ConfigByLayerZeroEndpointId.mainnet[layerZeroEndpointId]
      .target;
  }

  return null;
}

/**
 * Decode an ABI-encoded hex string representing Stargate V2 withdrawal parameters
 */
export function decodeStargateV2Payload(
  payload: EncodedStargateV2Payload,
): DecodedStargateV2Payload {
  return {
    layerZeroEndpointId: parseInt(
      ethers.AbiCoder.defaultAbiCoder().decode(['uint32'], payload)[0],
      10,
    ),
  };
}

/**
 * ABI-encode Stargate withdrawal parameters
 */
export function encodeStargateV2Payload({
  layerZeroEndpointId,
}: DecodedStargateV2Payload): EncodedStargateV2Payload {
  return ethers.AbiCoder.defaultAbiCoder().encode(
    ['uint32'],
    [layerZeroEndpointId],
  );
}
