import MessageForm from "../../components/MessageForm"

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/contacts/${params.id}`
  )
  const conversation = await res.json()
  return { props: { conversation } }
}

const handleSubmit = async (id, body) => {
  console.log(id, body)
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

const Index = ({ conversation }) => (
  <>
    <h1>{conversation.number}</h1>
    <code>{JSON.stringify(conversation)}</code>

    <MessageForm
      onSubmit={values => handleSubmit(conversation.id, values.body)}
    />
  </>
)

export default Index
