import { useState, useEffect, useRef } from "react"
import Message from "./Message"
import { useRouter } from "next/router"
import { useSWRInfinite } from "swr"

const Index = (): React.ReactElement => {
  const [openMessage, setOpenMessage] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const { data, size, setSize } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // last page
      if (previousPageData && !previousPageData.messages) return null

      // first page
      if (pageIndex === 0)
        return `${process.env.NEXT_PUBLIC_API_HOST}/api/conversations/${id}`

      // every other page
      return previousPageData.nextCursor
    }
  )

  const ref = useRef(null)

  // scroll to latest messages whenever new messages arrive
  useEffect(() => {
    // this should only trigger when new messages arrive, rather than loading old stuff
    ref.current.scrollTop = ref.current.scrollHeight
  }, [])

  return (
    <div className="conversation" ref={ref}>
      {data && (
        <>
          {data[data.length - 1].nextCursor ? (
            <button
              className="govuk-link lbh-link conversation__load-more"
              onClick={() => setSize(size + 1)}
            >
              Load older messages
            </button>
          ) : (
            <p className="conversation__no-older">No older messages</p>
          )}

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
        </>
      )}
    </div>
  )
}

export default Index
