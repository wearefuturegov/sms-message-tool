import { useState } from "react"
import useSWR from "swr"
import { useRouter } from "next/router"
import MessageForm from "../../components/MessageForm"
import Message from "../../components/Message"
import { DateTime } from "luxon"

const handleSubmit = async (id, body) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${id}/message`,
    {
      method: "POST",
      body: JSON.stringify({
        body,
      }),
    }
  )
  const data = await res.json()
}

const Index = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${id}`
  )

  const [openMessage, setOpenMessage] = useState(false)

  let conversation = data

  if (conversation)
    return (
      <>
        <h1 className="visually-hidden">{conversation.number}</h1>

        <ul className="conversation">
          {conversation.received_messages.map(message => (
            <Message
              key={message.id}
              message={message}
              openMessage={openMessage}
              setOpenMessage={setOpenMessage}
            />
          ))}
        </ul>

        <MessageForm
          onSubmit={values => handleSubmit(conversation.id, values.body)}
        />
      </>
    )

  return <p>Loading...</p>
}

export default Index
