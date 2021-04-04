import { Formik, Form, Field } from "formik"
import { searchSchema } from "../lib/validators"

interface Props {
  onSubmit: (values) => void
  onClear: () => void
}

const SearchForm = ({ onSubmit, onClear, searching }): React.ReactElement => (
  <Formik
    validationSchema={searchSchema}
    initialValues={{
      query: "",
    }}
    onSubmit={onSubmit}
  >
    {({ touched, errors, isSubmitting, resetForm }) => (
      <Form className="search-form">
        <label className="govuk-visually-hidden" htmlFor="search">
          Search by name or phone number
        </label>

        <Field
          name="query"
          id="search"
          type="search"
          className={`govuk-input lbh-input ${
            touched.query && errors.query && `govuk-input--error`
          }`}
          placeholder="Search contacts..."
          aria-invalid={errors.query}
        />

        {searching ? (
          <button
            onClick={e => {
              e.preventDefault()
              resetForm()
              onClear()
            }}
            type="button"
          >
            <span className="govuk-visually-hidden">Clear search</span>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.94983 6.36377L6.36404 4.94956L17.6778 16.2633L16.2635 17.6775L4.94983 6.36377Z"
                fill="#0b0c0c"
              />
              <path
                d="M16.2635 4.94971L17.6778 6.36392L6.36405 17.6776L4.94984 16.2634L16.2635 4.94971Z"
                fill="#0b0c0c"
              />
            </svg>
          </button>
        ) : (
          <button disabled={isSubmitting}>
            <span className="govuk-visually-hidden">Search</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.6999 10.6C12.0747 10.6 13.9999 8.67482 13.9999 6.3C13.9999 3.92518 12.0747 2 9.6999 2C7.32508 2 5.3999 3.92518 5.3999 6.3C5.3999 8.67482 7.32508 10.6 9.6999 10.6ZM9.6999 12.6C13.1793 12.6 15.9999 9.77939 15.9999 6.3C15.9999 2.82061 13.1793 0 9.6999 0C6.22051 0 3.3999 2.82061 3.3999 6.3C3.3999 9.77939 6.22051 12.6 9.6999 12.6Z"
                fill="#0B0C0C"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.70706 10.7071L1.70706 15.7071L0.292847 14.2929L5.29285 9.29289L6.70706 10.7071Z"
                fill="#0B0C0C"
              />
            </svg>
          </button>
        )}
      </Form>
    )}
  </Formik>
)

export default SearchForm
