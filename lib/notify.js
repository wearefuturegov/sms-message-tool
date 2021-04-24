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

    console.log(await res.text())
    console.log(await res.json())
  } catch (e) {
    console.error(e)

    console.error(e.errors, JSON.stringify(e.errrors), e.toString())
    return e
  }
}
