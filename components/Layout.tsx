import React, { useState } from "react"
import useSWR from "swr"
import { useSession, signOut } from "next-auth/client"
import { useRouter } from "next/router"
import Link from "next/link"
import parsePhoneNumber from "libphonenumber-js"

import ConversationTile from "./ConversationTile"
import Dialog from "./Dialog"
import ContactForm from "./ContactForm"

import styles from "../styles/Layout.module.scss"
import SearchForm from "./SearchForm"
import Header from "./Header"
import { sign } from "node:crypto"

const handleSubmit = async (number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/`,
    {
      method: "POST",
      body: JSON.stringify({
        number,
      }),
    }
  )
  const data = await res.json()
}

const Layout = ({ children }: { children: React.ReactChild }): React.ReactElement | Promise<boolean> => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations`
  )

  const router = useRouter()
  const [session, loading] = useSession()
  const [query, setQuery] = useState("")

  if (data?.conversations && session)
    return (
      <>
        <div className={styles.app}>
          <Header session={session} signOut={signOut} />

          <div
            className={`lbh-main-wrapper lbh-container ${styles["app__content-area"]}`}
          >
            <nav>
              <Link href={{ query: { new_conversation: true } }}>
                <a className="lbh-body lbh-link lbh-link--no-visited-state">
                  New conversation
                </a>
              </Link>

              <SearchForm
                query={query}
                setQuery={setQuery}
              />

              <h2 className="lbh-heading-h5">Conversations</h2>
              <ul className="conversation-list">
                {data.conversations.map(conversation => (
                  <ConversationTile
                    id={conversation.contact.id}
                    key={conversation.contact.id}
                    number={conversation.contact.number}
                    preview={conversation.body}
                  />
                ))}
              </ul>

              <h2 className="lbh-heading-h5">Never messaged</h2>
              <ul className="conversation-list">
                {data.neverMessaged.map(contact => (
                  <ConversationTile
                    id={contact.id}
                    key={contact.id}
                    number={contact.number}
                  />
                ))}
              </ul>

            </nav>
            <main
              id="main-content"
              role="main"
              className={styles["app__right-pane"]}
            >
              {children}
            </main>
          </div>
        </div>

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

export default Layout
