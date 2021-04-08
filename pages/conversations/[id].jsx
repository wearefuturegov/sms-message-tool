import Link from "next/link"
import useSWR, { mutate, useSWRInfinite } from "swr"
import { useRouter } from "next/router"
import { prettyDate, prettyPhone } from "../../lib/formatters"
import Head from "next/head"

import DashboardLayout from "../../components/_DashboardLayout"
import MessageForm from "../../components/MessageForm"
import Conversation from "../../components/Conversation"
import Message from "../../components/Message"
import ContactForm from "../../components/ContactForm"
import Dialog from "../../components/Dialog"

const ConversationPage = () => {
  const router = useRouter()

  // fix for: https://github.com/vercel/next.js/discussions/11484
  let id
  id = router.query.id
  if (!id && typeof window !== "undefined") {
    id = window.location.pathname.split("/").pop()
  }

  // get contact
  const { data: contact } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${id}`
  )

  // get messages
  const {
    data: messages,
    size,
    setSize,
    mutate: mutateMessages,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // last page
      if (previousPageData && !previousPageData.messages) return null

      // first page
      if (pageIndex === 0)
        return `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`

      // every other page
      return previousPageData.nextCursor
    },
    {
      refreshInterval: 30000,
    }
  )

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
    mutateMessages()
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
    mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${id}`)
    mutate(`${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`)
    router.back()
  }

  return (
    <>
      {contact && messages ? (
        <>
          <Head>
            <title>
              {contact.nickname || prettyPhone(contact.number)} | SMS | Hackney
              Council
            </title>
          </Head>

          <header className="conversation-header">
            <h1 className="lbh-heading-h4 conversation-header__headline">
              {contact.nickname || prettyPhone(contact.number)}
            </h1>
            <p className="lbh-body-xs conversation-header__caption">
              {contact.nickname && `${prettyPhone(contact.number)} | `}

              {messages[0]?.messages?.length > 0 ? (
                <>
                  Last messaged{" "}
                  {prettyDate(messages[0]?.messages[0]?.createdAt)} |{" "}
                </>
              ) : (
                "Never messaged | "
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

          {messages[0]?.messages?.length !== 0 ? (
            <Conversation data={messages} size={size} setSize={setSize} />
          ) : (
            <div className="conversation-holder conversation-holder--no-messages">
              <p className="lbh-body-xs conversation__no-older">No messages</p>
            </div>
          )}

          <Dialog
            title="Edit contact"
            isOpen={!!router.query.edit}
            onDismiss={() => router.back()}
          >
            <ContactForm
              initialValues={contact}
              onSubmit={values => handleContactUpdate(contact.id, values)}
            />

            <p>
              <code>{JSON.stringify(contact?.metadata)}</code>
            </p>
            <p>
              <a
                className="govuk-link lbh-link lbh-link--no-visited-state"
                href={`https://social-care-service-staging.hackney.gov.uk/people/${contact?.metadata.mosaicId}`}
              >
                See on case recording app
              </a>
            </p>
          </Dialog>
        </>
      ) : (
        <>
          <div className="conversation-header conversation-header--skeleton">
            <div></div>
            <div></div>
          </div>
          <div className="conversation-holder"></div>
        </>
      )}
      <MessageForm onSubmit={values => handleSubmit(contact.id, values)} />
    </>
  )
}

ConversationPage.Layout = DashboardLayout

export default ConversationPage
