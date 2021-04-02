import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import MessageForm from "./MessageForm"

const submitHandler = jest.fn()

describe("PostForm", () => {
  it("renders the correct fields", () => {
    render(<MessageForm />)
    expect(screen.getByLabelText("Body"))
  })

  // it("validates input", async () => {
  //   render(<MessageForm onSubmit={submitHandler} />)
  //   await waitFor(() => {
  //     await fireEvent.click(screen.getByText("Send"))
  //   })
  //   await waitFor(() => {
  //     expect(screen.getAllByRole("alert")).toHaveLength(1)
  //   })
  //   expect(submitHandler).toBeCalledTimes(0)
  // })

  it("submits", async () => {
    render(<MessageForm onSubmit={submitHandler} />)
    fireEvent.change(screen.getByLabelText("Body"), {
      target: { value: "Foo" },
    })
    fireEvent.click(screen.getByRole("button"))
    await waitFor(() => expect(submitHandler).toHaveBeenCalled())
  })
})
