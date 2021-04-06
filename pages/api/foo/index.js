import { verifySession } from "../../../lib/middleware";

export default async (req, res) => {
  try {
    await verifySession(req, res);

    res.send("ok");
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ error: e });
  }
};
