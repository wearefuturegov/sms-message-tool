import { Provider } from "next-auth/client"
import Layout from "../components/_Layout"

import "../styles/lib.scss"
import "../styles/index.scss"

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App
