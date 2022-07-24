import React from 'react'
import { App as ContextApp } from './context/App'

type RootProps = {
  store: 'context' | 'redux'
}

export function Root({ store }: RootProps) {
  if (store === 'context') {
    return (
      <ContextApp />
    )
  }
  return (
    <ContextApp />
  )
}
