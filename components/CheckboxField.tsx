import { Field } from "formik"

interface CheckboxProps {
  name: string
  label: string
  hint?: string
}

const CheckboxField = ({ name, label, hint }: CheckboxProps) => (
  <div className="govuk-form-group lbh-form-group">
    <div className="govuk-checkboxes lbh-checkboxes">
      <div className="govuk-checkboxes__item">
        <Field
          name={name}
          id={name}
          type="checkbox"
          className="govuk-checkboxes__input"
          aria-describedby={hint ? `${name}-hint` : false}
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
          {label}
        </label>
        {hint && (
          <span
            id={`${name}-hint`}
            className="govuk-hint govuk-checkboxes__hint lbh-hint"
          >
            {hint}
          </span>
        )}
      </div>
    </div>
  </div>
)

export default CheckboxField
