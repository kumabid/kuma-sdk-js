import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

import { assetUnitsToDecimal, decimalToPip, multiplyPips } from '#pipmath';

import { getExchangeAddressAndChainFromApi } from '#client/rest/public';
import { ExchangeLayerZeroAdapter_v2__factory } from '#typechain-types/factories/ExchangeLayerZeroAdapter_v2__factory';
import { KumaStargateForwarder_v1__factory } from '#typechain-types/factories/KumaStargateForwarder_v1__factory';
import { IOFT__factory } from '#typechain-types/index';
import { StargateV2Target } from '#types/enums/request';

import {
  StargateV2Config,
  StargateV2ConfigByLayerZeroEndpointId,
} from './config';

import type {
  DecodedStargateV2Payload,
  EncodedStargateV2Payload,
} from '#types/bridge';
import type { BridgeTarget } from '#types/enums/request';

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

/**
 * Returns the encoded `bridgeAdapterPayload`
 */
export function getEncodedWithdrawalPayloadForBridgeTarget(
  bridgeTarget: BridgeTarget,
  sandbox = false,
): EncodedStargateV2Payload {
  const targetConfig =
    sandbox ?
      StargateV2Config.testnet[bridgeTarget]
    : StargateV2Config.mainnet[bridgeTarget];

  if (!targetConfig || !targetConfig.isSupported) {
    throw new Error(
      `Stargate withdrawals not supported to chain ${targetConfig.target} ${sandbox ? 'testnet' : 'mainnet'} (Chain ID: ${String(targetConfig.evmChainId)})`,
    );
  }

  return encodeStargateV2Payload({
    layerZeroEndpointId: targetConfig.layerZeroEndpointId,
  });
}

/**
 * Deposit funds cross-chain into the Exchange using Stargate
 */
