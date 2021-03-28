import Link from "next/link"

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_HOST}/api/contacts`)
  const contacts = await res.json()
  return { props: { contacts } }
}

const Index = ({ contacts }) => (
  <ul>
    {contacts.map(contact => (
      <li>
        <Link href={`/conversations/${contact.id}`}>
          <a>{contact.number}</a>
        </Link>
      </li>
    ))}
  </ul>
)

export default Index
