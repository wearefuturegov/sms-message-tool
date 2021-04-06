import { getSession } from "next-auth/client";

export const verifyCallbackToken = (req, res) => {
  if (
    req.headers.authorization === `Bearer ${process.env.NOTIFY_CALLBACK_TOKEN}`
  ) {
    return true;
  } else {
    return res.status(401).json({ message: "Not authorised" });
  }
};

export const verifySession = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    return session;
  } else {
    throw new Error("Not authorised");
    // return res.status(401).json({ message: "Not authorised" });
  }
};
