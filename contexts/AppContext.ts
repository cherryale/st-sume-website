'use client'
import { createContext } from 'react'
import { Image } from 'sanity'

export type AppContextProps = {
  title: string
  description: string
  resume: string
  thumbnail: Image
  social?: {
    twitter?: string | undefined
    linkedin?: string | undefined
    github?: string | undefined
  }
}

const AppContext = createContext<AppContextProps | null>(null)

export default AppContext
