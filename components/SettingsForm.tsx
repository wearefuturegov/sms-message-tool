import { Formik, Form, FieldArray, FormikErrors, FormikTouched } from "formik"
import { isValidNumber } from "libphonenumber-js"
import React from "react"
import { settingsSchema } from "../lib/validators"
import CheckboxField from "./CheckboxField"
import TextareaField from "./TextareaField"
import ReplyTemplateField from "./ReplyTemplateField"

interface FormValues {
  useSignature: boolean
  signature: string
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
    {({ values, touched, errors, isSubmitting, isValid, submitCount }) => (
      <Form>
        <h2>Signature</h2>

        <CheckboxField
          label="Include your first name at the end of messages you send"
          name="useSignature"
          hint="This setting only affects you."
        />

        {values.useSignature && (
          <TextareaField
            name="signature"
            label="Signature text"
            touched={touched}
            errors={errors}
          />
        )}

        <h2>Out of hours</h2>

        <p className="lbh-body">
          Office hours are weekdays between 9am and 5pm. Bank holidays are not
          supported yet.
        </p>

        <CheckboxField
          label="Automatically reply to messages received outside office hours"
          name="outOfHoursAutoreply"
        />

        {values.outOfHoursAutoreply && (
          <TextareaField
            name="outOfHoursMessage"
            label="Reply message"
            touched={touched}
            errors={errors}
          />
        )}

        <FieldArray
          name="messageTemplates"
          render={arrayHelpers => (
            <fieldset>
              <legend className="govuk-!-margin-top-7">
                <h2>Quick reply templates</h2>
              </legend>

              <p className="lbh-body">
                Storing common replies as templates can save your team time.
              </p>

              {values?.messageTemplates?.map((template, i) => (
                <ReplyTemplateField
                  errors={errors.messageTemplates && errors.messageTemplates[i]}
                  touched={
                    touched.messageTemplates && touched.messageTemplates[i]
                  }
                  i={i}
                  key={i}
                  arrayHelpers={arrayHelpers}
                />
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
            </fieldset>
          )}
        />

        <button
          disabled={isSubmitting}
          className="govuk-button lbh-button govuk-!-margin-top-8"
        >
          Save changes
        </button>

        {!isValid && submitCount > 0 && (
          <p
            className="govuk-error-message lbh-error-message govuk-!-margin-top-3"
            role="alert"
          >
            Your changes couldn't be saved. Check your answers and try again.
          </p>
        )}
      </Form>
    )}
  </Formik>
)

export default SettingsForm
