import { isOfficeHours } from "./helpers"

jest.useFakeTimers("modern")

describe("isOfficeHours", () => {
  it("responds true if it's weekday during working hours", () => {
    jest.setSystemTime(new Date("2021-04-23T12:00:00.000Z"))
    expect(isOfficeHours()).toBeTruthy()
  })

  it("responds false if it's weekday before 9am", () => {
    jest.setSystemTime(new Date("2021-04-23T08:55:00.000Z"))
    expect(isOfficeHours()).toBeFalsy()
  })

  it("responds false if it's weekday after 5pm", () => {
    jest.setSystemTime(new Date("2021-04-23T17:05:00.000Z"))
    expect(isOfficeHours()).toBeFalsy()
  })

  it("responds false if it's the weekend", () => {
    jest.setSystemTime(new Date("2021-04-24T12:00:00.000Z"))
    expect(isOfficeHours()).toBeFalsy()
  })
})
