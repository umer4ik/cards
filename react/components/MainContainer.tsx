import React from 'react'

type MainContainerProps = {
  children: React.ReactNode
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="main-container">
      {children}
    </div>
  )
}
