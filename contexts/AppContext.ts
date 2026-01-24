'use client'
import { createContext } from 'react'

const AppContext = createContext<{ resume: string } | null>(null)
export default AppContext
