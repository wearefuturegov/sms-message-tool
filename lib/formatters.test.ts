import { truncate, prettyDate, prettyPhone } from "./formatters"
jest.useFakeTimers("modern")

describe("prettyDate", () => {
  it("shows recent dates as 'just now'", () => {
    jest.setSystemTime(new Date("2021-04-23T12:00:00.000Z"))
    expect(prettyDate("2021-04-23T12:00:00.000Z")).toBe("just now")
  })

  it("shows all other dates correctly", () => {
    jest.setSystemTime(new Date("2021-04-23T12:02:00.000Z"))
    expect(prettyDate("2021-04-23T12:00:00.000Z")).toBe("2 minutes ago")

    jest.setSystemTime(new Date("2022-04-23T12:02:00.000Z"))
    expect(prettyDate("2021-04-23T12:00:00.000Z")).toBe("1 year ago")
  })
})

describe("prettyPhone", () => {
  it("correctly formats valid phone numbers", () => {
    expect(prettyPhone("07777777777")).toBe("07777 777777")
    expect(prettyPhone("0777 777 7777")).toBe("07777 777777")
    expect(prettyPhone("+447777777777")).toBe("07777 777777")
  })
  it("returns false for invalid numbers", () => {
    expect(prettyPhone("blah")).toBeFalsy()
  })
})

describe("truncate", () => {
  it("leaves short text unaltered", () => {
    expect(truncate("Example input", 2)).toBe("Example input")
  })
  it("truncates longer text", () => {
    expect(truncate("Example input example input", 2)).toBe("Example input...")
  })
})
