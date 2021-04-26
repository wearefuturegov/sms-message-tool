import { prettyPhone } from "../lib/formatters"
import NavLink from "./NavLink"

interface Props {
  id: number
  number: string
  nickname?: string
  preview?: string
}

const ConversationTile = ({
  id,
  number,
  nickname,
  preview,
}: Props): React.ReactElement => {
  const maxLength = 24

  let snippet =
    preview?.length > maxLength ? `${preview.slice(0, maxLength)}...` : preview

  return (
    <li className="conversation-list__item">
      <NavLink href={`/conversations/${id}`}>
        <>{nickname || prettyPhone(number)}</>
        <span className="lbh-body-xs conversation-list__last-message">
          {snippet || "No messages"}
        </span>
      </NavLink>
    </li>
  )
}

export default ConversationTile
