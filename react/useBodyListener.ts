import { useEffect } from 'react'

export const useBodyListener = (type: 'keydown', listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    document.body.addEventListener(type, listener)
    return () => document.body.removeEventListener(type, listener)
  })
}
