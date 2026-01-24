'use client'

import { ReactNode } from 'react'
import AppContext from './AppContext'

interface SettingsProviderProps {
  context: { resume: string }
  children: ReactNode
}

export default function AppProvider({
  context,
  children
}: SettingsProviderProps) {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
