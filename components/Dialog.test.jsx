import Dialog from "./Dialog"
import { render, screen } from "@testing-library/react"

describe("Layout", () => {
  it("renders correctly when open", () => {
    render(
      <Dialog isOpen={true} title="Example title">
        Foo
      </Dialog>
    )
    expect(screen.getByText("Example title"))
    expect(screen.getByText("Foo"))
  })
})
