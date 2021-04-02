import { Provider } from "next-auth/client"
import Layout from "../components/_Layout"

import "../styles/index.scss"
import "../styles/custom.scss"

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
