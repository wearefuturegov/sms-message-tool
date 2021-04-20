import { getSession } from "next-auth/client"

export const verifySession = handler => {
  return async (req, res) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "Not authorised" })
    req.session = session
    return handler(req, res, session)
  }
}

export const verifyCallbackToken = handler => {
  return async (req, res) => {
    if (
      req.headers.authorization ===
      `Bearer ${process.env.NOTIFY_CALLBACK_TOKEN}`
    ) {
      return handler(req, res)
    } else {
      res.status(401).json({ message: "Not authorised" })
    }
  }
}
