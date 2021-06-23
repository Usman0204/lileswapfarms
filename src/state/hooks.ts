import BigNumber from 'bignumber.js'
import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { provider } from 'web3-core';
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const ZERO = new BigNumber(0)
const ZEROPOINT1 = new BigNumber(0.01)
const SIXSIXTY = new BigNumber(660)



export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}
export const usePriceEthBusd = (): BigNumber => {
  // const pid = 14 // ETH-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  return ZEROPOINT1

}
// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const farms = useSelector((state: State) => state.pools.data)
  return farms
}

export const usePoolFromPid = (pid): Pool => {
  const farm = useSelector((state: State) => state.pools.data.find((f) => f.pid === pid))
  return farm
}

export const usePoolFromSymbol = (lpSymbol: string): Pool => {
  const farm = useSelector((state: State) => state.pools.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const usePoolUser = (pid) => {
  const farm = usePoolFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// export const usePools = (account): Pool[] => {
//   const { fastRefresh } = useRefresh()
//   const dispatch = useDispatch()
//   useEffect(() => {
//     if (account) {
//       dispatch(fetchPoolsUserDataAsync(account))
//     }
//   }, [account, dispatch, fastRefresh])

//   const pools = useSelector((state: State) => state.pools.data)
//   return pools
// }

// export const usePoolFromPid = (sousId): Pool => {
//   const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
//   return pool
// }

// Prices

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 1 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
  // return SIXSIXTY
}

export const usePriceCakeBusd = (): BigNumber => {
  const pid = 0// LILE-BNB LP
  const bnbPriceUSD = usePriceBnbBusd()
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZEROPOINT1
  // return ZEROPOINT1

  // const pid = 2 // LILE-BUSD LP
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const useTotalValue = () => {
  const api = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BNB&tsyms=USD&api_key=2854a5c3399c288c9183d204216c9c5d706e7d55bb64cd5a67eda10db684a574';
  let farms = useFarms()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const farmsLP = usePools(account)
  const bnbPrice = usePriceBnbBusd()
  const cakePrice = usePriceCakeBusd()
  const [data, setData] = useState<any | null>(null)
  farms = farms.concat(farmsLP);
  let value = new BigNumber(0)
  let price = new BigNumber(1)
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (data && data.ETH && data.BNB && data.BTC) {
      let tokenSymbol = "";
      if (farm.quoteTokenSymbol === "ETH") {
        tokenSymbol = "ETH"
      } else if (farm.quoteTokenSymbol === "BTCB") {
        tokenSymbol = "BTC"
      } else if (farm.quoteTokenSymbol === "WBNB") {
        tokenSymbol = "BNB"
      }
      price = data[`${tokenSymbol}`] ? new BigNumber(data[`${tokenSymbol}`].USD) : new BigNumber(1)
    }
    if (farm.lpTotalInQuoteToken) {
      let val
      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        val = bnbPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.LILE) {
        // val = cakePrice.times(farm.lpTotalInQuoteToken)
      } else {
        val = price.times(farm.lpTotalInQuoteToken)
      }

      if (val) {
        value = value.plus(val)
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const res: any = await response.json();

        setData(res);
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }
    fetchData();
  }, [setData])


  return value

}
