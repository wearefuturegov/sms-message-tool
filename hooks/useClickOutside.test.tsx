import { useRef } from "react"
import useClickOutside from "./useClickOutside"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const mockHandler = jest.fn()

const MockComponent = () => {
  const ref = useRef(null)
  useClickOutside(ref, mockHandler)
  return (
    <>
      <a href="#">Outside text</a>
      <div ref={ref}>Inside text</div>
    </>
  )
}

describe("useClickOutside", () => {
  it("does nothing when the click is inside the element", () => {
    render(<MockComponent />)
    userEvent.click(screen.getByText("Inside text"))
    expect(mockHandler).not.toBeCalled()
  })

  it("fires the handler when there is a click outside the element", () => {
    render(<MockComponent />)
    userEvent.click(screen.getByText("Outside text"))
    expect(mockHandler).toBeCalledTimes(1)
  })
})
