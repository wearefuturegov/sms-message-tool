import Layout from "../../components/Layout"
import Router from "next/router"
import Link from "next/link"
import { Formik, Form, Field } from "formik"
import PostForm from "../../components/PostForm"

const New = () => {
  const handleSubmit = async values => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/posts`, {
        method: "POST",
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
      <h1>New post</h1>

      <PostForm
        initialValues={{
          title: "",
          content: "",
        }}
        onSubmit={handleSubmit}
      />

      <Link href="/posts">
        <a>Back to posts</a>
      </Link>
    </Layout>
  )
}

export default New
