import { useState, useEffect, useRef } from "react"
import Message from "./Message"

const Index = ({ data, size, setSize }): React.ReactElement => {
  const [openMessage, setOpenMessage] = useState(false)
  const [atLatest, setAtLatest] = useState(true)

  const containerRef = useRef(null)
  const ref = useRef(null)

  const goToLatest = () => {
    ref.current.scrollTop = ref.current.scrollHeight
  }

  // const trackScroll = e => {
  //   // maths to work out if we're more than a page of scrolling from the bottom of the screen?
  //   setAtLatest(
  //     ref.current.scrollTop + ref.current.clientHeight >=
  //       ref.current.scrollHeight - ref.current.clientHeight
  //   )
  // }

  // scroll to latest messages whenever new messages arrive
  useEffect(goToLatest, [])

  // TODO: fix the ref.current not defined error
  // useEffect(() => {
  //   ref.current.addEventListener("scroll", trackScroll)
  //   return () => ref.current.removeEventListener("scroll", trackScroll)
  // })

  const scrollCallback = entries => {
    console.log(entries)
    // if (entries[0].isIntersecting) {
    console.log(entries[0].intersectionRatio)
    // }
  }

  useEffect(() => {
    const scroll = new IntersectionObserver(scrollCallback, {
      root: containerRef.current,
    })
    scroll.observe(ref.current!)
    return () => {
      scroll.disconnect()
    }
  })

  return (
    <>
      <div className="conversation" ref={containerRef}>
        {data[data.length - 1].nextCursor ? (
          <button
            className="govuk-link lbh-link conversation__load-more"
            onClick={() => setSize(size + 1)}
          >
            Load older messages
          </button>
        ) : (
          <p className="lbh-body-xs conversation__no-older">
            Showing oldest messages
          </p>
        )}

        <ul className="conversation__inner" ref={ref}>
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

        {!atLatest && (
          <button className="conversation__scroll-to-end" onClick={goToLatest}>
            Go to latest messages
          </button>
        )}
      </div>
    </>
  )
}

export default Index
