import Layout from "./Layout"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import PostForm from "./PostForm"

const submitHandler = jest.fn()

describe("PostForm", () => {
  it("renders the correct fields", () => {
    render(<PostForm />)
    expect(screen.getByLabelText("Title"))
    expect(screen.getByLabelText("Content"))
  })

  it("responds to initial values", () => {
    render(
      <PostForm
        initialValues={{
          title: "Foo",
          content: "Bar",
        }}
      />
    )
    expect(screen.getByDisplayValue("Foo"))
    expect(screen.getByDisplayValue("Bar"))
  })

  it("validates input", async () => {
    render(
      <PostForm
        initialValues={{ title: "", content: "" }}
        onSubmit={submitHandler}
      />
    )
    await fireEvent.click(screen.getByText("Save changes"))
    await waitFor(() => {
      expect(screen.getAllByRole("alert")).toHaveLength(2)
    })
    expect(submitHandler).toBeCalledTimes(0)
  })

  it("submits", async () => {
    render(
      <PostForm
        initialValues={{ title: "", content: "" }}
        onSubmit={submitHandler}
      />
    )
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Foo" },
    })
    fireEvent.change(screen.getByLabelText("Content"), {
      target: { value: "Bar" },
    })
    fireEvent.click(screen.getByRole("button"))
    await waitFor(() => expect(submitHandler).toHaveBeenCalled())
  })
})
