import { useState } from "react"
import SearchForm from "./SearchForm"
import ConversationTile from "./ConversationTile"

interface Props {
  conversations
  neverMessaged
}

const ConversationNav = ({
  conversations,
  neverMessaged,
}: Props): React.ReactElement => {
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = async values => {
    setSearching(true)
    setLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts?q=${values.query}`
    )
    setResults(await res.json())
    setLoading(false)
  }

  const handleClear = async () => {
    setSearching(false)
    setLoading(false)
    setResults([])
  }

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        onClear={handleClear}
        searching={searching}
      />

      {searching && !loading ? (
        <>
          {results.length > 0 ? (
            <div className="conversation-list">
              <h2 className="lbh-heading-h6">Search results</h2>
              <ul className="conversation-list__sub-list">
                {results.map(result => (
                  <ConversationTile
                    id={result.id}
                    key={result.id}
                    nickname={result.nickname}
                    number={result.number}
                    preview={result?.messages[0]?.body}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <p className="lbh-body-s no-results" role="alert">
              No results
            </p>
          )}
        </>
      ) : (
        <ul className="conversation-list">
          <li className="lbh-heading-h6">
            Recent conversations
            <ul className="conversation-list__sub-list">
              {conversations &&
                conversations.map(conversation => (
                  <ConversationTile
                    id={conversation.contact.id}
                    key={conversation.contact.id}
                    nickname={conversation.contact.nickname}
                    number={conversation.contact.number}
                    preview={conversation.body}
                  />
                ))}
            </ul>
          </li>

          <li className="lbh-heading-h6">
            Never messaged
            <ul className="conversation-list__sub-list">
              {neverMessaged &&
                neverMessaged.map(contact => (
                  <ConversationTile
                    id={contact.id}
                    key={contact.id}
                    nickname={contact.nickname}
                    number={contact.number}
                  />
                ))}
            </ul>
          </li>
        </ul>
      )}
    </>
  )
}

export default ConversationNav
