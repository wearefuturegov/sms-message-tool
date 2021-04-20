import CheckboxField from "./CheckboxField"
import { Formik, Form } from "formik"
import { render, screen } from "@testing-library/react"

describe("CheckboxField", () => {
  it("renders correctly", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: false,
        }}
      >
        <Form>
          <CheckboxField name="foo" label="Label text" hint="Hint text" />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement

    expect(checkbox)
    expect(checkbox.checked).toEqual(false)
    expect(screen.getByLabelText("Label text"))
    expect(screen.getByText("Hint text"))
  })

  it("accepts an initial value", () => {
    render(
      <Formik
        onSubmit={null}
        initialValues={{
          foo: true,
        }}
      >
        <Form>
          <CheckboxField name="foo" label="Label text" />
        </Form>
      </Formik>
    )

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement
    expect(checkbox.checked).toEqual(true)
  })
})
