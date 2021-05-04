import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { usePools, usePriceBnbBusd, usePriceCakeBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchPoolsUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  // const { account } = useWallet()
  const farmsLP = usePools(account)
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)

      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        // cakePriceInQuote * cakeRewardPerYear / lpTotalInQuoteToken
        const apy = cakePriceVsBNB.times(cakeRewardPerYear)

        // if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
        //   apy = cakePriceVsBNB.times(cakeRewardPerYear).times(bnbPrice)
        // } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
        //   apy = cakePrice.div(ethPriceUsd).times(cakeRewardPerYear)
        // } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        //   apy = cakeRewardPerYear
        // } else if (farm.dual) {
        //   const cakeApy =
        //     farm && cakePriceVsBNB.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR)
        //   const dualApy =
        //     new BigNumber(farm.tokenPriceVsQuote)
        //       .times(farm.dual.rewardPerBlock)
        //       .times(BLOCKS_PER_YEAR)

        //   apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        // }

        console.log('farm amount :::', farm)
        // const totalRewardPricePerYear = cakePrice.times(CAKE_PER_BLOCK).times(BLOCKS_PER_YEAR)
        // const totalStakingTokenInPool = new BigNumber(1).times(farm.poolWeight)
        // let apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
        // apy = apy.isNaN() || !apy.isFinite() ? new BigNumber(0) : apy
        // console.log('apy::::', apy)
        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          account={account}
          provider={ethereum}
        />
      ))
    },
    [bnbPrice,farmsLP, account, cakePrice, ethereum],
  )

  return (
    <Page>
      <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
        Stake tokens to earn L ́ile
      </Heading>
      <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(10000, 'Deposit Fee will be used to buyback L ́ile')}
      </Heading>
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
      <Image src="/images/LILE/lile_chest.jpg" alt="illustration" width={1352} height={587} responsive />
    </Page>
  )
}

export default Farms
