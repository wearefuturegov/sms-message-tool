import {
  Formik,
  Form,
  FormikErrors,
  FormikTouched,
  Field as RawField,
} from "formik"
import { contactSchema } from "../lib/validators"

interface FormValues {
  number: string
  nickname?: string
}

interface FieldProps {
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  name: string
  label: string
}

// single reusable form field
const Field = ({
  touched,
  errors,
  name,
  label,
}: FieldProps): React.ReactElement => (
  <div
    className={`govuk-form-group lbh-form-group ${
      touched[name] && errors[name] && "govuk-form-group--error"
    }`}
  >
    <label htmlFor="number" className="govuk-label lbh-label">
      {label}
    </label>
    {touched[name] && errors[name] && (
      <p className="govuk-error-message lbh-error-message" role="alert">
        <span className="govuk-visually-hidden">Error:</span> {errors[name]}
      </p>
    )}
    <RawField name={name} id={name} className="govuk-input lbh-input" />
  </div>
)

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
          <Field
            touched={touched}
            errors={errors}
            name="nickname"
            label="Nickname"
          />

          <Field
            touched={touched}
            errors={errors}
            name="number"
            label="Mobile number"
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
