import {
  Formik,
  Form,
  Field,
  FieldArray,
  FormikErrors,
  FormikTouched,
} from "formik"
import React from "react"
import { messageSchema } from "../lib/validators"

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

const CheckboxField = ({ name, label }) => (
  <div className="govuk-form-group lbh-form-group">
    <div className="govuk-checkboxes lbh-checkboxes">
      <div className="govuk-checkboxes__item">
        <Field
          name={name}
          id={name}
          type="checkbox"
          className="govuk-checkboxes__input"
        />
        <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  </div>
)

const SettingsForm = ({
  initialValues,
  onSubmit,
}: Props): React.ReactElement => (
  <Formik
    validationSchema={messageSchema}
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({ values, touched, errors, isSubmitting }) => (
      <Form>
        <h2>Personal signature</h2>

        <CheckboxField
          label="Include my name at the end of my messages?"
          name="signature"
        />

        <h3>Team settings</h3>
        <p className="lbh-body">These settings affect everyone in your team.</p>
        <h3>Out of hours</h3>

        <p className="lbh-body">
          Office hours are weekdays between 9am and 5pm.
        </p>

        <CheckboxField
          label="Automatically reply to messages sent outside office hours?"
          name="outOfHoursAutoReply"
        />

        <label htmlFor="outOfHoursReply" className="govuk-label lbh-label">
          Our of hours reply
        </label>

        {touched.outOfHoursReply && errors.outOfHoursReply && (
          <p className="govuk-visually-hidden" role="alert">
            <span className="govuk-visually-hidden">Error:</span>{" "}
            {errors.outOfHoursReply}
          </p>
        )}

        <Field
          name="outOfHoursReply"
          id="outOfHoursReply"
          as="textarea"
          className={`govuk-textarea lbh-textarea ${
            touched.outOfHoursReply &&
            errors.outOfHoursReply &&
            `govuk-textarea--error `
          }`}
        />

        <h3>Quick reply templates</h3>

        <p className="lbh-body">
          Storing common replies as templates can save your team time.
        </p>

        <FieldArray
          name="messageTemplates"
          render={arrayHelpers => (
            <>
              {values?.messageTemplates?.map((template, i) => (
                <div key={i}>
                  <Field
                    name={`messageTemplate.${i}`}
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
                className="govuk-button govuk-button--secondary lbh-button lbh-button--secondary"
                onClick={() => arrayHelpers.push("")}
              >
                {values?.messageTemplates?.length > 0
                  ? "Add another template"
                  : "Add a template"}
              </button>
            </>
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
