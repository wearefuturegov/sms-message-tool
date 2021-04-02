import { Formik, Form, Field } from "formik"
import { messageSchema } from "../lib/validators"

interface Props {
  onSubmit: (values: any) => Promise<void>
}

const MessageForm = ({ onSubmit }: Props): React.ReactElement => {
  return (
    <Formik
      validationSchema={messageSchema}
      initialValues={{
        body: "message i'd like to send",
      }}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="message-form">
          <label htmlFor="body" className="visually-hidden">
            Body
          </label>
          {touched.body && errors.body && (
            <p className="govuk-error-message lbh-error-message" role="alert">
              <span className="govuk-visually-hidden">Error:</span>{" "}
              {errors.body}
            </p>
          )}
          <Field
            name="body"
            id="body"
            as="textarea"
            className="govuk-textarea lbh-textarea"
          />

          <button disabled={isSubmitting} className="govuk-button lbh-button">
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MessageForm
