import React, { useState } from "react"
import Link from "next/link"
import Layout from "../../../components/Layout"
import Router from "next/router"
import { useSession } from "next-auth/client"
import Dialog from "../../../components/Dialog"

export const getServerSideProps = async ({ req, params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/posts/${params.id}`
  )
  const post = await res.json()
  return {
    props: post,
  }
}

const destroyPost = async id => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts/${id}`, {
    method: "DELETE",
  })
  Router.push("/posts")
}

const Show = ({ id, title, content }) => {
  const [session, loading] = useSession()
  const [destroyDialogOpen, setDestroyDialogOpen] = useState(false)

  return (
    <Layout>
      <h1>Post</h1>

      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Content:</strong> {content}
      </p>

      {session && (
        <>
          <Link href={`/posts/${id}/edit`}>
            <a>Edit</a>
          </Link>

          <button onClick={() => setDestroyDialogOpen(true)}>Destroy</button>
        </>
      )}

      <Link href="/posts">
        <a>Back to posts</a>
      </Link>

      <Dialog
        isOpen={destroyDialogOpen}
        onDismiss={() => setDestroyDialogOpen(false)}
        title="Are you sure you want to destroy this post?"
      >
        <button onClick={() => destroyPost(id)}>Yes, destroy</button>
      </Dialog>
    </Layout>
  )
}

export default Show
