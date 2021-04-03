import { DateTime } from "luxon"
import parsePhoneNumber from "libphonenumber-js"

export const prettyDate = rawTimeDate =>
  DateTime.fromISO(rawTimeDate).toRelative()

export const prettyPhone = rawPhone =>
  parsePhoneNumber(rawPhone, "GB").formatNational()
