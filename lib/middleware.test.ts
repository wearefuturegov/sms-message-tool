// import { getSession } from "./auth"
import { errorHandler, verifySession, verifyCallbackToken } from "./middleware"

import { getSession } from "next-auth/client"

jest.mock("next-auth/client")
;(getSession as jest.Mock).mockReturnValueOnce(false).mockReturnValueOnce(true)

const mockHandler = jest.fn()

const mockReq = {
  cookies: jest.fn(),
  headers: {
    authorization: "Bearer foo",
  },
}

const mockJson = jest.fn()
const mockStatus = jest.fn(() => {
  return {
    json: mockJson,
  }
})
const mockRes = {
  status: mockStatus,
}

afterEach(() => {
  jest.clearAllMocks()
})

describe("verifySession", () => {
  it("responds with an appropriate error if there is no session", async () => {
    await verifySession(mockHandler)(mockReq as any, mockRes as any)

    expect(mockHandler).not.toBeCalled()

    expect(mockStatus).toBeCalledWith(401)
    expect(mockJson).toBeCalledWith({
      error: "Not authorised",
    })
  })

  it("returns the endpoint handler if there is a session", async () => {
    await verifySession(mockHandler)(mockReq as any, mockRes as any)
    expect(mockHandler).toBeCalled()
  })
})

describe("verifyCallbackToken", () => {
  it("responds with an appropriate error if the token is invalid", async () => {
    verifyCallbackToken(mockHandler)(
      {
        headers: {
          authorization: "Bearer bar",
        },
      } as any,
      mockRes as any
    )
    expect(mockHandler).not.toBeCalled()
    expect(mockStatus).toBeCalledWith(401)
    expect(mockJson).toBeCalledWith({
      error: "Not authorised",
    })
  })

  it("returns the endpoint handler if the token is valid", () => {
    process.env.NOTIFY_CALLBACK_TOKEN = "foo"
    verifyCallbackToken(mockHandler)(
      {
        headers: {
          authorization: "Bearer foo",
        },
      } as any,
      mockRes as any
    )
    expect(mockHandler).toBeCalled()
  })
})

describe("errorHandler", () => {
  it("calls the handler", async () => {
    await errorHandler(mockHandler)(mockReq as any, mockRes as any)
    expect(mockHandler).toBeCalled()
  })

  it("catches errors", async () => {
    await errorHandler((mockReq, mockRes) => {
      throw "example error"
    })(mockReq as any, mockRes as any)
    expect(mockStatus).toBeCalledWith(500)
    expect(mockJson).toBeCalledWith({
      error: "example error",
    })
  })
})
