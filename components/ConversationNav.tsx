import { useState } from "react"
import SearchForm from "./SearchForm"
import ConversationTile from "./ConversationTile"

const ConversationNav = ({
  conversations,
  neverMessaged,
}): React.ReactElement => {
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = async values => {
    setSearching(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts?q=${values.query}`
    )
    setResults(await res.json())
  }

  const handleClear = async () => {
    setSearching(false)
    setResults([])
  }

  return (
    <>
      <SearchForm
        onSubmit={handleSearch}
        onClear={handleClear}
        searching={searching}
      />

      {searching ? (
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