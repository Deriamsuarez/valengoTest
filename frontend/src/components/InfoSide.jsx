import { Stack } from '@mui/material'
import React from 'react'
import OrderBook from './OrderBook'
import InstrumentData from './InstrumentData'

const InfoSide = ({orderBookData, instrumentData}) => {
  return (
    <Stack> 
        <OrderBook orderBookData={orderBookData} />
        {/* <InstrumentData instrumentData={instrumentData} /> */}
    </Stack>
  )
}

export default InfoSide