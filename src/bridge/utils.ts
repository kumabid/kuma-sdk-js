import { ethers } from 'ethers';

import {
  decimalToPip,
  multiplyPips,
  assetUnitsToPip,
  dividePips,
  pipToAssetUnits,
} from '#pipmath';

import {
  StargateV2Config,
  StargateV2ConfigByLayerZeroEndpointId,
} from '#bridge/config';
import {
  loadExchangeResponseFromApiIfNeeded,
  loadGasFeesResponseFromApiIfNeeded,
} from '#client/rest/public';

import type { KumaGasFees } from '#index';
import type {
  DecodedStargateV2Payload,
  EncodedStargateV2Payload,
} from '#types/bridge';
import type { NativeToken, StargateV2Target } from '#types/enums/request';

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
 * const config = getStargateV2TargetConfig(StargateV2Target.STARGATE_ARBITRUM, true);
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

export function convertNativeTokenToUsd(
  nativeToken: NativeToken,
  nativeTokenQuantityInAssetUnits: bigint,
  nativeTokenPrices: KumaGasFees['nativeTokenPrices'],
  nativeTokenDecimals?: number,
): bigint {
  const nativeTokenPrice = nativeTokenPrices[nativeToken];
  if (!nativeTokenPrice) {
    throw new Error(`Missing price for ${nativeToken}`);
  }

  return multiplyPips(
    assetUnitsToPip(nativeTokenQuantityInAssetUnits, nativeTokenDecimals),
    decimalToPip(nativeTokenPrice),
    true,
  );
}

export function convertBetweenNativeTokens(
  fromNativeToken: NativeToken,
  fromNativeTokenQuantityInAssetUnits: bigint,
  toNativeToken: NativeToken,
  nativeTokenPrices: KumaGasFees['nativeTokenPrices'],
  toNativeTokenDecimals?: number,
): bigint {
  const fromNativeTokenPrice = nativeTokenPrices[fromNativeToken];
  if (!fromNativeTokenPrice) {
    throw new Error(`Missing price for ${fromNativeToken}`);
  }
  const toNativeTokenPrice = nativeTokenPrices[toNativeToken];
  if (!toNativeTokenPrice) {
    throw new Error(`Missing price for ${toNativeToken}`);
  }

  const fromNativeTokenValueInUsd = convertNativeTokenToUsd(
    fromNativeToken,
    fromNativeTokenQuantityInAssetUnits,
    nativeTokenPrices,
  );

  return pipToAssetUnits(
    dividePips(fromNativeTokenValueInUsd, decimalToPip(toNativeTokenPrice)),
    toNativeTokenDecimals,
  );
}

export async function loadExchangeLayerZeroAddressFromApiIfNeeded(
  exchangeLayerZeroAdapterAddress?: string,
): Promise<string> {
  if (exchangeLayerZeroAdapterAddress) {
    return exchangeLayerZeroAdapterAddress;
  }

  const [exchangeResponse] = await loadExchangeResponseFromApiIfNeeded();
  return exchangeResponse.stargateBridgeAdapterContractAddress;
}

export async function loadStargateBridgeForwarderContractAddressFromApiIfNeeded(
  stargateBridgeForwarderContractAddress?: string,
): Promise<string> {
  if (stargateBridgeForwarderContractAddress) {
    return stargateBridgeForwarderContractAddress;
  }

  const [exchangeResponse] = await loadExchangeResponseFromApiIfNeeded();
  return exchangeResponse.stargateBridgeForwarderContractAddress;
}

export async function loadNativeTokenPricesFromApiIfNeeded(
  nativeTokenPrices?: KumaGasFees['nativeTokenPrices'],
): Promise<KumaGasFees['nativeTokenPrices']> {
  if (nativeTokenPrices) {
    return nativeTokenPrices;
  }

  const gasFeesResponse = await loadGasFeesResponseFromApiIfNeeded();
  return gasFeesResponse.nativeTokenPrices;
}
