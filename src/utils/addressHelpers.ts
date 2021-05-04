import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  // const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
