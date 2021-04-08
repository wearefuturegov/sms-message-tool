import { Field as RawField } from "formik"

interface FieldProps {
  touched
  errors
  name: string
  label: string
  type?: string
  hint?: string
  className?: string
}

const Field = ({
  touched,
  errors,
  name,
  label,
  hint,
  className,
  ...props
}: FieldProps): React.ReactElement => (
  <div
    className={`govuk-form-group lbh-form-group ${
      touched[name] && errors[name] && "govuk-form-group--error"
    }`}
  >
    <label htmlFor={name} className="govuk-label lbh-label">
      {label}
    </label>

    {hint && (
      <span id={`${name}-hint`} className="govuk-hint lbh-hint">
        {hint}
      </span>
    )}

    {touched[name] && errors[name] && (
      <p className="govuk-error-message lbh-error-message" role="alert">
        <span className="govuk-visually-hidden">Error:</span> {errors[name]}
      </p>
    )}

    <RawField
      name={name}
      id={name}
      className={`govuk-input lbh-input ${className}`}
      aria-describedby={hint ? `${name}-hint` : false}
      {...props}
    />
  </div>
)

export default Field
