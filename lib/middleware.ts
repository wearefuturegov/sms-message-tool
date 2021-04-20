import { getSession } from "next-auth/client"
import { NextApiRequest, NextApiResponse } from "next"

export interface ApiRequestWithSession extends NextApiRequest {
  session
}

/** Require valid authentication session */
export const verifySession = handler => {
  return async (req: ApiRequestWithSession, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ message: "Not authorised" })
    req.session = session
    return handler(req, res, session)
  }
}

/** Require valid callback token */
export const verifyCallbackToken = handler => {
  return async (req: ApiRequestWithSession, res: NextApiResponse) => {
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

/** Gracefully catch 500 errors */
export const errorHandler = handler => async (
  req: ApiRequestWithSession,
  res: NextApiResponse
) => {
  try {
    return await handler(req, res)
  } catch (error) {
    res.status(500).json({
      error: error.toString(),
    })
  }
}
