'use client'
// Do any session inside another seprate file

import { SessionProvider } from 'next-auth/react'

export const Provider = ({children}) => {
  return(
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}