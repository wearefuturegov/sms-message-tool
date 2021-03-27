import Layout from "../../components/Layout"
import Link from "next/link"
import { useSession } from "next-auth/client"

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts`)
  const posts = await res.json()
  return { props: { posts } }
}

const Index = ({ posts }) => {
  const [session, loading] = useSession()

  return (
    <Layout>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                <Link href={`/posts/${post.id}`}>
                  <a>Show</a>
                </Link>
                {session && (
                  <Link href={`/posts/${post.id}/edit`}>
                    <a>Edit</a>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {session && (
        <Link href="/posts/new">
          <a>New post</a>
        </Link>
      )}
    </Layout>
  )
}

export default Index
