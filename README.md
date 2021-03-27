# Modern app boilerplate

This is a worked example of a production-ready full-stack web app.

Major bits:

- React for UI
- [Next.js](https://next.js.org/) for rendering, routing, API routes and bundling code
- [Prisma](https://www.prisma.io/) for talking to a PostgreSQL database

Other bits:

- [Formik](https://formik.org/) and [Yup](https://www.npmjs.com/package/yup) for forms and validation
- [Next-auth](https://next-auth.js.org/) for authentication
- Sass for styling
- [Jest]() and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests
- [Cypress](https://www.cypress.io/) for integration tests
- [Reach UI](https://reach.tech/dialog/) for some accessible UI sprinkles

It contains a basic "post" model. Users can view a list of posts and click on one to see it in detail.

After logging in, users can also create, edit and delete posts.

## 🐒 Getting started

You need Node.js and NPM installed, along with a PostgreSQL database.

```
npx create-next-app -e https://github.com/jhackett1/railsy-nextjs-prisma-example
```

This will clone the repo and install the dependencies with [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

You can apply the schema to a fresh database with `npm run schema:load`.

You can then boot it up with `npm run dev`. It will be on [localhost:3000/posts](http://localhost:3000/posts)

## 🧪 Testing

You can run the Jest unit tests with `npm test`.

Cypress end-to-end tests can be run with `npm run cypress`, provided a local server is already running.

## 🧬 Configuration

It needs a few configuration variables to work.

You can supply these with a `.env` file locally. Run `cp .env.sample .env` to make a fresh one.

## 🦴 Anatomy

It follows the example of Rails - with MVC and CRUD patterns that should seem familiar.

- `prisma` contains the database schema and seed data
- `pages/api` contains API routes that overlap closely with Rails controller actions
- The remainder of `pages` contains React/Next.js views

Other directories:

- `components` contains reusable React components
- `cypress` contains integration tests, their config and fixtures
- `lib` contains everything else

## To do

Need to add examples for:

1. Flash messages. Is this a good pattern to continue with? Would toast messages be a better fit?
2. Background job queue, maybe with [BullMQ](https://github.com/taskforcesh/bullmq)
