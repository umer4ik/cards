import React from 'react'
import { Link } from 'react-router-dom'

type BottomSectionProps = {
  children: React.ReactNode
}

export function BottomSection({ children }: BottomSectionProps) {
  return (
    <div className="bottom-section">
      <div className="action-buttons">
        {children}
      </div>
      <Link to="/topics" className="link-to-topics" data-testid="link-to-topics">Edit topics</Link>
    </div>
  )
}
