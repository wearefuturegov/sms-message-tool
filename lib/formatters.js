import { DateTime } from "luxon"
import parsePhoneNumber from "libphonenumber-js"

export const prettyDate = rawTimeDate => {
  let now = DateTime.now()
  let then = DateTime.fromISO(rawTimeDate)
  // if difference is less than 1 minutes, say "just now"
  if (now.diff(then).milliseconds < 60000) return "just now"
  return then.toRelative()
}

export const prettyPhone = rawPhone =>
  parsePhoneNumber(rawPhone, "GB").formatNational()
