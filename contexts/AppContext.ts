'use client'
import { createContext } from 'react'

const AppContext = createContext<{
  resume: string
  social?: {
    twitter?: string | undefined
    linkedin?: string | undefined
    github?: string | undefined
  }
} | null>(null)
export default AppContext
