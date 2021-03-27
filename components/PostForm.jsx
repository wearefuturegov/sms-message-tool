import { Formik, Form, Field } from "formik"
import { postSchema } from "../lib/validators"

const PostForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      validationSchema={postSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <label htmlFor="title">Title</label>
          {touched.title && errors.title && <p role="alert">{errors.title}</p>}
          <Field name="title" id="title" />

          <label htmlFor="content">Content</label>
          {touched.content && errors.content && (
            <p role="alert">{errors.content}</p>
          )}
          <Field name="content" id="content" as="textarea" />

          <button>Save changes</button>
        </Form>
      )}
    </Formik>
  )
}

export default PostForm
