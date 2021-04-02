import { useRouter } from "next/router"
import Link from "next/link"

const NewConversationLink = () => {
  const router = useRouter()
  return (
    <Link
      href={{
        pathname: router.asPath,
        query: { new_conversation: true },
      }}
    >
      <a className="lbh-body lbh-link lbh-link--no-visited-state new-conversation-link">
        New conversation
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="7" width="1" height="15" fill="#025EA6" />
          <rect
            x="15"
            y="7"
            width="1"
            height="15"
            transform="rotate(90 15 7)"
            fill="#025EA6"
          />
        </svg>
      </a>
    </Link>
  )
}

export default NewConversationLink
