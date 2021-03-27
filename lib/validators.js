import * as Yup from "yup"

export const postSchema = Yup.object().shape({
  title: Yup.string().required().min(3),
  content: Yup.string().required().min(3),
})
