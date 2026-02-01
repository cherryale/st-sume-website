'use client'

import { ReactNode } from 'react'
import AppContext, { AppContextProps } from './AppContext'

interface AppProviderProps {
  context: AppContextProps
  children: ReactNode
}

export default function AppProvider({ context, children }: AppProviderProps) {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
