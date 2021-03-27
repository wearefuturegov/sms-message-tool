import Layout from "../../../components/Layout"
import Router from "next/router"
import Link from "next/link"
import { Formik, Form, Field } from "formik"
import PostForm from "../../../components/PostForm"

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/posts/${params.id}`
  )
  const post = await res.json()
  return {
    props: post,
  }
}

const Edit = post => {
  const handleSubmit = async values => {
    console.log(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts/${post.id}`)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      await Router.push("/posts")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <h1>Editing post</h1>

      <PostForm initialValues={post} onSubmit={handleSubmit} />

      <Link href="/posts">
        <a>Back to posts</a>
      </Link>
    </Layout>
  )
}

export default Edit
