import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import QuickReplySelect from "./QuickReplySelect"
import useSWR from "swr"

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: {
      messageTemplates: ["Foo", "Bar"],
    },
  }),
}))

const mockHandler = jest.fn()

describe("QuickReplySelect", () => {
  it("renders the correct list of replies", () => {
    render(<QuickReplySelect sendQuickReply={mockHandler} />)

    expect(screen.getByText("Foo"))
    expect(screen.getByText("Bar"))
    expect(screen.getAllByRole("button").length).toBe(2)
  })

  it("fires the handler when the user clicks a reply", () => {
    render(<QuickReplySelect sendQuickReply={mockHandler} />)

    expect(mockHandler).not.toBeCalled()
    fireEvent.click(screen.getByText("Foo"))
    expect(mockHandler).toBeCalledWith("Foo")
  })
})
