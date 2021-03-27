import Layout from "./Layout"
import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/client"

jest.mock("next-auth/client")

describe("Layout", () => {
  it("renders correctly when signed out", () => {
    useSession.mockReturnValueOnce([false, false])

    render(<Layout />)
    expect(screen.getByText("Log in"))
  })

  it("renders correctly when signed in", () => {
    useSession.mockReturnValueOnce([
      {
        user: {
          email: "foo@bar.com",
        },
      },
      false,
    ])

    render(<Layout />)
    expect(screen.getByText("You are logged in as foo@bar.com"))
    expect(screen.getByText("Log out"))
  })
})
