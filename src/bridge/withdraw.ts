import { assetUnitsToDecimal, decimalToPip } from '#pipmath';

import { ExchangeLayerZeroAdapter_v2__factory } from '#typechain-types/factories/ExchangeLayerZeroAdapter_v2__factory';
import { KumaStargateForwarder_v1__factory } from '#typechain-types/factories/KumaStargateForwarder_v1__factory';
import { StargateV2Target } from '#types/enums/request';

import { StargateV2Config } from './config';
import {
  decodeStargateV2Payload,
  encodeStargateV2Payload,
  getStargateV2TargetConfig,
  stargateV2TargetForLayerZeroEndpointId,
} from './utils';

import type { EncodedStargateV2Payload } from '#types/bridge';
import type { BridgeTarget } from '#types/enums/request';
import type { ethers } from 'ethers';

/**
 * Returns the encoded `bridgeAdapterPayload`
 */
export function getEncodedWithdrawalPayloadForBridgeTarget(
  bridgeTarget: BridgeTarget,
  sandbox = false,
): EncodedStargateV2Payload {
  const targetConfig = getStargateV2TargetConfig(bridgeTarget, sandbox);

  return encodeStargateV2Payload({
    layerZeroEndpointId: targetConfig.layerZeroEndpointId,
  });
}

/**
 * Estimate the quantity of tokens delivered to the target chain via Stargate v2 withdrawal
 */
export async function estimateStargateV2WithdrawQuantity(
  parameters: {
    exchangeLayerZeroAdapterAddress: string;
    stargateForwarderAddress: string;
    payload: string;
    quantityInDecimal: string;
  },
  berachainProvider: ethers.Provider,
  xchainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<{
  estimatedWithdrawQuantityInDecimal: string;
  minimumWithdrawQuantityInDecimal: string;
  willSucceed: boolean;
}> {
  const { layerZeroEndpointId: targetEndpointId } = decodeStargateV2Payload(
    parameters.payload,
  );

  console.log(parameters.exchangeLayerZeroAdapterAddress);
  const exchangeStargateAdapter = ExchangeLayerZeroAdapter_v2__factory.connect(
    parameters.exchangeLayerZeroAdapterAddress,
    xchainProvider,
  );

  const [
    estimatedWithdrawQuantityInAssetUnits,
    minimumWithdrawQuantityInAssetUnits,
    poolDecimals,
  ] = await exchangeStargateAdapter.estimateWithdrawQuantityInAssetUnits(
    // Funds must always be withdrawn to Berachain first regardless of final target
    (sandbox ? StargateV2Config.testnet : StargateV2Config.mainnet)[
      StargateV2Target.STARGATE_BERACHAIN
    ].layerZeroEndpointId,
    decimalToPip(parameters.quantityInDecimal),
  );
  let estimatedWithdrawQuantityInDecimal = assetUnitsToDecimal(
    estimatedWithdrawQuantityInAssetUnits,
    Number(poolDecimals),
  );
  let minimumWithdrawQuantityInDecimal = assetUnitsToDecimal(
    minimumWithdrawQuantityInAssetUnits,
    Number(poolDecimals),
  );

  const target = stargateV2TargetForLayerZeroEndpointId(
    targetEndpointId,
    sandbox,
  );
  if (!target || !getStargateV2TargetConfig(target, sandbox)) {
    throw new Error(`Unsupported Layerzero Endpoint ID ${targetEndpointId}`);
  }
  // If the final target is not Berachain, an bridge tx is needed via the forwarder
  if (target !== StargateV2Target.STARGATE_BERACHAIN) {
    const stargateForwarder = KumaStargateForwarder_v1__factory.connect(
      parameters.stargateForwarderAddress,
      berachainProvider,
    );

    const [
      estimatedForwardedQuantityInAssetUnits,
      minimumForwardedQuantityInAssetUnits,
      forwardedPoolDecimals,
    ] = await stargateForwarder.loadEstimatedForwardedQuantityInAssetUnits(
      targetEndpointId,
      decimalToPip(estimatedWithdrawQuantityInDecimal),
    );
    estimatedWithdrawQuantityInDecimal = assetUnitsToDecimal(
      estimatedForwardedQuantityInAssetUnits,
      Number(forwardedPoolDecimals),
    );
    minimumWithdrawQuantityInDecimal = assetUnitsToDecimal(
      minimumForwardedQuantityInAssetUnits,
      Number(forwardedPoolDecimals),
    );
  }

  const willSucceed =
    BigInt(estimatedWithdrawQuantityInAssetUnits) >=
    BigInt(minimumWithdrawQuantityInAssetUnits);

  return {
    estimatedWithdrawQuantityInDecimal,
    minimumWithdrawQuantityInDecimal,
    willSucceed,
  };
}
