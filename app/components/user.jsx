"use client"

import { useSession } from "next-auth/react"

function User() {
    const { data: session} = useSession()
  return (
    <div>
        {JSON.stringify(session)}
    </div>
  )
}
 
export default User

// React context is available at the server means use
// use "use context"