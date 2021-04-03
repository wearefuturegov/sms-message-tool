import { Provider } from "next-auth/client"
import DefaultLayout from "../components/_Layout"
import Head from "next/head"

import "../styles/index.scss"
import "../styles/custom.scss"

const App = ({ Component, pageProps }) => {
  // enable page to control layout it's rendered inside
  // see: https://reacttricks.com/nested-dynamic-layouts-in-next-apps/
  const Layout = Component.Layout || DefaultLayout

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>SMS | Hackney Council</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
