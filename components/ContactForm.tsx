import { Formik, Form, Field } from "formik"
import { contactSchema } from "../lib/validators"

const MessageForm = ({
    onSubmit,
}: {
    onSubmit: (values: any) => Promise<void>
}): React.ReactElement => {
    return (
        <Formik
            validationSchema={contactSchema}
            initialValues={{
                number: "",
            }}
            onSubmit={onSubmit}
        >
            {({ touched, errors, isSubmitting }) => (
                <Form className="contact-form">
                    <label htmlFor="number" className="govuk-label lbh-label">
                        Mobile number
          </label>
                    {touched.number && errors.number && (
                        <p className="govuk-error-message lbh-error-message" role="alert">
                            <span className="govuk-visually-hidden">Error:</span>{" "}
                            {errors.number}
                        </p>
                    )}
                    <Field name="number" id="number" className="govuk-input lbh-input" />
                    <button disabled={isSubmitting} className="govuk-button lbh-button">
                        Create
          </button>
                </Form>
            )}
        </Formik>
    )
}

export default MessageForm
