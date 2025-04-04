import { BigNumber } from 'bignumber.js';

export const exchangeDecimals = 8;
export const oneInPips = BigInt(10 ** exchangeDecimals);
export const MAX_64_BIT_INT = BigInt('18446744073709551615');

export function absBigInt(a: bigint): bigint {
  return a < BigInt(0) ? -a : a;
}

export const assetUnitsToDecimal = function assetUnitsToDecimal(
  assetUnits: bigint,
  decimals: number,
): string {
  const bn = new BigNumber(assetUnits.toString());
  return bn.shiftedBy(decimals * -1).toFixed(exchangeDecimals);
};

export const assetUnitsToPip = function assetUnitsToPip(
  assetUnits: bigint,
  assetUnitDecimals = 18,
): bigint {
  const bn = new BigNumber(assetUnits.toString());
  return BigInt(bn.shiftedBy(exchangeDecimals - assetUnitDecimals).toFixed(0));
};

export const pipToAssetUnits = function pipToAssetUnits(
  pips: bigint,
  assetUnitDecimals = 18,
): bigint {
  const bn = new BigNumber(pips.toString());
  return BigInt(bn.shiftedBy(assetUnitDecimals - exchangeDecimals).toFixed(0));
};

export const decimalToPip = function decimalToPip(decimal: string): bigint {
  const bn = new BigNumber(decimal);
  return BigInt(
    bn
      .shiftedBy(exchangeDecimals)
      .integerValue(BigNumber.ROUND_DOWN)
      .toString(),
  );
};

export enum ROUNDING {
  Truncate = 0,
  RoundUp = 1,
  RoundDown = 2,
}

export function divideBigInt(
  dividend: bigint,
  divisor: bigint,
  rounding: ROUNDING = ROUNDING.Truncate,
): bigint {
  if (divisor < BigInt(0)) {
    throw new Error(
      `Division by negative numbers is not supported (got ${dividend.toString()}/${divisor.toString()})`,
    );
  }
  const result = dividend / divisor;

  if (
    rounding === ROUNDING.RoundUp &&
    dividend > BigInt(0) && // Truncation is the same as rounding up in negative numbers
    result * divisor !== dividend
  ) {
    return result + BigInt(1);
  }
  if (
    rounding === ROUNDING.RoundDown &&
    dividend < BigInt(0) && // Truncation is the same as rounding down in positive numbers
    result * divisor !== dividend
  ) {
    return result - BigInt(1);
  }
  return result;
}

export const dividePips = function dividePips(
  valueInPips: bigint,
  divisorInPips: bigint,
): bigint {
  if (divisorInPips <= BigInt(0)) {
    return BigInt(0);
  }
  return (valueInPips * oneInPips) / divisorInPips;
};

export const maxBigInt = function maxBigInt(a: bigint, b: bigint): bigint {
  if (a >= b) {
    return a;
  }
  return b;
};

export const minBigInt = function minBigInt(a: bigint, b: bigint): bigint {
  if (a <= b) {
    return a;
  }
  return b;
};

export const multiplyPips = function multiplyPips(
  pipValue1: bigint,
  pipValue2: bigint,
  roundUp = false,
): bigint {
  const pipValuesProduct = pipValue1 * pipValue2;
  if (roundUp && pipValuesProduct % oneInPips > 0) {
    return BigInt(1) + pipValuesProduct / oneInPips;
  }
  return pipValuesProduct / oneInPips;
};

export const pipToDecimal = function pipToDecimal(pips: bigint): string {
  return assetUnitsToDecimal(pips, exchangeDecimals);
};

export function squareRootBigInt(value: bigint): bigint {
  if (value < BigInt(0)) {
    throw new Error('Square root of negative numbers is not supported');
  }
  if (value === BigInt(0)) {
    return value;
  }
  if (value <= BigInt(3)) {
    return BigInt(1);
  }
  let z = value;
  let x = value / BigInt(2) + BigInt(1);
  while (x < z) {
    z = x;
    x = (value / x + x) / BigInt(2);
  }
  return z;
}
