import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
   {
    label: "Buy L ́ile",
    icon: 'NftIcon',
    href: 'https://exchange.lile.farm/#/swap?outputCurrency=0xD77e75C371b277B760b49B62406b24E734cB9500',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'http://exchange.lile.farm/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'http://exchange.lile.farm/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: `L'ile`,
        href: 'https://medium.com/@the_island/nfts-on-the-moon-on-an-island-in-the-sky-and-beyond-d854fd61d704',
      },
      {
        label: 'Roadmap',
        href: 'https://medium.com/@the_island/l-ile-roadmap-963e411ddc3b',
      },
      /*
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/LILE-finance/',
      },
      {
        label: 'AstroTools',
        href: 'https://app.astrotools.io/pancake-pair-explorer/0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
      },
      */
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/lilefarm/',
      },
      /*
      {
        label: 'Docs',
        href: 'https://goosedefi.gitbook.io/LILE-finance/',
      },
      {
        label: 'Blog',
        href: 'https://goosefinance.medium.com/',
      },
      */
    ],
  },
  /*
  {
    label: 'Partnerships/IFO',
    icon: 'GooseIcon',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSe7ycrw8Dq4C5Vjc9WNlRtTxEhFDB1Ny6jlAByZ2Y6qBo7SKg/viewform?usp=sf_link',
  },
  {
    label: 'Audit by Hacken',
    icon: 'AuditIcon',
    href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  },
  {
    label: 'Audit by CertiK',
    icon: 'AuditIcon',
    href: 'https://certik.org/projects/LILE-finance',
  },
  */
]

export default config
