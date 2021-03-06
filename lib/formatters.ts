import { DateTime } from "luxon"
import parsePhoneNumber from "libphonenumber-js"

export const prettyDate = (rawTimeDate: string | Date): string => {
  let now = DateTime.now()
  let then = DateTime.fromISO(rawTimeDate)
  // if difference is less than 1 minutes, say "just now"
  if (now.diff(then).milliseconds < 60000) return "just now"
  return then.toRelative()
}

export const prettyPhone = (rawPhone: string): string | boolean => {
  try {
    return parsePhoneNumber(rawPhone, "GB").formatNational()
  } catch (e) {
    return false
  }
}

export const truncate = (str: string, noWords: number): string => {
  if (str && noWords > 1) {
    if (str.split(" ").length > noWords) {
      return str.split(" ").splice(0, noWords).join(" ") + "..."
    } else {
      return str
    }
  }
}
