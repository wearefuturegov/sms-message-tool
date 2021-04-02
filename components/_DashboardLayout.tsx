import { useState } from "react"
import useSWR from "swr"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import Link from "next/link"
import parsePhoneNumber from "libphonenumber-js"

import ConversationTile from "./ConversationTile"
import Dialog from "./Dialog"
import ContactForm from "./ContactForm"

import SearchForm from "./SearchForm"
import NewConversationLink from "./NewConversationLink"

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

  if (data?.conversations && session)
    return (
      <>
        <nav>
          <NewConversationLink />

          <SearchForm query={query} setQuery={setQuery} />

          <h2 className="lbh-heading-h6">Recent conversations</h2>
          <ul className="conversation-list">
            {data.conversations.map(conversation => (
              <ConversationTile
                id={conversation.contact.id}
                key={conversation.contact.id}
                nickname={conversation.contact.nickname}
                number={conversation.contact.number}
                preview={conversation.body}
              />
            ))}
          </ul>

          <h2 className="lbh-heading-h6">Never messaged</h2>
          <ul className="conversation-list">
            {data.neverMessaged.map(contact => (
              <ConversationTile
                id={contact.id}
                key={contact.id}
                nickname={contact.nickname}
                number={contact.number}
              />
            ))}
          </ul>
        </nav>
        <div>{children}</div>

        <Dialog
          title="New contact"
          isOpen={!!router.query.new_conversation}
          onDismiss={() => router.back()}
        >
          <ContactForm onSubmit={values => handleSubmit(values.number)} />
        </Dialog>
      </>
    )

  if (!session && !loading) return router.push("/api/auth/signin")

  return <p className="lbh-body">Loading...</p>
}

export default DashboardLayout
