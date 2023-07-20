// getServersession ia always on the server side

import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import User from "./components/user"

export default async function Home() {
  //  
  const session = await getServerSession(authOptions)

  return (
    <section>
      <h1> Home </h1>
      <h1> Server side rendering </h1>
      <pre> {JSON.stringify(session)} </pre>
      <h1> The client side</h1>
      <User />
    </section>
  )
}
