# SMS tool

## Running it locally

You need node and npm installed.

```
npm i
npm run dev
```

## Setting it up in production

Suitable for Vercel, Netlify, Heroku and anywhere else you can host a Next.js app.

1. Sign up for a new service on Notify
2. Create an otherwise blank template with ` ((body))`` and add the ID as  `NOTIFY_TEMPLATE_ID`
3. Create an API key and add it as `NOTIFY_API_KEY`
4. Ask them to enable support for incoming messages
5. Add the callback URLs for delivered and incoming messages, using the secret you set in `NOTIFY_CALLBACK_TOKEN`. These will end in `.../api/callbacks/message-delivered` and `.../api/callbacks/message-received`

## User needs

- as an officer, i need to record metadata against a contact (eg. their name)

- as an officer, i need to send messages to contacts

- as an officer, i need to see all messages we've exchanged with a contact

- as a resident, i need to reply to a message

# To do

- handle incoming messages (DONE)
- reply templates
- auto signature setting
- out of hours autoreply (custom content and hours)
- search conversations
- create new conversation
- add metadata to contact
- unread notifications (readBy array on contact)
- load more messages/conversations
- archive conversations (unarchive on new message)

- support for multiple isolated teams/organisations
