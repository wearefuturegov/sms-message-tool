import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikErrors,
  FormikTouched,
} from "formik"
import React from "react"
import { settingsSchema } from "../lib/validators"

interface FormValues {
  signature: boolean
  outOfHoursAutoreply: boolean
  outOfHoursMessage: string
  messageTemplates: string[]
}

interface FieldProps {
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  name: string
  label: string
  type?: string
}

interface Props {
  onSubmit: (values: any) => Promise<void>
  initialValues?: FormValues
}

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

const SettingsForm = ({
  initialValues,
  onSubmit,
}: Props): React.ReactElement => (
  <Formik
    validationSchema={settingsSchema}
    initialValues={initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}
  >
    {({ values, touched, errors, isSubmitting }) => (
      <Form>
        {JSON.stringify(errors)}
        <h2>Signature</h2>

        <CheckboxField
          label="Include your first name at the end of messages you send"
          name="signature"
          hint="This setting only affects you."
        />

        <h2>Out of hours</h2>

        <p className="lbh-body">
          Office hours are weekdays between 9am and 5pm. Bank holidays are not
          supported yet.
        </p>

        <CheckboxField
          label="Automatically reply to messages received outside office hours"
          name="outOfHoursAutoreply"
        />

        <label htmlFor="outOfHoursReply" className="govuk-label lbh-label">
          Reply message
        </label>

        {touched.outOfHoursReply && errors.outOfHoursReply && (
          <p className="govuk-visually-hidden" role="alert">
            <span className="govuk-visually-hidden">Error:</span>{" "}
            {errors.outOfHoursReply}
          </p>
        )}

        <Field
          name="outOfHoursMessage"
          id="outOfHoursMessage"
          as="textarea"
          className={`govuk-textarea lbh-textarea ${
            touched.outOfHoursReply &&
            errors.outOfHoursReply &&
            `govuk-textarea--error `
          }`}
        />

        <h2>Quick reply templates</h2>

        <p className="lbh-body">
          Storing common replies as templates can save your team time.
        </p>

        <FieldArray
          name="messageTemplates"
          render={arrayHelpers => (
            <div>
              {values?.messageTemplates?.map((template, i) => (
                <div key={i}>
                  <Field
                    name={`messageTemplates.${i}`}
                    as="textarea"
                    className="govuk-textarea lbh-textarea"
                  />
                  <button
                    type="button"
                    className="govuk-link lbh-link"
                    onClick={() => arrayHelpers.remove(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="govuk-button govuk-button--secondary lbh-button lbh-button--secondary lbh-button--add"
                onClick={() => arrayHelpers.push("")}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="4.5293"
                    y="11"
                    width="11"
                    height="1.94118"
                    transform="rotate(-90 4.5293 11)"
                    fill="#00664F"
                  />
                  <rect
                    y="4.52942"
                    width="11"
                    height="1.94118"
                    fill="#00664F"
                  />
                </svg>
                {values?.messageTemplates?.length > 0
                  ? "Add another template"
                  : "Add a template"}
              </button>
            </div>
          )}
        />

        <button disabled={isSubmitting} className="govuk-button lbh-button">
          Save changes
        </button>
      </Form>
    )}
  </Formik>
)

export default SettingsForm
