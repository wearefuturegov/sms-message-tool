import { DateTime } from "luxon"

const statusLabel = {
  delivered: "Delivered",
  "permanent-failure": "Failed to send",
  "temporary-failure": "Failed to send",
  "technical-failure": "Failed to send",
}

interface Message {
  id: number
  body: string
  status: string
  completedAt: Date
  user: {
    name: string
  }
}

interface Props {
  message: Message
  openMessage: number | boolean
  setOpenMessage: (number) => void
}

const Message = ({
  message,
  openMessage,
  setOpenMessage,
}: Props): React.ReactElement => (
  <li
    className="lbh-body conversation__message"
    role="button"
    aria-expanded={openMessage === message.id}
    onClick={() => setOpenMessage(message.id)}
  >
    <p>{message.body}</p>
    {openMessage === message.id && (
      <>
        <p className="lbh-body-xs">
          {statusLabel[message.status]}{" "}
          {message.completedAt &&
            DateTime.fromISO(message.completedAt).toRelative()}
        </p>
        {message.user && (
          <p className="lbh-body-xs">Sent by {message.user.name}</p>
        )}
      </>
    )}
  </li>
)

export default Message