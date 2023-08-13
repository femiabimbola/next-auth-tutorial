'use client'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
// import { useEffect } from "react"

//  When you get property of something can't be read, ?

const dashboard = () => {
    const {data :session} = useSession()
    const router = useRouter();

    if(session?.status !== 'authenticated') return router.push('/login')

    // useEffect(() => {
    //   if(session?.status !== 'authenticated') { router.push('/login')}
    // })
  

  return (
    <div>
      <h1> Dashboard </h1>
      <p> Hi {session?.user?.email} </p>
      <button onClick ={() => signOut()}> Sign Out </button>
    </div>
  )
}

export default dashboard;
