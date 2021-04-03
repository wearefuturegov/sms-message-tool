import { useState } from "react"
import useSWR from "swr"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import Link from "next/link"

import ConversationTile from "./ConversationTile"
import Dialog from "./Dialog"
import ContactForm from "./ContactForm"
import Header from "./Header"
import SearchForm from "./SearchForm"
import NewContactLink from "./NewContactLink"

const handleSubmit = async number => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/`, {
    method: "POST",
    body: JSON.stringify({
      number,
    }),
  })
  const data = await res.json()
}

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
  const [query, setQuery] = useState("")

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

            <SearchForm query={query} setQuery={setQuery} />

            <ul className="conversation-list">
              <li className="lbh-heading-h6">
                Recent conversations
                <ul className="conversation-list__sub-list">
                  {data?.conversations &&
                    data.conversations.map(conversation => (
                      <ConversationTile
                        id={conversation.contact.id}
                        key={conversation.contact.id}
                        nickname={conversation.contact.nickname}
                        number={conversation.contact.number}
                        preview={conversation.body}
                      />
                    ))}
                </ul>
              </li>

              <li className="lbh-heading-h6">
                Never messaged
                <ul className="conversation-list__sub-list">
                  {data?.neverMessaged &&
                    data.neverMessaged.map(contact => (
                      <ConversationTile
                        id={contact.id}
                        key={contact.id}
                        nickname={contact.nickname}
                        number={contact.number}
                      />
                    ))}
                </ul>
              </li>
            </ul>
          </nav>
          <div className="app-layout__right">{children}</div>

          <Dialog
            title="New contact"
            isOpen={!!router.query.new_conversation}
            onDismiss={() => router.back()}
          >
            <ContactForm onSubmit={values => handleSubmit(values.number)} />
          </Dialog>
        </main>
      </div>
    )

  if (!session && !loading) return router.push("/api/auth/signin")

  return <p>Loading...</p>
}

export default DashboardLayout
