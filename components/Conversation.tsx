import { useState, useEffect, useRef } from "react"
import Message from "./Message"

const Index = ({ data, size, setSize }): React.ReactElement => {
  const [openMessage, setOpenMessage] = useState(false)
  const [atLatest, setAtLatest] = useState(true)

  const ref = useRef(null)
  const intersectorRef = useRef(null)

  const goToLatest = () =>
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" })

  // show and hide the "scroll to latest" button
  useEffect(() => {
    const scroll = new IntersectionObserver(
      entries => setAtLatest(!entries[0].isIntersecting),
      {
        root: ref.current,
      }
    )
    scroll.observe(intersectorRef.current)
    return () => scroll.disconnect()
  }, [])

  // scroll to latest messages when loading
  useEffect(() => {
    ref.current.scrollTo({ top: ref.current.scrollHeight })
  }, [])

  return (
    <div className="conversation-holder">
      <div className="conversation" ref={ref}>
        <div ref={intersectorRef}>
          {data[data.length - 1].nextCursor ? (
            <button
              className="govuk-button lbh-button govuk-button--secondary lbh-button--secondary conversation__load-more"
              onClick={() => setSize(size + 1)}
              ref={intersectorRef}
            >
              Load older messages
            </button>
          ) : (
            <p className="lbh-body-xs conversation__no-older">
              Showing oldest messages
            </p>
          )}
        </div>

        <ul className="conversation__inner">
          {data?.map(page =>
            page?.messages?.map(message => (
              <Message
                key={message.id}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
                message={message}
              />
            ))
          )}
        </ul>
      </div>

      {!atLatest && (
        <button
          className="govuk-button lbh-button conversation-holder__scroll-to-end"
          onClick={goToLatest}
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
          <span className="govuk-visually-hidden">Go to latest messages</span>
        </button>
      )}
    </div>
  )
}

export default Index