export async function depositViaStargateV2(
  sourceStargateTarget: StargateV2Target,
  parameters: {
    exchangeLayerZeroAdapterAddress?: string;
    stargateForwarderAddress: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  signer: ethers.Signer,
  sourceProvider: ethers.Provider,
  berachainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<string> {
  const [{ sendParam, sourceConfig }, { sourceGasFee, berachainGasFee }] =
    await Promise.all(
      sourceStargateTarget === StargateV2Target.STARGATE_BERACHAIN ?
        [
          getDepositFromBerachainSendParamAndSourceConfig(parameters, sandbox),
          estimateDepositFromBerachainFees(
            parameters,
            berachainProvider,
            sandbox,
          ),
        ]
      : [
          getDepositViaForwarderSendParamAndSourceConfig(
            sourceStargateTarget,
            parameters,
            berachainProvider,
            sandbox,
          ),
          estimateDepositViaForwarderFees(
            sourceStargateTarget,
            parameters,
            sourceProvider,
            berachainProvider,
            sandbox,
          ),
        ],
    );

  const nativeFee = sourceGasFee + berachainGasFee;
  let gasLimit: number = StargateV2Config.settings.swapSourceGasLimit;
  const oft = IOFT__factory.connect(
    sourceConfig.stargateOFTAddress,
    berachainProvider,
  );

  try {
    // Estimate gas
    const estimatedGasLimit = await oft.send.estimateGas(
      sendParam,
      { nativeFee, lzTokenFee: 0 },
      parameters.wallet, // Refund address - extra gas (if any) is returned to this address
      {
        from: parameters.wallet,
        // Native gas to pay for the cross chain message fee
        value: nativeFee,
      },
    );
    // Add 20% buffer for safety
    gasLimit = Number(
      new BigNumber(estimatedGasLimit.toString())
        .times(new BigNumber(1.2))
        .toFixed(0),
    );
  } catch (error) {
    // ethers.js will perform the estimation at the block gas limit, which is much higher than the
    // gas actually needed by the tx. If the wallet does not have the funds to cover the tx at this
    // high gas limit then the RPC will throw an INSUFFICIENT_FUNDS error; however the wallet may
    // still have enough funds to successfully bridge at the actual gas limit. In this case simply
    // fall through and use the configured default gas limit. The wallet software in use should
    // still show if that limit is insufficient, which is only an issue for blockchains with
    // variable gas costs such as Arbitrum One
    if (!error.code && error.code !== 'INSUFFICIENT_FUNDS') {
      throw error;
    }
  }

  const response = await oft.send(
    sendParam,
    { nativeFee, lzTokenFee: 0 },
    parameters.wallet, // Refund address - extra gas (if any) is returned to this address
    {
      from: parameters.wallet,
      gasLimit,
      value: nativeFee,
    }, // Native gas to pay for the cross chain message fee
  );

  return response.hash;
}

/**
 * Estimate native gas fee needed to deposit USDC cross-chain into the Exchange
 */
export async function estimateDepositFees(
  sourceStargateTarget: StargateV2Target,
  parameters: {
    exchangeLayerZeroAdapterAddress?: string;
    stargateForwarderAddress: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  sourceProvider: ethers.Provider,
  berachainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<{
  sourceGasFee: bigint;
  berachainGasFee: bigint;
  quantityDeliveredInAssetUnits: bigint;
}> {
  if (sourceStargateTarget === StargateV2Target.STARGATE_BERACHAIN) {
    return estimateDepositFromBerachainFees(
      parameters,
      berachainProvider,
      sandbox,
    );
  }

  return estimateDepositViaForwarderFees(
    sourceStargateTarget,
    parameters,
    sourceProvider,
    berachainProvider,
    sandbox,
  );
}

export async function estimateDepositViaForwarderFees(
  sourceStargateTarget: StargateV2Target,
  parameters: {
    exchangeLayerZeroAdapterAddress?: string;
    stargateForwarderAddress: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  sourceProvider: ethers.Provider,
  berachainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<{
  sourceGasFee: bigint;
  berachainGasFee: bigint;
  quantityDeliveredInAssetUnits: bigint;
}> {
  const { sendParam, sourceConfig } =
    await getDepositViaForwarderSendParamAndSourceConfig(
      sourceStargateTarget,
      parameters,
      berachainProvider,
      sandbox,
    );

  const stargate = IOFT__factory.connect(
    sourceConfig.stargateOFTAddress,
    sourceProvider,
  );
  const [{ nativeFee: sourceGasFee }, [, , receipt]] = await Promise.all([
    stargate.quoteSend(sendParam, false, {
      from: parameters.wallet,
    }),
    stargate.quoteOFT(sendParam),
  ]);

  // Once we obtain the quantity delivered after slippage to Berachain, calculate
  // the quantity subsequently delivered to XCHAIN after any additional slippage
  const { berachainGasFee, quantityDeliveredInAssetUnits } =
    await estimateDepositFromBerachainFees(
      { ...parameters, quantityInAssetUnits: receipt.amountReceivedLD },
      berachainProvider,
      sandbox,
    );

  return {
    sourceGasFee,
    berachainGasFee,
    quantityDeliveredInAssetUnits,
  };
}

/**
 * Estimate native gas fee needed to deposit USDC cross-chain into the Exchange
 * from Berachain using the Kuma OFT pathway
 */
export async function estimateDepositFromBerachainFees(
  parameters: {
    exchangeLayerZeroAdapterAddress?: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  berachainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<{
  sourceGasFee: bigint;
  berachainGasFee: bigint;
  quantityDeliveredInAssetUnits: bigint;
}> {
  const { sendParam, sourceConfig } =
    await getDepositFromBerachainSendParamAndSourceConfig(parameters, sandbox);

  const oft = IOFT__factory.connect(
    sourceConfig.stargateOFTAddress,
    berachainProvider,
  );
  const [[berachainGasFee], [, , receipt]] = await Promise.all([
    oft.quoteSend(sendParam, false, {
      from: parameters.wallet,
    }),
    oft.quoteOFT(sendParam),
  ]);

  return {
    sourceGasFee: 0n,
    berachainGasFee,
    quantityDeliveredInAssetUnits: receipt.amountReceivedLD,
  };
}

function getSourceAndDestinationConfigs(
  sourceTarget: StargateV2Target,
  destinationTarget: StargateV2Target,
  sandbox: boolean,
) {
  const sourceConfig =
    sandbox ?
      StargateV2Config.testnet[sourceTarget]
    : StargateV2Config.mainnet[sourceTarget];
  const destinationConfig =
    sandbox ?
      StargateV2Config.testnet[destinationTarget]
    : StargateV2Config.mainnet[destinationTarget];

  if (
    !sourceConfig ||
    !sourceConfig.isSupported ||
    !destinationConfig.isSupported
  ) {
    throw new Error(
      `Stargate deposits not supported from chain ${sourceConfig.target} ${sandbox ? 'testnet' : 'mainnet'} (Chain ID: ${String(sourceConfig.evmChainId)}) to chain ${destinationConfig.target} (Chain ID: ${String(destinationConfig.evmChainId)})`,
    );
  }

  return { sourceConfig, destinationConfig };
}

async function getDepositFromBerachainSendParamAndSourceConfig(
  parameters: {
    exchangeLayerZeroAdapterAddress?: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  sandbox: boolean,
) {
  const { sourceConfig, destinationConfig } = getSourceAndDestinationConfigs(
    StargateV2Target.STARGATE_BERACHAIN,
    StargateV2Target.XCHAIN_XCHAIN,
    sandbox,
  );

  const [{ stargateBridgeAdapterContractAddress }] =
    parameters.exchangeLayerZeroAdapterAddress ?
      [
        {
          stargateBridgeAdapterContractAddress:
            parameters.exchangeLayerZeroAdapterAddress,
        },
      ]
    : await getExchangeAddressAndChainFromApi();

  const sendParam = {
    dstEid: destinationConfig.layerZeroEndpointId, // Destination endpoint ID
    to: ethers.zeroPadValue(stargateBridgeAdapterContractAddress, 32), // Recipient address
    amountLD: parameters.quantityInAssetUnits, // Amount to send in local decimals
    minAmountLD: multiplyPips(
      parameters.quantityInAssetUnits,
      parameters.minimumWithdrawQuantityMultiplierInPips,
    ), // Minimum amount to send in local decimals
    extraOptions: '0x',
    composeMsg: ethers.AbiCoder.defaultAbiCoder().encode(
      ['uint32', 'address'],
      [sourceConfig.layerZeroEndpointId, parameters.wallet],
    ), // Additional options supplied by the caller to be used in the LayerZero message
    oftCmd: '0x', // The OFT command to be executed, unused in default OFT implementations
  };

  return { sendParam, sourceConfig };
}

async function getDepositViaForwarderSendParamAndSourceConfig(
  sourceStargateTarget: StargateV2Target,
  parameters: {
    stargateForwarderAddress: string;
    minimumWithdrawQuantityMultiplierInPips: bigint;
    quantityInAssetUnits: bigint;
    wallet: string;
  },
  berachainProvider: ethers.Provider,
  sandbox: boolean,
) {
  const { sourceConfig, destinationConfig: berachainConfig } =
    getSourceAndDestinationConfigs(
      sourceStargateTarget,
      StargateV2Target.STARGATE_BERACHAIN,
      sandbox,
    );

  // TODO Fetch stargateForwarderAddress from API

  const { berachainGasFee } = await estimateDepositFromBerachainFees(
    parameters,
    berachainProvider,
    sandbox,
  );
  // FIXME CJS dynamic import
  // FIXME Assumes native asset is same between chains
  const { Options } = await import('@layerzerolabs/lz-v2-utilities');
  const extraOptions = Options.newOptions()
    .addExecutorComposeOption(0, 350000, berachainGasFee)
    .toBytes();

  const sendParam = {
    dstEid: berachainConfig.layerZeroEndpointId, // Destination endpoint ID
    to: ethers.zeroPadValue(parameters.stargateForwarderAddress, 32), // Recipient address
    amountLD: parameters.quantityInAssetUnits, // Amount to send in local decimals
    minAmountLD: multiplyPips(
      parameters.quantityInAssetUnits,
      parameters.minimumWithdrawQuantityMultiplierInPips,
    ), // Minimum amount to send in local decimals
    extraOptions,
    composeMsg: ethers.AbiCoder.defaultAbiCoder().encode(
      ['uint8', 'tuple(address)'],
      [
        0, //  ComposeMessageType.DepositToXhain
        [
          parameters.wallet, // Destination wallet
        ],
      ],
    ),
    oftCmd: '0x', // The OFT command to be executed, unused in default OFT implementations
  };

  return { sendParam, sourceConfig };
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
  xchainProvider: ethers.Provider,
  berachainProvider: ethers.Provider,
  sandbox: boolean,
): Promise<{
  estimatedWithdrawQuantityInDecimal: string;
  minimumWithdrawQuantityInDecimal: string;
  willSucceed: boolean;
}> {
  const { layerZeroEndpointId: targetEndpointId } = decodeStargateV2Payload(
    parameters.payload,
  );

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
