import React from 'react'
import { createRoot, Root as RootInterface } from 'react-dom/client'
import { checkIfEl, checkIfNonNull } from '../lib/utils'
import { Root } from './Root'

const rootElement = document.getElementById('app')
let root: RootInterface | null = null

export function render() {
  checkIfEl(rootElement)
  if (!root) {
    root = createRoot(rootElement)
  }
  root.render(<Root store="context" />)
}

export function destroy() {
  checkIfNonNull(root)
  root.unmount()
  root = null
}
