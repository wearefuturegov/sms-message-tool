import useSWR, { mutate } from "swr"
import { useSession } from "next-auth/client"
import { Router, useRouter } from "next/router"
import Link from "next/link"

import ConversationTile from "./ConversationTile"
import Dialog from "./Dialog"
import ContactForm from "./ContactForm"
import Header from "./Header"
import SearchForm from "./SearchForm"
import NewContactLink from "./NewContactLink"
import ConversationNav from "./ConversationNav"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactChild
}): React.ReactElement | Promise<boolean> => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`,
    {
      refreshInterval: 30000,
    }
  )

  const router = useRouter()
  const [session, loading] = useSession()

  const handleSubmit = async ({ number, nickname }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/`,
      {
        method: "POST",
        body: JSON.stringify({
          number,
          nickname,
        }),
      }
    )
    const data = await res.json()
    mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`)
    router.push(`/conversations/${data.id}`)
  }

  if (session)
    return (
      <div className="app-layout">
        <Header />
        <main
          id="main-content"
          role="main"
          className="lbh-main-wrapper lbh-container app-layout__inner"
        >
          <nav className="app-layout__left">
            <NewContactLink />
            <ConversationNav
              conversations={data?.conversations}
              neverMessaged={data?.neverMessaged}
            />
          </nav>
          <div className="app-layout__right">{children}</div>

          <Dialog
            title="New contact"
            isOpen={!!router.query.new_conversation}
            onDismiss={() => router.back()}
          >
            <ContactForm onSubmit={handleSubmit} />
          </Dialog>
        </main>
      </div>
    )

  if (!session && !loading) return router.push("/api/auth/signin")

  return (
    <>
      <Header />
      <main
        id="main-content"
        role="main"
        className="lbh-main-wrapper lbh-container"
      >
        <p>Loading...</p>
      </main>
    </>
  )
}

export default DashboardLayout
