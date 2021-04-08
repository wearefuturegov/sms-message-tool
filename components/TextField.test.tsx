import TextField from "./TextField"
import { Formik, Form } from "formik"
import { render, screen } from "@testing-library/react"

describe("TextField", () => {
  it("renders correctly", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: false,
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <TextField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    )

    expect(screen.getByRole("textbox"))
    expect(screen.getByLabelText("Label text"))
    expect(screen.getByText("Hint text"))
  })

  it("accepts an initial value", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: "example initial value",
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <TextField
              touched={touched}
              errors={errors}
              name="foo"
              label="Label text"
              hint="Hint text"
            />
          </Form>
        )}
      </Formik>
    )
    expect(screen.getByDisplayValue("example initial value"))
  })

  it("renders errors", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: "",
        }}
      >
        <Form>
          <TextField
            touched={{
              foo: true,
            }}
            errors={{
              foo: "Example error",
            }}
            name="foo"
            label="Label text"
            hint="Hint text"
          />
        </Form>
      </Formik>
    )
    expect(screen.getByText("Example error"))
  })
})
