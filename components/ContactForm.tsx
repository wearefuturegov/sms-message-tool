import { Formik, Form } from "formik"
import { contactSchema } from "../lib/validators"
import TextField from "./TextField"

interface InitialValues {
  number: string
  nickname: string
}

interface FormProps {
  initialValues?: InitialValues
  onSubmit: (values: any) => Promise<void>
}

const MessageForm = ({
  initialValues = {
    nickname: "",
    number: "",
  },
  onSubmit,
}: FormProps): React.ReactElement => {
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

          <button disabled={isSubmitting} className="govuk-button lbh-button">
            Save changes
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default MessageForm
