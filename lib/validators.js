import * as Yup from "yup"
import "yup-phone"

export const messageSchema = Yup.object().shape({
  body: Yup.string()
    .required("You can't send a blank message")
    .min(2, "That message is too short")
    .max(160, "That message is too long"),
})

export const contactSchema = Yup.object().shape({
  number: Yup.string()
    .required("You need to enter a phone number")
    .phone("GB", true, "That doesn't look like a valid phone number"),
  nickname: Yup.string()
    .min(2, "Name needs to be at least 2 characters")
    .max(30, "Name can't be longer than 30 characters"),
})

export const settingsSchema = Yup.object().shape({
  useSignature: Yup.boolean(),
  signature: Yup.string(),
  outOfHoursAutoreply: Yup.boolean(),
  outOfHoursMessage: Yup.string()
    .min(2, "That message is too short")
    .max(160, "That message is too long"),
  messageTemplates: Yup.array().of(
    Yup.string()
      .required("Reply templates can't be blank")
      .min(2, "That message is too short")
      .max(160, "That message is too long")
  ),
})

export const searchSchema = Yup.object().shape({
  query: Yup.string().required(),
})
