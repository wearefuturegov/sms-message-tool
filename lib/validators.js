import * as Yup from "yup"
import "yup-phone"

export const messageSchema = Yup.object().shape({
  body: Yup.string()
    .required("You can't send a blank message")
    .min(2, "That message is too short")
    .max(400, "That message is too long"),
})

export const contactSchema = Yup.object().shape({
  number: Yup.string()
    .phone("GB", "That doesn't look like a valid phone number")
    .required("You need to enter a phone number"),
})
