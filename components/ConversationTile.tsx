import parsePhoneNumber from "libphonenumber-js"
import NavLink from "./NavLink"

interface Props {
    id: number
    number: string
    preview?: string
}

const ConversationTile = ({ id, number, preview }: Props): React.ReactElement =>
    <li className="conversation-list__item">
        <NavLink href={`/conversations/${id}`}>
            {parsePhoneNumber(number, "GB").formatNational()}
            <span className="lbh-body-xs conversation-list__last-message">
                {preview || "No messages"}
            </span>
        </NavLink>
    </li>

export default ConversationTile