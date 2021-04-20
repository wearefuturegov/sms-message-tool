import { Field, FieldArrayRenderProps } from "formik"

interface Props {
  touched
  errors
  i: number
  arrayHelpers: FieldArrayRenderProps
}

const ReplyTemplateField = ({
  touched,
  errors,
  i,
  arrayHelpers,
}: Props): React.ReactElement => (
  <div className="repeater-field">
    <div className="repeater-field__inner">
      {touched && errors && (
        <p className="govuk-error-message lbh-error-message" role="alert">
          <span className="govuk-visually-hidden">Error:</span> {errors}
        </p>
      )}
      <Field
        name={`messageTemplates.${i}`}
        as="textarea"
        className={`govuk-textarea lbh-textarea ${
          touched && errors && "govuk-textarea--error"
        }`}
      />
    </div>
    <button
      type="button"
      className="govuk-link lbh-link"
      onClick={() => arrayHelpers.remove(i)}
    >
      Remove
    </button>
  </div>
)

export default ReplyTemplateField
