import { FarmConfig, QuoteToken } from './types'
import contracts from './contracts'

const pools: FarmConfig[] = [

  {
    pid: 3,
    risk: 5,
    lpSymbol: 'LILE',
    lpAddresses: {
      97: '',
      56: '0xD77e75C371b277B760b49B62406b24E734cB9500',
    },
    tokenSymbol: 'LILE',
    tokenAddresses: {
      97: '',
      56: '0xD77e75C371b277B760b49B62406b24E734cB9500',
    },
    quoteTokenSymbol: QuoteToken.LILE,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid: 4,
    risk: 5,
    lpSymbol: 'BUSD',
    lpAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      97: '',
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 5,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BTCB,
    quoteTokenAdresses: contracts.btcb,
  },
  {
    pid: 6,
    risk: 5,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAdresses: contracts.eth,
  },
  {
    pid: 7,
    risk: 5,
    lpSymbol: 'USDT',
    lpAddresses: {
      97: '',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059fF775485246999027B3197955',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 8,
    risk: 5,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.WBNB,
    quoteTokenAdresses: contracts.wbnb,
  }
  // {
  //   sousId: 3,
  //   tokenName: 'LILE',
  //   stakingTokenName: QuoteToken.LILE,
  //   stakingTokenAddress: '0xD77e75C371b277B760b49B62406b24E734cB9500',
  //   contractAddress: {
  //     97: '',
  //     56: '0xf4d0fC0180AD24cC6322EeffF948c643466cB5C3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'http://ec2-34-222-57-153.us-west-2.compute.amazonaws.com:3000/',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // },
  // {
  //   sousId: 4,
  //   tokenName: 'LILE',
  //   stakingTokenName: QuoteToken.USDT,
  //   stakingTokenAddress: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  //   contractAddress: {
  //     97: '',
  //     56: '0xf4d0fC0180AD24cC6322EeffF948c643466cB5C3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: '',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 999,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // },
  // {
  //   sousId: 5,
  //   tokenName: 'LILE',
  //   stakingTokenName: QuoteToken.BTCB,
  //   stakingTokenAddress: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  //   contractAddress: {
  //     97: '',
  //     56: '0xf4d0fC0180AD24cC6322EeffF948c643466cB5C3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: '',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 999,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // },
  // {
  //   sousId: 6,
  //   tokenName: 'LILE',
  //   stakingTokenName: QuoteToken.ETH,
  //   stakingTokenAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  //   contractAddress: {
  //     97: '',
  //     56: '0xf4d0fC0180AD24cC6322EeffF948c643466cB5C3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: '',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 999,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // },
  // {
  //   sousId: 7,
  //   tokenName: 'LILE',
  //   stakingTokenName: QuoteToken.USDT,
  //   stakingTokenAddress: '0x55d398326f99059fF775485246999027B3197955',
  //   contractAddress: {
  //     97: '',
  //     56: '0xf4d0fC0180AD24cC6322EeffF948c643466cB5C3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: '',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 999,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // }
]

export default pools
