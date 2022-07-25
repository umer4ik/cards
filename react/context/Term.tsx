import React, { useContext } from 'react'
import { Term as TermC } from '../components/Term'
import { AppContext } from './AppContext'

export function Term() {
  const { term } = useContext(AppContext)
  return <TermC term={term} />
}
