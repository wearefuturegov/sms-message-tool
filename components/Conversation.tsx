import { useState, useEffect, useRef } from "react"
import Message from "./Message"

const Index = ({ conversation, loadMore }): React.ReactElement => {
  const [openMessage, setOpenMessage] = useState(false)

  const ref = useRef(null)

  const trackScroll = e => {
    if (e.target.scrollTop === 0) {
      loadMore()
    }
  }

  useEffect(() => {
    ref.current.addEventListener("scroll", trackScroll)
    return () => ref.current.removeEventListener("scroll", trackScroll)
  })

  //   scroll to latest messages whenever new messages arrive
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight
  }, [conversation])

  return (
    <ul className="conversation" ref={ref}>
      {conversation.messages.map(message => (
        <Message
          key={message.id}
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
          message={message}
        />
      ))}
    </ul>
  )
}

export default Index
