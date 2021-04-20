# 💌 Two-way SMS tool

A thin layer on top of [GOV.UK Notify](https://www.notifications.service.gov.uk/) for council officers to conduct two-way conversations with residents in an easy, transparent and auditable way.

## 🧱 How it's built

It's a Next.js app backed by a PostgreSQL database.

It also uses:

- [GOV.UK Notify](https://www.notifications.service.gov.uk/) to handle incoming and outgoing SMS messages
- [NextAuth](https://next-auth.js.org/) and Google for authentication

## 💻 Running it locally

You need node and npm installed.

You can use a `.env` file to provide environment config. Make a fresh one with `cp .env.sample .env`.

```
npm i
npm run dev
```

It will be on [localhost:3000](http://localhost:3000).

## 🧪 Testing it

It uses Jest for unit tests and Cypress for integration tests. You can run them with:

```
npm test
npm run cypress
```

## 🌍 Setting it up in production

Suitable for Vercel, Netlify, Heroku and anywhere else you can host a Next.js app.

You need to configure Notify for it to work:

1. Sign up for a new service on Notify
2. Create an otherwise blank template with `((body))` and add the ID as `NOTIFY_TEMPLATE_ID`
3. Create an API key and add it as `NOTIFY_API_KEY`
4. Ask them to enable support for incoming messages
5. Add the callback URLs for delivered and incoming messages, using the secret you set in `NOTIFY_CALLBACK_TOKEN`. These will end in `.../api/callbacks/message-delivered` and `.../api/callbacks/message-received`

## 🔌 API

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

## 🤷‍♀️ User needs

- As a council officer, I need to send messages to contacts

- As a resident, I need to reply to messages from my case worker

- As a council officer, I need to see _all messages_ my team has exchanged with a contact

- As a council officer, I need to record metadata against a contact (eg. their name or social care ID)

## 🛣 Roadmap

### Now

- ~~fix inconsistent focus state for message bubbles~~ (DONE)
- ~~fix bug with entire layout reloading while session is fetched~~ (DONE)
- ~~refactor layouts~~ (DONE)
- ~~settings form~~ (DONE)
- ~~search conversations~~ (DONE)
- ~~fix bug with "just sent" messages~~ (DONE)
- ~~fix bug with search hanging on "no results" while loading~~ (DONE)
- ~~proper custom login screen~~ (DONE)
- ~~fix bug with new contact creation~~ (DONE)
- ~~auto signature (custom content per user, checkbox on/off)~~ (DONE)

1. improve load more messages (IN PROGRESS)
2. improve loading skeletons (IN PROGRESS)
3. make sure all form submit handlers handle errors gracefully
4. refactor APIs to use consistent error handling and to use same validation schemas as forms
5. add missing unit tests
6. make sure pages gracefully 404 if conversation or contact can't be found
7. don't show "go to bottom" button when the conversation is too short to scroll

### Next

1. quick reply templates (array per organisation)
2. out of hours autoreply (custom content, checkbox on/off with background job processing)

3. unread message notices
4. archive conversations (unarchive on new message)

### Later

- support for multiple isolated teams/organisations (store notify config on database for distinguishing services?)
- add metadata to contact from other apis (IN PROGRESS)
- email notifications?
