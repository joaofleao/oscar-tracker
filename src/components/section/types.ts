import React from 'react'

export interface SectionProps {
  children: React.ReactNode
  title: string

  button?: {
    title: string
    action: () => void
  }
}
