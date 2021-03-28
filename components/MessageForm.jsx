import { Formik, Form, Field } from "formik"
import { messageSchema } from "../lib/validators"

const MessageForm = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={messageSchema}
      initialValues={{
        body: "message i'd like to send",
      }}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <label htmlFor="body">Body</label>
          {touched.body && errors.body && <p role="alert">{errors.body}</p>}
          <Field name="body" id="body" as="textarea" />

          <button disabled={isSubmitting}>Send</button>
        </Form>
      )}
    </Formik>
  )
}

export default MessageForm
