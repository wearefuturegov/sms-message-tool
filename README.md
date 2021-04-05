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

## API

All data is read and operated on through the internal API, which is at `/api`. It checks for a valid authentication cookie. The endpoints are:

- `/auth`
- `/callbacks` these endpoints check for a Notify-held token rather than an authentication cookie.
  - `POST /message-delivered` used by Notify to update a message's delivery status
  - `POST /message-received` used by Notify to update about inbound messages
- `/contacts`
  - `GET` search for contacts using `?q=` query parameter
  - `POST` create a new contact
- `/contacts/:id`
  - `PUT` update the contact with that ID
- `/conversations`
  - `GET` recent conversations with recent messages
- `/conversations/:id`
  - `GET` all messages exchanged with the contact with that ID
  - `POST /send` send a new message to the contact with that ID

## User needs

- as an officer, i need to record metadata against a contact (eg. their name)

- as an officer, i need to send messages to contacts

- as an officer, i need to see all messages we've exchanged with a contact

- as a resident, i need to reply to a message

# To do

## Now

1. ~~fix inconsistent focus state for message bubbles~~ (DONE)
2. ~~fix bug with entire layout reloading while session is fetched~~ (DONE)
3. ~~refactor layouts~~ (DONE)
4. ~~settings form~~ (DONE)
5. ~~search conversations~~ (DONE)
6. ~~fix bug with "just sent" messages~~ (DONE)
7. ~~fix bug with search hanging on "no results" while loading~~ (DONE)
8. load more messages (IN PROGRESS)
9. proper custom login screen (IN PROGRESS)
10. loading skeletons (IN PROGRESS)

## Next

1. quick reply templates (array per organisation)
2. auto signature (custom content per user, checkbox on/off)
3. out of hours autoreply (custom content, checkbox on/off with background job processing)

4. unread message notices
5. archive conversations (unarchive on new message)

# Later

- support for multiple isolated teams/organisations (store notify config on database for distinguishing services?)
- add metadata to contact from other apis
- email notifications?
