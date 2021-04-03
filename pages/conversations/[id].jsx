import { useState } from "react"
import Link from "next/link"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { DateTime } from "luxon"
import parsePhoneNumber from "libphonenumber-js"

import DashboardLayout from "../../components/_DashboardLayout"
import MessageForm from "../../components/MessageForm"
import Conversation from "../../components/Conversation"
import Message from "../../components/Message"
import ContactForm from "../../components/ContactForm"
import Dialog from "../../components/Dialog"

const handleSubmit = async (id, values) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}/send`,
    {
      method: "POST",
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()
  mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`)
  mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`)
}

const handleContactUpdate = async (id, values) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()
  mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`)
  mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`)
}

const Index = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: conversation } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`,
    {
      refreshInterval: 30000,
    }
  )

  const [openMessage, setOpenMessage] = useState(false)

  if (conversation)
    return (
      <DashboardLayout>
        <header className="conversation-header">
          <h1 className="lbh-heading-h4 conversation-header__headline">
            {conversation.nickname || conversation.number}
          </h1>
          <p className="lbh-body-xs conversation-header__caption">
            {conversation.nickname &&
              `${parsePhoneNumber(
                conversation.number,
                "GB"
              ).formatNational()} | `}
            Last message recieved XX |{" "}
            <Link
              href={{
                pathname: router.asPath,
                query: { edit: true },
              }}
            >
              <a className="lbh-link lbh-link--no-visited-state">Change</a>
            </Link>
          </p>
        </header>

        {conversation.messages ? (
          <Conversation conversation={conversation} />
        ) : (
          <p>Send a message</p>
        )}
        <MessageForm
          onSubmit={values => handleSubmit(conversation.id, values)}
        />
        <Dialog
          title="Edit contact"
          isOpen={!!router.query.edit}
          onDismiss={() => router.back()}
        >
          <ContactForm
            initialValues={conversation}
            onSubmit={values => handleContactUpdate(conversation.id, values)}
          />
        </Dialog>
      </DashboardLayout>
    )

  return <p className="lbh-body">Loading...</p>
}

export default Index
