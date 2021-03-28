import * as Yup from "yup"

export const messageSchema = Yup.object().shape({
  body: Yup.string()
    .required("You can't send a blank message")
    .min(2, "That message is too short")
    .max(400, "That message is too long"),
})
