import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import Message from "./Message"
import { Direction } from "@prisma/client"

const handler = jest.fn()

const messageFixture = {
  id: 10,
  body: "This is amazing",
  direction: "OUTBOUND" as Direction,
  contactId: 1,
  userId: 2,
  createdAt: new Date("2021-04-07T13:48:12.388Z"),
  updatedAt: new Date("2021-04-07T13:48:16.192Z"),
  completedAt: new Date("2021-04-07T13:48:15.861Z"),
  status: "delivered",
  user: {
    id: 2,
    name: "Namey McName",
    email: "example@email.com",
    emailVerified: null,
    image: null,
    createdAt: new Date("2021-04-07T13:47:26.779Z"),
    updatedAt: new Date("2021-04-07T13:47:26.780Z"),
    useSignature: false,
    signature: "",
  },
}

describe("Message", () => {
  it("renders correctly initially", () => {
    render(
      <Message
        message={messageFixture}
        openMessage={false}
        setOpenMessage={handler}
      />
    )
    expect(screen.getByText("This is amazing"))
  })

  it("renders details", async () => {
    render(
      <Message
        message={messageFixture}
        openMessage={true}
        setOpenMessage={handler}
      />
    )

    expect(screen.getByText("Sent by"))
    expect(screen.getByText("Delivered"))
    expect(screen.getByText("Namey McName"))
  })
})
