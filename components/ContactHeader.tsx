import Link from "next/link"
import { prettyDate, prettyPhone } from "../lib/formatters"
import { useRouter } from "next/router"
import { Prisma, Contact, Message } from "@prisma/client"

interface Props {
  contact: Contact
  messages: {
    messages: Message[]
  }
}

const ContactHeader = ({ contact, messages }: Props): React.ReactElement => {
  const router = useRouter()
  return (
    <header className="conversation-header">
      <h1 className="lbh-heading-h4 conversation-header__headline">
        {contact.nickname || prettyPhone(contact.number)}
      </h1>
      <p className="lbh-body-xs conversation-header__caption">
        {contact.nickname && `${prettyPhone(contact.number)} | `}

        {messages[0]?.messages?.length > 0 ? (
          <>
            Last messaged {prettyDate(messages[0]?.messages[0]?.createdAt)} |{" "}
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
          <a className="lbh-link lbh-link--no-visited-state">Change details</a>
        </Link>
      </p>
    </header>
  )
}

export default ContactHeader
