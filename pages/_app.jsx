import { Provider } from "next-auth/client"
import Layout from "../components/_Layout"
import Head from "next/head"

import "../styles/index.scss"
import "../styles/custom.scss"

const App = ({ Component, pageProps }) => {
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
