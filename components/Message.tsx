import { prettyDate } from "../lib/formatters"
import { Prisma } from "@prisma/client"

const statusLabel = {
  delivered: "Delivered",
  "permanent-failure": "Failed to send",
  "temporary-failure": "Failed to send",
  "technical-failure": "Failed to send",
}

type MessageWithUser = Prisma.MessageGetPayload<{
  include: { user: true }
}>

const Metadata = ({ message }: { message: MessageWithUser }) => (
  <div className="conversation__metadata">
    {message.direction === "INBOUND" ? (
      <p className="lbh-body-xs">
        Received {message.completedAt && prettyDate(message.completedAt)}
      </p>
    ) : (
      <>
        <p className="lbh-body-xs">
          Sent {prettyDate(message.createdAt)} by{" "}
          <strong>{message.user.name}</strong>
        </p>
        {message.completedAt && (
          <p className="lbh-body-xs">
            {statusLabel[message.status]}{" "}
            {message.completedAt && prettyDate(message.completedAt)}
          </p>
        )}
      </>
    )}
  </div>
)

interface Props {
  message: MessageWithUser
  openMessage: number | boolean
  setOpenMessage: (number) => void
}

const Message = ({
  message,
  openMessage,
  setOpenMessage,
}: Props): React.ReactElement => {
  return (
    <li
      className={`lbh-body conversation__message ${
        message.direction === "INBOUND" && "conversation__message--inbound"
      }`}
    >
      <span className="govuk-visually-hidden">
        {message.direction === "INBOUND" ? "Received:" : "Sent:"}
      </span>

      <p className="lbh-body">{message.body}</p>

      <details
        className="conversation__details"
        open={openMessage === message.id}
      >
        <summary
          className="conversation__summary"
          onClick={e => {
            e.preventDefault()
            setOpenMessage(openMessage === message.id ? false : message.id)
          }}
        >
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L8.5 8L15 2" stroke="white" strokeWidth="2" />
          </svg>

          <span className="govuk-visually-hidden">Details</span>
        </summary>
        <Metadata message={message} />
      </details>

      <svg
        className="conversation__speech-bubble-root"
        width="12"
        height="12"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {message.direction === "INBOUND" ? (
          <path d="M0 21V0.5H20.5L0 21Z" fill="white" />
        ) : (
          <path d="M20.5 21V0.5H0L20.5 21Z" fill="#00664F" />
        )}
      </svg>
    </li>
  )
}

export default Message
