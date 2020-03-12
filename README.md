# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Clients](#clients)
    -   [PublicClient](#publicclient)
        -   [Parameters](#parameters)
        -   [ping](#ping)
        -   [getServerTime](#getservertime)
        -   [getExchangeInfo](#getexchangeinfo)
        -   [getAssets](#getassets)
        -   [getMarkets](#getmarkets)
        -   [getOrderBookLevel1](#getorderbooklevel1)
            -   [Parameters](#parameters-1)
        -   [getOrderBookLevel2](#getorderbooklevel2)
            -   [Parameters](#parameters-2)
        -   [getOrderBookLevel3](#getorderbooklevel3)
            -   [Parameters](#parameters-3)
        -   [getTickers](#gettickers)
            -   [Parameters](#parameters-4)
        -   [getCandles](#getcandles)
            -   [Parameters](#parameters-5)
        -   [getTrades](#gettrades)
            -   [Parameters](#parameters-6)
    -   [AuthenticatedClient](#authenticatedclient)
        -   [Parameters](#parameters-7)
        -   [getUser](#getuser)
            -   [Parameters](#parameters-8)
        -   [placeOrder](#placeorder)
            -   [Parameters](#parameters-9)
        -   [withdraw](#withdraw)
            -   [Parameters](#parameters-10)
-   [Enums](#enums)
    -   [CandleInterval](#candleinterval)
    -   [MarketStatus](#marketstatus)
        -   [inactive](#inactive)
        -   [cancelsOnly](#cancelsonly)
        -   [active](#active)
    -   [OrderSelfTradePrevention](#orderselftradeprevention)
        -   [decreaseAndCancel](#decreaseandcancel)
        -   [cancelOldest](#canceloldest)
        -   [cancelNewest](#cancelnewest)
        -   [cancelBoth](#cancelboth)
    -   [OrderSide](#orderside)
        -   [buy](#buy)
        -   [sell](#sell)
    -   [OrderStatus](#orderstatus)
        -   [active](#active-1)
        -   [open](#open)
        -   [partiallyFilled](#partiallyfilled)
        -   [filled](#filled)
        -   [cancelled](#cancelled)
        -   [rejected](#rejected)
        -   [expired](#expired)
        -   [testOnlyAccepted](#testonlyaccepted)
        -   [testOnlyRejected](#testonlyrejected)
    -   [OrderTimeInForce](#ordertimeinforce)
        -   [gtc](#gtc)
        -   [gtt](#gtt)
        -   [ioc](#ioc)
        -   [fok](#fok)
    -   [OrderType](#ordertype)
        -   [market](#market)
        -   [limit](#limit)
        -   [limitMaker](#limitmaker)
        -   [stopLoss](#stoploss)
        -   [stopLossLimit](#stoplosslimit)
        -   [takeProfit](#takeprofit)
        -   [takeProfitLimit](#takeprofitlimit)
    -   [UserStatus](#userstatus)
        -   [active](#active-2)
        -   [inactive](#inactive-1)
-   [Requests](#requests)
    -   [request.Order](#requestorder)
        -   [Properties](#properties)
    -   [request.Withdrawal](#requestwithdrawal)
        -   [Properties](#properties-1)
-   [Responses](#responses)
    -   [response.Asset](#responseasset)
        -   [Properties](#properties-2)
    -   [response.Candle](#responsecandle)
        -   [Properties](#properties-3)
    -   [response.ExchangeInfo](#responseexchangeinfo)
        -   [Properties](#properties-4)
    -   [response.Fill](#responsefill)
        -   [Properties](#properties-5)
    -   [response.Market](#responsemarket)
        -   [Properties](#properties-6)
    -   [response.Order](#responseorder)
        -   [Properties](#properties-7)
    -   [response.OrderBookLevel1](#responseorderbooklevel1)
        -   [Properties](#properties-8)
    -   [response.OrderBookLevel2](#responseorderbooklevel2)
        -   [Properties](#properties-9)
    -   [response.OrderBookLevel3](#responseorderbooklevel3)
        -   [Properties](#properties-10)
    -   [response.OrderBookOrder](#responseorderbookorder)
        -   [Properties](#properties-11)
    -   [response.OrderBookPriceLevel](#responseorderbookpricelevel)
        -   [Properties](#properties-12)
    -   [response.Ticker](#responseticker)
        -   [Properties](#properties-13)
    -   [response.Trade](#responsetrade)
        -   [Properties](#properties-14)
    -   [response.User](#responseuser)
        -   [Properties](#properties-15)
    -   [response.Withdrawal](#responsewithdrawal)
        -   [Properties](#properties-16)

## Clients




### PublicClient

Public API client

```typescript
import * as idex from '@idexio/idex-node';

// Edit the values below for your environment
const config = {
  baseURL: 'https://api-sandbox.idex.io/api/v1',
  apiKey:
    'MTQxMA==.MQ==.TlRnM01qSmtPVEF0TmpJNFpDMHhNV1ZoTFRrMU5HVXROMlJrTWpRMVpEUmlNRFU0',
};

const publicClient = new idex.PublicClient(config.baseURL);

// Optionally provide an API key to increase rate limits
const publicClientWithApiKey = new idex.PublicClient(
  config.baseURL,
  config.apiKey,
);
```

#### Parameters

-   `baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `apiKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Increases rate limits if provided
-   `baseUrl` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### ping

Test connectivity to the REST API

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;void>** 

#### getServerTime

Get the current server time

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Milliseconds since UNIX epoch

#### getExchangeInfo

Get basic exchange info

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.ExchangeInfo](#responseexchangeinfo)>** 

#### getAssets

Get comprehensive list of assets

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Asset](#responseasset)>>** 

#### getMarkets

Get currently listed markets

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Market](#responsemarket)>>** 

#### getOrderBookLevel1

Get current top bid/ask price levels of order book for a market

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.OrderBookLevel1](#responseorderbooklevel1)>** 

#### getOrderBookLevel2

Get current order book price levels for a market

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of bids and asks to return. Default is 50, 0 returns the entire book (optional, default `50`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.OrderBookLevel2](#responseorderbooklevel2)>** 

#### getOrderBookLevel3

Get current order book entries for a market

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number of bids and asks to return. Value of 0 returns the entire book (optional, default `50`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.OrderBookLevel3](#responseorderbooklevel3)>** 

#### getTickers

Get currently listed markets

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Base-quote pair e.g. 'IDEX-ETH', if provided limits ticker data to a single market

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Ticker](#responseticker)>>** 

#### getCandles

Get candle (OHLCV) data for a market

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Base-quote pair e.g. 'IDEX-ETH'
-   `interval` **[CandleInterval](#candleinterval)?** Time interval for data
-   `start` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Start period timestamp
-   `end` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** End period timestamp
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Max results to return from 1-1000 (optional, default `50`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Candle](#responsecandle)>>** 

#### getTrades

Get public trade history for a market

##### Parameters

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `start` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Starting timestamp (inclusive)
-   `end` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Ending timestamp (inclusive)
-   `limit` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Max results to return from 1-1000 (optional, default `50`)
-   `fromId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Fills created at the same timestamp or after fillId

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Trade](#responsetrade)>>** 

### AuthenticatedClient

Authenticated API client

```typescript
import * as idex from '@idexio/idex-node';

// Edit the values below for your environment
const config = {
  baseURL: 'https://api-sandbox.idex.io/api/v1',
  apiKey:
    'MTQxMA==.MQ==.TlRnM01qSmtPVEF0TmpJNFpDMHhNV1ZoTFRrMU5HVXROMlJrTWpRMVpEUmlNRFU0',
  apiSecret: 'axuh3ywgg854aq7m73oy6gnnpj5ar9a67szuw5lclbz77zqu0j',
  walletPrivateKey:
    '0x3141592653589793238462643383279502884197169399375105820974944592',
};

const authenticatedClient = new idex.AuthenticatedClient(
  config.baseURL,
  config.apiKey,
  config.apiSecret,
  new ethers.Wallet(config.walletPrivateKey),
);
```

#### Parameters

-   `baseURL` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `apiKey` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `apiSecret` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `wallet` **ethers.Wallet?** 

#### getUser

Get account details for the API key’s user

##### Parameters

-   `nonce` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** UUIDv1

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.User](#responseuser)>** 

#### placeOrder

Place a new order

##### Parameters

-   `order` **[request.Order](#requestorder)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.Order](#responseorder)>** 

#### withdraw

Create a new withdrawal

##### Parameters

-   `withdrawal` **[request.Withdrawal](#requestwithdrawal)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[response.Withdrawal](#responsewithdrawal)>** 

## Enums

Sets of named constants used as field types for several requests and responses


### CandleInterval

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### MarketStatus

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### inactive

No orders or cancels accepted

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cancelsOnly

Cancels accepted but not trades

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### active

Trades and cancels accepted

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### OrderSelfTradePrevention

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### decreaseAndCancel

When two orders from the same user cross, the smaller order will be canceled and the larger order size will be
decremented by the smaller order size. If the two orders are the same size, both will be canceled.

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cancelOldest

Cancel the older (maker) order in full

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cancelNewest

Cancel the newer (taker) order in full

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cancelBoth

Cancel both orders

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### OrderSide

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### buy

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### sell

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### OrderStatus

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### active

Stop order exists on the order book

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### open

Limit order exists on the order book

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### partiallyFilled

Limit order has completed fills but has remaining open quantity

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### filled

Limit order is completely filled and is no longer on the book; market order was filled

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### cancelled

Limit order was cancelled prior to execution completion but may be partially filled

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### rejected

Order was rejected by the trading engine

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### expired

GTT limit order expired prior to execution completion but may be partially filled

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### testOnlyAccepted

Order submitted to the test endpoint and accepted by the trading engine, not executed

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### testOnlyRejected

Order submitted to the test endpoint and rejected by validation or the trading engine, not executed

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### OrderTimeInForce

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### gtc

Good until cancelled (default)

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### gtt

Good until time

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### ioc

Immediate or cancel

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### fok

Fill or kill

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### OrderType

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### market

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### limit

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### limitMaker

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### stopLoss

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### stopLossLimit

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### takeProfit

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### takeProfitLimit

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### UserStatus

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### active

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### inactive

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## Requests




### request.Order

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `nonce` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** UUIDv1
-   `wallet` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `type` **[OrderType](#ordertype)** 
-   `side` **[OrderSide](#orderside)** 
-   `timeInForce` **[OrderTimeInForce](#ordertimeinforce)?** Defaults to gtc
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Order quantity in base terms, exclusive with quoteOrderQuantity
-   `quoteOrderQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Order quantity in quote terms, exclusive with quantity
-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Price in quote terms, optional for market orders
-   `clientOrderId` **ustring?** Client-supplied order id
-   `stopPrice` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Stop loss or take profit price, only if stop or take order
-   `selfTradePrevention` **[OrderSelfTradePrevention](#orderselftradeprevention)?** Stop loss or take profit price, only if stop or take order
-   `cancelAfter` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Timestamp after which a standing limit order will be automatically cancelled; gtt tif only

### request.Withdrawal

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `nonce` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** UUIDv1
-   `wallet` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `asset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Asset by symbol
-   `assetContractAddress` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Asset by contract address
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Withdrawal amount in asset terms, fees are taken from this value

## Responses




### response.Asset

Asset

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `id` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Internal id of the asset
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `symbol` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `contractAddress` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `decimals` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `depositMinimum` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `tradeMinimum` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `withdrawalMinimum` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### response.Candle

Candle

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timestamp of the datapoint
-   `open` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the first fill of the interval in quote terms
-   `high` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the highest fill of the interval in quote terms
-   `low` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the lowest fill of the interval in quote terms
-   `close` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the last fill of the interval in quote terms
-   `volume` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Total volume of the period in base terms

### response.ExchangeInfo

Basic exchange info

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `timeZone` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** UTC
-   `serverTime` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** UNIX epoch time in ms
-   `ethereumDepositContractAddress` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `ethUsdPrice` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `gasPrice` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** In gwei
-   `usdVolume24h` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 24h volume in USD
-   `makerFeeRate` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `takerFeeRate` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### response.Fill

Fill

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Executed price of fill in quote terms
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Executed quantity of fill in base terms
-   `fee` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Fee amount on fill
-   `feeAsset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Which token the fee was taken in
-   `gas` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### response.Market

Market

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `status` **[MarketStatus](#marketstatus)** 
-   `baseAsset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** e.g. 'IDEX'
-   `baseAssetPrecision` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `quoteAsset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** e.g. 'ETH'
-   `quoteAssetPrecision` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `makerFeeRate` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `takerFeeRate` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `orderTypes` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[OrderType](#ordertype)>** 
-   `tradeMinimum` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Minimum quantity in base terms

### response.Order

Order

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `orderId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** IDEX-assigned order id
-   `clientOrderId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** If provided by the client
-   `wallet` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `time` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Timestamp of initial trading engine processing
-   `status` **[OrderStatus](#orderstatus)** 
-   `rejectionCode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Error code capturing reason for rejection
-   `rejectionReason` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Human readable rejection error message
-   `type` **[OrderType](#ordertype)** 
-   `side` **[OrderSide](#orderside)** 
-   `timeInForce` **[OrderTimeInForce](#ordertimeinforce)?** Defaults to gtc
-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Price in quote terms, optional for market orders
-   `stopPrice` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Stop loss or take profit price, only if stop or take order
-   `selfTradePrevention` **[OrderSelfTradePrevention](#orderselftradeprevention)?** Stop loss or take profit price, only if stop or take order
-   `originalQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Original quantity specified by the order in base terms
-   `executedQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Amount of quantity that has been executed in base terms
-   `cumulativeQuoteQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Represents the cumulative amount of the quote that has been spent (with a BUY order) or received (with a SELL order). Historical orders will have a value &lt; 0 in this field indicating the data is not available at this time
-   `avgExecutionPrice` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** 
-   `fills` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.Fill](#responsefill)>** 

### response.OrderBookLevel1

OrderBookLevel1

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `bids` **\[[response.OrderBookPriceLevel](#responseorderbookpricelevel)]** 
-   `asks` **\[[response.OrderBookPriceLevel](#responseorderbookpricelevel)]** 

### response.OrderBookLevel2

OrderBookLevel2

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `bids` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.OrderBookPriceLevel](#responseorderbookpricelevel)>** 
-   `asks` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.OrderBookPriceLevel](#responseorderbookpricelevel)>** 

### response.OrderBookLevel3

OrderBookLevel3

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `bids` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.OrderBookOrder](#responseorderbookorder)>** 
-   `asks` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[response.OrderBookOrder](#responseorderbookorder)>** 

### response.OrderBookOrder

OrderBookOrder

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `orderId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### response.OrderBookPriceLevel

OrderBookPriceLevel

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `size` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `numOrders` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?** 

### response.Ticker

Ticker

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `market` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Base-quote pair e.g. 'IDEX-ETH'
-   `percentChange` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** % change from open to close
-   `baseVolume` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 24h volume in base terms
-   `quoteVolume` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 24h volume in quote terms
-   `last` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the last trade for the period in quote terms
-   `low` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Lowest traded price in the period in quote terms
-   `high` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Highest traded price in the period in quote terms
-   `bid` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Best bid price on the order book
-   `ask` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Best ask price on the order book
-   `open` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Price of the first trade for the period in quote terms
-   `close` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Same as last
-   `lastQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Quantity of the last period in base terms
-   `time` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Time when data was calculated, open and change is assumed to be trailing 24h
-   `numTrades` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Number of fills for the market in the period
-   `lastSequenceNumber` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Last trade sequence number for the market

### response.Trade

Trade

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `fillId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Internal ID of fill
-   `price` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Executed price of trade in quote terms
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Executed quantity of trade in base terms
-   `quoteQuantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Executed quantity of trade in quote terms
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Fill timestamp
-   `makerSide` **[OrderSide](#orderside)** Which side of the order the liquidity maker was on

### response.User

User

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `depositStatus` **[UserStatus](#userstatus)** 
-   `orderStatus` **[UserStatus](#userstatus)** 
-   `cancelStatus` **[UserStatus](#userstatus)** 
-   `withdrawStatus` **[UserStatus](#userstatus)** 
-   `kycTier` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `totalPortfolioValue` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Total value of all holdings of all wallets on the exchange, denominated in USD
-   `withdrawalLimit` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 24h withdrawal limit for the user account denominated in USD (non-negative integer or “unlimited”)
-   `withdrawalRemaining` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Remaining 24h withdrawal amount for the user account denominated in USD (non-negative integer or “unlimited”)

### response.Withdrawal

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `withdrawalId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** IDEX-issued withdrawal identifier
-   `asset` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Asset by symbol
-   `assetContractAddress` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Asset by contract address
-   `quantity` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Withdrawal amount in asset terms, fees are taken from this value
-   `fee` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Amount in asset deducted from withdrawal to cover gas
-   `gas` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Asset by symbol
-   `txId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Ethereum transaction hash, if available
-   `time` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Timestamp of receipt / processing

# Contracts

View the provided [contract](https://github.com/idexio/idex-node/blob/master/contracts/SignatureVerifier.sol) for a
corresponding Solidity implementation of order signature verification.
