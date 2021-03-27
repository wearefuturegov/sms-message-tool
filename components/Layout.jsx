import React from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/client"

const Layout = ({ children }) => {
  const [session, loading] = useSession()

  if (session) {
    return (
      <>
        <p>
          You are logged in as {session.user.email || "Unknown email"}
          <button onClick={() => signOut()}>Log out</button>
        </p>
        {children}
      </>
    )
  }

  return (
    <>
      <p>
        <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </p>
      {children}
    </>
  )
}

export default Layout
