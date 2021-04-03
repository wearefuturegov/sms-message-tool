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

## Now

1. fix bug with "just sent" messages
2. load more messages and conversations
3. fix inconsistent focus state for message bubbles
4. fix bug with entire layout reloading while session is fetched
5. search conversations

## Next

1. quick reply templates (array per organisation)
2. auto signature (custom content per user, checkbox on/off)
3. out of hours autoreply (custom content, checkbox on/off with background job processing)

4. unread notifications ()
5. load more messages/conversations
6. archive conversations (unarchive on new message)

# Later

- support for multiple isolated teams/organisations (store notify config on database for distinguishing services?)
- add metadata to contact from other apis
- email notifications?
