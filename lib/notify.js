const NotifyClient = require("notifications-node-client").NotifyClient

const client = new NotifyClient(process.env.NOTIFY_API_KEY)

export const sendMessage = async (number, body, id) => {
  try {
    const res = await client.sendSms(process.env.NOTIFY_TEMPLATE_ID, number, {
      personalisation: {
        body: body,
      },
      reference: String(id),
    })
    return res
  } catch (e) {
    console.error(e)
    return e
  }
}
