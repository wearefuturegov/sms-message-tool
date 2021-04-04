import { providers, signIn, getSession } from "next-auth/client"

export const getServerSideProps = async context => {
  const { req, res } = context
  const session = await getSession({ req })

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: req.__NEXT_INIT_QUERY.callbackUrl || "/",
    })
    res.end()
    // return
  }

  const lproviders = await providers()
  return {
    props: { lproviders },
  }
}

const SignIn = ({ lproviders }) => (
  <>
    <h1 className="lbh-heading-h1">Sign in</h1>
    <p className="lbh-body">Please log in with your Hackney email account.</p>

    {Object.values(lproviders).map(provider => (
      <div key={provider.name}>
        <button
          onClick={() => signIn(provider.id)}
          className="govuk-button lbh-button  lbh-button--start govuk-button--start"
        >
          Sign in with {provider.name}
          <svg
            className="govuk-button__start-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17.5"
            height="19"
            viewBox="0 0 33 40"
            role="presentation"
            focusable="false"
          >
            <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
          </svg>
        </button>
      </div>
    ))}

    <p className="lbh-body">Please log in with your Hackney email account.</p>
    <p className="lbh-body">
      Speak to your manager if you have issues logging in.
    </p>
  </>
)

export default SignIn
