import { Formik, Form } from "formik"
import { contactSchema } from "../lib/validators"
import TextField from "./TextField"

interface InitialValues {
  number: string
  nickname: string
  socialCareId: number
}

interface Props {
  initialValues?: InitialValues
  onSubmit: (values: any) => Promise<void>
}

const MessageForm = ({
  initialValues = {
    nickname: "",
    number: "",
    socialCareId: null,
  },
  onSubmit,
}: Props): React.ReactElement => {
  return (
    <Formik
      validationSchema={contactSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form className="contact-form">
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
