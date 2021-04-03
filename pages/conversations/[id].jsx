import Link from "next/link"
import useSWR, { mutate } from "swr"
import { useRouter } from "next/router"
import { prettyDate, prettyPhone } from "../../lib/formatters"
import Head from "next/head"

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

  // fix for: https://github.com/vercel/next.js/discussions/11484
  let id
  id = router.query.id
  if (!id && typeof window !== "undefined") {
    id = window.location.pathname.split("/").pop()
  }

  const { data: conversation } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`,
    {
      refreshInterval: 30000,
    }
  )

  return (
    <DashboardLayout>
      {conversation && (
        <>
          <Head>
            <title>
              {conversation.nickname || prettyPhone(conversation.number)} | SMS
              | Hackney Council
            </title>
          </Head>

          <header className="conversation-header">
            <h1 className="lbh-heading-h4 conversation-header__headline">
              {conversation.nickname || prettyPhone(conversation.number)}
            </h1>
            <p className="lbh-body-xs conversation-header__caption">
              {conversation.nickname &&
                `${prettyPhone(conversation.number)} | `}

              {conversation?.messages[0] ? (
                <>
                  Last message{" "}
                  {prettyDate(conversation?.messages[0]?.createdAt)} |{" "}
                </>
              ) : (
                <>Contact created {prettyDate(conversation?.createdAt)} | </>
              )}

              <Link
                href={{
                  pathname: router.asPath,
                  query: { edit: true },
                }}
              >
                <a className="lbh-link lbh-link--no-visited-state">
                  Change details
                </a>
              </Link>
            </p>
          </header>

          {conversation.messages ? (
            <Conversation conversation={conversation} />
          ) : (
            <p>Send a message</p>
          )}
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
        </>
      )}
      <MessageForm onSubmit={values => handleSubmit(conversation.id, values)} />
    </DashboardLayout>
  )
}

export default Index
