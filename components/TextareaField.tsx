import { Field } from "formik"

interface Props {
  touched
  errors
  label: string
  name: string
}

const TextareaField = ({
  touched,
  errors,
  label,
  name,
}: Props): React.ReactElement => (
  <>
    <label htmlFor={name} className="govuk-label lbh-label">
      {label}
    </label>

    {touched && errors && (
      <p className="govuk-error-message lbh-error-message" role="alert">
        <span className="govuk-visually-hidden">Error:</span> {errors}
      </p>
    )}

    <Field
      name={name}
      id={name}
      as="textarea"
      className={`govuk-textarea lbh-textarea ${
        touched && errors && `govuk-textarea--error `
      }`}
    />
  </>
)

export default TextareaField
