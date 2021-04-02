import { useState } from "react"
import Link from "next/link"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { DateTime } from "luxon"
import parsePhoneNumber from "libphonenumber-js"

import DashboardLayout from "../../components/_DashboardLayout"
import MessageForm from "../../components/MessageForm"
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

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`,
    {
      refreshInterval: 30000,
    }
  )

  const [openMessage, setOpenMessage] = useState(false)

  let conversation = data

  if (conversation)
    return (
      <DashboardLayout>
        <header>
          {conversation.nickname ? (
            <>
              <h1 className="lbh-heading-h4">{conversation.nickname}</h1>
              <p className="lbh-body-xs">
                {parsePhoneNumber(conversation.number, "GB").formatNational()} |
                Last message recieved XX
              </p>
            </>
          ) : (
            <>
              <h1 className="lbh-heading-h4">
                {parsePhoneNumber(conversation.number, "GB").formatNational()}
              </h1>
              <p className="lbh-body-xs">Last message recieved XX</p>
            </>
          )}
          <Link
            href={{
              pathname: router.asPath,
              query: { edit: true },
            }}
          >
            Edit
          </Link>
        </header>

        {conversation.messages ? (
          <ul className="conversation">
            {conversation.messages.map(message => (
              <Message
                key={message.id}
                message={message}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
              />
            ))}
          </ul>
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
