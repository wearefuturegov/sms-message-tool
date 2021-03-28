const NotifyClient = require("notifications-node-client").NotifyClient

const client = new NotifyClient(process.env.NOTIFY_API_KEY)

// export const sendMessage = async (id: String, number: String, body: String): Promise<object> => {

export const sendMessage = async (id, number, body) => {
  try {
    return await client.sendSms(process.env.NOTIFY_TEMPLATE_ID, number, {
      personalisation: body,
      reference: id,
    })
  } catch (e) {
    console.error(e)
    return e
  }
}
