import { Formik, Form } from "formik"
import { contactSchema } from "../lib/validators"
import TextField from "./TextField"
import Banner from "./Banner"

interface InitialValues {
  number: string
  nickname: string
  socialCareId: string
}

interface Props {
  initialValues?: InitialValues
  onSubmit: (values: any, { setStatus }) => Promise<void>
}

const MessageForm = ({
  initialValues = {
    nickname: "",
    number: "",
    socialCareId: "",
  },
  onSubmit,
}: Props): React.ReactElement => {
  return (
    <Formik
      validationSchema={contactSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isSubmitting, values, status }) => (
        <Form className="contact-form">
          {status && (
            <Banner
              title="There was a problem submitting the form"
              className="lbh-page-announcement--warning"
            >
              <p>Please refresh the page or try again later.</p>
              <p className="lbh-body-xs">{status}</p>
            </Banner>
          )}

          <TextField
            touched={touched}
            errors={errors}
            name="nickname"
            label="Nickname"
          />

          <TextField
            touched={touched}
            errors={errors}
            name="number"
            label="Mobile number"
            type="tel"
            className="govuk-width--length-10"
          />

          <TextField
            touched={touched}
            errors={errors}
            name="socialCareId"
            label="Social care ID"
            className="govuk-input--width-10"
            hint="Link this contact with their social care person record."
          />

          <button disabled={isSubmitting} className="govuk-button lbh-button">
            Save changes
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MessageForm
