import React from 'react'

type TopicsProps = {
  children: React.ReactNode
}

export function Topics({ children }: TopicsProps) {
  return (
    <ul className="topics">
      {children}
    </ul>
  )
}
