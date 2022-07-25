import React from 'react'

type DialogProps = {
  show: boolean,
  onClose: () => void,
  children: React.ReactNode
}

export function Dialog({
  show,
  onClose,
  children
}: DialogProps) {
  return (
    <>
      <div className={`dialog ${show ? 'show' : ''}`} data-testid="dialog">
        {children}
      </div>
      <div className={`backdrop ${show ? 'show' : ''}`} data-testid="backdrop" onClick={onClose} />
    </>
  )
}
