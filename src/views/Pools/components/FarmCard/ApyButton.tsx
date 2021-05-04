import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from '@pancakeswap-libs/uikit'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, cakePrice, apy }) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal lpLabel={lpLabel} cakePrice={cakePrice} apy={apy}  />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text"  ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButton
