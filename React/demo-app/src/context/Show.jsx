import React from 'react'
import CompA from './CompA'
import GlobalContextProvider from './GlobalContextProvider'
const Show = () => {
  return (
    <GlobalContextProvider>
      <CompA />

    </GlobalContextProvider>
  )
}

export default Show
