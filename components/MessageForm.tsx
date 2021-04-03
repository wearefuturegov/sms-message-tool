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
        body: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values)
        resetForm()
      }}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="message-form">
          <div className="govuk-form-group lbh-form-group">
            <label htmlFor="body" className="govuk-visually-hidden">
              Body
            </label>

            {touched.body && errors.body && (
              <p className="govuk-visually-hidden" role="alert">
                <span className="govuk-visually-hidden">Error:</span>{" "}
                {errors.body}
              </p>
            )}

            <Field
              name="body"
              id="body"
              as="textarea"
              placeholder="Write a message..."
              className={`govuk-textarea lbh-textarea ${
                touched.body && errors.body && `govuk-textarea--error `
              }`}
            />
          </div>

          <button disabled={isSubmitting} className="govuk-button lbh-button">
            Send
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MessageForm
